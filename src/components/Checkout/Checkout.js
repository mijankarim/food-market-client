import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const Checkout = () => {
  const [loggedInUser] = useContext(UserContext);
  const { id } = useParams();
  console.log(id);
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch("https://quiet-castle-44905.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        const newProduct = data.find((item) => item._id === id);
        setProduct(newProduct);
      });
  }, []);
  const handleCheckout = () => {
    const orderDetails = { ...loggedInUser, ...product, orderTime: new Date() };
    console.log("order details", orderDetails)
    fetch("https://quiet-castle-44905.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Order successful");
        }
      });
  };
  const { name, price } = product;
  return (
    <Container className="bg-light py-5">
      <Row>
        <Col>
          <h3 className="mb-4">Check out</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{name}</td>
                <td>1</td>
                <td>${price}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td></td>
                <td>${price}</td>
              </tr>
            </tfoot>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="food-btn float-right" onClick={handleCheckout}>Checkout</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
