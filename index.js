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
const loggingMiddleWare = require("./middlewares/logging")
app.use(loggingMiddleWare)
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




//#region routes 
const studentsRouter = require("./routes/Students")
app.use("/api/Students",studentsRouter)
//#endregion


//#region get API by query String 
//http://localhost:3000/api/getQueryString?firstQueryString=Ahmed&secondQueryString=1 (URL)
app.get("/api/getQueryString", (req, res)=> {
    res.send("Here are the values you sent in query string request:  ("+req.query.firstQueryString+")"+ " - ("+req.query.secondQueryString+")" );
})
//#endregion


