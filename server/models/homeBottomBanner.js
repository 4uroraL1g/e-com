const mongoose = require('mongoose');

const homeBottomBannerSchema = new mongoose.Schema({
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

homeBottomBannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

homeBottomBannerSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('HomeBottomBanner', homeBottomBannerSchema);