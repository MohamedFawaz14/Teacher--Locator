const mongoose = require('mongoose');
const teacherScheme = new mongoose.Schema({
  name:{
    type:String,
    require : true
  },
  empId:{
    type:String,
    require:true
  },
  type:{
    type:String,
    require:true
  },
  categories:{
    type:String,
    require:true
  },
  dob:{
    type:Date
  }
})

module.exports = mongoose.model('Teacher',teacherScheme)