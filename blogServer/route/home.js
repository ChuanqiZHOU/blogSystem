
import express from 'express'
import { Article } from '../model/articles.js';
import { Comment } from '../model/comments.js';
import { Editor } from '../model/editor.js';
const home = express.Router();

// home.get('/', async(req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')

//     res.send('hello this is home');
//     // console.log(req.body)
// })

home.get('/cardgroups', async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.query.cardName === 'latest') {
        const cardList = await Article.find({}).limit(9).populate('editor');
        return res.send({ status: 200, cardList: cardList })
    } 
    if (req.query.cardName === 'bias') {
      const cardList = await Article.find({type: req.query.cardName}).limit(4).populate('editor')
      return res.send({ status: 200, cardList: cardList })
    } 
     if (req.query.cardName === 'conspiracy') {
       const cardList = await Article.find({ type: req.query.cardName })
         .limit(5)
         .populate('editor')
       return res.send({ status: 200, cardList: cardList })
     } 
})
 
export {home}