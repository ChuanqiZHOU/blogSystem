import axios from 'axios';
import React, {useState} from 'react'
import {Card, Button, Row, Col, Toast, ToastContainer} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom';
import { getToken } from '../../utils/tokenOperation';
import styles from './index.module.css'
import { SERVERHTTP } from '../../utils/constEnv';

const LatestCardSet = (props) => {
  const [toastShow, setToastShow] = useState(false);
  const { statusState, cardList, setModal } = props;
  const cardListArray = cardList;
  if (cardListArray.length !== 0) {
    for (let i = 0; i < cardListArray.length; i++) {
      const contentString = cardListArray[i].content;
      cardListArray[i].content = contentString.slice(0, 100);
      cardListArray[i].title = cardListArray[i].title.slice(0, 50)
    }
  }
  const navigate = useNavigate();
  const onClick = async(params) => { 
    const token = getToken();
    if (!token) {
      setModal(true)
    }
    // console.log(params)
  const result_token = await axios.post(`${SERVERHTTP}admin/manage`, {
        token: token
  })
    if (result_token.data.status !== 200) {
      setToastShow(true);
       navigate('/')
     }else{
    navigate('/article/detail', { state: { id: params }, replace: true })}
}

  const cardRender = (
    <Row md={2} sm={1} lg={3}>
      {cardList.map((item, index) => {
        
        let height = '25vh';
       return (
         <div key={item['_id']} className={styles.cardContainer}>
           <Card className={styles.card}>
             <div className= {styles.imgContainer}>
             <Card.Img
               variant="top"
               src={`${SERVERHTTP}${item.address}`}
               style={{ height: height }}
               />
             </div>
             <Card.Body>
               <Card.Title>{item.title}...</Card.Title>
               <Card.Text>{item.content}...</Card.Text>
               <Button variant="primary" onClick={() => onClick(item['_id'])}>
                 Detail
               </Button>
              
             </Card.Body>
           </Card>
         </div>
       )
      })}
    </Row>
    
  )  
    
    return (
      <>
        {cardRender}
        <Row>
          <Col xs={6}>
            <ToastContainer
              className="p-3"
              position="middle-center"
            >
              <Toast
                onClose={() => setToastShow(false)}
                show={toastShow}
                delay={3000}
                autohide
                
              >
                <Toast.Header>
                  <strong className="me-auto">Notification</strong>
                </Toast.Header>
                <Toast.Body>Dear, login is necessary</Toast.Body>
              </Toast>
            </ToastContainer>
          </Col>
        </Row>
      </>
    )
 }

export default LatestCardSet