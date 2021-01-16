const { Schema, model } = require('mongoose');
const { CategorySchema } = require('./Category');

const ProductSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  categories: [CategorySchema],
});

const Product = model('Product', ProductSchema);

module.exports = { Product, ProductSchema };
