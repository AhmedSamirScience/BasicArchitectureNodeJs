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
app.get("/", (req, res)=> {
    console.log("request recieved !!!")
    res.send("this is server response")
});
//#endregion



//#region Request get All Students
const students = [{name: 'Ali', dept:'PD',id:'1'},
                  {name: 'Ahmed', dept:'PS',id:'2'},
                  {name: 'Mohamed', dept:'PD',id:'3'},
                  {name: 'Omar', dept:'PS',id:'4'}];
app.get("/api/Students", (req, res)=> {
    res.send(students);
})
//#endregion

//#region Request get Student by id
const studentById = [{name: 'Ali', dept:'PD',id:'1'},
                  {name: 'Ahmed', dept:'PS',id:'2'},
                  {name: 'Mohamed', dept:'PD',id:'3'},
                  {name: 'Omar', dept:'PS',id:'4'}];
app.get("/api/Students/:id", (req, res)=> {
    let id = req.params.id
    const std = studentById.find((val, idx,arr)=>{return val.id == id})

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

