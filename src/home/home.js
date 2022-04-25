import React, { useState } from 'react';
import './home.scss';
import {Link} from 'react-router-dom';

const Homepage = ({socket}) => {
    const [username, setUsername] = useState("");
    const [roomname, setRoomname] = useState("");

    const sendData = () => {
        if(username !== "" & roomname !== "") {
            socket.emit("joinRoom", {username, roomname});
        }else{
            alert("username and roomname are must !");
        }
    }

  return (
    <div className='homepage'>
        <h1>Welcome to Chatroom 🙏</h1>
        <input placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder='Enter room name' value={roomname} onChange={e => setRoomname(e.target.value)} />
        <Link to={`/chat/${roomname}/${username}`}>
            <button onClick={sendData}>Join</button>
        </Link>
    </div>
  )
}

export default Homepage;