import React, { useState, useEffect } from "react";
import { Table, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  useEffect(() => {
    fetch("https://quiet-castle-44905.herokuapp.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, [products]);

  const handleDelete = (id) => {
    fetch(`https://quiet-castle-44905.herokuapp.com/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if(result){
          setDeleted(true);
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
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.weight} gm</td>
                  <td>${product.price}</td>
                  <td className="text-center">
                    <Button className="food-btn">
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      className="ml-2 food-btn"
                      onClick={() => handleDelete(`${product._id}`)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {deleted && <p className="text-success w-100 text-center my-3">Product deleted Successfully</p>}
        </>
      )}
    </>
  );
};

export default ManageProduct;
