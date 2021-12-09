import { shallow } from 'enzyme';
import React from 'react';
import Session from "../sessionService";
import CartScreen from '../screens/CartScreen';
jest.mock('axios');

describe('CartScreen', ()=> {
  let cartScreen; 
  beforeEach(() =>{
    cartScreen = shallow(<CartScreen/>);
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
    // cartScreen.update();
    const cartItems = cartScreen.find('CartItem');
    expect(addStub).toHaveBeenCalled();
    expect(cartItems.length).toBe(2);
  });
})

const mockCartData = [
  { _id: 0, price: 2.0, quantity: 2 },
  { _id: 1, price: 2.0, quantity: 2 }
]
