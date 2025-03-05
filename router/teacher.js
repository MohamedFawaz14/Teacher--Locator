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

router.get('/:id/edit',async(req,res)=>{
const teacher = await Teacher.findById(req.params.id)
const timeTable  = await TimeTable.findOne({teacher:teacher._id})

  res.render("teacher/edit",{teacher:teacher,timeTable:timeTable})
})

router.get('/:id/delete',async(req,res)=>{
    const teacher = await Teacher.findById(req.params.id)

    await teacher.deleteOne()
    // res.render("teacher/delete")
    res.redirect('/')
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

router.put('/:id',async(req,res)=>{
 
 try {
     const teacher  = await Teacher.findById(req.params.id)
  teacher.name = req.body.name;
  teacher.empId = req.body.empid;
  teacher.type = req.body.type;
  teacher.categories = req.body.categories;
  teacher.dob = req.body.dob;
 
  const timeTable = await TimeTable.findOne({teacher:teacher._id})

  timeTable.day1period1 = req.body.day1period1;
  timeTable.day1period2 = req.body.day1period2;
  timeTable.day2period1 = req.body.day2period1;
  timeTable.day2period2 = req.body.day2period2;
    

  await Promise.all([teacher.save(), timeTable.save()])
  res.redirect("/teacher")

 } catch (error) {
    console.log("Failed to Edit !",error)
 }
})

module.exports = router;