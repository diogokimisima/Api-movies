const { Router } = require("express");
const UsersController = require("../controllers/UsersController")

const userRoutes = Router();

// function myMiddleware(request, response, next) {

//     if(!request.body.isAdmin){
//         return response.json({ message: "user unauthorized" }); 
//     }

//     next();
// }

const usersController = new UsersController();

// userRoutes.use(myMiddleware)
userRoutes.post('/', usersController.create)

module.exports = userRoutes;