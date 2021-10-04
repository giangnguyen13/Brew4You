import React from "react";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const { product, name, quantity, price, image, productDetails } =
    props.product;
  return (
    <div className='cart_items'>
      <ul className='cart_list'>
        <li className='cart_item clearfix'>
          <div className='cart_item_image'>
            <img src={image} alt={name} />
          </div>
          <div className='cart_item_info d-flex flex-md-row flex-column justify-content-between'>
            <div className='cart_item_name cart_info_col'>
              <div className='cart_item_title'>Name</div>
              <div className='cart_item_text'>
                <Link
                  to={`/products/${product}`}
                  style={{ textDecoration: "none" }}
                >
                  {name}
                </Link>
              </div>
            </div>
            <div className='cart_item_color cart_info_col'>
              <div className='cart_item_title'>Details</div>
              <div className='cart_item_text'>
                {productDetails.map((value, index) => (
                  <React.Fragment key={index}>
                    <span>{value}</span>
                    <br />
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className='cart_item_quantity cart_info_col'>
              <div className='cart_item_title'>Quantity</div>
              <div className='cart_item_text'>{quantity}</div>
            </div>
            <div className='cart_item_price cart_info_col'>
              <div className='cart_item_title'>Price</div>
              <div className='cart_item_text'>{price}</div>
            </div>
            <div className='cart_item_total cart_info_col'>
              <div className='cart_item_title'>Total</div>
              <div className='cart_item_text'>
                {(price * quantity).toFixed(2)}
              </div>
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
  );
};

export default CartItem;
