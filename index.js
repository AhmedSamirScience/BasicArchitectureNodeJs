//#region take current running port from the enviroment weather was testing or production
/**
 * khoud balak de bas law 3ayez t3mlha test btsht3'al bas 3ala cmd w msh sh3'ala 3la el terminal
 */ 
const portEnv = process.env.PORT||3000
 //#endregion

//#region express
/**
 * de 7aga 3an el express (simple code) to show how we receive request and send response
 */
const express = require("express");
const app = express();
app.listen(portEnv, ()=>{
    console.log("Listening...!!!"+ portEnv)
});
/**
 * da law 3amal call lel request base bt3na 
 */
app.get("/", (req, res)=> {
    console.log("request recieved !!!")
    res.send("this is server response")
});
//#endregion

//#region built in Middlewares
/**
 * hna ana h3mel el url encoded bas da by2olk 3lshan law htakhoud 7aga mn el website msh fahmha awi bas ana hktbha w a3mlha comment l7ad m3raf leh blzabt
 */
//app.use(express.urlencoded({extended:true}))// w daa b3mlo 3lshan by3ml warning

/**
 * howa hna 3lshan b2a a3mel ajax request mn el postman 3ala 7ad 3elmi fa lazem a3mel el l2ta de 
 */
app.use(express.json())
//#endregion

//#region custom Middleware
/**
 * khoud balak trteb el middlewares mohem awii 3lshan y3adi 3ala kolo 
 */
app.use((req, res, next )=>{
    console.log("Logging....")
    next()
})
//#endregion

//#region route handler Middleware
/**
 * el middleware da 3lshan le ay request get howa ely hy7salo call el awl 3lshan da awl wa7ed fl trteb 
 */
app.get("*", (req,res,nxt)=> {
    console.log("(get) request recieved !!!")
    nxt()
})

/**
 * el middleware da 3lshan le ay request ayan kan howa POST GET DELETE PUT ay 7aga  (y3ni ay request i mean) howa ely hy7salo call el awl 3lshan da awl wa7ed fl trteb brdo
 */
app.all("*", (req,res,nxt)=> {
    console.log("(any) request recieved !!! \n \n")
    nxt()
})
//#endregion

//#region 3rd party Middleware
const helmet = require("helmet")
app.use(helmet())
//#endregion

//#region Request get All Students
//http://localhost:3000/api/Students (URL)

const students = [{name: 'Ali', dept:'PD',id:'1'},
                  {name: 'Ahmed', dept:'PS',id:'2'},
                  {name: 'Mohamed', dept:'PD',id:'3'},
                  {name: 'Omar', dept:'PS',id:'4'}];
app.get("/api/Students", (req, res)=> {
    //res.set("Access-Control-Allow-Origin", "*"); el 7war da bta3 el cros w bytla3 kda fe 7war security w link bta3 el video mwgod ahoh -> https://www.youtube.com/watch?time_continue=157&v=nKQCIr2N6ec&embeds_widget_referrer=https%3A%2F%2Fmaharatech.gov.eg%2Fmod%2Fhvp%2Fview.php%3Fid%3D11231%26forceview%3D1&embeds_euri=https%3A%2F%2Fmaharatech.gov.eg%2F&embeds_origin=https%3A%2F%2Fmaharatech.gov.eg&source_ve_path=MjM4NTE&feature=emb_title&ab_channel=MaharaTech-ITIMOOCA
    res.send(students);
})
//#endregion


//#region paramter Middleware
/**
 * khoud balak el middle ware da ely howa esmo parameter middleware 3lshan law 3ayez t3mel validation aw ay process abl mtrou7
 * lel function el assia bta3t el request nafso 3lshan mtdkhoulsh fe ay hasel mlosh lazma w tzawed time el request bta3 el api
 */
    app.param("id", (req, res,nxt,val )=>{
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

app.get("/api/Students/:id", (req, res)=> {
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

//#region get API by query String 
//http://localhost:3000/api/getQueryString?firstQueryString=Ahmed&secondQueryString=1 (URL)
app.get("/api/getQueryString", (req, res)=> {
    res.send("Here are the values you sent in query string request:  ("+req.query.firstQueryString+")"+ " - ("+req.query.secondQueryString+")" );
})
//#endregion

//#region create new Student POST API

app.post("/api/Students", (req, res)=> {
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

//#region delete  Student 
app.delete("/api/Students/:id", (req, res)=> {
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
app.put("/api/Students/:id", (req, res)=> {
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

//#region validation on the input of the request body
const schema = {
    "type":"object",
    "properties":{
        "name":{
            "type":"string",
            "pattern": "^[A-Z][a-z]*$"
        },
        "dept":{
            "type":"string",
            "enum":["SD", "SA","MD"],
            "maxLength":2, 
            "minLength":2
        }
    }
     ,"required":["name", "dept"]
     ,"maxProperties":2
     ,"minProperties":2
} 
const Ajv = require("ajv")
const ajv = new Ajv()
let validator = ajv.compile(schema)
//#endregion



