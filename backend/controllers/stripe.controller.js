import asyncHandler from "express-async-handler";
import Stripe from 'stripe'
const stripe = Stripe('sk_test_51JghOoKtvEVPAnxSPvTkC3WluBVQ2NzQDDXHINCpxNwwV8bnc1Dovx59DsNwmzbF7DBD45ecHSqJZpUCdtXjdEmY00PokUJMGp');

/**
 * @desc        Create new payment intent
 * @route       POST /api/stripe/create-payment-intent
 * @access      Public
 */
const createPaymentIntent = asyncHandler(async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100,
    currency: "CAD"
 });
 console.log(`PaymentIntent: ${JSON.stringify(paymentIntent)}`)
  res.json({
    clientSecret: paymentIntent.client_secret
  });
  } catch (error) {
    res.json(error);
  }
});



export { createPaymentIntent };
