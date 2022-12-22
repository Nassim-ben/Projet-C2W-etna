const Users = require('../models/users')

const checkAuth = (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
        // Remove Bearer from string
        token = token.slice(7);
        next()
    } else {
        return res.status(400).json({message: 'You are not authorized to view this page'})
    }
  }

  const isAdmin = (req, res, next) => {
    if(Users.isAdmin === false){
        return res.status(400).json({message: 'You are not authorized to view this page'})
    }else{
        next()
    }

  }
module.exports = { checkAuth }
