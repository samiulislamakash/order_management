const exporess = require('express')
const FoodItemRoutes = exporess.Router();


const FoodItem = require('./foodItem.model')

// create

FoodItemRoutes.post('/create', async (req, res) => {
    try {
        const food = new FoodItem({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        })

        await food.save().then((d) => {
            res.status(201).send({ success: true, data: d });
        }).catch((e) => {
            res.status(400).send({ success: false, message: 'Bad Request' })
        })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// read

FoodItemRoutes.get('/all', async (req, res) => {
    try {
        const food = await FoodItem.find();
        if (!food) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }
        res.status(200).send({ success: false, data: food })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// read one

FoodItemRoutes.get('/:id', async (req, res) => {
    try {
        const food = await FoodItem.findOne({
            _id: req.params.id
        })

        if (!food) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }

        res.status(200).send({ success: true, data: food })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// update one

FoodItemRoutes.patch("/update/:id", async (req, res) => {
    try {
        await FoodItem.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }).then(() => {
            res.status(200).send({ success: true, message: "Data Update successfull" })
        }).catch(() => {
            res.status(400).send({ success: false, message: 'Bad Request' })
        })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// delete one

FoodItemRoutes.delete('/delete/:id', async (req, res) => {
    await FoodItem.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.status(201).send({ success: true, message: "Data Delete successfull" })
    }).catch(() => {
        res.status(400).send({ success: false, message: 'Bad Request' })
    })
})

module.exports = FoodItemRoutes