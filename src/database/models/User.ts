import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema({}, { strict: false })
export const User = mongoose.model('User', UserSchema)