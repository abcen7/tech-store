import { body } from 'express-validator'

export const tagCreateValidation = [
	body('title', 'Enter the title of product').isLength({ min: 3 }).isString(),
]
