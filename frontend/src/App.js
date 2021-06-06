import React from "react";
import { Container } from "react-bootstrap";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3 container'>
        <Switch></Switch>
        <Route path='/' exact component={HomeScreen} />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
