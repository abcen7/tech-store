import express, { Application, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { validationResult } from 'express-validator/src/validation-result'
import { authValidation, registerValidation } from './validations/auth'
import UserModel from './models/User'
import User from './models/User'
import checkAuth from './utils/checkAuth'

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

app.post('/auth/login', authValidation, async (req: Request, res: Response) => {
	try {
		const user = await UserModel.findOne({
			email: req.body.email,
		})

		if (!user) {
			return res.status(404).json({
				message: `User wasn't found`,
			})
		}

		const isUserValid = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		)

		if (!isUserValid) {
			return res.status(404).json({
				message: `Login or password are invalid`,
			})
		}

		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.JWT_SECRET_KEY as string,
			{
				expiresIn: '30d',
			}
		)

		const { passwordHash, ...userData } = user._doc

		res.status(200).json({
			...userData,
			token,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: `Can't authorize a user`,
		})
	}
})

app.post(
	'/auth/register',
	registerValidation,
	async (req: Request, res: Response) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res.status(400).json(errors.array())
			}

			const password = req.body.password
			const salt = await bcrypt.genSalt(10)
			const hash = await bcrypt.hash(password, salt)

			const doc = new UserModel({
				email: req.body.email,
				fullName: req.body.fullName,
				avatarUrl: req.body.avatarUrl,
				passwordHash: hash,
			})

			const user = await doc.save()
			const token = jwt.sign(
				{
					_id: user._id,
				},
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '30d',
				}
			)

			const { passwordHash, ...userData } = user._doc

			res.status(200).json({
				...userData,
				token,
			})
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Can`t register a user',
			})
		}
	}
)

app.get(
	'/auth/me',
	checkAuth,
	async (req: Request & { userId?: string }, res: Response) => {
		try {
			const user = await UserModel.findById(req.userId)

			if (!user) {
				res.status(404).json({
					message: `User wasn't found`,
				})
			}

			const { passwordHash, ...userData } = user?._doc

			const token = jwt.sign(
				{
					_id: user?._id,
				},
				process.env.JWT_SECRET_KEY as string,
				{
					expiresIn: '30d',
				}
			)

			res.status(200).json({
				...userData,
				token,
			})
		} catch (err) {
			console.log(err)
			res.status(500).json({
				message: 'Can`t get a user',
			})
		}
	}
)

app.listen(port, () => {
	console.log('Server running on port >> ' + port)
})
