const express = require("express")
const router = express.Router()
const studentControllers = require("../controllers/StudentControllers")


//#region Request get All Students
//http://localhost:3000/api/Students (URL)
router.get("/",studentControllers.getAllStudents )
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
router.get("/:id", studentControllers.getStudentById)
//#endregion

//#region delete  Student 
router.delete("/:id", studentControllers.deleteStudent)
//#endregion

//#region put  Student 
router.put("/:id",studentControllers.updateStudentById)
//#endregion


//#region create new Student POST API
router.post("/", studentControllers.createStudent)
//#endregion

module.exports= router

