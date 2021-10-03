import React, { useEffect, useState } from "react";
import PageBreadcrumb from "../components/PageBreadcrumb";
import { FaCheckCircle } from "react-icons/fa";
import ProgressBar from "react-bootstrap/ProgressBar";

const ProductListScreen = () => {
  const [trackingOrder, setTrackingOrder] = useState("");
  const [displayStatus, setDisplayStatus] = useState(false);

  const handleTracking = () => {
    //API call get status of tracking order

    setDisplayStatus(true);
  };

  return (
    <>
      <PageBreadcrumb />
      <form class='form-inline' action=''>
        <div class='row justify-content-center'>
          <div class='col-3'>
            <input
              type='text'
              onChange={(event) => setTrackingOrder(event.target.value)}
              id='order_id'
              class='form-control'
              placeholder='Enter tracking number here'
            />
          </div>
          <div class='col-2'>
            <a id='track_btn' class='btn btn-success' onClick={handleTracking}>
              Track order
            </a>
          </div>
        </div>
      </form>
      {displayStatus && (
        <>
          <h4 style={{color: "#89624c"}}>Status Updates:</h4>
          <table class='table table-bordered'>
            <thead>
              <tr>
                <th scope='col'>Action</th>
                <th scope='col'>Status</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Delivered</td>
                <td>
                  {" "}
                  <FaCheckCircle color='#50C878' />
                </td>
                <td>
                  {new Date(Date.now() - 30 * 60 * 1000).toLocaleString(
                    "en-US"
                  )}
                </td>
              </tr>
              <tr>
                <td>Shipped</td>
                <td>
                  {" "}
                  <FaCheckCircle color='#50C878' />
                </td>
                <td>
                  {new Date(Date.now() - 20 * 60 * 1000).toLocaleString(
                    "en-US"
                  )}
                </td>
              </tr>
              <tr>
                <td>Ready</td>
                <td>
                  {" "}
                  <FaCheckCircle color='#50C878' />
                </td>
                <td>
                  {new Date(Date.now() - 10 * 60 * 1000).toLocaleString(
                    "en-US"
                  )}
                </td>
              </tr>
              <tr>
                <td>Ordered</td>
                <td>Pending</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      <h4 style={{color: "#89624c"}}>Order History</h4>
      <table class='table' id='table02'>
        <thead class='table-dark'>
          <tr>
            <th scope='col'>Items</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Unit Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Hot Chocolate, Latte</td>
            <td>1</td>
            <td>$34</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProductListScreen;
