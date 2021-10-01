import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PageBreadcrumb from "../components/PageBreadcrumb";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import Session from "../sessionService";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [cart, setCart] = useState(Session.getCart() ?? []);

  const getProducts = () => {
    const list = cart.filter((item) => item !== null);
    console.log("List in sesison storage: ", list);
    setProducts(list);
  };

  const handleCheckout = () => {
    console.log("move to checkout screen");
  };

  const totalPrice = () => {
    const sum = cart
      .filter((item) => item !== null)
      .map((item) => item.price)
      .reduce((a, b) => a + b, 0);
    setTotal(sum);
  };

  useEffect(() => {
    getProducts();
    totalPrice();
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
                      <small> 10 item(s) in your cart </small>
                    </div>
                    {/* To DO
                      Implement the design for mobile
                    */}
                    {products.map((product) => (
                      <div key={product._id}>
                        <div className='cart_items'>
                          <ul className='cart_list'>
                            <li className='cart_item clearfix'>
                              <div className='cart_item_image'>
                                <img
                                  src={`../images/products-img/${product.productImage}`}
                                  alt={product.name}
                                />
                              </div>
                              <div className='cart_item_info d-flex flex-md-row flex-column justify-content-between'>
                                <div className='cart_item_name cart_info_col'>
                                  <div className='cart_item_title'>Name</div>
                                  <div className='cart_item_text'>
                                    {product.name}
                                  </div>
                                </div>
                                <div className='cart_item_color cart_info_col'>
                                  <div className='cart_item_title'>Details</div>
                                  <div className='cart_item_text'>
                                    <span>Size: Small</span>
                                    <br />
                                    <span>Ice: Hot</span>
                                    <br />
                                    <span>Sweetness: 100% Sugar</span>
                                    <br />
                                    <span>Tea Base: Oolong Tea</span>
                                    <br />
                                    <span>Topping: Caramel Pudding</span>
                                  </div>
                                </div>
                                <div className='cart_item_quantity cart_info_col'>
                                  <div className='cart_item_title'>
                                    Quantity
                                  </div>
                                  <div className='cart_item_text'>1</div>
                                </div>
                                <div className='cart_item_price cart_info_col'>
                                  <div className='cart_item_title'>Price</div>
                                  <div className='cart_item_text'>₹22000</div>
                                </div>
                                <div className='cart_item_total cart_info_col'>
                                  <div className='cart_item_title'>Total</div>
                                  <div className='cart_item_text'>₹22000</div>
                                </div>
                                <div className='cart_item_total cart_info_col'>
                                  <div className='cart_item_title'>&nbsp;</div>
                                  <div className='cart_item_text'>
                                    <button className='btn btn-sm'>
                                      <i className='fas fa-trash'></i>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    ))}
                    <div className='order_total'>
                      <div className='order_total_content text-md-right'>
                        <div className='order_total_title'>Order Summary:</div>
                        <div className='order_total_amount'>₹22000</div>
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

export default ProductListScreen;
