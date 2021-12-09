import React, { useEffect, useState } from "react";
import formatDate from "../services/utils/formatDate";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import Header from "../components/Header";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { api } from "../services/api/config";
import { END_POINTS } from "../services/api/endpoints";

const ProductListScreen = (props) => {
  const [trackingOrder, setTrackingOrder] = useState("");
  const [order, setOrder] = useState(null);
  const [orderFound, setOrderFound] = useState(true);
  const [orderID, setOrderID] = useState();

  const getOrderTrackingInfo = async (id) => {
    //API call get status of tracking order
    await api
      .get(`${END_POINTS.GET_ORDER_BY_ID}/${id}`)
      .then((response) => {
        if (!response?.data?.error) {
          const data = response.data;
          console.log(data);
          setOrder(data);
          setOrderFound(true);
          console.log(data.orderItems);
        }
      })
      .catch((err) => {
        setOrder(null);
        setOrderFound(false);
        console.log(err);
      });
  };

  const handleTracking = async (e) => {
    e.preventDefault();
    await getOrderTrackingInfo(trackingOrder);
  };

  useEffect(() => {
    (async () => {
      if (props?.location?.search) {
        const orderID = props.location.search.split("=")[1];
        await getOrderTrackingInfo(orderID);
      }
    })();
  }, []);

  return (
    <>
      <Header />
      <form className='form-inline mb-3' onSubmit={handleTracking}>
        <div className='row justify-content-left'>
          <div className='col-md-3'>
            <input
              type='text'
              onChange={(event) => setTrackingOrder(event.target.value)}
              id='order_id'
              className='form-control'
              placeholder='Enter order number'
            />
          </div>
          <div className='col-md-2'>
            <button id='track_btn' className='btn btn-primary'>
              View order detail
            </button>
          </div>
        </div>
      </form>
      {!orderFound && (
        <h4 className='text-danger'>
          Oops.! We cannot find the record in our system. Please try again.
        </h4>
      )}
      {order !== null && (
        <>
          <h4 style={{ color: "#89624c" }}>Order #{order._id}</h4>
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th scope='col'>Action</th>
                <th scope='col'>Status</th>
                <th scope='col'>Date</th>
              </tr>
            </thead>
            <tbody>
              {order.orderStatus.map((status) => (
                <tr key={status._id}>
                  <td>{status.stage}</td>
                  <td>
                    {status.actionAt !== null ? (
                      <FaCheckCircle color='#50C878' />
                    ) : (
                      <FaTimesCircle color='#dc3545' />
                    )}
                  </td>
                  <td>{status.actionAt ?? formatDate(status.actionAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4 className='mt-3'>Details</h4>
          <table className='table' id='table02'>
            <thead className='table-dark'>
              <tr>
                <th scope='col'>Items</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Unit Price</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                    <ul>
                      {item.productDetails.map((value, index) => (
                        <li key={index}>{value}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
