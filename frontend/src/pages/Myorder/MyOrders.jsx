import React, { useContext, useEffect, useState } from 'react'
import './MyOrders.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { assets } from '../../assets/assets'

const MyOrders = () => {

    const {url,token} = useContext(StoreContext)
    const [data, setData] = useState([])

    const fetchOrder = async () => {
        const respone = await axios.post(url+"/api/order/userorders",{},{headers:{token}})
        setData(respone.data.data)
        console.log(respone.data.data)
    }

    useEffect(() => {
        if (token) {
            fetchOrder()
        }
    }, [token])
    

  return (
    <div className='myorders'>
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order, i) => {
                return (
                    <div key={i} className='my-orders-order'>
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index) => {
                            if(index === order.items.length-1){
                                return item.name+" x "+item.Qunatity
                            }
                            else{
                                return item.name+" x "+item.Qunatity+", " 
                            }
                        })}</p>
                        <p>${order.amount}.00</p>
                        <p>items: {order.items.length}</p>
                        <p><span>&#x25cf;</span> <b>{order.status}</b></p>
                        <button onClick={fetchOrder}>Track Order</button>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default MyOrders