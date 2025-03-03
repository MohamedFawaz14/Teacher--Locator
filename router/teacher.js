const express = require('express')
const Teacher = require('../model/teacher')
const TimeTable = require('../model/timeTable')
const router = express.Router()

router.get('/',async(req,res)=>{
    const teachers =  await Teacher.find({})
    const timeTable = await TimeTable.find({})
    
    res.render('teacher/teachers',{teachers:teachers,timeTable:timeTable})
})

router.get('/new',(req,res)=>{
    res.render('teacher/new')
})

router.post('/',(req,res)=>{
    try {
        const name = req.body.name;
        const empId = req.body.empid;
        const type = req.body.type;
        const categories = req.body.categories;
        const dob = req.body.dob;
        
        
        const teacher = new Teacher({name,empId,type,categories,dob})
        teacher.save() 
        res.redirect('/')
    } catch  {
        console.log("Failed to Submit!")
        res.send("Failed to Submit!")
    }
    
})
module.exports = router;