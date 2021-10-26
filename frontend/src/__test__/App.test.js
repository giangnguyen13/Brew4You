import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import React from 'react';
import { Route } from 'react-router-dom';
import App from '../App';
import AboutUsScreen from "../screens/AboutUsScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProductListScreen from "../screens/ProductListScreen";
import SignUpScreen from "../screens/SignUpScreen";
import TrackingScreen from "../screens/TrackingScreen";

let pathMap = {};
describe('App', ()=> {
  beforeAll(() =>{
    const component = shallow(<App/>);
    pathMap = component.find(Route).reduce((pathMap, route) => {
        const routeProps = route.props();
        pathMap[routeProps.path] = routeProps.component;
        return pathMap;
      }, {});
  });

  it('should exsit', () => {
    const app = render(<App />);
    expect(app).toBeTruthy();
  });

  it('should should show HomeScreen', () => {
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
})
