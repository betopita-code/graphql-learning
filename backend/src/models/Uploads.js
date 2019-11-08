import mongoose from 'mongoose'

// let Schema = moongoose.Schema;

let uploadSchema =  new mongoose.Schema({
    filename: {
        type: String,
        required: [true, 'The filename is necessary']
    },
    mimetype: {
        type: String,
        required: [true, 'The mimetype is necessary']
    },
    path: {
        type: String,
        required: [true, 'The path is necessary']
    }
})

export default mongoose.model('uploads', uploadSchema)
