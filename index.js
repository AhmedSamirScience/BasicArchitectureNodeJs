const express = require("express");
const app = express();

app.get("/", (req, res)=> {
    console.log("request recieved !!!")
    res.send("this is server response")
})

app.listen(3000, ()=>{
    console.log("Listening...!!!")
});

