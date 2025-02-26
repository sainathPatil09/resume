import express from 'express'
import { editUserProfile } from '../controller/user/editUserProfile.js'
import { editMentorProfile } from '../controller/user/editMentorProfile.js'

const router = express.Router()
router.post('/editProfile', editUserProfile)
router.post('/editMentorProfile', editMentorProfile)

export default router;