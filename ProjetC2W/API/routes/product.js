const express = require('express')
const router = express.Router()
const Products = require('../models/products')
const users = require('../models/users')


//product/create [Post] => créer un produit et l'associe à l'utilisateur connecté

router.post('/create', (req, res) => {
    const products = new Products({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        coverImageName: req.body.coverImageName,
        UserID: req.body.UserID
    })

    products.save((err, newProducts) => {
        if (!req.body.name || !req.body.price || !req.body.description) {
            return res.status(400).json({message: 'Error. Please enter product name, price and description'})
        }if (products.name === req.body.name){
            return res.status(400).json({message: `Error Product ${req.body.name} already existing`})
        }else{
            return res.status(201).json({message: `Product ${req.body.name} created`})
        }
    })
})


//product/ [Put] => modifie les infos d'un produit

router.put("/:id" ,function(req, res){
    Products.findByIdAndUpdate(req.params.id, 
        {name: req.body.name, price: req.body.price, description: req.body.description}, function(err,updatedproduct){
           if (err) {
               res.status(500).send({ message: err });
           } else {
               return res.status(201).json({message: `${req.params.id} has been updated`})
           }
       });
 });

//product/ [Get] => récupère les infos d'un produit

router.get('/:id', (req, res) => {
    Products.findById(req.params.id).exec(function(err, Products) {
		if (err){
            res.status(500).send({ message: err });
        }
		if(!Products){
            return res.status(400).json({message: 'Product not found'})
        }
		return res.status(201).json({message: Products})
	  })
});

//product/ [Delete] => supprime les infos d'un produit

router.delete('/:id', (req, res) => {
    Products.findByIdAndDelete(req.params.id, function (err) {
        if(err){
            return res.status(500).send({ message: err });
        }
        return res.status(201).json({message: `Product has been succesfully deleted `});
      });
});


module.exports = router
