import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ProductScreen from "./screens/ProductScreen";
import AboutUsScreen from "./screens/AboutUsScreen";


function App() {
  // Set up app name from ENV file
  useEffect(() => {
    document.title = process.env.REACT_APP_WEBSITE_NAME;
  }, []);
  return (
    <Router>
      <main>
        <Container>
          <Switch>
            <Route path='/products/:id' component={ProductScreen} />
            <Route path='/menu/:s' exact component={ProductListScreen} />
            <Route path='/about' exact component={AboutUsScreen} />
            <Route path='/login' exact component={LoginScreen} />
            <Route path='/signup' exact component={SignUpScreen} />
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
