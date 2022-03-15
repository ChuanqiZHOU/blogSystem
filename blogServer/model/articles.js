import mongoose from 'mongoose'
import fs from 'fs'
import dateFormat from 'dateformat'
import { userIdExport } from './user.js'

const now = new Date();
const articleTime = dateFormat(now, "isoDateTime");
const articleSchema = new mongoose.Schema({
  field1: {
    type: Number,
  },
  domain: {
    type: String,
  },
  id: {
    type: Number,
  },
  type: {
    type: String,
  },
  url: {
    typed: String,
    default: '',
  },
  content: {
    type: String,
  },
  scraped_at: {
    type: String,
  },
  insert_at: {
    type: String,
  },
  updated_at: {
    type: String,
    default: articleTime
  },
  title: {
    type: String,
  },
  authors: {
    type: String,
  },
  keywords: {
    type: String,
  },
  meta_keywords: {
    type: Array,
  },
  meta_discription: {
    type: String,
  },
  tags: {
    type: String,
  },
  summary: {
    type: String,
  },
  editor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  address: {
    type: String,
  },
})

const Article = mongoose.model('Article', articleSchema)

const CreateArticle = (props) => {
  Article.create({
    title: props.title,
    authors: props.authors,
    editor: props.editor,
    type: props.type,
    content: props.content,
    updated_at: props.updateDate,
    address: props.address
   
  })
}
// CreateArticle();

// The following is to operate database file, corelate the article and user collection

// const articleList = await Article.find({});
// const userIdList = userIdExport();
// console.log(userIdList);
// articleList.map((item, key) => {
//   if (key <userIdList.length) {
//     item.editor = userIdList[key]
//   }
//   console.log(item.editor)
//   if (key >= userIdList.length) {
//     if ((key % userIdList.length) === 0) {
//       item.editor= userIdList[0]
//     }else{
//     const i = (key % userIdList.length)-1;
//     item.editor = userIdList[i]}
//   }
// })

// articleList.map( async (item) => {
//   await Article.updateOne({'_id':item['_id']}, {$set :{editor: item.editor}})
// })

// const newArticleList = await Article.find({}).populate('editor');
// console.log(articleList[20])
// console.log(newArticleList[20])

// Following is to insert png or jpg into Article collection

const picArray = [
  '/imgs/1.png',
  '/imgs/2.png',
  '/imgs/3.png',
  '/imgs/4.png',
  '/imgs/5.jpg',
  '/imgs/6.jpg',
  '/imgs/7.jpg',
  '/imgs/8.jpg',
  '/imgs/9.jpg',
  '/imgs/10.jpg',
  '/imgs/11.jpg',
  '/imgs/12.jpg',
  '/imgs/13.jpg'
]
console.log(picArray[0])
const articleList = await Article.find({})
articleList.map((item, key) => {
  if (key <picArray.length) {
    item.address = picArray[key]
  }
  if (key >= picArray.length) {
    if ((key % picArray.length) === 0) {
      item.address= picArray[0]
    }else{
    const i = (key % picArray.length)-1;
    item.address = picArray[i]}
  }
})
console.log(articleList[254])



const DelArticle = async(props) => {
   await Article.findOneAndDelete({ _id: props.id })
}

export { Article, DelArticle, CreateArticle };
  
articleList.map(async (item) => {
  await Article.updateOne({ '_id': item['_id'] }, { $set: { address: item.address } })
})