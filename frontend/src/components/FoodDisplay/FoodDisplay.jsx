import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)
    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((e, i) => {
                    if(category === "All" || category === e.category){
                        return <FoodItem key={i} id={e._id} name={e.name} description={e.description} price={e.price} image={e.image}/>
                    }
                })}
            </div>
        </div>
    )
}

export default FoodDisplay