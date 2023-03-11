import mongoose, { Schema } from 'mongoose'

interface IUser {
	fullName: string
	email: string
	passwordHash: string
	avatarUrl?: string
}

const UserSchema: Schema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		avatarUrl: String,
	},
	{
		timestamps: true,
	}
)

export default mongoose.model('User', UserSchema)<IUser>
