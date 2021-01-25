const mongoose = require('mongoose')

const CustomarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phonNumber: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    }
}, {
    timestamps: true
})

const Customar = mongoose.model('customars', CustomarSchema);

module.exports = Customar;