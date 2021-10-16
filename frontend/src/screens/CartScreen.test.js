import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { Route } from 'react-router-dom';
import CartScreen from './CartScreen';
import axiosMock from 'axios'
import Session from "../sessionService";

jest.mock('axios');



describe('CartScreen', ()=> {
  let cartScreen; 
  beforeEach(() =>{
    cartScreen = shallow(<CartScreen/>);
    // console.log(cartScreen.debug());
  });
  
  it('should exsit', () => {
    expect(cartScreen).toBeTruthy();
  });

  it('should set total 0 as initial value', () => {
    cartScreen.find('.cart_button_checkout').simulate('click');
    const total = cartScreen.find('OrderPriceSum').props().amount
    expect(total).toBe(0);
  });

  it('should calculate total price', () => {
    const addStub = jest.spyOn(Session, 'getCart').mockReturnValueOnce(mockCartData);
    let cartScreen = shallow(<CartScreen/>);
    cartScreen.update();
    const cartItems = cartScreen.find('CartItem');
    expect(addStub).toHaveBeenCalled();
    expect(cartItems.length).toBe(2);
  });
})

const mockCartData = [
  { _id: 0, price: 2.0, quantity: 2 },
  { _id: 1, price: 2.0, quantity: 2 }
]
