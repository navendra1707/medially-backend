import express from "express"
import { doctorLogin, login, register } from "../controllers/User.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/doctor-login', doctorLogin);

export default router;