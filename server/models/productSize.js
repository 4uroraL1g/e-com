const mongoose = require('mongoose');

const productSizeSchema = new mongoose.Schema({
    size: {
        type: String,
        default: null,
    },
}, { timestamps: true });

productSizeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productSizeSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('ProductSize', productSizeSchema);