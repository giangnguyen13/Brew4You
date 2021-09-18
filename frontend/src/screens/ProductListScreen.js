import React, { useEffect } from "react";
import axios from "axios";
import PageBreadcrumb from "../components/PageBreadcrumb";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import { products } from "../data";

const ProductListScreen = () => {
  const getProducts = async () => {
    console.log("call api");
    const { data } = await axios.get(`/api/products`);
    console.log(data);
  };
  useEffect(() => {
    getProducts();
    return () => {};
  }, []);
  return (
    <>
      <PageBreadcrumb />
      <div className='album'>
        <div className='container'>
          <div className='row'>
            {/* This should be a search category component */}
            <div className='col-md-2 product-filter'>
              <ProductFilter />
            </div>
            <div className='col-md-10'>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
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
