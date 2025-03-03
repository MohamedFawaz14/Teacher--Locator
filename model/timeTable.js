const mongoose = require('mongoose')
const teacher = require('./teacher')
const { text } = require('body-parser')


const timeTableSchema = new mongoose.Schema({
 teacher:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Teacher'
 },
 day1period1:{
    type:String,
    required : true,
 },
 day1period2:{
    type:String,
    required:true
 },
 day2period1:{
    type:String,
    required:true
 },
 day2period2:{
    type:String,
    required:true
 }
    
})

module.exports = mongoose.model('TimeTable',timeTableSchema)