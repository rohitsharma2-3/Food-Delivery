import React from 'react'
import './List.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const List = ({url}) => {
  const [list, setList] = useState([])
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if(response.data.success){
      setList(response.data.data)
    }else{
      toast.error("Error")
    }
  }

  const removedFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId})    
    await fetchList()
    if(response.data.success){
      toast.success(response.data.message)
    }else{
      toast.error(response.data.message)
    }
  }

  useEffect(() => {
   fetchList()
  }, [])
  
  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((ele, i)=> {
          return (
          <div key={i} className='list-table-format'>
            <img src={`${url}/images/`+ele.image} alt="" />
            <p>{ele.name}</p>
            <p>{ele.category}</p>
            <p>${ele.price}</p>
            <p onClick={()=> removedFood(ele._id)} className='cursor'>X</p>
          </div>
          )
        })}
      </div>

    </div>
  )
}

export default List