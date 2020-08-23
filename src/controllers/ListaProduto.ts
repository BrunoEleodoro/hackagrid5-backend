import { Request, Response } from 'express'
import listaProduto from '../utils/ListaProduto'

export class ListaProduto {
    async index(req: Request, res: Response) {
        try {
            const data = await listaProduto.getProdutos()
            return res.json(data)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}