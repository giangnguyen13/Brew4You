import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import AddressForm from "../components/AddressForm";
import OrderPriceSum from "../components/OrderPriceSum";
import { getLoggedUserProfile } from "../actions/userActions";
import CheckoutForm from "../components/CheckoutForm";
import '../index.scss'
import { api } from "../services/api/config";
const CheckoutScreen = () => {
  const { id } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [order, setOrder] = useState({});
  const [address, setAddress] = useState({})

  const getOrder = async (id) => {
    const { data } = await api.get(`/orders/${id}`);
    setOrder(data);
    setOrderItems(data?.orderItems || []);
  };

  useEffect(() => {
    (async() => {
      await getOrder(id);
      await getLoggedUserProfile().then(user => {
       setAddress(user?.address)
      })
    })()
    // clear the session to prepare for new order
    //sessionStorage.clear();
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
                      <small>Review your order</small>
                    </div>

                    {/* To DO
                      Implement the design for mobile
                    */}
                    {orderItems.map((product) => (
                      <CartItem key={product._id} product={product} />
                    ))}
                    <AddressForm address={address || {}}/>
                    <OrderPriceSum
                      text={"Subtotal"}
                      amount={order.itemsPrice}
                    />
                    <OrderPriceSum text={"HST"} amount={order.taxPrice} />
          
                    <OrderPriceSum
                      text={"Shipping Cost"}
                      amount={order.shippingPrice}
                    />
                    <OrderPriceSum
                      text={"Order Total"}
                      amount={order.totalPrice}
                    />
                    <div style={{margin: '5rem 15rem'}}>
                    <CheckoutForm order={order || {}}/>

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
