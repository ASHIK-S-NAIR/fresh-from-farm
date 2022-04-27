const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const orderSchema = new Schema({
    Ouser: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
        enum: ['Ordered', 'Processing', 'Picking Up', 'Out For Delivery', 'Order Completed' ],
        default: 'Ordered'
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
    }
}, {timestamps: true})

module.exports= mongoose.model("Order", orderSchema);