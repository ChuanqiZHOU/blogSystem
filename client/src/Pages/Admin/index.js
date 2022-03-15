import React, { useEffect, useState} from 'react';
import { Tab, Row, Col, Nav, Table } from 'react-bootstrap';
import {SERVERHTTP} from '../../utils/constEnv'

import Header from '../../components/Header';
import TabDisp from '../../components/TabDisp';
import UserTableItem from '../../components/UserTableItem';
import TablePagi from '../../components/TablePagi';
import ArticleTableItem from '../../components/ArticleTableItem'
import styles from './index.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  const [userList, setUserList] = useState([])
  const [articleList, setArticleList]= useState([])
  const [userPage, setUserPage] = useState(1)
  const [articlePage, setArticlePage]= useState(1)
  const [total, setTotal] = useState();
  const [totalArticle, setTotalArticle] = useState()
  const navigate = useNavigate();

    const getUserList = async() => {
      // get token and verify user email and role in server
      const token = localStorage.getItem('token');
      const result = await axios.post(`${SERVERHTTP}admin/manage`, {
            token:token
        })
      if (result.data.status !== 200 || result.data.userRole !== "admin") {
        navigate('/')
      }

      // get UserList
      const userRes = await axios.get(`${SERVERHTTP}admin`, {
          params: { page: userPage },
      })
      // console.log(page)
      // console.log(userRes)
      const userData = JSON.parse(userRes.data.userList);
      setUserList(userData);
      setTotal(userRes.data.total)
        
  }

   const getArticleList = async () => {
     // get token and verify user email and role in server
     const token = localStorage.getItem('token')
     const result = await axios.post(`${SERVERHTTP}admin/manage`, {
       token: token,
     })
     if (result.data.status !== 200) {
       navigate('/')
     }

     // get ArticleList
     const articleRes = await axios.get(`${SERVERHTTP}admin/articleTable`, {
       params: { page: articlePage },
     })
  
     const articleData = JSON.parse(articleRes.data.articleList)
     setArticleList(articleData)
     setTotalArticle(articleRes.data.total)
   }
  

  useEffect(() => {
    getUserList()     
  }, [userPage])

  useEffect(() => {
    getArticleList()
  }, [articlePage])
  
  //accept current page number from pagination
  const userKey = (params) => {
    setUserPage(params)
    // console.log(params)
  }
  
  const articleKey = (params) => {
    setArticlePage(params)
  }
    return (
      <>
        <Header className={styles.adminHeader}></Header>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2} style={{ padding: '0rem', cursor: 'pointer' }}>
                <Nav variant="pills" className="flex-column mb-3">
                  <Nav.Item>
                    <Nav.Link eventKey="first">UserList</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">ArticleList</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10} style={{ padding: '0rem' }}>
                <Tab.Content >
                  <Tab.Pane eventKey="first" className={styles.userTable}>
                    <TabDisp title="user"></TabDisp>
                    <Table striped bordered hover responsive='md'>
                      <thead>
                        <tr>
                          <th className={styles.userNumber}>#</th>
                          <th className={styles.userId}>id</th>
                          <th className={styles.userUsername}>UserName</th>
                          <th className={styles.userPassword}>Password</th>
                          <th className={styles.userEmail}>Email</th>
                          <th className={styles.userState}>State</th>
                          <th className={styles.userRole}>Role</th>
                          <th className={styles.userOper}>Operation</th>
                        </tr>
                      </thead>
                      <tbody style={{ wordBreak: 'break-all' }}>
                      <UserTableItem userList={userList}></UserTableItem>
                      </tbody>
                    </Table>
                    <TablePagi
                      total={total}
                      currentKey={userKey}
                    ></TablePagi>
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <TabDisp title="article" ></TabDisp>
                    <Table striped bordered hover >
                      <thead>
                        <tr>
                          <th className={styles.articleNumber}>#</th>
                          <th className={styles.articleId}>id</th>
                          <th className={styles.articleTitle}>Title</th>
                          <th className={styles.articleType}>Type</th>
                          <th className={styles.articleUpdate}>UpdatedDate</th>
                          <th className={styles.articleAuthor}>Author</th>
                          <th className={styles.articleEditor}>Editor</th>
                          <th className={styles.articleOpera}>Operation</th>
                        </tr>
                      </thead>
                      <tbody style={{ wordBreak: 'break-all' }}>
                        <ArticleTableItem articleList={articleList}></ArticleTableItem>
                      </tbody>
                    </Table>
                    <TablePagi
                      total={totalArticle}
                      currentKey={articleKey}
                    ></TablePagi>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </>
    )
}

export default Admin