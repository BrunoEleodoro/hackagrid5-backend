import { Request, Response, NextFunction } from 'express'
import {} from 'express-serve-static-core'

declare module 'express-serve-static-core' {
    interface Request {
        user_id: string
    }
}

export default function Auth(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization
    if (!auth) {
        return res.status(401).json({
            http_status: 401,
            message: 'Unauthorized!'
        })
    }
    const [, user_id] = auth.split('_')
    req.user_id =  user_id
    next()
}
