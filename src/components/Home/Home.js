import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "../Product/Product";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://quiet-castle-44905.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);
  return (
    <Container className="pt-3 pb-5 mb-5">
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center loader">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <Row>
          {products.length === 0 ? (
            <div className="text-light text-center w-100 py-5">
              <h3>No products Found</h3>
            </div>
          ) : (
            products.map((product) => (
              <Col xs={12} sm={6} md={4} key={product._id}>
                <Product product={product} />
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  );
};

export default Home;
