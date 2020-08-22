import mongoose from "mongoose"

const connection = async function() {
    mongoose.Promise = global.Promise
    try {
        await mongoose.connect("mongodb://localhost/hackthongr1d", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log('MongoDB started')
    } catch (err) {
        console.log('MongoDB error: '+err)
    }
}

export default connection