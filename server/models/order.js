const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const orderSchema = new Schema({
    Ouser: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    Oproducts: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number
            }
        }
    ],
    OtotalPrice: Number,
    Ostatus: {
        type: String,
        enum: ['Not Confirmed', 'Ordered', 'Processing', 'Picking Up', 'Out For Delivery', 'Order Completed', 'Canceled' ],
        default: 'Not Confirmed'
    },
    OemployeeId: {
        type: Schema.Types.ObjectId,
        ref: "Employee"
    },
    Oaddress: {
        houseName: {
            type: String 
        },
        street: {
            type: String
        }
    },
    OpaymentId: {
        type: String
    },
    OrazorPayOrderId: {
        type: String
    },
    OpaymentMode: {
        type: String,
        enum: ['CashOnDelivery', 'RazorPay'],
        default: 'RazorPay'
    },
    OpaymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    }
}, {timestamps: true})

module.exports= mongoose.model("Order", orderSchema);