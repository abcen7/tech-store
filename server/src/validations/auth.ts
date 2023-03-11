import { body } from 'express-validator'

export const registerValidation = [
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
	body('fullName').isLength({ min: 3 }),
	body('avatarUrl').optional().isURL(),
]

export const authValidation = [
	body('email').isEmail(),
	body('password').isLength({ min: 5 }),
]
