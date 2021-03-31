import React from "react";
import { Table, Row, Col } from "react-bootstrap";

const Order = (props) => {
    const {name, price, orderTime, weight} = props.order;
  return (
    
        <tr>
          <td>{parseInt(`${props.index}`) + 1}</td>
          <td>{name}</td>
          <td>{weight}</td>
          <td>{orderTime}</td>
          <td>$ {price}</td>
        </tr>
        
  );
};

export default Order;
