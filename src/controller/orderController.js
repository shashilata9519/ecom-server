const Order = require("../model/order");

class orderController {
    static addOrder(req,res,next){
       

        const {orderItems}=req.body
        if(orderItems && orderItems.length === 0){
            throw new  Error('No order items')
            return
        }else{
        const order=new Order({...req.body,user:req.user.customer_id}).save()
        res.send(order)
        }
    }

    static async getMyOrder(req,res,next){
        const order=await Order.find({user:req.user.customer_id}).sort({$natural:-1});
        res.send(order)
    }
 
}

module.exports = orderController;
