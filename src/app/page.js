'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });
    const channel = pusher.subscribe('chat');
    channel.bind('message', newMessage => {
      console.log(newMessage)
      setMessages([...messages, newMessage]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  const sendMessage = async (event) => {
    event.preventDefault();
    console.log('TEXT',text)
    const payload = { text, user: "user1" }; // hardcoded user
    console.log(payload)
    await axios.post('/api/message', payload);
    setText("");
  };
  return (
    <div>
      {messages.map((message, i) => (
        <p key={i}>
          <strong>{message.user}:</strong> {message.text}
          12:36
        </p>
      ))}
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}