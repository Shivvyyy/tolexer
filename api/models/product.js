const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true},
  price: {type: Number, required :true},
  productImage: {type: Array, required:true},
  productSpecifications: {type: String, required:true},
  mainCategory: {type: String, required: true},
  subCategory: {type:String, required: true},
  onSale: {type:Boolean, required: false},
  featured: {type:Boolean, required: false},
  bestSeller: {type:Boolean, required: false},
  hotDeals: {type:Boolean, required: false},
  created_at : {type: Date, default: Date.now()}

});

module.exports = mongoose.model('Product', productSchema);
