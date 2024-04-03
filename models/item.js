const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required: true, maxLEngth: 120},
    description: {type: String, required: false, maxLength: 120},
    price: {type: Number, required: true},
    num_in_stock: {type: Number, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true}
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function () {
    return '/inventory/item/' + this._id;
});

//Export model
module.exports = mongoose.model('Item', ItemSchema);