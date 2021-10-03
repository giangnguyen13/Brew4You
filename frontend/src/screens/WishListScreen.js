import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ListGroup from 'react-bootstrap/ListGroup'
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";
import {getLoggedUserProfile} from '../actions/userActions'
import Product from "../components/Product";
import { getToken } from "../actions/userActions";
import { user_config } from "../config/auth";
import {AiOutlineClear} from 'react-icons/ai'

const WishListScreen = () => {
    const [wishlist, setWishlist] = useState([])
    const removeFromWishList =  async (productId) => {
       const token = getToken()
       if(token) {
           await api.delete(END_POINTS.DELETE_PRODUCT_WISHLIST, {...user_config,   data: {
            _id: productId 
        }}).then(response => {
            console.log(response)
            window.location.reload()
        }).catch(err => {
            alert(err.message)
        })
       }
    }
    useEffect(() => {
        
        (async () => {
           const user = await getLoggedUserProfile()
            await api.get(END_POINTS.GET_USER_WISHLIST, {params: {user: user._id}}).then(response => {
                setWishlist(response?.data?.wishlist)
            }).catch(err => {
                alert(err.message)
            })
        })()
    }, [])

  return (
    <>
      <Header />
     {wishlist.length > 0 && <h1>You have {wishlist.length} items in your wishlist!</h1>} 
      <ListGroup>
    {wishlist.length > 0 ?
            wishlist.map((product) => (<Product style={{margin: 10}} key={product._id} product={product} isWishList  onClick={() => removeFromWishList(product._id)} />))
            : <h1><AiOutlineClear/> Looks Like Your Wishlist Is Empty  </h1>}
    </ListGroup>
    </>
  );
};

export default WishListScreen;
