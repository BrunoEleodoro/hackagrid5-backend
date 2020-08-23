import mongoose from "mongoose"

const connection = async function () {
    mongoose.Promise = global.Promise
    var mongoUrl = process.env.PROD ? process.env.MONGODB : "mongodb://localhost/hackthongr1d"
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log('MongoDB started')
    } catch (err) {
        console.log('MongoDB error: ' + err)
    }
}

export default connection