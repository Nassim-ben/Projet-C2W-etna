const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcrypt")
const SECRET = process.env.SECRET

router.post('/', (req, res) => {
    Users.findOne({ username: req.body.username}).exec ((err, Users) => {
        if (err){
            res.status(500).send({ message: err });
        }
        if(!Users){
            return res.status(400).json({message: 'User not found'})
        }
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({message: 'Error. Please enter username, password'})
        }
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            Users.password
          );
          if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid Password!" });
          }
        const token = jwt.sign({
            id: Users.id,
            username: Users.username
        }, SECRET,{ expiresIn : '2 hours'})
      
        return res.json({access_token: token})
    });
})

module.exports = router
