import { getAllUsers } from "../controllers/adminController";
import { checkAuth } from "../middlewares/verifyToken";
const router = require('express').Router();

router.get('/users', checkAuth, getAllUsers)


export default router