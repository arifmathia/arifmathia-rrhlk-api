import express from "express";

const router = express.Router();
import UserController from "../controllers/UserContorlller";
import verifyToken from "../middlewares/verifyToken";




router.post ("/register", UserController.userRegistration)
router.post ("/login", UserController.userLogin)
router.post ("/quation", UserController.quation)
router.get("/user",UserController.getAllUsers,verifyToken)


export default router