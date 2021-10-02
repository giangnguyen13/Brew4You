import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/PageBreadcrumb";
import CartItem from "../components/CartItem";
import AddressForm from "../components/AddressForm";
import OrderPriceSum from "../components/OrderPriceSum";

const CheckoutScreen = () => {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [order, setOrder] = useState({});

  const handleCheckout = async (e) => {
    e.preventDefault();
    console.log("payment screen");
  };

  const getOrder = async (id) => {
    const { data } = await axios.get(`/api/orders/${id}`);
    setOrder(data);
    setOrderItems(data.orderItems);
  };

  useEffect(() => {
    getOrder(id);
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
                      <small>Review your order</small>
                    </div>
                    {/* To DO
                      Implement the design for mobile
                    */}
                    {orderItems.map((product) => (
                      <CartItem key={product._id} product={product} />
                    ))}
                    <AddressForm></AddressForm>
                    <OrderPriceSum
                      text={"Subtotal"}
                      amount={order.itemsPrice}
                    />
                    <OrderPriceSum text={"HST"} amount={order.taxPrice} />
                    {/* might be we can do the Google API 
                    to calculate the shipping cost based on distance ?? instead of fixed shipping cost */}
                    <OrderPriceSum text={"Shipping Cost"} amount={0} />
                    <OrderPriceSum text={"Order Total"} amount={0} />
                    <div className='cart_buttons'>
                      <button
                        type='button'
                        className='button cart_button_checkout'
                        onClick={handleCheckout}
                      >
                        Proceed to payment
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

export default CheckoutScreen;
