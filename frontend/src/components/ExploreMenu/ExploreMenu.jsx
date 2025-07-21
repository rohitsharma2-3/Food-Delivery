import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with finest ingradients and culinary expertise. Our mission is to satisfy your cravings and elevate your dinig experience, One delicious meal at a time.</p>
        <div className="explore-menu-list">
            {menu_list.map((e, i) => {
                return (
                    <div onClick={() => setCategory(prev => prev === e.menu_name?"All":e.menu_name)} key={i} className='explore-menu-list-item'>
                        <img className={category === e.menu_name?"active":""} src={e.menu_image} alt="" />
                        <p>{e.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu