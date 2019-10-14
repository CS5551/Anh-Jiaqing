var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
  customer_id: String,
  customer_name: String,
  customer_email: String,
  customer_phone: String,
  customer_address: String,
  customer_order: String,
  updated_date: {type: Date, default: Date.now},
});
/**
 * @class Customer
 * @typeof Model<BookSchema>
 */
const Customer = mongoose.model('csollection',CustomerSchema);
module.exports = Customer;
