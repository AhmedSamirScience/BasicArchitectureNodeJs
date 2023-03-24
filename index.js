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
app.get("/", (req, res)=> {
    console.log("request recieved !!!")
    res.send("this is server response")
})
app.listen(portEnv, ()=>{
    console.log("Listening...!!!"+ portEnv)
});
//#endregion

