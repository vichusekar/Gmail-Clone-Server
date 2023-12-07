const mongoose = require('mongoose')

function ValidateEmail (e) {
    let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    return EmailPattern.test(e)
}

function ValidatePassword (e) {
    let passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return passwordPattern.test(e)
}

let userSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, validator: {validate: ValidateEmail, message: "Enter valid email"} },

    password: { type: String, required: true, validator: {validate: ValidatePassword, message: "Enter valid password"}  }

}, { collection: 'users', versionKey: false })

let UserModel = mongoose.model('users', userSchema)

module.exports = { UserModel }