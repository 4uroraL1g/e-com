const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    images: [
        {
            type: String,
            required: true,
        },
    ],
    catId: {
        type: String,
    },
    catName: {
        type: String,
    },
    subCatId: {
        type: String,
    },
    subCatName: {
        type: String,
    },
}, { timestamps: true });

bannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

bannerSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Banner', bannerSchema);