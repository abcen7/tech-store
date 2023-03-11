declare global {
	namespace Express {
		import { Request } from 'express'
		interface Request {
			userId: string
		}
	}
}
