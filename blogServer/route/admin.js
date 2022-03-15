import express from 'express'
import { User, EditUser, DelUser } from '../model/user.js'
import { checkToken, setToken } from '../utils/jwtToken.js';
import { Article, CreateArticle, DelArticle } from '../model/articles.js'
import formidable from 'formidable'
import path from 'path'
const admin = express.Router();
const manage = express.Router();

admin.post('/', async(req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const { password, email } = req.body;
  if (email.trim().length === 0 || password.trim().length === 0) {
    return (
      res.send({ status: 400, msg: "email or password is wrong" })
    )
  } 
  
  let user = await User.findOne({ email });
  // console.log(user.username);
  if (!user) {
    return res.send({ status: 400, msg: 'email or password is wrong' })
  }
  if (user && password === user.password) {
        // set token for the user
    
    const preToken = { "email": user.email };
        let token = setToken(preToken);
        //store token to database
        let updateUser = await User.updateOne({ "email": email }, { $set: { "userCode": token } });
        res.send({ status: 200, userRole: user.role, token: token })
        
      } else {
        res.send({ status: 400, msg: "email or password is wrong" })
      }  
})

admin.post('/manage', async(req, res, next) => {
  const { token } = req.body;
  const result = checkToken(token);
  // console.log(result)
  if (result === false) {
    return (
    res.send({status:400, msg:"please login again"}))
  }
  if (result) {
    const user = await User.find({ email: result.email });
    // console.log(user)
    if (!user) {
      return res.send({ status: 400, msg: 'please login again' })
    }
    
    if (user && user[0].role !== 'admin') {
      return res.send({status: 200, msg: 'You are not admin', userRole: user[0].role})
    }
  //   const preUserList = await User.find({});
  //  let arr = []
  //  for (let i = 0; i < preUserList.length; i++) {
  //    let v = preUserList[i];
  //    arr.push({
  //      'id': v['_id'],
  //      'username': v.username,
  //      'email': v.email,
  //      'password': v.password,
  //      'state': v['__v'],
  //      'userCode': v.userCode,
  //      'role':v.role
  //    })
  //  }
  //   const userList = JSON.stringify(arr);
  //   console.log(userList)
    return (
      res.send({ status: 200, username: user[0].username, userRole: user[0].role})
    )
  }
})

admin.post('/myprofile', async (req, res) => {
  const { token } = req.body.data;
  const result = checkToken(token);
  if (result === false) {
    return res.send({status: 400, msg: 'please login again'})
  } else {
    const user = await User.find({ email: result.email })
    // console.log(user)
    if (!user) {
      return res.send({ status: 400, msg: 'please login again' })
    } else {
      return res.send({status: 200, user:user})
    }
  }

})
admin.post('/edit', async (req, res) => {
  const { token, username, password, role, state, email, id } = req.body;
  // console.log(username)
  // console.log(id)
  const result = checkToken(token);
  if (result === false) {
    return (
    res.send({status:400, msg:"please login again"}))
  }
  if (result) {
    const user = await User.find({ username: result.username, role: "admin"});
    if (!user) {
      return res.send({ status: 400, msg: 'please login again' })
    }

    // const updateUser = await User.updateOne({'_id': id}, {$set: {username: username, email: email, password: password, role: role, "__v": state}})
    const updateUser = await EditUser(req.body);
    return res.send({status: 200, msg: "you can modify"})
  }
})

admin.delete('/del', async (req, res) => {
  DelUser(req.body);
  return res.send({status:200, msg:"delete is sucessful"})
})

admin.get('/', async (req, res) => {
  let page = req.query.page || 1;
  let pageSize = 6;
  let count = await User.countDocuments({});
  let total = Math.ceil(count / pageSize);
  let start = (page - 1) * pageSize;
  let preUserList = await User.find({}).limit(pageSize).skip(start);
  let arr = []
  for (let i = 0; i < preUserList.length; i++) {
    let v = preUserList[i]
    arr.push({
      id: v['_id'],
      username: v.username,
      email: v.email,
      password: v.password,
      state: v['__v'],
      userCode: v.userCode,
      role: v.role,
    })
  }
  const userList = JSON.stringify(arr)
  return res.send({status: 200, total: total, userList: userList })
})

admin.get('/articleTable', async (req, res) => {
  let page = req.query.page || 1
  let pageSize = 20
  let count = await Article.countDocuments({})
  let total = Math.ceil(count / pageSize)
  let start = (page - 1) * pageSize
  let preArticleList = await Article.find({}).populate('editor').limit(pageSize).skip(start)
  // console.log(preArticleList)
  let arr = []
  for (let i = 0; i < preArticleList.length; i++) {
    let v = preArticleList[i]
    arr.push({
      field1: v.field1,
      id: v['_id'],
      title: v.title,
      type: v.type,
      url: v.url,
      content: v.content,
      updateDate: v['updated_at'],
      authors: v.authors,
      editor: v.editor.username
    })
  }

  // console.log(arr[0])
  const articleList = JSON.stringify(arr)
  return res.send({ status: 200, total: total, articleList: articleList })
})
admin.delete('/article/del', async (req, res) => {
  DelArticle(req.body);
  return res.send({ status: 200, msg: 'delete is sucessful' })
})
admin.post('/article/add', async (req, res) => {
  let flag = false;
  const __dirname = path.resolve();
  const form = formidable({ keepExtensions: true });
  form.uploadDir = path.join(__dirname, 'public', 'uploads');
  await form.parse(req, async (err, fields, files) => {
    console.log(fields)
    const user = await User.findOne({ userCode: req.headers.token })
    const props = {
      title: fields.title,
      authors: fields.authors,
      editor: user['_id'],
      type: fields.type,
      content: fields.content,
      updated_at: fields.updateDate,
      address: files.file.filepath.split('public')[1].replaceAll('\\', '/')
    };
    const newArticle = await CreateArticle(props);
  })
 return res.send({ status: 200 })
})

admin.post('/article/edit', async (req, res) => {
  const { data } = req.body;
  await Article.updateOne({ '_id': data.id }, {
    $set: {
      title: data.title,
      authors: data.authors,
      type: data.type,
      'updata_at': data.updateDate
    }
  });
  
  return res.send( {status: 200})

})
export { admin}
