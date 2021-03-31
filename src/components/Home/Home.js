import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "../Product/Product";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://quiet-castle-44905.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <Container>
      <Row>
        {products.map((product) => (
          <Col xs={12} sm={6} md={4} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
