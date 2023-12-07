const express = require('express')
const Email = require('../model/email')
const { hashPassword, createToken, comparePassword } = require('../authentication/auth')
const { UserModel } = require('../model/UserModel')
const nodemailer = require('nodemailer')

const router = express.Router()

router.post('/save-draft', async (req, res) => {
    try {
        const email = await new Email(req.body)
        res.status(200).send({ message: 'Email Send Successfully' })

    } catch (error) {
        console.log(error)
        res.status(400).send({ message: "Internal Server Error", error: error?.message })
    }
})

router.post('/save', async (req, res) => {
    try {
        const email = await new Email(req.body)

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rajasekarvignesh093@gmail.com',
                pass: 'xacc elgo llit itnq'
            }
        });

        var mailOptions = {
            from: 'vigneshmsho093@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.body
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        email.save()
        res.status(200).send({ message: 'Email Sent Successfully' })

    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })

    }
})


router.post('/sign-in', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({ message: 'Login Successfully', token })
            }
            else {
                res.status(500).send({ message: "Invalid Credential" })
            }
        }
        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exists` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})


router.get('/emails/:type', async (req, res) => {
    try {
        let emails
        if (req.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false })
        } else if (req.params.type === 'bin') {
            emails = await Email.find({ bin: true })
        } else if (req.params.type === 'allmail') {
            emails = await Email.find({})
        } else if (req.params.type === 'inbox') {
            emails = await Email.find({})
        } else {
            emails = await Email.find({ type: req.body.type })
        }
        res.status(200).send({ message: 'Data Fetched Successfully', emails })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

router.put('/toggleStarredEmail', async (req, res) => {
    try {
        let email = await Email.updateOne({ _id: req.body.id })
        res.status(200).send({ message: 'Data Saved Successfully' })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

router.delete('/deleteEmails/:type', async (req, res) => {
    try {
        let email = Email.deleteMany({ _id: req.params.id })
        res.status(200).send({ message: 'Email Deleted Successfully' })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

router.post('/bin', async (req, res) => {
    try {
        let email = await Email.updateMany({ _id: req.body.id })
        res.status(200).send({ message: 'Data moved successfuly' })
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

router.post('/sign-up', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            res.status(500).send({ message: `User with ${req.body.email} already exists` })
        }
        else {
            req.body.password = await hashPassword(req.body.password)
            let user = await UserModel.create(req.body)
            user.save()
            res.status(200).send({ message: "Registered Successfully" })
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message })
    }
})



router.post('/sign-in', async (req, res) => {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            if (await comparePassword(req.body.password, user.password)) {
                let token = await createToken(user)
                res.status(200).send({ message: 'Login Successfully', token })
            }
            else {
                res.status(500).send({ message: "Invalid Credential" })
            }
        }
        else {
            res.status(404).send({ message: `User with ${req.body.email} doesn't exists` })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal Server Error', error: error?.message })
    }
})

module.exports = router