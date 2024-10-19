import express from "express"
import { deleteUser, getAllUsers, logIn, signUp, updateUserById } from "../controllers/user.js"
import { auth } from "../middleware/auth.js";


 const user = express.Router()

 user.route("/").post(auth , signUp).get(getAllUsers);
 user.route("/user").post(logIn ).delete(deleteUser).put(updateUserById)

 export {user}