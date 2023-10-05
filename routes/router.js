const express = require('express')
const Email = require('../model/email')

const router = express.Router()

router.post('/save-draft', async (req,res) => {
    try {
        const email = await new Email(req.body)
        email.save()
        res.status(200).send({message:'Email Send Successfully'})

    } catch (error) {
        console.log(error)
        res.status(400).send({message:"Internal Server Error", error: error?.message})
    }
})

router.post('/save', async (req,res) => {
    try {
        const email = await new Email(req.body)
        email.save()
        res.status(200).send({message:'Email Send Successfully'})

    } catch (error) {
        console.log(error)
        res.status(400).send({message:"Internal Server Error", error: error?.message})
    }
})

router.get ('/emails/:type', async (req,res) => {
    try {
       let emails
       if(req.params.type === 'starred'){
        emails = await Email.find({starred: true, bin: false})
       } else if(req.params.type === 'bin'){
        emails = await Email.find({ bin : true})
       } else if(req.params.type === 'allmail'){
        emails = await Email.find({})
       }else if(req.params.type === 'inbox'){
        emails = await Email.find({})
       } else {
        emails = await Email.find({type: req.body.type})
       }
       res.status(200).send({message: 'Data Fetched Successfully', emails})
    } catch (error) {
        res.status(500).send({message:'Internal Server Error', error: error?.message})
    }
})

router.put('/toggleStarredEmail', async (req,res) => {
    try {
        let email = await Email.updateOne({_id: req.body.id})
        res.status(200).send({message: 'Data Saved Successfully'})
    } catch (error) {
        res.status(500).send({message:'Internal Server Error', error: error?.message})
    }
})

router.delete('/deleteEmails/:type', async (req,res) => {
    try {
        let email = Email.deleteMany({_id: req.params.id})
        res.status(200).send({message:'Email Deleted Successfully'})
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'Internal Server Error', error: error?.message})
    }
})

router.post('/bin', async (req,res) => {
    try {
        let email = await Email.updateMany({_id: req.body.id})
        res.status(200).send({message:'Data moved successfuly'})
    } catch (error) {
        res.status(500).send({message:'Internal Server Error', error: error?.message})
    }
})

module.exports = router