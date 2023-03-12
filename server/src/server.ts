import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import { authValidation, registerValidation } from './validations/auth'
import checkAuth from './utils/checkAuth'
import * as UserController from './controllers/UserController'

// Getting .env params
require('dotenv').config()

// Connecting to mongodb
mongoose
	.connect(process.env.MONGO_DB_LINK as string)
	.then(() => {
		console.log('Server has connected to database successfully')
	})
	.catch(err => {
		console.log('Exception in connecting to database >> ', err)
	})

const app: Application = express()
const port = 5000

app.use(express.json())

app.post('/auth/login', authValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.authMe)

app.listen(port, () => {
	console.log('Server running on port >> ' + port)
})
