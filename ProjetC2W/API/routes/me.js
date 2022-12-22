const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const extractBearerToken = headerValue => {
    if(typeof headerValue !== 'string'){
        return false
    }
    const matches = headerValue.match(/(Bearer)\s+(\S+)/i)
    return matches && matches[2]
}

const checkTockenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    if (!token){
        return res.status(401).json({message: 'Error. Need a Token'})
    }
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if(err){
            res.status(401).json({message: 'Error. Bad Token'})
        }else{
            return next()
        }
    })
}

router.get('/', checkTockenMiddleware, (req, res) => {
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    const decoded = jwt.decode(token, {complete: false})

    return res.json({ content: decoded })

})



module.exports = router