import express from 'express'
import cors from 'cors'
import connection from './database/connection'
import routes from './routes'

const PORT = 3333

const main = async () => {
    const app = express()
    await connection()
    app.use(cors())
    app.use(express.json())
    app.use(routes)
    app.listen(PORT, () => console.log(`App listening on ${PORT}`))
}

main().catch(err => {
    console.error(err)
}) 
