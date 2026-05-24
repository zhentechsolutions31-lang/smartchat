import { Router } from "express";
import { loginUser, registerUser, updateProfile } from "../controllers/auth.controller";

const router = Router();


router.post("/register", registerUser)

router.post("/login", loginUser)

router.put("/update-profile", updateProfile)

export default router;