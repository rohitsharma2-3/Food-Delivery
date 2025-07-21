import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const {cartItem, food_list, removeFromCart, getTotalAmount, url} = useContext(StoreContext)

  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((e, i) => {
          if(cartItem[e._id]>0){
            return (
              <div key={i}>
              <div className="cart-items-title cart-items-itme" >
                <img src={url+"/images/"+e.image} alt="" />
                <p>{e.name}</p>
                <p>${e.price}</p>
                <p>{cartItem[e._id]}</p>
                <p>${e.price*cartItem[e._id]}</p>
                <p onClick={() =>removeFromCart(e._id)} className='cross'>x</p>
              </div>
              <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${!getTotalAmount()?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>${!getTotalAmount()? 0 :getTotalAmount()  + 2}</p>
            </div>
          </div>
            <button onClick={() => navigate('/order')}>PROCEED to CHECKOUT</button>
        </div>
        <div className="promocode">
          <div>
            <p>If You have a promo code, Enter it here.</p>
            <div className='cart-pomocode-input'>
              <input type="text" placeholder='promo code'/>
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart