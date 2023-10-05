const mongoose = require('mongoose')

const EmailSchema = mongoose.Schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    subject:{ 
        type: String,
        required: true
    },
    body: {
        type:String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    starred: {
        type: Boolean,
        required: true,
        default: false
    },
    bin: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true,
    }
}, {collection: 'emails', versionKey: false})

const Email = mongoose.model('emails', EmailSchema);

module.exports = Email