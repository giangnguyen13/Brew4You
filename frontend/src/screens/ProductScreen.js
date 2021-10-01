import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import ProductReview from "../components/ProductReview";
import { Link } from "react-router-dom";
// import { products } from "../data";
import Header from "../components/Header";
import Session from "../sessionService";

const ProductScreen = ({ loggedIn }) => {
  let cart = Session.getCart();
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const getProduct = async (id) => {
    const { data } = await axios.get(`/api/products/${id}`);
    console.log(data);
    setProduct(data.product);
  };

  const handleAddToCart = () => {
    console.log("Current cart: ", Session.getCart());
    if (cart === "" || cart === null) {
      let initCart = [];
      initCart.push(product);
      Session.setCart(initCart);
    } else {
      cart.push(product);
      Session.setCart(cart);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, []);

  return (
    <div className='card' style={{ border: "none" }}>
      <Header />

      <div className='col-lg-2 col-sm-3'>
        <Link to='/menu/all' className='btn btn-primary'>
          Back to menu
        </Link>
      </div>
      <div className='row no-gutters'>
        <aside className='col-md-6'>
          <article className='gallery-wrap'>
            <div className='img-big-wrap'>
              <a href='/home'>
                <img
                  src={`../images/products-img/${product.productImage}`}
                  alt={`${product.productImage}`}
                  className='mt-3'
                />
              </a>
            </div>
            <div className='thumbs-wrap'>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.productImage}`}
                  src={`../images/products-img/${product.productImage}`}
                />
              </a>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.productImage}`}
                  src={`../images/products-img/${product.productImage}`}
                />
              </a>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.productImage}`}
                  src={`../images/products-img/${product.productImage}`}
                />
              </a>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.productImage}`}
                  src={`../images/products-img/${product.productImage}`}
                />
              </a>
            </div>
          </article>
          <ProductReview loggedIn={loggedIn} />
        </aside>
        <main className='col-md-6 border-left'>
          <article className='content-body'>
            <h1 className='product-title'>{product.name}</h1>
            <div className='my-3'>
              <Rating rating={3.8} totalReviews={139} />
            </div>
            <div className='mb-3'>
              <h4>${product.price}</h4>
            </div>
            <p>{product.description}</p>
            <div className='row mb-2'>
              <div className='col-sm-3'>
                <b>Category</b>
              </div>
              <div className='col-sm-9'>Coffee</div>
            </div>
            <div className='row mb-2'>
              <div className='col-sm-3'>
                <b>Additional</b>
              </div>
              <div className='col-sm-9'>Information here</div>
            </div>
            <hr />
            <h3 className='mb-3'>Custom your drink</h3>
            <div className='row mb-2'>
              <div className='col-sm-12'>
                <div className='form-floating my-3'>
                  <select
                    className='form-select'
                    id='floatingSelect'
                    aria-label='Floating label select example'
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                  <label htmlFor='floatingSelect'>Drink Size</label>
                </div>
                <div className='form-floating my-3'>
                  <select
                    className='form-select '
                    id='floatingSelect'
                    aria-label='Floating label select example'
                  >
                    <option>Hot</option>
                    <option>Warm</option>
                    <option>100% Ice</option>
                    <option>70% Ice</option>
                    <option>50% Ice</option>
                    <option>30% Ice</option>
                    <option>0% Ice</option>
                  </select>
                  <label htmlFor='floatingSelect'>Ice Level</label>
                </div>
                <div className='form-floating my-3'>
                  <select
                    className='form-select'
                    id='floatingSelect'
                    aria-label='Floating label select example'
                  >
                    <option>100% Sugar</option>
                    <option>70% Sugar</option>
                    <option>50% Sugar</option>
                    <option>30% Sugar</option>
                    <option>0% Sugar</option>
                  </select>
                  <label htmlFor='floatingSelect'>Sweetness</label>
                </div>
                <div className='form-floating my-3'>
                  <select
                    className='form-select'
                    id='floatingSelect'
                    aria-label='Floating label select example'
                  >
                    <option>Black Tea</option>
                    <option>Oolong Tea</option>
                    <option>Green Tea</option>
                  </select>
                  <label htmlFor='floatingSelect'>Tea Base Choice</label>
                </div>
                <div className='form-floating my-3'>
                  <select
                    className='form-select'
                    id='floatingSelect'
                    aria-label='Floating label select example'
                  >
                    <option>None</option>
                    <option>Pearl</option>
                    <option>Sago</option>
                    <option>Grass Jelly</option>
                    <option>Aiyu Jelly </option>
                    <option>Caramel Pudding</option>
                    <option>Golden Jell</option>
                    <option>Red Bean</option>
                  </select>
                  <label htmlFor='floatingSelect'>Topping (+$0.35)</label>
                </div>
              </div>
            </div>
            <div className='row mb-2'>
              <div className='col-sm-12'>
                <div className='d-flex justify-content-center mt-3'>
                  <button
                    id='addToCartBtn'
                    type='button'
                    className='btn btn-primary'
                    onClick={handleAddToCart}
                  >
                    <i className='fas fa-shopping-cart'></i> Add -{" "}
                    {`$${product.price}`}
                  </button>
                  &nbsp;
                  <button
                    id='addToWishListBtn'
                    type='button'
                    className='btn btn-primary'
                  >
                    <i className='fas fa-heart'></i> Wishlist
                  </button>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
      <div className='row mt-2'>
        <div className='col-md-8 offset-md-2'>
          <hr />
        </div>
        <div className='col-md-6 offset-md-3 text-center'>
          <h3>Customer Reviews</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
