import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../utils/tokenOperation'
import styles from './index.module.css'
import { SERVERHTTP } from '../../utils/constEnv'
const BiasNews = (props) => {
  const { setModal } = props;
    const [cardBias, setCardBias] = useState([{content:'', address:"", title:""}])
    const getBiasArtiles = async () => {
      const cardReq = await axios.get(`${SERVERHTTP}cardgroups`, {
        params: { cardName: 'bias' },
      })
      const { cardList, status } = cardReq.data
        setCardBias(cardList)
    //   setStatusState(status)
    }
    useEffect(() => {
      getBiasArtiles();
    }, [])

    if (cardBias.length !== 0) {
        const contentString0 = cardBias[0].content
        // console.log(contentString0)
        cardBias[0].content = contentString0.slice(0, 500)
        cardBias[0].title = cardBias[0].title.slice(0, 200)
       for (let i = 1; i < cardBias.length; i++) {
           const contentString = cardBias[i].content
        cardBias[i].content = contentString.slice(0, 100)
        cardBias[i].title = cardBias[i].title.slice(0, 50)
       }
     }

    
    
    const navigate = useNavigate()
    const onClick = async (params) => {
      const token = getToken()
       if (!token) {
         setModal(true)
       }
      console.log(params)
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
        <div className={styles.biasContainer}>
          <div className={[styles.biasLeft,"col-md-6","col-sm-12"].join(" ")}>
            {cardBias.map((item, index) => {
              if (item.address !== "" && index===0) {
              return (
                <Card key={index}>
                  <div className={styles.imgContainer}>
                    <Card.Img
                      variant="top"
                      src={`${SERVERHTTP}${item.address}`}
                      className={styles.biasLeftImg}
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{cardBias[0].title}</Card.Title>
                    <Card.Text>{cardBias[0].content}...</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => onClick(item['_id'])}
                    >
                      Detail
                    </Button>
                  </Card.Body>
                </Card>
              )
              }
            })}
            
          </div>
          <div className="col-md-5 d-flex flex-column justify-content-between">
            {cardBias.map((item, index) => {
              if (index > 0) {
                let height = '15vh'
                return (
                  <div key={item['_id']} className={styles.cardContainer}>
                    <Card className={styles.card}>
                      <div className={styles.imgContainer}>
                      <Card.Img
                        variant="top"
                        src={`${SERVERHTTP}${item.address}`}
                       
                        className={styles.biasRightImg}         s                 
                      /></div>
                      <Card.Body>
                        <Card.Title>{item.title}...</Card.Title>
                        <Card.Text>{item.content}...</Card.Text>
                        <Button
                          variant="primary"
                          onClick={() => onClick(item['_id'])}
                        >
                          Detail
                        </Button>
                      </Card.Body>
                    </Card>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </>
    )
}

export default BiasNews