import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    title: String,
    content: String,
    price: Number,
    quantity: Number,
    temporaryId: Number,
    stage: String,
    status: Number,
    trackingNumber: String,
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;

