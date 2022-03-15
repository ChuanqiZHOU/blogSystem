import mongoose from 'mongoose'


mongoose.connect('mongodb://localhost/blog2').then(() => {
    console.log('database is conecting')
}).catch(() => {
    console.log('database link is broken')
})
