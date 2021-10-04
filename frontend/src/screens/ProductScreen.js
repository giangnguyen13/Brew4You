import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "../components/Rating";
import ProductReview from "../components/ProductReview";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Session from "../sessionService";
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";
import { getLoggedUserProfile } from "../actions/userActions";
import Toast from 'react-bootstrap/Toast'
import { MdNotificationsActive } from "react-icons/md";

const ProductScreen = ({ loggedIn }) => {
  let cart = Session.getCart();
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [product, setProduct] = useState({});
  const [productAttributes, setProductAttributes] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(0);
  const { id } = useParams();
  const [shouldDisplayNotification, setShouldDisplayNotification] = useState(false)
  const [notification, setNotification] = useState()

  const getProductById = async () => {
    await api
      .get(`${END_POINTS.GET_PRODUCT_BY_ID}/${id}`)
      .then((response) => {
        setProduct(response?.data?.product);
        setTotal(response?.data?.product?.price);
        const attributes = response?.data?.product?.productAttributes;
        setProductAttributes(attributes);

        // Assign default value for custom drink size
        let details = [];
        attributes.forEach((element) => {
          details.push(element.displayText);
          details.push(element.dropdownValues[0] ?? "");
        });
        setDrinkDetails(details);
      })
      .catch((err) => {
        alert(`An error occurred: ${err.message}`);
      });
  };

  const handleDrinkDetailsChange = (attributeName, value) => {
    const attributeIndex = drinkDetails.indexOf(attributeName);
    if (attributeIndex === -1) {
      setDrinkDetails([...drinkDetails, attributeName, value]);
    } else {
      let newDetails = [...drinkDetails];
      newDetails[attributeIndex + 1] = value;
      setDrinkDetails(newDetails);
    }
  };

  const handleAddToCart = () => {
    let details = [];
    for (let index = 0; index < drinkDetails.length; index += 2) {
      details.push(`${drinkDetails[index]}: ${drinkDetails[index + 1]}`);
    }
    const addedProduct = {
      product: product._id,
      name: product.title,
      quantity: quantity,
      price: product.price,
      image: product.image,
      productDetails: details,
    };

    if (cart === "" || cart === null) {
      let initCart = [];
      initCart.push(addedProduct);
      Session.setCart(initCart);
      displayNotification(`${addedProduct.name} added to cart!`, 'info')
    } else {
      cart.push(addedProduct);
      Session.setCart(cart);
      displayNotification(`${addedProduct.name} added to cart!`, 'info')
    }

    console.log("Current cart: ", Session.getCart());
  };

  const displayNotification = (message, variant) => {
    setNotification({message, variant})
    setShouldDisplayNotification(!shouldDisplayNotification)
  }

  const _handleAddToWishlist = async () => {
    const {_id} = await getLoggedUserProfile() || {}
    if(_id) {
      await api.put(END_POINTS.ADD_PRODUCT_WISHLIST, {
        product,
        user: _id
      }).then(response => {
        if(response?.data?.error && response?.data?.code === 400) {
          displayNotification(response?.data?.message, 'danger')
        }
        else {
          displayNotification('Product Added To Your Wishlist!', 'info')
        }
      }).catch(err => {
        displayNotification(err.message, 'danger')

      })
    }
   else {
    displayNotification('Please login to perform this action!', 'danger')
   }
  }
 
  
  useEffect(() => {
    getProductById();
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
                  src={`../images/products-img/${product.image}`}
                  alt={`${product.image}`}
                  className='mt-3'
                />
              </a>
            </div>
            <div className='thumbs-wrap'>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.image}`}
                  src={`../images/products-img/${product.image}`}
                />
              </a>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.image}`}
                  src={`../images/products-img/${product.image}`}
                />
              </a>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.image}`}
                  src={`../images/products-img/${product.image}`}
                />
              </a>
              <a href='/home' className='item-thumb'>
                <img
                  alt={`${product.image}`}
                  src={`../images/products-img/${product.image}`}
                />
              </a>
            </div>
          </article>
          <ProductReview loggedIn={loggedIn} />
        </aside>
        <main className='col-md-6 border-left'>
          <article className='content-body'>
            <h1 className='product-title'>{product.title}</h1>
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
              <div className='col-sm-9'>{product.category}</div>
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
                {productAttributes.map(
                  ({ _id, displayText, dropdownValues }) => (
                    <div className='form-floating my-3' key={_id}>
                      <select
                        className='form-select'
                        id={_id}
                        name={_id}
                        aria-label='Floating label select example'
                        onChange={(e) =>
                          handleDrinkDetailsChange(displayText, e.target.value)
                        }
                      >
                        {dropdownValues.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                      <label htmlFor={_id}>{displayText}</label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className='row mb-2'>
              <div className='col-sm-12'>
                <div className='d-flex justify-content-center mt-3'>
                  <input
                    type='number'
                    min={1}
                    step={1}
                    id='quantity'
                    name='quantity'
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setTotal((e.target.value * product.price).toFixed(2));
                    }}
                  />
                  <button
                    id='addToCartBtn'
                    type='button'
                    className='btn btn-primary'
                    onClick={handleAddToCart}
                  >
                    <i className='fas fa-shopping-cart'></i> Add - {`$${total}`}
                  </button>
                  &nbsp;
                  <button
                    id='addToWishListBtn'
                    onClick={_handleAddToWishlist}
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
      {notification && shouldDisplayNotification &&
        <div style={{position: 'fixed', bottom: 10, right: 4}}>
              <Toast  onClose={() => setShouldDisplayNotification(false)} show={shouldDisplayNotification} delay={3000} autohide bg={notification.variant}>
              <Toast.Header>
              <MdNotificationsActive/>
                <strong className="me-auto">Notification</strong>
                <small>Now</small>
              </Toast.Header>
              <Toast.Body className='text-white'>{notification.message}</Toast.Body>
            </Toast>
            </div>
           }
    </div>
  );
};

export default ProductScreen;
