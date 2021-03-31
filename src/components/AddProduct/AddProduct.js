import axios from "axios";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddProduct = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setImageURL] = useState(null);

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

  const onSubmit = (data) => {
    const productData = {
      name: data.productName,
      weight: data.productWeight,
      price: data.productPrice,
      photo: imageURL,
    };
    const url = `http://localhost:5050/addProduct`;
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    }).then((res) => {
      console.log("server response", res);
    });
  };

  return (
    <div className="text-center">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label>Product Name</label>
          <br />
          <input
            name="productName"
            defaultValue="Rice"
            ref={register({ required: true })}
          />
        </p>
        <p>
          <label>Weight</label>
          <br />
          <input name="productWeight" defaultValue="200" ref={register} />
        </p>
        <p>
          <label>Add Price</label>
          <br />
          <input
            name="productPrice"
            defaultValue="Rice"
            ref={register({ required: true })}
          />
        </p>
        <p>
          <label>Upload Photo</label>
          <br />
          <input
            name="productPhoto"
            type="file"
            onChange={handleImageUpload}
            ref={register({ required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
        </p>

        <input type="submit" />
      </form>
    </div>
  );
};

export default AddProduct;
