import mongoose, { Schema } from 'mongoose'

interface iUser extends mongoose.Document {
    Name: string,
    SchemeName: string,
    Identification: string,
    Email: string,
    CPF: string,
    Nascimento: string
    createdAt?: Date
}

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    CPF: {
        type: String,
        unique: true,
        required: true
    },
    Nascimento: {
        type: String,
        required: true
    },
    SchemeName: {
        type: String,
        required: true
    },
    Identification: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    }
})

export const User = mongoose.model<iUser>('User', UserSchema)