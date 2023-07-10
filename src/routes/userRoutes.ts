import { profile, updateProfile } from "../controllers/userController";
import { upload } from "../middlewares/fileUpload";
import {checkAuth} from "../middlewares/verifyToken"
const router = require("express").Router();

router.get("/profile", checkAuth, profile);
router.patch('/update', checkAuth, upload, updateProfile)

export default router;
