import React from "react";
import { Col, Button, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Product = (props) => {
  const { name, price, photo, _id:id } = props.product;
  const history = useHistory();
  const handleClick = () => history.push(`checkout/${id}`);
  return (
    <div className="product-card shadow my-3 p-4">
      <img src={photo} width="200" alt={name} />
      <h4>{name}</h4>
      <Row className="mt-3">
        <Col xs={6}>${price}</Col>
        <Col xs={6}>
          <Button onClick={handleClick}>Buy Now</Button>
        </Col>
      </Row>
    </div>
  );
};

export default Product;
