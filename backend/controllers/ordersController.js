import { CurrencyCodes } from "validator/lib/isISO4217.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user oder for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} })

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "INR",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.max(item.price * 100, 50), // Ensure min 50 paise
            },
            quantity: item.quantity || 1,
        }));
        
        // Add a minimum delivery charge
        line_items.push({
            price_data: {
                currency: "INR",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: Math.max(500, 200), // Ensure delivery charge meets min 50 cents
            },
            quantity: 1
        });
        


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId })
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// listing order for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        req.json({success:false,message:"ERROR"})
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
        try {
            await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
            res.json({success:true,message:"Status Updated"})
        } catch (error) {
            console.log(error)
            res.json({success:false,message:"Error"})

        }
}

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus }