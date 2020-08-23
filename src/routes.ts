import { Router } from 'express'
import { User } from './controllers/User'
import Auth from './middlewares/auth'

/* Controllers */
import { OpenBanking } from './controllers/OpenBanking'
import { IniciacaoPagamento } from './controllers/IniciacaoPagamento'
import { BoletoSimples } from './controllers/BoletoSimples'
import { MeuScore } from './controllers/MeuScore'
import { ListaProduto } from './controllers/ListaProduto'

const routes = Router()
const user = new User()
const openBanking = new OpenBanking()
const iniciacaoPagamento = new IniciacaoPagamento()
const boletoSimples = new BoletoSimples()
const meuScore = new MeuScore()
const listaProduto = new ListaProduto()

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

/* Boleto Simples */
routes.post('/create-bank-billet', boletoSimples.create)

/* Meu score */
routes.get('/meu-score', meuScore.show)

/* Lista produto */
routes.get('/produtos', listaProduto.index)

export default routes