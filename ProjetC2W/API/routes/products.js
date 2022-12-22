const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const users = require('../models/users')

// /user/ [Get] => ( récupérer les infos de l'utilisateur )

router.get('/', (req, res) => {
  Products.find({}).exec(function(err, Products) {
		if (err){
            res.status(500).send({ message: err });
        }
		if(!Products){
            return res.status(400).json({message: 'Products not found'})
        }
		return res.status(201).json({message: Products})
	  })
})

// /products/ [Get] => récupère tous les produits existants concernant un utilisateur

router.get('/:id', (req, res) => {
  Products.findById(req.params.id)
  .populate('user')
  .exec(function(err, Products) {
		if (err){
            res.status(500).send({ message: err });
        }
		if(!Products){
            return res.status(400).json({message: 'Product not found'})
        }
		return res.status(201).json({message: Products.UserID})
	  })
})
module.exports = router