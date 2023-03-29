const express = require("express")
const router = express.Router()






//#region Request get All Students
//http://localhost:3000/api/Students (URL)

const students = [{name: 'Ali', dept:'PD',id:'1'},
                  {name: 'Ahmed', dept:'PS',id:'2'},
                  {name: 'Mohamed', dept:'PD',id:'3'},
                  {name: 'Omar', dept:'PS',id:'4'}];
router.get("/", (req, res)=> {
    //res.set("Access-Control-Allow-Origin", "*"); el 7war da bta3 el cros w bytla3 kda fe 7war security w link bta3 el video mwgod ahoh -> https://www.youtube.com/watch?time_continue=157&v=nKQCIr2N6ec&embeds_widget_referrer=https%3A%2F%2Fmaharatech.gov.eg%2Fmod%2Fhvp%2Fview.php%3Fid%3D11231%26forceview%3D1&embeds_euri=https%3A%2F%2Fmaharatech.gov.eg%2F&embeds_origin=https%3A%2F%2Fmaharatech.gov.eg&source_ve_path=MjM4NTE&feature=emb_title&ab_channel=MaharaTech-ITIMOOCA
    res.send(students);
})
//#endregion



//#region paramter Middleware
/**
 * khoud balak el middle ware da ely howa esmo parameter middleware 3lshan law 3ayez t3mel validation aw ay process abl mtrou7
 * lel function el assia bta3t el request nafso 3lshan mtdkhoulsh fe ay hasel mlosh lazma w tzawed time el request bta3 el api
 */
router.param("id", (req, res,nxt,val )=>{
    //validation of paramter

    //req.params.id momken tshel el val w t7out el line da howa howa 3ade 
    if(Number(val))
    {
        //add param as prop for req
        req.id = val
        
        nxt()
    } 
    else 
    {
        res.send("invalide id")

    }
})
//#endregion

//#region Request get Student by id using route paramters
//http://localhost:3000/api/Students/2 (URL)

router.get("/:id", (req, res)=> {
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
})
//#endregion

//#region delete  Student 
router.delete("/:id", (req, res)=> {
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
 })
//#endregion

//#region put  Student 
router.put("/:id", (req, res)=> {
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
 })
//#endregion





//#region create new Student POST API
const validator = require("../util/StudentsValidator")
router.post("/", (req, res)=> {
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
    
})
//#endregion



module.exports= router

