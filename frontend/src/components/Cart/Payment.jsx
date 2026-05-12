import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
import Stepper from './Stepper';
import { clearErrors } from '../../actions/orderAction';
import { useSnackbar } from 'notistack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MetaData from '../Layouts/MetaData';

const Payment = () => {
const dispatch = useDispatch();
const { enqueueSnackbar } = useSnackbar();
const [payDisable, setPayDisable] = useState(false);
const [settings,setSettings]=useState({});
const [voucher,setVoucher]=useState('');
const [discount,setDiscount]=useState(0);
const { shippingInfo, cartItems } = useSelector((state) => state.cart);
const { user } = useSelector((state) => state.user);
const { error } = useSelector((state) => state.newOrder);
const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const finalPrice = Math.round(totalPrice - (totalPrice*discount/100));

const applyVoucher = async()=>{
 try{
 const {data}=await axios.post('/api/v1/voucher/validate',{code:voucher});
 setDiscount(data.voucher.discountPercent);
 enqueueSnackbar(`Voucher Applied ${data.voucher.discountPercent}% OFF`,{variant:'success'});
 }catch(err){enqueueSnackbar('Invalid Voucher',{variant:'error'})}
}

const submitHandler = async (e) => {
 e.preventDefault();
 setPayDisable(true);
 enqueueSnackbar('Order Placed Successfully',{variant:'success'});
};

useEffect(()=>{axios.get('/api/v1/payment-settings').then(res=>setSettings(res.data.settings));},[])
useEffect(() => {
if (error) {
 dispatch(clearErrors());
 enqueueSnackbar(error, { variant: 'error' });
}
}, [dispatch, error, enqueueSnackbar]);

return (<>
<MetaData title="Flipkart: Secure Payment" />
<main className="w-full mt-20">
<div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">
<div className="flex-1"><Stepper activeStep={3}><div className="w-full bg-white p-5">
<form onSubmit={submitHandler} className="flex flex-col gap-4">
<FormControl><RadioGroup defaultValue="upi"><FormControlLabel value="upi" control={<Radio />} label="UPI Payment" /></RadioGroup></FormControl>
<div className='border p-4 rounded'>
<p className='font-semibold'>UPI ID: {settings.upiId}</p>
{settings.qrCode && <img src={settings.qrCode} alt='qr' className='w-52 h-52 object-contain mt-3' />}
</div>
<div className='flex gap-2'>
<input value={voucher} onChange={(e)=>setVoucher(e.target.value)} placeholder='Enter Voucher Code' className='border p-2 w-full'/>
<button type='button' onClick={applyVoucher} className='bg-blue-500 text-white px-4'>Apply</button>
</div>
{discount>0 && <p className='text-green-600 font-semibold'>{discount}% discount applied</p>}
<input type="submit" value={`Pay ₹${finalPrice.toLocaleString()}`} disabled={payDisable} className="bg-primary-orange w-1/2 py-3 font-medium text-white rounded-sm uppercase" />
</form></div></Stepper></div>
<PriceSidebar cartItems={cartItems} />
</div></main></>);
};

export default Payment;
