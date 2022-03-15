import React from 'react'
import styles from './index.module.css'
const Foot = () => {
    return (
      <>
        <div className={styles.footContainer}>
          <div className={styles.contact}>
            <div className={styles.contactTitle}>Contact</div>
            <div className={styles.website}>
              <a href="http://chuanqizhou.github.io" style={{ textDecoration:'none', color: 'white'}}>
                http://chuanqizhou.github.io
              </a>
            </div>
          </div>
          <div className={styles.declaration}>
            <span className={styles.decContent}>
              All images downloaded from the internet and used for
              non-commercial application. <br/>All backend data comes from github and
              is used for non-business activities. <br/>The content of this website is
              intended to demonstrate learning and practice only.
            </span>
          </div>
        </div>
      </>
    )
}

export default Foot