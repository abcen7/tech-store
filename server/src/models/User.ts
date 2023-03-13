import { Schema, model, Types } from 'mongoose'

export interface IUser {
	fullName: string
	email: string
	passwordHash: string
	avatarUrl?: string
	favorites?: Array<Types.ObjectId>
}

const UserSchema: Schema = new Schema<IUser>(
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
		favorites: {
			type: Array<Schema.Types.ObjectId>,
			ref: 'Product',
			default: [],
		},
	},
	{
		timestamps: true,
	}
)

export default model('User', UserSchema)<IUser>
