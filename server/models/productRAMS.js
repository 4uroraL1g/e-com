const mongoose = require('mongoose');

const productRamsSchema = new mongoose.Schema({
    productRam: {
        type: String,
        default: null,
    },
}, { timestamps: true });

productRamsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

productRamsSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('ProductRams', productRamsSchema);