let express = require("express");

let Router = express.Router();

let UserController = require("../app/Controllers/UserController");

Router.post("/register", UserController.register);
Router.post("/login", UserController.login);

module.exports = Router;
