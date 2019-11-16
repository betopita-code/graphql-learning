import mongoose from 'mongoose'

let uploadSchema = new mongoose.Schema({

  filename: { type: String, required: [true, 'The filename is required'] },

  mimetype: { type: String, required: [true, 'The mimetype is required'] },

  path: { type: String, required: [true, 'The path is required'] }
})

export default mongoose.model('uploads', uploadSchema)
