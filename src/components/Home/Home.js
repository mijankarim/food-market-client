import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Product from '../Product/Product'

const Home = () => {
    const [products, setProducts] = useState([]);
    useEffect(() =>{
         fetch('https://quiet-castle-44905.herokuapp.com/products')
         .then(res => res.json())
         .then(data => setProducts(data));
    },[])
    return (
        <div>
            <h3>Home page</h3>
            {
                products.map( product => <Product key={product._id} product={product}/>)
            }
        </div>
    )
}

export default Home;
