
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
module.exports = ajv.compile(schema)
//#endregion


