import React from "react";
import PageBreadcrumb from "../components/PageBreadcrumb";
import Product from "../components/Product";
import Pagination from "../components/Pagination";

import { products } from "../data";

const ProductListScreen = () => {
  return (
    <>
      <PageBreadcrumb />
      <div className='album py-5'>
        <div className='container'>
          <div className='row'>
            {/* This should be a search category component */}
            <div className='col-md-3'>
              <h1>Filter sidebar</h1>
            </div>
            <div className='col-md-9'>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                {products
                  .filter((product) => product.productId <= 12)
                  .map((product) => (
                    <Product product={product} key={product.productId} />
                  ))}
              </div>
              <div className='row'>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductListScreen;
