import express, { Application } from 'express'
import mongoose from 'mongoose'

import { authValidation, registerValidation } from './validations/auth'
import checkAuth from './utils/checkAuth'
import { productCreateValidation } from './validations/product'
import { tagCreateValidation } from './validations/tag'

import * as UserController from './controllers/UserController'
import * as ProductController from './controllers/ProductController'
import * as TagController from './controllers/TagController'
import * as FavoritesController from './controllers/FavoritesController'

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
app.patch('/products/:id', checkAuth, ProductController.update)

app.post('/favorites/:userId/:productId', checkAuth, FavoritesController.create)
app.delete(
	'/favorites/:userId/:productId',
	checkAuth,
	FavoritesController.remove
)

app.get('/tags', checkAuth, TagController.getAll)
app.post('/tags', checkAuth, tagCreateValidation, TagController.create)
app.delete('/tags/:id', checkAuth, TagController.remove)

app.listen(port, () => {
	console.log('Server running on port >> ' + port)
})
