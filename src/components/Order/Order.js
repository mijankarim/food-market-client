import React from "react";

const Order = (props) => {
    const {name, price, orderTime, weight} = props.order;
  return (
    
        <tr>
          <td>{parseInt(`${props.index}`) + 1}</td>
          <td>{name}</td>
          <td>{weight} gm</td>
          <td>{orderTime}</td>
          <td>$ {price}</td>
        </tr>
        
  );
};

export default Order;
