const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    customarId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    order_product: {
        type: Array,
        required: true
    },
    subtotal: {
        type: Number,
        required: true,
    },
    vat: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;