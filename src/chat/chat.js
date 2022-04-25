import React, { useEffect, useRef, useState } from 'react';
import './chat.scss';
import { DoEncrypt, DoDecrypt } from '../aes';
import { useDispatch } from 'react-redux';
import { process } from '../store/action/index';

const Chat = ({ username, roomname, socket }) => {
  const [text, setText] = useState('');
  const [message, setMessage] = useState([]);

  const dispatch = useDispatch();

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher));
  };

  useEffect(() => {
    socket.on('message', (data) => {
      // decrypt
      const ans = DoDecrypt(data.text, data.username);
      dispatchProcess(false, ans, data.text);
      console.log(ans);
      let temp = message;
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      });
      setMessage([...temp]);
    });
  }, [socket]);

  const sendData = () => {
    if (text !== '') {
      // encrypt
      const ans = DoEncrypt(text);
      socket.emit('chat', ans);
      setText('');
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [message]);

  console.log(message, 'mess');

  return (
    <div className='chat'>
      <div className='user-name'>
        <h2>
          {username} <span style={{ fontSize: '0.7rem' }}>in {roomname}</span>
        </h2>
      </div>
      <div className='chat-message'>
        {message.map((i) => {
          if (i.username === username) {
            return (
              <div className='message'>
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          } else {
            return (
              <div className='message mess-right'>
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            );
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className='send'>
        <input
          placeholder='Enter your message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendData();
            }
          }}
        />
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
