import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { deleteProduct, sellProduct } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";

const Sell = () => {
  const [posts, setPosts] = useState([]);
  const [product, setProduct] = useState([]);
  const [userName, setUserName] = useState();
  const [userImage, setUserImage] = useState();
  // const [userEmail, setUserEmail] = useState();

  //DELETE PRODUCT BY ID
  const deleteProducts = (id) => {
    axios
      .delete(`${deleteProduct}${id}`)
      .then((res) => alert(res.data))
      .catch((err) => console.log(err));
    setProduct(product.filter((elem) => elem._id !== id));
  };

  useEffect(() => {
    async function mydata() {
      const dataP = JSON.parse(localStorage.getItem("userInfo"));

      await axios
        .get(`${sellProduct}${dataP._id}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.log(err));
    }

    mydata();
  });

  useEffect(() => {
      const data = JSON.parse(localStorage.getItem("userInfo"));
      if (data) {
        setUserName(data.name);
        setUserImage(data.pic);
        // setUserEmail(data.email);
      }
  }, []);

  return (
    <Maincontainer>
      <div className="container">
        {!posts.length ? (
          <img src={loader} alt="loading..." />
        ) : (
          posts.map((post, key) => {
            // console.log("product", post.product);
            return (
              <div className="card" key={key}>
                <div className="card-header">
                  <img src={`${post.productImage}`} alt="rover" />
                </div>
                <div className="card-body">
                  <span className="tag tag-teal">৳ {post.price}</span>
                  <h4>{post.title}</h4>
                  <p>{post.product}</p>
                  <div
                    className="d-flex"
                    style={{
                      display: "flex",
                    }}
                  >
                    <Link
                      className="btn-success"
                      to={`/edit/${post._id}`}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "blue",
                        padding: "8px",
                        borderRadius: "5px",
                        marginRight: "5px",
                        alignItems: "center",
                      }}
                    >
                      {" "}
                      Edit Product
                    </Link>
                    <div>
                      <div
                        className="btn-danger"
                        onClick={() => deleteProducts(post._id)}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          backgroundColor: "red",
                          padding: "0.5rem",
                          borderRadius: "5px",
                          marginLeft: "5px",
                          cursor: "pointer",
                        }}
                      >
                        {" "}
                        Delete Product
                      </div>
                    </div>
                  </div>
                </div>
                <div className="user">
                  <img
                    src={`${userImage}`}
                    alt="userImage"
                  />
                  <div className="user-info">
                    <h5>{userName}</h5>
                    <small>{post.updatedAt}</small>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Maincontainer>
  );
};

const Maincontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  font-family: "Roboto", sans-serif;
  color: #10182f;
  .container {
    display: flex;

    justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .card {
    margin: 10px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    width: 300px;
  }
  .card-header img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 20px;
    min-height: 250px;
  }

  .tag {
    background: #cccccc;
    border-radius: 50px;
    font-size: 12px;
    margin: 0;
    color: #fff;
    padding: 2px 10px;
    text-transform: uppercase;
    cursor: pointer;
  }
  .tag-teal {
    background-color: #47bcd4;
  }
  .tag-purple {
    background-color: #5e76bf;
  }
  .tag-pink {
    background-color: #cd5b9f;
  }

  .card-body p {
    font-size: 13px;
    margin: 0 0 40px;
  }
  .user {
    display: flex;
    margin-top: auto;
    margin-left: 15px;
    margin-bottom: 15px;
  }

  .user img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  .user-info h5 {
    margin: 0;
  }
  .user-info small {
    color: #545d7a;
  }
`;

export default Sell;
