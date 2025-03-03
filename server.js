require('dotenv').config()

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./router/index')
const teacherRouter = require('./router/teacher')
const timeTable = require('./router/timeTable')
const bodyParser = require('body-parser')


app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit : '10mb',extended :false}))


const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/teacher")
.then(()=>console.log("connected to mongodb"))
.catch(()=>console.log("Failed to connect mongodb"))

const db = mongoose.connection
db.on('error', (error) => console.error('Database Error:', error));


app.use('/',indexRouter)
app.use('/teacher',teacherRouter)
app.use('/timeTable',timeTable)
app.listen(3000);


