import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Table, Spinner } from "react-bootstrap";
import Order from "../Order/Order";
import { UserContext } from "../../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loggedInUser] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { userName, email } = loggedInUser;

  useEffect(() => {
    fetch(`https://quiet-castle-44905.herokuapp.com/orders?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setIsLoading(false);
      });
  }, [email]);
  return (
    <Container className="bg-light py-5">
      <Row>
        <Col>
          <h3 className="mb-3">Your Order summary</h3>
          <p className="mb-3">
            Hi <strong>{userName}</strong>. You have{" "}
            <strong>{orders.length}</strong> orders.
          </p>
        </Col>
      </Row>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center loader">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order No.</th>
                  <th>Product Name</th>
                  <th>Weight(gm)</th>
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
      )}
    </Container>
  );
};

export default Orders;
