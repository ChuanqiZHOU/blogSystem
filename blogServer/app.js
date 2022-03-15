
import express from 'express'
import './model/conect.js'
import cors from 'cors'
import bodyParser from 'body-parser'

import { home } from './route/home.js'
import { admin } from './route/admin.js'
import { reg } from './route/reg.js'
import { articled } from './route/articleDetail.js'
//运行完一次必须注释掉，否则每次启动serverd都会重建
// const { admin } = require('./route/admin.js')

// delete express.bodyParser.parse['multipart/form-data']
const app = express();
// set the static resource path

app.listen(8080, console.log('server is running'))
app.use(express.static('public'))
app.use(cors())
// app.use(express.json(), (req, res) => {
//     console.log(req.body.email)
// })
// app.use(express.urlencoded({ extended: true }), (req, res) => {
//     console.log(req)
// });

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(parser)
app.use('/articled', articled)
// app.get('/admin', express.urlencoded({ extended: false }), admin)
app.use('/admin', admin);
app.use('/reg', express.json(), reg);
// app.use('/uploads', MultipartyMiddleware, (req, res) => {
//     console.log(req.files.upload);
//     var imagePath = req.files.upload.path;
//     console.log(imagePath);
//     const imgArray = imagePath.split("\\")
//     const coverPath = imgArray.pop();
//     console.log(coverPath)
//    res.status(200).json({
//      uploaded: true,
//      url: `http://localhost:8080/uploads/${coverPath}`,
//    })
// })
app.use('/', home);

