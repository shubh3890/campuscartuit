import express from 'express'
import { discoverUser, getUserData, getUserProfiles, updateUserData } from '../controller/UserController.js'
import { protect } from '../middlewares/auth.js'
import { upload } from '../configs/multer.js'
import { getUserRecentMesaages } from '../controller/messageController.js'
const userRouter = express.Router()
userRouter.get('/data', protect ,getUserData)
userRouter.post('/discover', protect ,discoverUser)
userRouter.post('/update', upload.fields([{name:'profile',maxCount:1},{name:'cover',maxCount:1}]) , protect ,updateUserData)
userRouter.post('/profiles',getUserProfiles)
userRouter.get("/recent-messages",protect,getUserRecentMesaages)
export default userRouter