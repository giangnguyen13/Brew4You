import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ListGroup from 'react-bootstrap/ListGroup'
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";
import {getLoggedUserProfile} from '../actions/userActions'
import Product from "../components/Product";
const WishListScreen = () => {
    const [wishlist, setWishlist] = useState([])

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
      <ListGroup>
      {wishlist.map((product) => (<Product product={product} isWishList />))}
</ListGroup>
    </>
  );
};

export default WishListScreen;
