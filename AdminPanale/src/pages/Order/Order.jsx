import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from "react-toastify";
import { assets } from '../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from the API
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8084/ms-api/orders');
      console.log('Full API Response:', response);

      if (response.data) {
        setOrders(response.data);
        console.log('Orders Data:', response.data);
      } else {
        toast.error("Error fetching orders: Response data is missing");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error: " + error.message);
    }
  };

  // Handle status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8084/ms-api/orders/${orderId}`, {
        status: newStatus,
      });

      if (response.status === 200) {
        toast.success("Order status updated successfully!");
        fetchAllOrders(); // Refresh the order list after status update
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Error: " + error.message);
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div>
      <div className='order add'>
        <h3><u>Order Page</u></h3>
        <div className="order-list">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="Parcel Icon" />
                <div>
                  <p className='order-item-food'>
                    {order.itemName} (Quantity: {order.quantity})
                  </p>
                  <p className="order-item-name">{order.customerName}</p>
                  <div className="order-item-address">
                    <p>{order.address}</p>
                  </div>
                  <p className="order-item-phone">{order.phone}</p>
                </div>
                <p>Total Amount: ${order.total}</p>
                <p>Date: {order.date ? new Date(order.date).toLocaleDateString() : 'Date not available'}</p>
                <select
                  value={order.status || 'Food Processing'}
                  onChange={(e) => handleStatusChange(order.orderID, e.target.value)}
                >
                  <option value="Food Processing">Food Processing</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
