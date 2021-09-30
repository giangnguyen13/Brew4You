import React from "react";
import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <nav>
      <ul className='pagination justify-content-center my-4'>
        <li className='page-item disabled'>
          <Link to={`/products/#`} className='page-link' aria-disabled='true'>
            Previous
          </Link>
        </li>
        <li className='page-item active'>
          <Link className='page-link' to={`#`}>
            1
          </Link>
        </li>
        <li className='page-item '>
          <Link className='page-link' to={`#`}>
            2
          </Link>
        </li>
        <li className='page-item'>
          <Link className='page-link' to={`#`}>
            3
          </Link>
        </li>
        <li className='page-item'>
          <Link to={`/products/#`} className='page-link' aria-disabled='true'>
            Previous
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
