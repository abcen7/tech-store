import { body } from 'express-validator'

export const productCreateValidation = [
	body('title', 'Enter the title of product').isLength({ min: 3 }).isString(),
	body('amount', 'Enter the amount of product').isNumeric(),
	body('colors', 'Enter the colors of product').optional().isArray(),
	body('sizes', 'Enter the sizes of product').optional().isArray(),
	body('purchases', 'Enter the purchases of product').optional().isNumeric(),
	body('description', 'Enter the description of product').isString(),
	body('tags', 'Enter the tags of product').optional().isArray(),
	body('imagesUrl', 'Enter URL images of product').optional().isArray(),
]

export const productPatchValidation = [
	body('title', 'Enter the title of product').isLength({ min: 3 }).isString(),
	body('amount', 'Enter the amount of product').isNumeric(),
	body('colors', 'Enter the colors of product').optional().isArray(),
	body('sizes', 'Enter the sizes of product').optional().isArray(),
	body('purchases', 'Enter the purchases of product').optional().isNumeric(),
	body('description', 'Enter the description of product').isString(),
	body('tags', 'Enter the tags of product').optional().isArray(),
	body('imagesUrl', 'Enter URL images of product').optional().isArray(),
]
