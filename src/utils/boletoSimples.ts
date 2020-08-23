import axios from 'axios'
import 'dotenv/config'

interface iCreateBankBillet {
    amount: number,
    expire_at: string,
    description: string,
    customer_person_name: string,
    customer_zipcode: string,
    customer_address: string,
    customer_city_name: string,
    customer_state: string,
    customer_neighborhood: string
}

const api = axios.create({
    baseURL: 'https://boletosimples.com.br/api/v1',
})

api.defaults.headers['X-Api-Key'] = process.env.BOLETO_SIMPLES_API_KEY
api.defaults.headers['User-Agent'] = 'email?' // puts a email ?

const OpenBanking = {
    /* Not implemented at all */
    async CreateBankBillet(data: iCreateBankBillet) {
        try {
            const response = await api.post('/bank_billets', {
                bank_billet: data
            })
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default OpenBanking