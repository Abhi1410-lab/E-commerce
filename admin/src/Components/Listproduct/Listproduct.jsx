import React from 'react'
import './Listproduct.css'
import { useState } from 'react'
import { useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png'

const Listproduct = () => {

  const [allproducts, setallproducts] = useState([]);

  const fetchInfo = async()=> {
    await fetch('http://localhost:4000/allproducts').then((res) => res.json()).then((data) => {setallproducts(data)})
  }

  useEffect(() => {
    fetchInfo();
  },[])

  const removeProduct = async (id)=>{
    await fetch('http://localhost:4000/removeproduct', {
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id}) 
    })
    await fetchInfo();
  }

  return (
    <div className='listproduct'>
      <h1>All Products</h1>
      <div className="listproducts-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>Offer price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product,index) =>{
          return <><div key={index} className="listproducts-format-main listproduct-format">
            <img className='listproduct-product-icon' src={product.image} alt="" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() =>{removeProduct(product.id)}} className='listproduct-remote-item' src={cross_icon} alt="" />
          </div>
          <hr /></>
        })
      }
      </div>
    </div>
  )
}

export default Listproduct