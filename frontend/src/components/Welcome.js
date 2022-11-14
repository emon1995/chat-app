import React from "react";
import Robot from "../assets/robot.gif";
import { ChatState } from "../Context/ChatProvider";
import styled from "styled-components";
import "../index.css";

const Welcome = () => {
    const { user } = ChatState();
    // console.log("chatuser",user);

  return (
    <Container className="welcome" style={{fontSize:"20px", paddingBottom:"3px", fontFamily:"Work sans"}}>
      <img className="img" src={Robot} alt="ime" />
      <h1>
        Welcome, <span className="span">{user.name}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
export default Welcome;
