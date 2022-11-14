import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import styled from "styled-components";
import { showProduct } from "../../utils/APIRoutes";
import loader from "../../assets/loader.gif";
// import { ArrowBackIcon } from "@chakra-ui/icons";
import SideDrawer from "../miscellaneous/SideDrawer";
import { ChatState } from "../../Context/ChatProvider";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


const Buy = () => {
  const [posts, setPosts] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();

  const { setSelectedChat, user, chats, setChats } = ChatState();
  // console.log("pro user", user._id);
  // chat
  const accessChat = async (userId) => {
    // console.log(userId);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    axios
      .get(showProduct)
      .then((res) => {
        // console.log("show product", res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Maincontainer>
          <div className="container">
            {!posts.length ? (
              <img className="loader" src={loader} alt="loading..." />
            ) : (
              posts.map((post, key) => {
                // let userLogId = userLog.map(user => user._id);
                return (
                  <div className="card" key={key}>
                    <div className="card-header">
                      <img src={`${post.productImage}`} alt="rover" />
                    </div>
                    <div className="card-body">
                      <span className="tag tag-teal">৳ {post.price}</span>
                      <h4>{post.title}</h4>
                      <p>{post.product}</p>
                      <div className="d-flex" style={{ alignItems: "center" }}>
                        <div className="bg">
                          {user._id === post.users ? (
                            <Button isDisabled colorScheme="teal">
                              Biding Product
                            </Button>
                          ) : (
                            <Button
                              className="btn btn-success"
                              onClick={() => accessChat(post.users)}
                              colorScheme="teal"
                            >
                              Biding Product
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="user">
                        <img src={`${post.userImage}`} alt="userImage" />
                        <div className="user-info">
                          <h5>{post.username}</h5>
                          <small>{post.updatedAt}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Maincontainer>
      </div>
    </div>
  );
};

// const LinkTag = styled.div`
//   text-align: center;
//   padding: 10px;
// `;

const Maincontainer = styled.div`
  width: 100vw;
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
    background-color: #fff;
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
    margin-top: 40px;
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

export default Buy;
