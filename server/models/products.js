const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    item_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: String,
        required: false,
    },
    sellable_online: {
        type: Boolean,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    other_colors: {
        type: String, // Assuming this is a string like "Yes" or "No"
        required: false,
    },
    short_description: {
        type: String,
        required: false,
    },
    designer: {
        type: String,
        required: false,
    },
    dimensions: {
        depth: {
            type: Number,
            required: false,
        },
        height: {
            type: Number,
            required: false,
        },
        width: {
            type: Number,
            required: false,
        },
    },
});

module.exports = mongoose.model('Product', ProductSchema);