const exporess = require('express')
const OrderRoutes = exporess.Router();


const Order = require('./order.model')

// create

OrderRoutes.post('/create', async (req, res) => {
    try {
        const order = new Order(req.body)

        await order.save().then((d) => {
            res.status(201).send({ success: true, data: d, message: 'Order create successfull.' });
        }).catch((e) => {
            res.status(400).send({ success: false, message: 'Bad Request' })
        })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})


// read

OrderRoutes.get('/all', async (req, res) => {
    try {
        const order = await Order.find();
        if (!order) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }
        res.status(200).send({ success: true, data: order, message: "All Order get successfull." })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// read one

OrderRoutes.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id
        })

        if (!order) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }

        res.status(200).send({ success: true, data: order, message: 'Single order get successfull.' })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// update one

OrderRoutes.patch("/update/:id", async (req, res) => {
    try {
        await Order.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true }).then((c) => {
            res.status(200).send({ success: true, data: c, message: "Data Update successfull" })
        }).catch(() => {
            res.status(400).send({ success: false, message: 'Bad Request' })
        })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// delete one

OrderRoutes.delete('/delete/:id', async (req, res) => {
    await Order.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.status(201).send({ success: true, message: "Data Delete successfull" })
    }).catch(() => {
        res.status(400).send({ success: false, message: 'Bad Request' })
    })
})

module.exports = OrderRoutes