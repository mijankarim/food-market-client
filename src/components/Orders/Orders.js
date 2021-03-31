import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Order from "../Order/Order";
import { UserContext } from "../../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loggedInUser] = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:5050/orders?email=${loggedInUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      });
  }, []);
  return (
    <Container>
      <Row>
        <Col>
          <h3>Your Orders</h3>
          <p>You have {orders.length} orders</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order No.</th>
                <th>Product Name</th>
                <th>Weight</th>
                <th>Order Time</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <Order order={order} key={index} index={index} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;
