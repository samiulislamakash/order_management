const exporess = require('express')
const ProductItemRoutes = exporess.Router();


const ProductItem = require('./productItem.model')

// create

ProductItemRoutes.post('/create', async (req, res) => {
    try {
        const product = new ProductItem({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        })

        await product.save().then((d) => {
            res.status(201).send({ success: true, data: d, message: 'Product create successfull.' });
        }).catch((e) => {
            res.status(400).send({ success: false, message: 'Bad Request' })
        })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// read

ProductItemRoutes.get('/all', async (req, res) => {
    try {
        const product = await ProductItem.find();
        if (!product) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }
        res.status(200).send({ success: false, data: product, message: "Get all product successfull" })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// read one

ProductItemRoutes.get('/:id', async (req, res) => {
    try {
        const product = await ProductItem.findOne({
            _id: req.params.id
        })

        if (!product) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }

        res.status(200).send({ success: true, data: product, message: 'Get one product.' })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// update one

ProductItemRoutes.patch("/update/:id", async (req, res) => {
    try {
        await ProductItem.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true }).then((p) => {
            res.status(200).send({ success: true, data: p, message: "Data Update successfull" })
        }).catch(() => {
            res.status(400).send({ success: false, message: 'Bad Request' })
        })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// delete one

ProductItemRoutes.delete('/delete/:id', async (req, res) => {
    await ProductItem.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.status(201).send({ success: true, message: "Data Delete successfull" })
    }).catch(() => {
        res.status(400).send({ success: false, message: 'Bad Request' })
    })
})

module.exports = ProductItemRoutes