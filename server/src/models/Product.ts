import mongoose, { Schema } from 'mongoose'

const ProductSchema: Schema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		colors: {
			type: Array<String>,
			required: true,
			default: [],
		},
		sizes: {
			type: Array<Number>,
			default: [],
		},
		purchases: {
			type: Number,
			default: 0,
		},
		description: {
			type: String,
			required: true,
		},
		tags: {
			type: Array<String>,
			default: [],
		},
		imagesUrl: {
			type: Array<String>,
			default: [],
		},
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('Product', ProductSchema)
