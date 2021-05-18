const express = require("express");
const ctrlTasks = require("../controllers/tasks")
const ctrlUsers = require("../controllers/admin")

const route  = express.Router();

route.post("/create",ctrlTasks.createTasks)
route.put("/edit/:id",ctrlTasks.update)
route.get("/tasks",ctrlTasks.getAll)
route.get("/sort",ctrlTasks.sort)

route.post("/login",  ctrlUsers.login)

module.exports =  route
