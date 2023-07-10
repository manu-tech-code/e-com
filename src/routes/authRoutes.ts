import { register, login, logout } from "../controllers/authController";
import { checkAuth } from "../middlewares/verifyToken";
const router = require('express').Router();

router.post('/register', register)
router.post('/login', login)
router.post('/logout', checkAuth ,logout)

export default router