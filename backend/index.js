let exp = require("express");
require("dotenv").config();
let r = require("./Routings/route");
let db = require("./Db")
let c = require("cors")
let collection = require("./Collections/user")
let myapp = exp();
let port = process.env.PORT || 7062;

myapp.use(c());
myapp.use(exp.json());
myapp.use("/web/",r);

let sending_data = async function () {
    try{
        collection.create({
            name: "Ammar",
            email: "ammar@gmail.com",
            password: "123456",
            age: 22
        })
        console.log("Data Inserted")
    } catch(e) {
        console.log(e)
}
}

db().then(()=>{
    // sending_data();
    myapp.listen(port,()=>{
        console.log(`Server Is Running On http://localhost:${port}/web`)
    })
}).catch((e)=>{
    console.log(e)
})