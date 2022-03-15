import express from 'express'
import { Article } from '../model/articles.js'
import { User } from '../model/user.js';
import { CreateComments, Comment } from '../model/comments.js';
const articled = express.Router();

articled.get('/', async (req, res) => {
  const { id } = req.query
  const articleFinding = await Article.findOne({ _id: id })
    .populate('editor')
    .lean()
  // console.log(articleFinding)
  return res.send({ status: 200, articleD: articleFinding })
})

articled.post('/comment', express.json(), async (req, res) => {
    const { token, aid, content } = req.body.data;
    const userResult = await User.findOne({ userCode: token });
    const uid = userResult['_id'];
    const props = { eid: uid, aid: aid, content: content }
    await CreateComments(props);
    const commentResult = await Comment.find({ aid }).sort({ updateDate: -1 });
    if (commentResult) {
        res.send({ status: 200 })
    }
})

articled.get('/commentall', async (req, res) => {
  const { id } = req.query
  const commentAll = await Comment.find({'aid': id}).sort({ updateDate: -1 }).populate('aid').populate('eid').exec();
    res.send({status:200, comment: commentAll})
})

export {articled}