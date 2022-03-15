import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    //editor id
    eid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User" 
    },
    //article id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Article'
    },
    updateDate: {
        type: Date,
        default: Date.now()
    }
})

const Comment = mongoose.model("Comment", commentSchema)

// Comment.create({
//   content: 'This is the first comments',
//   editor: '61fca5b5f033fd3f395ad716',
// })
// const all = await Comment.find({});
// console.log(all);
// const editorArray = [];
// const editorArrayString = [];
// const editorArrayStringPre = [];

// const editorArrayBuild = () => {
//     all.map((item,key) => {
//         editorArray.push(item['_id']);
//     })
    // console.log(editorArray);
//    editorArray.map(item => {
//         editorArrayStringPre.push(item)
    //    editorArrayString.push(JSON.stringify(item))
    //     editorArrayString.push(item)
    // })
    // console.log(editorArrayString)
//     return ( editorArrayString)
// }

// editorArrayBuild()
// const cursor = Comment.find().cursor()

// for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//   console.log(doc)
// }
// Comment.update({}, {$set: {name: "haha"}});

const CreateComments = async(props) => {
    await Comment.create({
    content: props.content,
        aid: props.aid,
        eid: props.eid,
        updateDate: props.updateDate
    })
}

export {Comment, CreateComments}