const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {type: String, required: true, maxLength: 100},
    description: {type: String, required: false, maxLength: 100}
});


// Virtual for category's URL
CategorySchema.virtual("url").get(function () {
    return `/inventory/category/${this._id}`;
});


//Export model
module.exports = mongoose.model("Category", CategorySchema);