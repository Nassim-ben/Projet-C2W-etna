const express = require('express')
const router = express.Router()
const Users = require('../models/users')

// Create user 
router.post('/', (req, res) => {
    const users = new Users({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    users.save((err, newUsers) => {
        if (!req.body.username || !req.body.password || !req.body.email) {
            return res.status(400).json({message: 'Error. Please enter username, password and email'})
        }if (users.username === req.body.username){
            return res.status(400).json({message: `Error User ${req.body.username} already existing`})
        }else{
            return res.status(201).json({message: `User ${req.body.username} created`})
        }
    })
})

router.get('/', (req, res) => {
    res.render('register/')
})

module.exports = router