import React, { useEffect, useState } from "react";
import axios from "axios";
import PageBreadcrumb from "../components/PageBreadcrumb";
import Pagination from "../components/Pagination";
import ProductFilter from "../components/ProductFilter";
import Session from "../sessionService";

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const getProducts = () => {
    const list = Session.getCart().filter((item) => item !== null);
    console.log("List in sesison storage: ", list);
    setProducts(list);
  };

  const totalPrice = () => {
    const sum = Session.getCart()
      .filter((item) => item !== null)
      .map((item) => item.price)
      .reduce((a, b) => a + b, 0);
    setTotal(sum);
  };

  useEffect(() => {
    getProducts();
    totalPrice();
  }, []);

  return (
    <>
      <PageBreadcrumb />
      <div className='album'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-10'>
              {products.map((item) => (
                <div
                  className='d-flex justify-content-between'
                  key={item.title}
                >
                  <div>{item.title}</div>
                  <div>${item.price}</div>
                </div>
              ))}
              <hr />
              <div className='d-flex justify-content-between'>
                <div>Total cost</div>
                <div>${total}</div>
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
