let exp = require("express");
let routes = exp.Router()
let func = require("../Functions/logic")

routes.get("/",func.Home);
routes.post("/reg",func.register_user);
routes.get("/get",func.get_user)


module.exports = routes
