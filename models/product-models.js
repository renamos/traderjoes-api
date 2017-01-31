var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
    name: String,
    sku: String,
    photo: String,
    price: Number,
    category_ID: String,
    description: String,
    grams: Number,
    seasonal: Boolean,
    discontinued: Boolean,
    type: String,
    date_added: Date
});

module.exports = mongoose.model('products', productSchema);