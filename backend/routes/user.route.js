import { login, logout, register, updatdeProfile } from "../controllers/user.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload,updatdeProfile);

export default router;