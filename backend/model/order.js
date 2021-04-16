import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    franchiseName: {
        type: String,
        required: true
    },
    storeLocation: {
        type: String,
        required: true
    },
    storeNo: {
        type: Number,
        required: true
    }
})

export const Order = mongoose.model('order-database', orderSchema)
