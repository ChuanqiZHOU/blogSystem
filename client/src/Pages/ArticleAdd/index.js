import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useNavigate} from 'react-router-dom';
import { Form, Button, Figure } from 'react-bootstrap'
import { getToken } from '../../utils/tokenOperation'
import { SERVERHTTP } from '../../utils/constEnv';


const ArticleAdd = () => {

  const [editorInfo, setEditorInfo] = useState();
  const [titleInfo, setTitleInfo] = useState();
  const [authorInfo, setAuthorInfo] = useState();
  const [typeInfo, setTypeInfo] = useState('fake');
  const [contentInfo, setContentInfo] = useState();
  const [updateDate, setUpdateDate] = useState();
  const [coverPath, setCoverPath] = useState('');
  const [uploadFile, setUploadFile] = useState('');
  const [baseFile, setBaseFile] = useState();
  const navigate = useNavigate();
  const getEditor = async() => {
    const token = getToken();
    const result = await axios.post(`${SERVERHTTP}admin/manage`, {
      token: token,
    })
    setEditorInfo(result.data.username)
  }
  
  const getTitle = (e) => {
    setTitleInfo(e.target.value)
    // console.log(e.target.value)
  }
  const getAuthors = (e) => {
    setAuthorInfo(e.target.value)
    // console.log(e.target.value)
  }
  const getType = (e) => {
    setTypeInfo(e.target.value);
    console.log(e.target.value)

  }
  const getFile = (e) => {
    console.log(e.target.value);
    // setCoverPath(e.target.value);
    const file = e.target.files[0];
    // console.log(e.target.files);
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCoverPath(reader.result)
      setUploadFile(e.target.files[0])
    };
  }
  const getContent = (e) => {
    setContentInfo(e.target.value)
  }
 
  const getDateTime = (e) => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
   
    const day = date.getDate();
    const hours = date.getHours();
    const mins = date.getMinutes();
    const seconds = date.getSeconds();
    const dateTime = `${year}-${ month }-${ day }  ${hours}:${mins}:${seconds}`
    setUpdateDate(dateTime);
  }
  useEffect(() => {
    getEditor();
    getDateTime();
    // getType();
  
  }, [])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
   const data = {
      "title": titleInfo,
      "authors": authorInfo,
      "editor": editorInfo,
      "type": typeInfo,
      "content": contentInfo,
    "updateDate": updateDate,
    'file': uploadFile
    }
    
    // const dataKeyArray = Object.keys(data);
    let formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    const result = await axios.post(
      `${SERVERHTTP}admin/article/add`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: token,
        },
      }
    )

    if (result.data.status === 200) {
      navigate('/admin')
    }
    if (result.data.status === 400) {
      console.log(result.data.msg)
    }
  }

    return (
      <>
        <Form className="col-6 offset-3">
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the title"
              onChange={getTitle}
              defaultValue={titleInfo || ''}
              name="title"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAuthors">
            <Form.Label>Authors</Form.Label>
            <Form.Control
              type="text"
              placeholder="Authors"
              onChange={getAuthors}
              defaultValue=""
              name="authors"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEditor">
            <Form.Label>Editor</Form.Label>
            <Form.Control
              type="text"
              placeholder="Editor"
              defaultValue={editorInfo}
              name="editor"
              disabled
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select onChange={getType} defaultValue="fake" name="type">
              <option value="fake">Fake</option>
              <option value="conspiracy">Conspiracy</option>
              <option value="unreliable">Unreliable</option>
              <option value="bias">Bias</option>
              <option value="hate">Hate</option>
              <option value="junksci">Junksci</option>
              <option value="political">Political</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Cover</Form.Label>
            <Form.Control type="file" name="file" onChange={getFile} />
            <Figure>
              <Figure.Caption>Cover Preview</Figure.Caption>
              <Figure.Image src={coverPath} />
            </Figure>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Leave a content here"
              style={{ height: '100px' }}
              onChange={getContent}
              name="content"
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="col-2 offset-0"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="secondary" type="reset" className="col-2 offset-1">
            Reset
          </Button>
        </Form>
      </>
    )
}

export {ArticleAdd}