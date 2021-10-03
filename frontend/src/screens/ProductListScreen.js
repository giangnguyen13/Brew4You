import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import { useParams } from "react-router";
import Header from "../components/Header";
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";
import { getLoggedUserProfile } from "../actions/userActions";
import { MdNotificationsActive } from "react-icons/md";
import Toast from 'react-bootstrap/Toast'


const ProductListScreen = () => {
  const [filterBy, setFilterBy] = useState(null);
  const [products, setProducts] = useState([]);
  const [shouldDisplayNotification, setShouldDisplayNotification] = useState(false)
  const [notification, setNotification] = useState()

  const { s } = useParams(); //Params filter [Coffee, Tea, Breakfast, all]

  const _handleAddToWishlist = async (product) => {

    const {_id} = await getLoggedUserProfile() || {}
    if(_id) {
      await api.put(END_POINTS.ADD_PRODUCT_WISHLIST, {
        product,
        user: _id
      }).then(response => {
        if(response?.data?.error && response?.data?.code === 400) {
          setNotification({message: response?.data?.message, variant: 'danger'})
          setShouldDisplayNotification(!shouldDisplayNotification)
        }
        else {
          setNotification({message: 'Product Added To Your Wishlist!', variant: 'info'})
          setShouldDisplayNotification(!shouldDisplayNotification)
        }
      }).catch(err => {
        setNotification({message: err.message, variant: 'info'})
        setShouldDisplayNotification(!shouldDisplayNotification)
      })
    }
    else{
      alert("Please login to perform this action!")

    }
  }

  const getProducts = async () => {
    await api
      .get(END_POINTS.GET_ALL_PRODUCTS)
      .then((response) => {
        const products = response?.data?.products;
        setProducts(products);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const searchFilterProducts = (product) => {
    const title = product.name.toLowerCase();
    const filter = filterBy.toLowerCase();
    return product.category.includes(filter) || title.includes(filter);
  };

  const categoryFilterProducts = (product) => {
    return product.category.includes(s);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    setFilterBy();
  }, [s]);

  return (
    <>
      <Header />
      <div className='album'>
        <div className='container'>
        
          <div className='row'>
            {/* This should be a search category component */}
            <div className='col-md-2 product-filter'>
              <ProductFilter filter={setFilterBy} />
              
            </div>
            <div className='col-md-10'>
          
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
                {filterBy
                  ? products.filter(searchFilterProducts).map((product) => {
                      return (
                        <Product
                          product={product}
                          key={product.productId}
                          onClick={() => _handleAddToWishlist(product)}
                        />
                      );
                    })
                  : s !== "all"
                  ? products
                      .filter(categoryFilterProducts)
                      .map((product) => (
                        <Product
                          product={product}
                          key={product.productId}
                          onClick={() => _handleAddToWishlist(product)}
                        />
                      ))
                  : products.map((product) => (
                      <Product
                        product={product}
                        key={product.productId}
                        onClick={() => _handleAddToWishlist(product)}
                      />
                    ))}
              </div>
             
  
                  
              <div className='row'>
                <Pagination />
              </div>
            </div>
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
              <Toast.Body>{notification.message}</Toast.Body>
            </Toast>
            </div>
           }
      </div>
    </>
  );
};

export default ProductListScreen;
