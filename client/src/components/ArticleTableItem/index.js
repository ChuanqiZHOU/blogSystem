import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './index.module.css'
import { SERVERHTTP } from '../../utils/constEnv'
const ArticleTableItem = ({ articleList }) => {
  const [itemState, setItemState] = useState()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const navigate = useNavigate()
  const articleEdit = (item) => {
    navigate('/admin/article/edit', { state: item, replace: true })
  }
  const articleDel = (item) => {
    setItemState(item)
    handleShow()
  }

  const confirmArticleDel = async () => {
    handleClose()
    const res = await axios.delete(`${SERVERHTTP}admin/article/del`, {
      data: { id: itemState.id },
    })
    console.log(res)
    if (res.data.status === 200) {
      window.location.reload()
    
    }
  }
  return (
    <>
      {articleList.map((item, key) => (
        <tr key={item.id}>
          <td>{key + 1}</td>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.type}</td>
          <td>{ item.updateDate}</td>
          <td>{item.authors}</td>
          <td>{item.editor}</td>
          <td style={{ alignItems: 'center' }}>
            <i className={styles.tableEdit} onClick={() => articleEdit({ item })}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z" />
              </svg>
            </i>
            <i className={styles.tableTrash} onClick={() => articleDel(item)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </i>
          </td>
        </tr>
      ))}
      {/* Warning infro for delete user */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this article?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmArticleDel}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ArticleTableItem
