const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const { checkAuth, isAdmin } = require('../middleware/checkAuth')

// /user/id [Put] => ( modification d'un utilisateur )
router.put("/:id" , checkAuth, function(req, res){
    Users.findByIdAndUpdate(req.params.id, 
     {username: req.body.username}, function(err,updateduser){
        if (err) {
            res.status(500).send({ message: err });
        } else {
            return res.status(201).json({message: `${req.params.id} has been updated`})
        }
    });
    // autre methode qui marche :
    /* Users.findByIdAndUpdate(req.params.id, {username: req.body.username}, {
        new: true
      }, (err, user) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            return res.status(201).json({message: `${req.params.id} has been updated`})
        }
      }) */
 });

// /user/id [Get] => ( récupérer les infos de l'utilisateur )
router.get('/:id', (req, res) => {
    Users.findById(req.params.id).exec(function(err, Users) {
		if (err){
            res.status(500).send({ message: err });
        }
		if(!Users){
            return res.status(400).json({message: 'User not found'})
        }
		return res.status(201).json({message: Users})
	  })
})

// /user/id [Delete] => ( suppréssion d'un utilisateur )
router.delete('/:id', (req, res) => {
    Users.findByIdAndDelete(req.params.id, function (err) {
        if(err){
            return res.status(500).send({ message: err });
        }
        return res.status(201).json({message: `User has been succesfully deleted `});
      });
})


module.exports = router