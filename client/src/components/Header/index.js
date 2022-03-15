import React, { useEffect,useState} from 'react'
import axios from 'axios'
import { Navbar, Button, Container, Nav, Modal} from 'react-bootstrap'
import { getToken, removeToken} from '../../utils/tokenOperation'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.css'
import { SERVERHTTP } from '../../utils/constEnv'
const Header = () => {
   const [modalShow, setModalShow] = useState(false)
  
  const navigate = useNavigate();
  
  const onClick = () => {
      navigate('/reg')
  }
  const toLogin = (e) => {
    e.preventDefault();
    navigate('/loginpage')
  }
  const toMyProfile = async() => {
    const token = getToken();
    const result = await axios.post(`${SERVERHTTP}admin/myprofile`, { data: { token: token } })
    const userInfo = result.data.user[0];
    const item = {
      email: userInfo.email,
      id: userInfo['_id'],
      password: userInfo.password,
      role: userInfo.role,
      state: userInfo['__v'],
      userCode: userInfo.userCode,
      username: userInfo.username
    }
  
    if(item){
      navigate('/admin/edit', { state: { item }, replace: true })}
  }

  const logout = () => {
    removeToken();
  }
  const toAdmin = async(e) => {
    e.preventDefault();
    let flag = false;
    if (getToken()) {
      const result = await axios.post(`${SERVERHTTP}admin/manage`, { token: getToken() })
      if (result.data.userRole === "guest")
        flag = true;
    }
    if (!getToken() || flag === true) {
      setModalShow(true)
    } else {
      setModalShow(false);
      navigate('/admin')
    }
  }
    const MyVerticallyCenteredModal = (props) => {
      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Notification
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Login is necessary for seeing the content</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )
    }
    return (
      <>
        <Navbar bg="light" expand="lg" style={{ marginBottom: '1rem' }}>
          <Container fluid>
            <Navbar.Brand href="/" className={styles['navbar-brand']}>
              A simple blog system -----Dev version
            </Navbar.Brand>
            <Nav className={[styles['navbar-nav'], 'my-lg-0'].join(' ')}>
              <Nav.Link href="/" className={styles['nav-link']}>
                Home
              </Nav.Link>
              <Nav.Link
                href="/admin"
                className={styles['nav-link']}
                onClick={toAdmin}
              >
                Admin
              </Nav.Link>
              {getToken() ? (
                <Nav.Link
                  href="/"
                  className={styles['nav-link']}
                  onClick={logout}
                >
                  {' '}
                  LogOut
                </Nav.Link>
              ) : (
                <Nav.Link
                  href="/loginpage"
                  className={styles['nav-link']}
                  onClick={toLogin}
                >
                  Sign In
                </Nav.Link>
              )}
              {getToken() ? (
                <Button
                  variant="outline-success"
                  onClick={toMyProfile}
                  className={styles['nav-button']}
                >
                  My Profile
                </Button>
              ) : (
                <Button
                  variant="outline-success"
                  onClick={onClick}
                  className={styles['nav-button']}
                >
                  Sign Up
                </Button>
              )}
            </Nav>
          </Container>
        </Navbar>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    )
}

export default Header