import { Router } from 'express'
import { OpenBanking } from './controllers/OpenBanking'

const routes = Router()
const openBanking = new OpenBanking()

routes.post('/create', openBanking.createConsent)
routes.get('/accounts', openBanking.indexAccounts)

export default routes