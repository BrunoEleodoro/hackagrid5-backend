import axios from 'axios'
import 'dotenv/config'

interface iCreateAccountAccessConsent {
    Data: {
        Permissions: string[]
    },
    Risk: any
}

const api = axios.create({
    baseURL: 'https://gateway.gr1d.io/sandbox/tecban/contas/v1',
})

if (!process.env.ACCOUNT_API_KEY) {
    throw new Error('MISSING API KEY')   
}
api.defaults.headers['X-Api-Key'] = process.env.ACCOUNT_API_KEY

const OpenBanking = {
    async CreateAccountAccessConsent(data: iCreateAccountAccessConsent) {
        try {
            const response = await api.post('/account-access-consents', data)
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    },

    async GetAccounts() {
        try {
            const response = await api.get('/accounts')
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default OpenBanking