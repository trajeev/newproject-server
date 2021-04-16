import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {Order} from './model/order.js'

const app = express()
dotenv.config()

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.send('server is up and running')
})    
app.post('/order', async (req, res) => {
    const {franchiseName, storeLocation, storeNo} = req.body
    const newOrder = new Order({franchiseName, storeLocation, storeNo})

    try {
        await newOrder.save()
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(401).json({message: error.message})
    }
})

app.get('/getorders', async (req, res) => {
    try {
        const orders = await Order.find().exec()
        res.status(201).json(orders)
    } catch (error) {
        res.status(401).json({message: error.message})
    }
})

app.patch('/:id', async (req, res) => {
    const { id } = req.params
    const {franchiseName, storeLocation, storeNo} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    const updatedOrder = {franchiseName, storeLocation, storeNo, _id: id}
    await Order.findByIdAndUpdate(id, updatedOrder, { new: true })
    res.status(201).json(updatedOrder)
})

app.delete('/:id', async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id')

    await Order.findByIdAndRemove(id)

    res.status(201).json('deleted successfully')

})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server running on port ${PORT}`)))
    .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)