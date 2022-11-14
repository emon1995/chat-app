import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { singleProduct } from "../../utils/APIRoutes";

const Product = () => {
  const [title, setTitle] = useState("");
  const [product, setProduct] = useState("");
  const [authorname, setAuthorname] = useState("");
  const [productImage, setProductImage] = useState("");

  const { pId } = useParams();
  console.log("pid", pId);

  useEffect(() => {
    axios
      .get(`${singleProduct}${pId}`)
      .then((res) => [
        setTitle(res.data.title),
        setProduct(res.data.product),
        setAuthorname(res.data.authorname),
        setProductImage(res.data.productImage),
      ])
      .catch((err) => console.log(err));
  }, [pId]);

  return (
    <FormContainer>
      {!title || !product || !authorname ? (
        <img src="" alt="loading..." />
      ) : (
        <div>
          <img src={`/images/${productImage}`} alt="product" />
          <h1>{title}</h1>
          <p>{product}</p>
          <p>{authorname}</p>
          <br />
          <Link to="/">
              Back to Home
          </Link>
        </div>
      )}
    </FormContainer>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
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
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
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
    color: white;
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

export default Product;
