import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { singleProduct, updateProduct } from "../../utils/APIRoutes";
import { Link, useParams } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import SideDrawer from "../miscellaneous/SideDrawer";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const EditProduct = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const { pId } = useParams();

  const toast = useToast();
  const { user } = ChatState();

  let targetFile = useRef(null);
  const targetTitle = useRef(null);
  const targetProduct = useRef(null);
  const targetPriceName = useRef(null);

  const onChangeHadler = (e) => {
    setTitle(targetTitle.current.value);
    setProduct(targetProduct.current.value);
    setPrice(targetPriceName.current.value);
  };

  const onChangeFile = (e) => {
    const file = targetFile.current.files[0];
    setFileName(file);
  };

  const changeOnClick = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("product", product);
    formData.append("price", price);
    formData.append("productImage", fileName);

    setTitle("");
    setProduct("");
    setPrice("");

    axios
      .put(`${updateProduct}${pId}`, formData)
      .then((res) => setMessage(res.data))
      .catch((err) => {
        toast({
          title: "Error Occured!",
          description: "Failed to Product Update",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  useEffect(() => {
    axios
      .get(`${singleProduct}${pId}`)
      .then((res) => [
        setTitle(res.data.title),
        setProduct(res.data.product),
        setPrice(res.data.price),
        setFileName(res.data.productImage),
      ])
      .catch((err) => {
        toast({
          title: "Error Occured!",
          description: "Failed to Product fetch",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  }, [pId, toast]);

  return (
    <div>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <FormContainer>
          <div className="container">
            <div className="brand">
              <h1>Update Product</h1>
              <span className="message">{message}</span>
            </div>
            <form onSubmit={changeOnClick} encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  value={title}
                  className="form-control"
                  placeholder="Title"
                  ref={targetTitle}
                  onChange={onChangeHadler}
                  // onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  value={price}
                  className="form-control"
                  placeholder="Price"
                  ref={targetPriceName}
                  onChange={onChangeHadler}
                  // onChange={(e) => setAuthorname(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="product details">Product Details</label>
                <textarea
                  className="form-control"
                  value={product}
                  ref={targetProduct}
                  onChange={onChangeHadler}
                  // onChange={(e) => setProduct(e.target.value)}
                  rows="3"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="file">Choose Product Image</label>
                <input
                  type="file"
                  filename="productImage"
                  className="form-control"
                  ref={targetFile}
                  onChange={onChangeFile}
                />
              </div>
              <button type="submit" className="btn-primary">
                Product Update
              </button>
              <Link
                style={{ textAlign: "center", textDecoration: "none" }}
                to="/addProduct"
              >
                Back to Add Product
              </Link>
            </form>
          </div>
        </FormContainer>
      </div>
    </div>
    // <ToastContainer />
  );
};

const FormContainer = styled.div`
  height: 110vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  h1 {
    color: white;
    text-transform: uppercase;
    text-align: center;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    border-radius: 2rem;
    padding: 1rem 3rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  textarea {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid black;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default EditProduct;
