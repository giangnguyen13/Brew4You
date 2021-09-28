import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../components/PageBreadcrumb";

import ProgressBar from "react-bootstrap/ProgressBar";

const ProductListScreen = () => {
  return (
    <>
      <PageBreadcrumb />
      <ProgressBar>
        <ProgressBar variant='success' now={33} key={1} />
        <ProgressBar variant='warning' now={33} key={2} />
        <ProgressBar striped variant='info' now={30} key={3} />
      </ProgressBar>
      <br/>
      
      <div class='d-flex justify-content-between'>
      <p class="h5">Prepared your drink</p>
      <p class="h5">Out for develivery</p>
      <p class="h5">Arriving</p>
                </div>
    </>
  );
};

export default ProductListScreen;
