let mongo = require("mongoose");
require("dotenv").config();
let atlas_url = process.env.DB_URL;
let db_connect = async function() {
    mongo.connect(atlas_url).then(()=>{
        console.log("Connected to MongoDB Atlas");
    }).catch((e)=>{
        console.log(e);
    })
} 

module.exports = db_connect