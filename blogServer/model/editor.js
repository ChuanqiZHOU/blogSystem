import mongoose from 'mongoose'
// import { editorArrayBuild } from './comments.js'
const editorSchema = new mongoose.Schema({
    editorId: {
        type: Number
    },
    pay: {
        type:String
    },
    editor: {
        type: String
    }
})

const Editor = mongoose.model('Editor', editorSchema)

// const editorList = editorArrayBuild();
    // JSON.parse(editorArrayBuild());
// console.log(editorList);
// console.log(editorList.length)

const editorFull = await Editor.find({});
// console.log(editorFull);

// editorFull.map((item, key) => {
//     if (key < editorList.length) {
//         item.editor = editorList[key]
//     }
//     if (key >= editorList.length) {
//         const i = key % editorList.length;
//         item.editor = editorList[i]
//     }
// });


// editorFull.map(async(item) => {
//    await Editor.updateOne({"_id": item['_id']}, {$set:{editor: item.editor}})
// })



// Editor.create({
//     editorId: "123456"
// });

//Editor.updateMany({}, { $unset: editorFull  }, { multi: true }, function (err, data) { });

export {Editor}