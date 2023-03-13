import TagModel from '../models/Tag'
import { Request, Response } from 'express'

export const getAll = async (req: Request, res: Response) => {
	try {
		const tags = await TagModel.find()
		res.status(200).json(tags)
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't get all tags`)
	}
}

export const remove = async (req: Request, res: Response) => {
	try {
		const tagId = req.params.id
		await TagModel.findByIdAndRemove(tagId)
		res.status(200).json({
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't remove the tag`)
	}
}

export const create = async (req: Request, res: Response) => {
	try {
		const doc = new TagModel({
			title: req.body.title,
		})
		const tag = await doc.save()
		res.status(201).json(tag)
	} catch (err) {
		console.log(err)
		res.status(500).json(`Can't create the tag`)
	}
}
