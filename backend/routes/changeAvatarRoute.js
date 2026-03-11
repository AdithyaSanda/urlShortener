import express from 'express'
import changeAvatarController from '../controllers/changeAvatarController.js'
import {upload} from "../middleware/multer.js"

const router = express.Router()

router.put('/me', upload.single('avatar'), changeAvatarController)

export default router