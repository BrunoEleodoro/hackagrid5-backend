import axios from 'axios'
import 'dotenv/config'
import { EndToEndIdentification, InstructionIdentification } from '../constants'

interface iAccountConsent {
    DebtorAccount: {
        SchemeName: string,
        Identification: string,
        Name: string
    },
    Amount: string,
    Currency?: string
}

interface iAccountPayment extends iAccountConsent {
    ConsentId: string,
    CreditorAccount: {
        SchemeName: string,
        Identification: string,
        Name: string
    }
}

const api = axios.create({
    baseURL: 'https://gateway.gr1d.io/sandbox/tecban/pagamentos/v1',
})

api.defaults.headers['X-Api-Key'] = process.env.PAYMENT_API_KEY

const IniciacaoPagamento = {
    async CreatePaymentConsentID(data: iAccountConsent) {
        const Body = {
            Data: {
                Initiation: {
                    InstructionIdentification,
                    EndToEndIdentification,
                    InstructedAmount: {
                        Amount: data.Amount,
                        Currency: data.Currency || 'BRL'
                    },
                    DebtorAccount: data.DebtorAccount
                }
            },
            Risk: {}
        }
        console.log(Body.Data.Initiation)
        try {
            const { data } = await api.post(
                '/open-banking/v3.1/pisp/domestic-payment-consents',
                Body
            )
            return data.Data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    async CreatePayment(data: iAccountPayment) {
        const Body = {
            Data: {
                ConsentId: data.ConsentId,
                Initiation: {
                    InstructionIdentification,
                    EndToEndIdentification,
                    InstructedAmount: {
                        Amount: data.Amount,
                        Currency: data.Currency || 'BRL'
                    },
                    DebtorAccount: data.DebtorAccount,
                    CreditorAccount: data.CreditorAccount
                }
            },
            Risk: {}
        }
        console.log({Body: Body.Data.Initiation})
        try {
            const { data } = await api.post(
                '/open-banking/v3.1/pisp/domestic-payments', 
                Body
            )
            return data
        } catch (error) {
            throw error
        }
    }
}

export default IniciacaoPagamento