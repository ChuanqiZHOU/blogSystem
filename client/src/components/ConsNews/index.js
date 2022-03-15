import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../utils/tokenOperation'
import { Card, Button, Row } from 'react-bootstrap'
import styles from './index.module.css'
import { SERVERHTTP } from '../../utils/constEnv'
const ConsNews = (props) => {
    const { setModal } = props;
    const [cardCons, setCardCons] = useState([
      { title: 'Cons', content: 'haha' },
    ])
    const getConsArtiles = async () => {
      const cardReq = await axios.get(`${SERVERHTTP}cardgroups`, {
        params: { cardName: 'conspiracy' },
      })
      const { cardList, status } = cardReq.data
      setCardCons(cardList)
      //   setStatusState(status)
    }
    useEffect(() => {
      getConsArtiles()
    }, [])

    if (cardCons.length !== 0) {
      for (let i = 0; i < cardCons.length; i++) {
        const contentString = cardCons[i].content
        cardCons[i].content = contentString.slice(0, 1000)
        // cardCons[i].title = cardCons[i].title.slice(0, 50)
      }
    }

    const navigate = useNavigate()
    const onClick = async (params) => {
      const token = getToken();
       if (!token) {
         setModal(true)
       }
      console.log(params);
      const result_token = await axios.post(
        `${SERVERHTTP}admin/manage`,
        {
          token: token,
        }
      )
      if (result_token.data.status !== 200) {
        navigate('/')
      } else {
        navigate('/article/detail', { state: { id: params }, replace: true })
      }
    }

    return (
      <>
        {cardCons.map((item, index) => {
          if (item.title !== "Cons") {
            return (
              <div key={index} className={styles.cardContainer}>
            <Card
              className={styles.card}
              key={item['_id']}
            >
              <div className={styles.imgContainer}>
                <Card.Img
                  variant="top"
                src={`${SERVERHTTP}${item.address}`}
                className={styles.cardImg}
                />
              </div>
              <Card.Body className={styles['card-body']}>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>{item.content}...</Card.Text>
                <Button variant="primary" onClick={() => onClick(item['_id'])}>
                  Detail
                </Button>
              </Card.Body>
            </Card>
          </div>
            )
          }
          
        })}
      </>
    )
}

export default ConsNews