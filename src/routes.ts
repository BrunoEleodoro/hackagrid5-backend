import { Router } from 'express'
import { OpenBanking } from './controllers/OpenBanking'
import { IniciacaoPagamento } from './controllers/iniciacaoPagamento'
import { User } from './controllers/User'
import Auth from './middlewares/auth'

const routes = Router()
const user = new User()
const openBanking = new OpenBanking()
const iniciacaoPagamento = new IniciacaoPagamento()

/* User */
routes.post('/create_user', user.create)
routes.post('/login', user.login)

/* Auth */
routes.use(Auth)

/* Open Banking */
routes.post('/create-account-consent', openBanking.createConsent)
routes.get('/get-accounts', openBanking.indexAccounts)

/* Iniciação Pagamento */
routes.post('/create-payment', iniciacaoPagamento.create)

export default routes