const router = require('express').Router();
const auth = require('../middlewares/auth');
const role = require('../middlewares/role');
const { getAccessToken, onBoardSeller, createOrder, captureOrder, status } = require('../functions/transaction');
const Merchant = require('../models/merchant');
const Transaction = require('../models/transaction');
const User = require('../models/user');

router.post('/paypal/sellers/onBoard', auth, async (req, res) => {
    try {
        const accessToken = await getAccessToken();
        const onBoard = await onBoardSeller(req.user, accessToken.access_token);
        res.send(onBoard);

    } catch (e) {
        console.log(e)
    }
})

router.get('/paypal/sellers/merchant', auth, role, async (req, res) => {
    try {
        const merchant = await Merchant.findOne({ UserId: req.user._id });
        res.send({ merchant })
    } catch (e) {
        console.log(e)
    }
})

router.post('/paypal/sellers/add/merchant', auth, role, async (req, res) => {
    try {
        const merchant = new Merchant({ ...req.body, UserId: req.user._id });
        await merchant.save();
        res.send(true);
    } catch (e) {
        res.send(false)
    }
})

router.get('/paypal/sellers/merchant/payment', auth, async (req, res) => {
    try {
        let merchant = await Merchant.findOne({ UserId: req.query.ArtistId !== undefined ? req.query.ArtistId : req.user._id },
            { 'MerchantIdInPaypal': 1 });
        if (req.user.Role === 'Client' && merchant !== null) {
            merchant = { ...merchant.toObject(), ClientId: process.env.CLIENTID }
        }
        res.send({ merchant })
    } catch (e) {
        console.log(e)
    }
})

router.post('/paypal/payment/createOrder',auth,async(req,res)=>{
    try{
        const accessToken = await getAccessToken();
        const orderCreate = await createOrder(req.body.payee, req.body.amount, accessToken.access_token);
        res.send({id:orderCreate.id})
    }catch(e){
        console.log(e)
    }
})

router.post('/paypal/payment/captureOrder/:orderId',auth,async(req,res)=>{
    try{
        const accessToken = await getAccessToken();
        const capture = await captureOrder(req.params.orderId, accessToken.access_token);
        res.send(capture);

    }catch(e){
        console.log(e)
    }
})

router.post('/paypal/payment/transaction/invoice',auth,async(req,res)=>{
    try{
        const transaction = new Transaction(req.body.transaction);
        await transaction.save();
        res.send({id:transaction._id});
    }catch(e){
        console.log(e)
    }
})

router.get('/paypal/payments/invoice',auth,async(req,res)=>{
    try{
        let transactions = await Transaction.find(req.user.Role==='Artist'?{Artist:req.user._id}:{Client:req.user._id});
        transactions = await Promise.all(transactions.map(async e=>{
            return {...e.toObject(),
                Artist:{...(await User.fetchUserData(e.Artist)).toObject(), DP: await undefined}, 
                Client:{...(await User.fetchUserData(e.Client)).toObject(), DP: await undefined}
        }}))
        res.send({transactions})
    }catch(e){
        console.log(e)
    }
})

router.get('/paypal/merchant/status',auth,role,async(req,res)=>{
    try{
        const accessToken = await getAccessToken();
        const stat = await status(req.user._id,accessToken.access_token);
        res.send({stat})
    }catch(e){
        console.log(e)
    }

})

module.exports = router;