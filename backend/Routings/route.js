let exp = require("express");
let routes = exp.Router()
let func = require("../Functions/logic")

routes.get("/",func.Home);
routes.post("/reg",func.register_user);
routes.get("/get",func.get_user)
routes.delete("/get/:id",func.delet_record)
routes.put("/get/:id",func.updated_record)


module.exports = routes
