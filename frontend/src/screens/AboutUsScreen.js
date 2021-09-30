import React from "react";
import { Link } from "react-router-dom";
import frontPageImage from "../images/flat_white.png";
import Header from '../components/Header'

const HomeScreen = () => {
  return (
    <div>
        <Header/>
      <div className='p-5 mb-4 bg-light rounded-3'>
        <div className='container-fluid py-5'>
          <div className='row'>
            <div className='col-8'>
              <h1 className='display-5 fw-bold'>Our Heritage</h1>
              <p className='fs-4'>

Our story begins in 1971 along the cobblestone streets of Seattle’s historic Pike Place Market. It was here where Starbucks opened its first store, offering fresh-roasted coffee beans, tea and spices from around the world for our customers to take home. Our name was inspired by the classic tale, “Moby-Dick,” evoking the seafaring tradition of the early coffee traders.
              </p>
              <p className='fs-4'>

              It takes many hands to craft the perfect cup of coffee – from the farmers who tend to the red-ripe coffee cherries, to the master roasters who coax the best from every bean, and to the barista who serves it with care. We are committed to the highest standards of quality and service, embracing our heritage while innovating to create new experiences to savor.              </p>
              <Link to='/menu/all' className='btn btn-primary btn-lg'>
                Shop now
              </Link>
            </div>
            <div className='col-4'>
              <img src={frontPageImage} alt='Flat white coffee' width='110%' />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default HomeScreen;
