import React from "react";
import { Container } from "react-bootstrap";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductListScreen from "./screens/ProductListScreen";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path='/' exact component={HomeScreen} />
            <Route path='/menu' exact component={ProductListScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
