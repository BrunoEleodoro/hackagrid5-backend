import axios from 'axios'
import 'dotenv/config'
import { customer_zipcode } from '../constants'


const api = axios.create({
    baseURL: 'HTTPS://gateway.gr1d.io/production/proScore/score/v1',
})

api.defaults.headers['X-Api-Key'] = process.env.MEU_SCORE_API_KEY

const meuScore = {
    async getMeuScore(cpf: string, nascimento: string) {
        nascimento.replace('/', '%2F')
        console.log(nascimento)
        try {
            const response = await api.get(`?tcpfcnpj=${cpf}&tdatnsc=${nascimento}`)
            return response.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default meuScore