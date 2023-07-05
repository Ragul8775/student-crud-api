const express = require('express')
const fs = require('fs')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

/*Creating an new student*/
app.post('/students',(req,res)=>{
    const newStudent = req.body;
    const students = JSON.parse(fs.readFileSync('students.json'));// reading the existing student data
    students.push(newStudent);// adding the  new student
    fs.writeFileSync('students.json', JSON.stringify(students))
  
    res.json(newStudent)
  

})
/*Read all students*/
app.get('/students', (req,res)=>{
    const students = JSON.parse(fs.readFileSync('students.json'));

    res.json(students)

})
/*Read student by reg.No*/
app.get('/students/:regNo',(req, res)=>{
    const regNo = req.params.regNo;
    const students = JSON.parse(fs.readFileSync('students.json'));// reading the students file

    const foundStudent = students.find((student) => student.regNo === regNo);//finding  student by rollno
    if (foundStudent) {
        // Return the found student data as a response
        res.json(foundStudent);
      } else {
        // Return an appropriate message if the student is not found
        res.status(404).json({ error: 'Student not found' });
      }

});

/* Update student by regNo*/

app.patch('/students/:regNo/name', (req, res)=>{
    const regNo= req.params.regNo;
    const updatedName = req.body.name;

    const students = JSON.parse(fs.readFileSync('students.json'));
    
    const changeStudent = students.find((student) => student.regNo === regNo);

    if(changeStudent){
        changeStudent.name= updatedName;// updating the name of the student 

        fs.writeFileSync('students.json',JSON.stringify(students));// updating the students to json
        res.json(changeStudent)
        
        
    }
    else{
          res.status(404).json({error:"student not found"});
    }

});

/*Deleting the student*/
app.delete('/students/:regNo', (req,res)=>{
    const regNo = req.params.regNo;

    const students = JSON.parse(fs.readFileSync('students.json'));

    const index = students.findIndex((student)=> student.regNo === regNo)//finding the student by index that roll.no exist

    if(index >-1){
        const deleteStudent = students.splice(index, 1)[0];  //deleting the index which we found
        fs.writeFileSync('students.json', JSON.stringify(students));
        res.json(deleteStudent);
    }else{
        res.status(404).json({error:"student not found"})
    }
})
/* server*/
const PORT =3000;
app.listen(PORT, ()=>{
  console.log(`server running on port :${PORT}`)
  

})