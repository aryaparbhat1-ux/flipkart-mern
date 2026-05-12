const mongoose = require('mongoose');
const paymentSettingsSchema = new mongoose.Schema({
 upiId:{type:String,default:''},
 qrCode:{type:String,default:''}
},{timestamps:true});
module.exports = mongoose.model('PaymentSettings', paymentSettingsSchema);
