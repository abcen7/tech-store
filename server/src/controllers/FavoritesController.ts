import UserModel, { IUser } from '../models/User'
import ProductModel from '../models/Product'
import { Request, Response } from 'express'
import { Model, Types } from 'mongoose'

export const create = async (req: Request, res: Response) => {
	try {
		const productId = req.params.productId
		const userId = req.params.userId

		await UserModel.findByIdAndUpdate(userId, {
			$addToSet: {
				favorites: new Types.ObjectId(productId),
			},
		})

		res.status(200).json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't add to favorites`)
	}
}

export const remove = async (req: Request, res: Response) => {
	try {
		const productId = req.params.productId
		const userId = req.params.userId

		await UserModel.findByIdAndUpdate(userId, {
			$pull: {
				favorites: new Types.ObjectId(productId),
			},
		})

		res.status(200).json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't remove from favorites`)
	}
}
