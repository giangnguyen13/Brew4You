import React, { useEffect, useState } from "react";

import { Container } from "react-bootstrap";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import { isAuthenticated } from "./actions/userActions";
import Footer from "./components/Footer";
// import Header from "./components/Header";
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

function App() {
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  // Set up app name from ENV file
  useEffect(() => {
    document.title = process.env.REACT_APP_WEBSITE_NAME;
  }, []);
  return (
    <Router>
      <main>
        <Container>
          <Switch>
            <Route path='/menu/:s' exact component={ProductListScreen} />
            <Route path='/about' exact component={AboutUsScreen} />
            <Route path='/track-order' component={TrackingScreen} />
            <Route path='/carts' component={CartScreen} />
            <Route path='/checkout/:id' component={CheckoutScreen} />
            <Route
              path='/products/:id'
              component={() => ProductScreen(loggedIn)}
            />
            <Route path='/login' exact component={LoginScreen} />
            <Route path='/signup' exact component={SignUpScreen} />
            <Route path='/wishlist' exact>
              {loggedIn ? <WishListScreen /> : <Redirect to='/login' />}
            </Route>
            <Route path='/profile' exact>
              {loggedIn ? <ProfileScreen /> : <Redirect to='/login' />}
            </Route>
            <Route path='/security' exact>
              {loggedIn ? <SecurityScreen /> : <Redirect to='/login' />}
            </Route>
            <Route
              path='/forgot-password'
              exact
              component={ForgotPasswordScreen}
            />
            <Route path='/' exact component={HomeScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
