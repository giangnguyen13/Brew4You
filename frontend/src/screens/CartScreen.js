import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import Session from "../sessionService";
import OrderPriceSum from "../components/OrderPriceSum";
import ConfirmationModal from "../components/ConfirmationModal";
import { user_config } from "../config/auth";
import { isAuthenticated } from "../actions/userActions";

const CartScreen = () => {
  const [modalShow, setModalShow] = useState(false);
  const [userAction, setUserAction] = useState(null);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(Session.getCart() ?? []);
  const [totalItem, setTotalItem] = useState(0);

  const handleCheckout = async () => {
    // return id of the created order
    if (isAuthenticated()) {
      const { data } = await axios.post("/api/orders", cart, user_config);
      window.location.href = `/checkout/${data}`;
    } else {
      setModalShow(true);
    }
  };

  const anonymousCheckout = async () => {
    const { data } = await axios.post("/api/anonymous_orders", cart);
    window.location.href = `/checkout/${data}`;
  };

  const totalPrice = () => {
    console.log(cart === []);
    if (cart.length === 0) {
      setTotal(0);
    } else {
      const itemPrice = cart
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current);
      setTotal(itemPrice.toFixed(2));
    }
  };

  useEffect(() => {
    totalPrice();
    setTotalItem(cart.length);
  }, []);

  return (
    <>
      <Header />
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
                    <OrderPriceSum
                      text={"Order Summary (Subtotal):"}
                      amount={total}
                    />
                    <div className='cart_buttons'>
                      <Link
                        to='/menu/all'
                        className='btn btn-secondary btn-lg mx-3'
                      >
                        Continue Shopping
                      </Link>
                      <button
                        type='button'
                        className='btn btn-success btn-lg mx-1 cart_button_checkout'
                        onClick={handleCheckout}
                        disabled={totalItem === 0}
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
      <ConfirmationModal
        show={modalShow}
        onConfirm={() => (window.location.href = `/login`)}
        onDecline={anonymousCheckout}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};

export default CartScreen;
