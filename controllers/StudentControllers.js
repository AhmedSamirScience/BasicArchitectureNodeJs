const Students= require("../models/StudentModel")
                  
const getAllStudents = (req, res)=> {
    //res.set("Access-Control-Allow-Origin", "*"); el 7war da bta3 el cros w bytla3 kda fe 7war security w link bta3 el video mwgod ahoh -> https://www.youtube.com/watch?time_continue=157&v=nKQCIr2N6ec&embeds_widget_referrer=https%3A%2F%2Fmaharatech.gov.eg%2Fmod%2Fhvp%2Fview.php%3Fid%3D11231%26forceview%3D1&embeds_euri=https%3A%2F%2Fmaharatech.gov.eg%2F&embeds_origin=https%3A%2F%2Fmaharatech.gov.eg&source_ve_path=MjM4NTE&feature=emb_title&ab_channel=MaharaTech-ITIMOOCA
    res.send(Students.fetchAllStudent());
}

const getStudentById = (req, res)=> {
    //let id = req.params.id
    let id = req.id // de atzbtt w el id b2a property fl req yasta mn el middleware el howa esmo (parameter middle ware)
    const std = Students.getStudentById(id)
    
    if(std)
    {
    res.send(std);
    }
    else 
    {
    res.send("We didn't found any students by this id ("+id+")")
    }
}

const validator = require("../util/StudentsValidator")
const createStudent = (req, res)=> {
    let valid = validator(req.body);

    if(valid)
    {
        // req.body.id = Students.length+1;
        // Students.push(req.body);

        let std = new Students(req.body)
        std.saveStudent()
        res.json(req.body)
    }
    else
    {
        res.status(403).send("forbidden")
    }
    
}


const deleteStudent =(req, res)=> {
    let idx = Students.getIfThereIsStudentWithSpecificId(req.params.id)
    if(idx!=-1)
    {
        Students.deleteStudent(idx)
        res.send("One element affected and has been delete Data Of id ("+ idx+")")
    }
    else
    {
        res.send("Student not found")
    }
 }

 const updateStudentById = (req, res)=> {
    let idx = Students.getIfThereIsStudentWithSpecificId(req.params.id)
    if(idx!=-1)
    {
        Students.updateStudentById(req.body, idx)
        // res.json(Students[idx])
        res.send(Students.fetchAllStudent());
    }
    else
    {
        res.send("Student not found... update is not allowed")
    }
 }

module.exports= {getAllStudents, getStudentById,createStudent, deleteStudent, updateStudentById}