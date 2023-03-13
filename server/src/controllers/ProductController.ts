import ProductModel from '../models/Product'
import { Request, Response } from 'express'

export const getAll = async (req: Request, res: Response) => {
	try {
		const products = await ProductModel.find().populate('tags')
		res.status(200).json(products)
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't get all products`)
	}
}

export const getOne = async (req: Request, res: Response) => {
	try {
		const productId = req.params.id
		const product = await ProductModel.findById(productId).populate('tags')
		res.status(200).json(product)
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't get product`)
	}
}

export const remove = async (req: Request, res: Response) => {
	try {
		const productId = req.params.id
		await ProductModel.findByIdAndRemove(productId)
		res.status(200).json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't get product`)
	}
}

export const create = async (req: Request, res: Response) => {
	try {
		const doc = new ProductModel({
			title: req.body.title,
			amount: req.body.amount,
			colors: req.body.colors,
			sizes: req.body.sizes,
			purchases: req.body.purchases,
			description: req.body.description,
			tags: req.body.tags,
			imagesUrl: req.body.imagesUrl,
		})

		const product = await doc.save()

		res.status(201).json(product)
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't create a product`)
	}
}

export const update = async (req: Request, res: Response) => {
	try {
		const productId = req.params.id
		await ProductModel.findByIdAndUpdate(productId, {
			title: req.body.title,
			amount: req.body.amount,
			colors: req.body.colors,
			sizes: req.body.sizes,
			purchases: req.body.purchases,
			description: req.body.description,
			tags: req.body.tags,
			imagesUrl: req.body.imagesUrl,
		})
		res.status(200).json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't edit a product`)
	}
}
