const mongoose = require('mongoose');



const postSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        content: {
            type: String
        },
        contentType:{
            type: Number,
            enum: [0, 1, 2], //0 for text, 1 for image , 2 for video
            default: 0
        },
        publisher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {timestamps: true}
);


module.exports = mongoose.model('Post', postSchema);