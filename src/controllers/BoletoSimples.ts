import { Request, Response } from 'express'
import boletoSimples from '../utils/boletoSimples'

export class BoletoSimples {
    async create(req: Request, res: Response) {
        const {
            amount,
            expire_at,
            description,
            customer_person_name,
            customer_address,
            customer_city_name,
            customer_state,
            customer_neighborhood
        } = req.body
        try {
            const data = await boletoSimples.CreateBankBillet({
                amount,
                expire_at,
                description,
                customer_person_name,
                customer_address,
                customer_city_name,
                customer_state,
                customer_neighborhood
            })
            return res.json(data)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}