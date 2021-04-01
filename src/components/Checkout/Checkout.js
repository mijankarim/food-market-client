import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { Container, Row, Col, Table, Button, Spinner } from "react-bootstrap";

const Checkout = () => {
  const [loggedInUser] = useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`https://quiet-castle-44905.herokuapp.com/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsLoading(false);
      });
  }, []);
  const handleCheckout = () => {
    const orderDetails = {
      ...loggedInUser,
      ...product,
      orderTime: new Date().toLocaleString(),
    };
    fetch("https://quiet-castle-44905.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSuccess(true);
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

      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center loader">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
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
              <Button className="food-btn float-right" onClick={handleCheckout}>
                Checkout
              </Button>
              {success && <h4 className='text-success w-100 text-center mt-5'>You Ordered Successfully.</h4>}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Checkout;
