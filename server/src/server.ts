import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator/src/validation-result'
import { registerValidation } from './validations/auth'
import UserModel from './models/User'
import User from './models/User'

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

const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
	res.send('Hello, World!')
})

app.post(
	'/auth/register',
	registerValidation,
	async (req: express.Request, res: express.Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}

		const password = req.body.password
		const salt = await bcrypt.genSalt(10)
		const passwordHash = await bcrypt.hash(password, salt)

		const doc = new UserModel({
			email: req.body.email,
			fullName: req.body.fullName,
			avatarUrl: req.body.avatarUrl,
			passwordHash: passwordHash,
		})

		const user = await doc.save()

		res.json(user)
	}
)

app.post('/auth/login', (req, res) => {
	console.log(req.body)
	const token = jwt.sign(
		{
			email: req.body.email,
			fullName: '',
		},
		process.env.JWT_SECRET_KEY as string
	)

	res.json({
		success: true,
		token: token,
	})
})

app.listen(port, () => {
	console.log('Server running on port >> ' + port)
})
