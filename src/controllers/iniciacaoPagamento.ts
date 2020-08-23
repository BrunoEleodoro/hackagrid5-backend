import { Request, Response } from 'express'
import iniciacaoPagamento from '../utils/iniciacaoPagamento'
// new file
import { User } from '../database/models/User'

export class IniciacaoPagamento {
    async create(req: Request, res: Response) {
        const {
            currency,
            amount,
            debtor_user_email
        } = req.body
        try {
            const DebtorUser = await User.findOne({ Email: debtor_user_email })
            if (!DebtorUser) {
                return res.status(400).json({
                    http_status: 400,
                    message: `Debtor User don't registered`
                })
            }

            const CreditorUser = await User.findOne({ _id: req.user_id })
            if (!CreditorUser) {
                return res.status(400).json({
                    http_status: 400,
                    message: `Creditor User don't registered`
                })
            }

            const paymentCredentials = {
                CreditorAccount: {
                    Identification: CreditorUser.Identification,
                    Name: CreditorUser.Name,
                    SchemeName: CreditorUser.SchemeName
                },
                Amount: amount,
                Currency: currency,
            }

            const { ConsentId } = await iniciacaoPagamento.CreatePaymentConsentID({
                ...paymentCredentials
            })

            const data = await iniciacaoPagamento.CreatePayment({
                DebtorAccount: {
                    Identification: DebtorUser.Identification,
                    Name: DebtorUser.Name,
                    SchemeName: DebtorUser.SchemeName
                },
                ...paymentCredentials,
                ConsentId
            })

            const DebtorNome = DebtorUser.Name.split(' ')[0]
            const CreditorNome = CreditorUser.Name.split(' ')[0]
            data.Data.message = `${DebtorNome}, pagou ${amount} para você. (${CreditorNome})`

            return res.json(data)
        } catch (error) {
            return res.status(500).json({ error })
        }
    }
}