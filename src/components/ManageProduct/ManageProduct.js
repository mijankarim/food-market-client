import React, { useState } from "react";
import { useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";

const ManageProduct = () => {
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

  const handleDelete = (event, id) => {
    fetch(`https://quiet-castle-44905.herokuapp.com/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          event.target.parentNode.parentNode.style.display = "none";
        }
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center loader">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <h3 className="mb-4">Manage Products</h3>
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
                    <Button
                      className="float-right ml-2 food-btn"
                      onClick={(event) => handleDelete(event, `${product._id}`)}
                    >
                      Delete
                    </Button>
                    <Button className="float-right food-btn">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ManageProduct;
