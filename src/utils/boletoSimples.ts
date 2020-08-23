import axios from 'axios'
import 'dotenv/config'
import { customer_zipcode } from '../constants'

interface iCreateBankBillet {
    amount: number,
    expire_at: string,
    description: string,
    customer_person_name: string,
    customer_address: string,
    customer_city_name: string,
    customer_state: string,
    customer_neighborhood: string
}

const api = axios.create({
    baseURL: 'https://boletosimples.com.br/api/v1',
})

api.defaults.headers['X-Api-Key'] = process.env.BOLETO_SIMPLES_API_KEY
api.defaults.headers['User-Agent'] = 'myapp@gmail.com'

const OpenBanking = {
    /* API doenst't work */
    async CreateBankBillet(data: iCreateBankBillet) {
        console.log(process.env.BOLETO_SIMPLES_API_KEY)
        const Data = {
            customer_zipcode,
            amount: data.amount,
            expire_at: data.expire_at,
            description: data.description,
            customer_person_name: data.customer_person_name,
            customer_address: data.customer_address,
            customer_city_name: data.customer_city_name,
            customer_state: data.customer_state,
            customer_neighborhood: data.customer_neighborhood
        }
        try {
            const response = await api.post('/bank_billets', {
                bank_billet: Data
            })
            return response.data
        } catch (error) {
            // console.log(error)
            throw error
        }
    }
}

export default OpenBanking