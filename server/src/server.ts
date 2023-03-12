import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose'
import { authValidation, registerValidation } from './validations/auth'
import checkAuth from './utils/checkAuth'

import * as UserController from './controllers/UserController'
import * as ProductController from './controllers/ProductController'
import { productCreateValidation } from './validations/product'

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
const port = 5555

app.use(express.json())

app.post('/auth/login', authValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.authMe)

app.get('/products', checkAuth, ProductController.getAll)
app.get('/products/:id', checkAuth, ProductController.getOne)
app.post(
	'/products',
	checkAuth,
	productCreateValidation,
	ProductController.create
)
app.delete('/products/:id', checkAuth, ProductController.remove)
// app.patch('/products', checkAuth, ProductController.update)

app.listen(port, () => {
	console.log('Server running on port >> ' + port)
})
