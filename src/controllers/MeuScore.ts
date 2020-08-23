import { Request, Response } from 'express'
import meuScore from '../utils/meuScore'
import { User } from '../database/models'

export class MeuScore {
    async show(req: Request, res: Response) {
        try {
            const user = await User.findOne({ _id: req.user_id })
            if (!user) {
                return res.status(500).json({
                    http_status: 500,
                    message: 'Invalid token'
                })
            }
            const data = await meuScore.getMeuScore(user.CPF, user.Nascimento)
            return res.json(data)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}