const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    images: [
        {
            type: String,
            required: true,
        },
    ],
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Category', CategorySchema);