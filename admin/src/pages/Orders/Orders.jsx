import React from 'react'
import './Orders.css'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import axios from 'axios'
import { assets } from '../../assets/assets.js'

const Orders = ({ url }) => {

  const [order, setOrder] = useState([])

  const fetchOrders = async () => {
    const response = await axios.get(url + "/api/order/list")
    if (response.data.success) {
      setOrder(response.data.data)
      console.log(response.data.data)
    }
    else {
      toast.error("ERROR")
    }
  }

  const statusHandler = async (e, orderId) => {
    const res = await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    })
    if(res.data.success){
      await fetchOrders()
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])
  
  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {order.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x "+item.Qunatity
                  }
                  else{
                    return item.name+" x "+item.Qunatity +", "
                  }
                })}
              </p>
              <p className='order-item-name'>
                 {order.address.firstName+" "+order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Item : {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(e) => statusHandler(e,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For delivery">Out For delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders