import { Schema, model } from 'mongoose'

const TagSchema: Schema = new Schema({
	title: {
		type: String,
		unique: true,
		required: true,
	},
})

export default model('Tag', TagSchema)
