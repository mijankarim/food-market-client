import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";

const AddProduct = () => {
  const { register, handleSubmit, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", "f1b234c6634087691b128af5c97f102f");
    imageData.append("image", e.target.files[0]);
    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((response) => {
        setImageURL(response.data.data.display_url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmit = (data, e) => {
    e.target.reset();
    const productData = {
      name: data.productName,
      weight: data.productWeight,
      price: data.productPrice,
      photo: imageURL,
    };
    const url = `https://quiet-castle-44905.herokuapp.com/addProduct`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((res) => {
      if(res.ok){
        setSuccess(true)
      }
    });
  };

  return (
    <>  
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
        <Row><h3 className="mb-3 ml-3">Add Product</h3></Row>
          <Row className="mb-3">
            <Col>
              <label>Product Name</label>
              <br />
              <input
                className="form-control"
                name="productName"
                placeholder="Product Name"
                ref={register({ required: true })}
              />
               {errors.productName && <span>This field is required</span>}
            </Col>
            <Col>
              <label>Weight(gm)</label>
              <br />
              <input
                className="form-control"
                name="productWeight"
                placeholder="200"
                ref={register}
              />
              {errors.productWeight && <span>This field is required</span>}
            </Col>
          </Row>
          <Row>
            <Col>
              <label>Add Price</label>
              <br />
              <input
                className="form-control"
                name="productPrice"
                placeholder="20"
                ref={register({ required: true })}
              />
              {errors.productPrice && <span>This field is required</span>}
            </Col>
            <Col>
              <label>Upload Photo</label>
              <br />
              <input
                className="form-control"
                name="productPhoto"
                type="file"
                onChange={handleImageUpload}
                ref={register({ required: true })}
              />
              {errors.productPhoto && <span>This field is required</span>}
            </Col>
          </Row>
          <Button className="float-right my-3 food-btn" type="submit">Save</Button>
          {success && <h4 className='text-success w-100 text-center mt-5'>Product saved Successfully.</h4>}
        </Container> 
      </form>
    </>
  );
};

export default AddProduct;
