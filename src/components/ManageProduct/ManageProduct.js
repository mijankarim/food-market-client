import React, { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://quiet-castle-44905.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`https://quiet-castle-44905.herokuapp.com/delete/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div>
      <h3>Manage Products</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.weight} gm</td>
              <td>${product.price}</td>
              <td>
                <Button>Edit</Button>
                <Button onClick={() => handleDelete(`${product._id}`)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageProduct;
