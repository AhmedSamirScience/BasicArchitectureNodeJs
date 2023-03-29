const students = [{name: 'Ali', dept:'PD',id:'1'},
                  {name: 'Ahmed', dept:'PS',id:'2'},
                  {name: 'Mohamed', dept:'PD',id:'3'},
                  {name: 'Omar', dept:'PS',id:'4'}];
                  
const getAllStudents = (req, res)=> {
    //res.set("Access-Control-Allow-Origin", "*"); el 7war da bta3 el cros w bytla3 kda fe 7war security w link bta3 el video mwgod ahoh -> https://www.youtube.com/watch?time_continue=157&v=nKQCIr2N6ec&embeds_widget_referrer=https%3A%2F%2Fmaharatech.gov.eg%2Fmod%2Fhvp%2Fview.php%3Fid%3D11231%26forceview%3D1&embeds_euri=https%3A%2F%2Fmaharatech.gov.eg%2F&embeds_origin=https%3A%2F%2Fmaharatech.gov.eg&source_ve_path=MjM4NTE&feature=emb_title&ab_channel=MaharaTech-ITIMOOCA
    res.send(students);
}

const getStudentById = (req, res)=> {
    //let id = req.params.id
    let id = req.id // de atzbtt w el id b2a property fl req yasta mn el middleware el howa esmo (parameter middle ware)
    const std = students.find((val, idx,arr)=>{return val.id == id})
    
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
        req.body.id = students.length+1;
        students.push(req.body);
        res.json(req.body)
    }
    else
    {
        res.status(403).send("forbidden")
    }
    
}


const deleteStudent =(req, res)=> {
    let idx = students.findIndex((val => {return val.id== req.params.id}))
    if(idx!=-1)
    {
        let deleteStd = students.splice(idx, 1);
        res.send("One element affected")
    }
    else
    {
        res.send("Student not found")
    }
 }

 const updateStudentById = (req, res)=> {
    let idx = students.findIndex((val => {return val.id== req.params.id}))
    if(idx!=-1)
    {
        for (i in req.body)
        {
            students[idx][i]= req.body[i]
        }
        res.json(students[idx])
    }
    else
    {
        res.send("Student not found... update is not allowed")
    }
 }

module.exports= {getAllStudents, getStudentById,createStudent, deleteStudent, updateStudentById}