import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { SERVERHTTP } from '../../utils/constEnv'
const CommentList = ({ aid }) => {
    const [commentRes, setCommentRes] = useState([{_id:'fdsadsf', content:'fdsadfa', updateDate:'fdsafdsa', eid:{_id:"f123456465"}}])
    const getCommentListAll = async() => {
        const result = await axios.get(`${SERVERHTTP}articled/commentall`, {
            params: { id: aid }
        });
        setCommentRes(result.data.comment)
       
    }
    
    const CommentRender = () => 
    {
        return (
            <>
                {commentRes.length !== 0 && commentRes.map(item => 
                    <div key={item["_id"]} className={styles.eachComment}>
                    <div className={styles.commentPT}><span className={styles.commentPerson}>{item.eid.username}</span><span className={styles.commentTime}> {item.updateDate}</span></div>
                    <div className={styles.commentContent}>{item.content}</div>
                       
                    </div>
                )}
            </>
        )
    }

    useEffect(() => {
        getCommentListAll()
    },[])
    return (
        <CommentRender></CommentRender>
    )
}

export default CommentList