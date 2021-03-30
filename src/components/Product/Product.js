import React from 'react'

const Product = (props) => {
    const {name, weight, price, photo} = props.product;
    return (
        <div>
            <p><img src={photo} width="200" alt={name}/></p>
            <p>Name: {name}</p>
            <p>Weight: {weight} gm</p>
            <p>Price: ${price}</p>
        </div>
    )
}

export default Product;
