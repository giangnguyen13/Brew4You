import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/PageBreadcrumb";
import CartItem from "../components/CartItem";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import Session from "../sessionService";

const CartScreen = () => {
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(Session.getCart() ?? []);
  const [totalItem, setTotalItem] = useState(0);

  const handleCheckout = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/orders", cart, config);
    console.log(data);
  };

  const totalPrice = () => {
    const itemPrice = cart
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current);
    setTotal(itemPrice);
  };

  useEffect(() => {
    totalPrice();
    setTotalItem(cart.length);
  }, []);

  return (
    <>
      <PageBreadcrumb />
      <div className='album'>
        <div className='container'>
          <div className='row'>
            <div className='cart_section'>
              <div className='container-fluid'>
                <div className='row'>
                  <div className='col-lg-10 offset-lg-1'>
                    <div className='cart_container'></div>
                    <div className='cart_title'>
                      <small>{`(${totalItem}) ${
                        totalItem > 1 ? "items" : "item"
                      } in your cart`}</small>
                    </div>
                    {/* To DO
                      Implement the design for mobile
                    */}
                    {cart.map((product) => (
                      <CartItem key={product._id} product={product} />
                    ))}
                    <div
                      className='order_total offset-md-8'
                      style={{ maxWidth: "fit-content" }}
                    >
                      <div className='order_total_content text-md-right'>
                        <div className='order_total_title'>
                          Order Summary (Subtotal):
                        </div>
                        <div className='order_total_amount'>{`$ ${total}`}</div>
                      </div>
                    </div>
                    <div className='cart_buttons'>
                      <Link to='/menu/all' className='button cart_button_clear'>
                        Continue Shopping
                      </Link>
                      <button
                        type='button'
                        className='button cart_button_checkout'
                        onClick={handleCheckout}
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
