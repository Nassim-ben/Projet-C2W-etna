const express = require('express')
const router = express.Router()
const Users = require('../models/users')

// ALL users Route
router.get('/', (req, res) => {
	Users.find({}).exec(function(err, Users) {
		if (err){
            res.status(500).send({ message: err });
        }
		if(!Users){
            return res.status(400).json({message: 'User not found'})
        }
		return res.status(201).json({message: Users})
	  })
	})

module.exports = router