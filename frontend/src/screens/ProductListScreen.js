import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import { products } from "../data";
import { useParams } from "react-router";

const ProductListScreen = () => {
  const [filterBy, setFilterBy] = useState(null);
  const {s} = useParams() //Params filter [Coffee, Tea, Breakfast, all]

  useEffect(() => {
    setFilterBy()
  }, [s])
  
  return (
    <>
      <div className='album'>
        <div className='container'>
          <div className='row'>
            {/* This should be a search category component */}
            <div className='col-md-2 product-filter'>
              <ProductFilter filter={setFilterBy}/>
            </div>
            <div className='col-md-10'>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
                {filterBy ?
                products
                  .filter((product) => (product.type.includes(filterBy)))
                  .map((product) => {
                    return(
                      <Product product={product} key={product.productId} />
                    )
                  }
                  
                  ) :
                  s !== "all" ?  
                  products
                  .filter((product) => (product.type.includes(s)))
                  .map((product) => (
                    <Product product={product} key={product.productId} />
                  ))
                  :  products
                  .map((product) => (
                    <Product product={product} key={product.productId} />
                  ))
}
                  
            
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
