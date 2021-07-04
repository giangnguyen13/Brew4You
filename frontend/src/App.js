import React from "react";
import { Container } from "react-bootstrap";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path='/' exact component={HomeScreen} />
            <Route path='/menu' exact component={ProductListScreen} />
            <Route path='/login' exact component={LoginScreen} />
            <Route path='/signup' exact component={SignUpScreen} />
            <Route
              path='/forgot-password'
              exact
              component={ForgotPasswordScreen}
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
