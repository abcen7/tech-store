import jwt, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { UserRoles } from '../models/User'

export default (
	req: Request & { userId?: string },
	res: Response,
	next: NextFunction
) => {
	const token = (req.headers.authorization || '')
		.replace(/Bearer\s?/, '')
		.trim()
	try {
		if (token) {
			const decoded = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY as string
			) as JwtPayload
			req.userId = decoded._id
			if (decoded.role !== UserRoles.ADMIN) {
				return res.status(403).json({
					message: `This user does not have required permissions`,
				})
			}
		} else {
			res.status(403).json({
				message: `User doesn't has access`,
			})
		}

		next()
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Invalid access token',
		})
	}
}
