const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    productTitle: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

cartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cartSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Cart', cartSchema);