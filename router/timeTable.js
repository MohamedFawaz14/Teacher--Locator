const express = require('express')
const router = express.Router()
const Teacher = require('../model/teacher')
const TimeTable = require('../model/timeTable')
router.get('/new',async(req,res)=>
{
    const teachers = await Teacher.find({})
    
    res.render('timeTable/timeTable',{
        teachers : teachers
    })
})

router.post('/',async(req,res)=>{
    try {
        const teacher = req.body.teacher;
        const day1period1 = req.body.day1Period1;
        const day1period2 = req.body.day1period2;
        const day2period1 = req.body.day2Period1;
        const day2period2 = req.body.day2period2;

        const timeTable = await TimeTable(
        {teacher,day1period1,day1period2,day2period1,day2period2})
     
        timeTable.save();
        res.redirect('/')
    } catch {
        console.log("Failed to Submit Time Table.")
    }
   
})
module.exports =router


