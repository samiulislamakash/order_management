const mongoose = require('mongoose')

const FoodItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        require: true
    },
    description: {
        type: String
    }
}, {
    timestamps: true
})

const FoodItem = mongoose.model('foodItems', FoodItemSchema);

module.exports = FoodItem;