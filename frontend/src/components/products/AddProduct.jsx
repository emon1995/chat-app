import React, { useState} from "react";
import styled from "styled-components";
import axios from "axios";
import { addProduct } from "../../utils/APIRoutes";
import Sell from "./Sell";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import SideDrawer from "../miscellaneous/SideDrawer";
import { ChatState } from "../../Context/ChatProvider";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  const toast = useToast();
  const { user } = ChatState();

  // const targetFile = useRef(null);
  // const targetTitle = useRef(null);
  // const targetProduct = useRef(null);
  // const targetPriceName = useRef(null);

  // const onChangeHadler = (e) => {
  //   setTitle(targetTitle.current.value);
  //   setProduct(targetProduct.current.value);
  //   setPrice(targetPriceName.current.value);
  // };

  const onChangeFile = (pics) => {
    // const file = targetFile.current.files[0];
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setFileName(pics);
  };

  

  const changeOnClick = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // const data = JSON.parse(localStorage.getItem("userInfo"))

    formData.append("title", title);
    formData.append("product", product);
    formData.append("price", price);
    formData.append("productImage", fileName);
    formData.append("users", user._id);
    formData.append("username", user.name);
    formData.append("userImage", user.pic);

    setTitle("");
    setProduct("");
    setPrice("");


    axios.post('/products/add/', formData,)
      .then((res) => {
        setMessage(res.data);
        toast({
          title: "Product Add Success!",
          description: `${res.data}`,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error Occured!",
          description: "Failed to Product Add",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <FormContainer>
        <div className="container">
          <h1>Add New Product</h1>
          <span className="message">{message}</span>
          <form onSubmit={changeOnClick} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={title}
                name={title}
                className="form-control"
                placeholder="Title"
                // ref={targetTitle}
                // onChange={onChangeHadler}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                value={price}
                name={price}
                className="form-control"
                placeholder="Price"
                // ref={targetPriceName}
                // onChange={onChangeHadler}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="product details">Product Details</label>
              <textarea
                className="form-control"
                value={product}
                name={product}
                // ref={targetProduct}
                // onChange={onChangeHadler}
                onChange={(e) => setProduct(e.target.value)}
                rows="3"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="file">Choose Product Image</label>
              <input
                type="file"
                name={fileName}
                filename="productImage"
                accept=".png, .jpg, .jpeg"
                className="form-control"
                // ref={targetFile}
                onChange={(e) => onChangeFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn-primary">
              Product Add
            </button>
            <Link
              style={{ textAlign: "center", textDecoration: "none" }}
              to="/chats"
            >
              Back to Home
            </Link>
          </form>
        </div>
      </FormContainer>
      {/* <ToastContainer /> */}
      <div>
        <Sell />
      </div>
    </div>
    </div>
  );
};

const FormContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  h1 {
    color: black;
    text-transform: uppercase;
    text-align: center;
    margin-top: 20px;
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
    padding: 1rem 2rem;
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
      border: 0.1rem solid #997af0;
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

export default AddProduct;
