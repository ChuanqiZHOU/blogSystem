import React from 'react'
import {useNavigate} from 'react-router-dom'
import styles from './index.module.css'
import {Button} from 'react-bootstrap'
const TabDisp = (props) => {
    const navigate = useNavigate();
    let titleName = ""
    let buttonName = ""
    const { title } = props;
    if (title === "user") {
        titleName = "User Administration";
        buttonName = "User";
    }
    if (title === "article")
    {
         titleName = 'Articles Administration'
         buttonName = 'Article'
        }
    let buttonClick = () => { 
        if (title === 'user') {
           navigate('/reg')
        }
        if (title === 'article') {
           navigate('/admin/article/add') 
        }
       
    
    };
   
    return (
        <div className= {styles.tabDisp}>
            <div className={styles.title}> This is <i className={styles.titleEm}>{titleName}</i> system</div>
            <div><Button onClick={buttonClick}>Add { buttonName}</Button></div>
        </div>
    )
}


export default TabDisp