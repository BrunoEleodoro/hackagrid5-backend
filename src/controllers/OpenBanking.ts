import { Request, Response } from 'express'
import openBanking from '../utils/openBanking'

import { User } from '../database/models'

export class OpenBanking {
    async createConsent(req: Request, res: Response) {
        try {
            // const user = new User({'meudeus': 'mongo'}).save()
            const data = await openBanking.CreateAccountAccessConsent(req.body)
            return res.json(data)
        } catch (error) {
            return res.status(500).json({error})
        }
    }
    async indexAccounts(req: Request, res: Response) {
        try {
            const data = await openBanking.GetAccounts()
            return res.json(data)
        } catch (error) {
            return res.status(500).json({error})
        }
    }
}