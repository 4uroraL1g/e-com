const mongoose = require('mongoose');

const subCatSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    subCat: {
        type: String,
        required: true,
    },
}, { timestamps: true });

subCatSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

subCatSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('SubCategory', subCatSchema);