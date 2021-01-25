const exporess = require('express')
const CustomarRoutes = exporess.Router();


const Customar = require('./customar.model')

// create

CustomarRoutes.post('/create', async (req, res) => {
    try {
        const customar = new Customar({
            name: req.body.name,
            phonNumber: req.body.phonNumber,
            address: req.body.address
        })

        await customar.save().then((d) => {
            res.status(201).send({ success: true, data: d });
        }).catch((e) => {
            res.status(400).send({ success: false, message: 'Bad Request' })
        })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})


// read

CustomarRoutes.get('/all', async (req, res) => {
    try {
        const customar = await Customar.find();
        if (!customar) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }
        res.status(200).send({ success: false, data: customar })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// read one

CustomarRoutes.get('/:id', async (req, res) => {
    try {
        const customar = await Customar.findOne({
            _id: req.params.id
        })

        if (!customar) {
            return res.status(404).send({ success: false, message: "Data not found" })
        }

        res.status(200).send({ success: true, data: customar })
    } catch (e) {
        res.status(500).send({ success: false, message: 'Internal Server Error' })
    }
})

// update one

CustomarRoutes.patch("/update/:id", async (req, res) => {
    try {
        await Customar.findOneAndUpdate({
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

CustomarRoutes.delete('/delete/:id', async (req, res) => {
    await Customar.findOneAndRemove({
        _id: req.params.id
    }).then(() => {
        res.status(201).send({ success: true, message: "Data Delete successfull" })
    }).catch(() => {
        res.status(400).send({ success: false, message: 'Bad Request' })
    })
})

module.exports = CustomarRoutes