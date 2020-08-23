import axios from 'axios'
import 'dotenv/config'

const api = axios.create({
    baseURL: 'https://gateway.gr1d.io/sandbox/tecban/produtos/v1',
})

api.defaults.headers['X-Api-Key'] = process.env.LISTA_PRODUTOS_API_KEY

const ListaProduto = {
    async getProdutos() {
        try {
            const response = await api.get('/personal-current-accounts')
            return response.data
        } catch (error) {
            throw error
        }
    }
}

export default ListaProduto