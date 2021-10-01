import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import { products } from "../data";
import { useParams } from "react-router";
import Header from "../components/Header";

const ProductListScreen = () => {
  const [filterBy, setFilterBy] = useState(null);
  const [products, setProducts] = useState([]);
  const { s } = useParams(); //Params filter [Coffee, Tea, Breakfast, all]
  const getProducts = async () => {
    const { data } = await axios.get(`/api/products`);
    setProducts(data.products);
  };

  const searchFilterProducts = (product) => {
    const title = product.name.toLowerCase();
    const filter = filterBy.toLowerCase();
    return product.category.includes(filter) || title.includes(filter);
  };

  const categoryFilterProducts = (product) => {
    return product.category.includes(s);
  };

  useEffect(() => {
    setFilterBy();
  }, [s]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Header />
      <div className='album'>
        <div className='container'>
          <div className='row'>
            {/* This should be a search category component */}
            <div className='col-md-2 product-filter'>
              <ProductFilter filter={setFilterBy} />
            </div>
            <div className='col-md-10'>
              <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3'>
                {filterBy
                  ? products.filter(searchFilterProducts).map((product) => {
                      return <Product product={product} key={product._id} />;
                    })
                  : s !== "all"
                  ? products
                      .filter(categoryFilterProducts)
                      .map((product) => (
                        <Product product={product} key={product._id} />
                      ))
                  : products.map((product) => (
                      <Product product={product} key={product._id} />
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
