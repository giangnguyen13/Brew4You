import React from 'react';
import { render, screen } from '@testing-library/react';
import { Route } from 'react-router-dom';
import { shallow } from 'enzyme';
import App from './App';
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ProductScreen from "./screens/ProductScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import CartScreen from "./screens/CartScreen";
import TrackingScreen from "./screens/TrackingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import WishListScreen from "./screens/WishListScreen";
import SecurityScreen from "./screens/SecurityScreen";

let pathMap = {};
describe('App', ()=> {
  beforeAll(() =>{
    const component = shallow(<App/>);
    pathMap = component.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});
      console.log(pathMap)
  });

  it('should exsit', () => {
    const app = render(<App />);
    expect(app).toBeTruthy();
  });

  it('should should show TrackCheckoutScreeningScreen', () => {
    expect(pathMap['/']).toBe(HomeScreen);
  });


  it('should should show ProductListScreen', () => {
    expect(pathMap['/menu/:s']).toBe(ProductListScreen);
  });
  
  it('should should show AboutUsScreen', () => {
    expect(pathMap['/about']).toBe(AboutUsScreen);
  });

  it('should should show TrackingScreen', () => {
    expect(pathMap['/track-order']).toBe(TrackingScreen);
  });

  it('should should show CartScreen', () => {
    expect(pathMap['/carts']).toBe(CartScreen);
  });

  it('should should show TrackCheckoutScreeningScreen', () => {
    expect(pathMap['/checkout/:id']).toBe(CheckoutScreen);
  });
  //----
  it('should should show CheckoutScreen', () => {
    expect(pathMap['/checkout/:id']).toBe(CheckoutScreen);
  });

  it('should should show LoginScreen', () => {
    expect(pathMap['/login']).toBe(LoginScreen);
  });

  it('should should show SignUpScreen', () => {
    expect(pathMap['/signup']).toBe(SignUpScreen);
  });

  it('should should show ForgotPasswordScreen', () => {
    expect(pathMap['/forgot-password']).toBe(ForgotPasswordScreen);
  });

  it('should should show ProfileScreen', () => {
    expect(pathMap['/profile']).toBe(ProfileScreen);
  });

})
