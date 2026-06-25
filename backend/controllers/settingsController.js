const PaymentSettings = require('../models/paymentSettingsModel');
const Voucher = require('../models/voucherModel');

exports.getPaymentSettings = async(req,res)=>{
 let settings = await PaymentSettings.findOne();
 if(!settings) settings = await PaymentSettings.create({});
 res.json({success:true,settings});
}

exports.updatePaymentSettings = async(req,res)=>{
 let settings = await PaymentSettings.findOne();
 if(!settings) settings = await PaymentSettings.create(req.body);
 else {
 settings.upiId=req.body.upiId;
 settings.qrCode=req.body.qrCode;
 await settings.save();
 }
 res.json({success:true,settings});
}

exports.createVoucher = async(req,res)=>{
 const voucher = await Voucher.create({
 code:req.body.code,
 discountPercent:req.body.discountPercent
 });
 res.json({success:true,voucher});
}

exports.getVouchers = async(req,res)=>{
 const vouchers = await Voucher.find().sort({createdAt:-1});
 res.json({success:true,vouchers});
}

exports.validateVoucher = async(req,res)=>{
 const voucher = await Voucher.findOne({code:req.body.code.toUpperCase(),active:true});
 if(!voucher) return res.status(404).json({success:false,message:'Invalid voucher'});
 res.json({success:true,voucher});
}
