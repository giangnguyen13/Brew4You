import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Dropdown, DropdownButton, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { isAuthenticated, logout } from "../actions/userActions";
import handleLogin from "../services/utils/handleLogin";

const Header = (props) => {
  const [isUserAuth, setIsUserAuth] = useState(isAuthenticated());

  const appLinks = [
    {
      id: 1,
      url: "/",
      displayText: "Home",
    },
    {
      id: 2,
      url: "/menu/all",
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
  const handleLogout = () => {
    logout();
    setIsUserAuth(false);
  };
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
              className={`nav-link mx-1 ${
                link.url === window.location.pathname ? "active" : ""
              }`}
            >
              {link.displayText}
            </Link>
          </li>
        ))}
      </ul>
      <div className='text-end'>
        <Link to='/carts' className='btn btn-outline-primary mx-2'>
          <i className='fas fa-shopping-cart'></i>
        </Link>

        {isUserAuth ? (
          <DropdownButton
            as={ButtonGroup}
            id={`profile-dropdown`}
            size='sm'
            variant='outline-primary'
            title={<BsFillPersonFill size={25} />}
          >
            <Dropdown.Item href='/profile'>My Profile</Dropdown.Item>
            <Dropdown.Item href='/security'>Security</Dropdown.Item>
            <Dropdown.Item href='/wishlist'>My Wish List</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </DropdownButton>
        ) : (
          <Link
            to='#'
            className='btn btn-outline-success'
            onClick={handleLogin}
          >
            <i className='fas fa-user'></i>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
