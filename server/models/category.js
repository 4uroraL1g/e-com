const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    images: [
        {
            type: String,
        },
    ],
    color: {
        type: String,
    },
    parentId: {
        type: String,
    },
}, { timestamps: true });

categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Category', categorySchema);