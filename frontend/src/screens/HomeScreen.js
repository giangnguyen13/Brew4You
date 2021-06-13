import React from "react";
import { Link } from "react-router-dom";
import frontPageImage from "../images/flat_white.png";
import FeaturedProducts from "../components/FeaturedProducts";

const HomeScreen = () => {
  return (
    <div>
      <div className='p-5 mb-4 bg-light rounded-3'>
        <div className='container-fluid py-5'>
          <div className='row'>
            <div className='col-8'>
              <h1 className='display-5 fw-bold'>We Brew Specialty Coffee</h1>
              <p className='fs-4'>
                Our love for specialty coffee is never-ending. With over 365
                days a year at origin working with the best growers on the
                planet, only the best beans make the grade. Countless hours
                cupping and testing our blends means consistently amazing
                coffee, so your morning starts right every time.
              </p>
              <Link to='/menu' className='btn btn-primary btn-lg'>
                Shop Now
              </Link>
            </div>
            <div className='col-4'>
              <img src={frontPageImage} alt='Flat white coffee' width='110%' />
            </div>
          </div>
        </div>
      </div>
      <div className='row align-items-md-stretch'>
        <div className='col-md-6'>
          <div className='h-100 p-5 bg-light border rounded-3'>
            <h2>Loyalty Program</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Consequatur, laborum nobis! Illo iste odit laudantium fugit
              blanditiis mollitia harum in, ea tempora, ipsum vel eligendi
              recusandae commodi temporibus. Vitae, quas.
            </p>
            <Link
              to='/loyalty'
              className='btn btn-outline-primary'
              type='button'
            >
              Register Here
            </Link>
          </div>
        </div>
        <div className='col-md-6'>
          <div className='h-100 p-5 bg-light border rounded-3'>
            <h2>Join our newsletter and get 10% off</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, est!
            </p>
            <div className='input-group mb-3'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your email'
                aria-label='Enter your email'
                aria-describedby='button-addon2'
              />
              <button
                className='btn btn-outline-primary'
                type='button'
                id='button-addon2'
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts />
    </div>
  );
};

export default HomeScreen;
