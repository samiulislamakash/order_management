const mongoose = require('mongoose')

const ProductItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})

const ProductItem = mongoose.model('productItems', ProductItemSchema);

module.exports = ProductItem;