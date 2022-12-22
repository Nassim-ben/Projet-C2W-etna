if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const registerRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const meRouter = require('./routes/me')
const userRouter = require('./routes/user')


const productRouter = require('./routes/product')
const productsRouter = require('./routes/products')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))


const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/me', meRouter)
app.use('/user/', userRouter)

app.use('/product', productRouter)
app.use('/products', productsRouter)

app.listen(process.env.PORT || 3000)