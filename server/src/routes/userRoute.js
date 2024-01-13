import express from 'express'
import { deletePassword, getPasswords, login, savePassword } from '../controller/userController.js'
const userRouter = express.Router()


userRouter.post('/login',login)

userRouter.post('/savePassword',savePassword)

userRouter.get('/getPasswords',getPasswords)

userRouter.put('/deletePassword',deletePassword)

export default userRouter