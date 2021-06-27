import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Header = () => {
  const appLinks = [
    {
      id: 1,
      url: "/",
      displayText: "Home",
    },
    {
      id: 2,
      url: "/menu",
      displayText: "Menu",
    },
    {
      id: 3,
      url: "/about",
      displayText: "About Us",
    },
    {
      id: 4,
      url: "/track-order",
      displayText: "Track Order",
    },
  ];
  return (
    <header className='container d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
      <a
        href='/'
        className='d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none'
      >
        <img width={40} height={40} src={logo} alt='App logo' />
        &nbsp;
        <span className='fs-4'>Brew4You</span>
      </a>

      <ul className='nav nav-pills' style={{ flexWrap: "nowrap" }}>
        {appLinks.map((link) => (
          <li className='nav-item' key={link.id}>
            <Link
              to={link.url}
              className={`nav-link mx-1 ${link.id === 1 ? "active" : ""}`}
            >
              {link.displayText}
            </Link>
          </li>
        ))}
      </ul>
      <div className='text-end'>
        <Link to='/cart' className='btn btn-outline-primary mx-2'>
          <i className='fas fa-shopping-cart'></i>
        </Link>
        <Link to='/login' className='btn btn-outline-success'>
          <i className='fas fa-user'></i>
        </Link>
      </div>
    </header>
  );
};

export default Header;
