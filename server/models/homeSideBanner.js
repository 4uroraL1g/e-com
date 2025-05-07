const mongoose = require('mongoose');

const homeSideBannerSchema = new mongoose.Schema({
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

homeSideBannerSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

homeSideBannerSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('HomeSideBanner', homeSideBannerSchema);