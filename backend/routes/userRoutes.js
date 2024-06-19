import express from 'express'
import { createUser, loginUser, logoutUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post("/signup",createUser)
router.post("/signin",loginUser)
router.get("/signout",logoutUser)


export default router