import { Request, Response } from 'express'

import { User as UserDB } from '../database/models'

export class User {
    async create(req: Request, res: Response) {
        const user = await UserDB.create({
            Name: req.body.Name,
            Identification: req.body.Identification,
            SchemeName: req.body.SchemeName,
            Email: req.body.Email,
            CPF: req.body.CPF,
            Nascimento: req.body.Nascimento
        })
        const Token = `b91daw97g-e7dbawbd0bg_${user._id}`
        return res.status(201).json(Token)
    }

    async login(req: Request, res: Response) {
        const { CPF, Password } = req.body
        try {
            if (Password !== '123456') {
                return res.status(403).json({
                    http_status: 403,
                    message: 'Incorrect password!'
                })
            }
            const user = await UserDB.findOne({ CPF: CPF })
            if (!user) {
                return res.status(404).json({
                    http_status: 404,
                    message: 'Invalid CPF!'
                })
            }

            const Token = `b91daw97g-e7dbawbd0bg_${user._id}`

            return res.json(Token)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}