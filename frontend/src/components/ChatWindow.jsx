import { useEffect, useState } from "react";
import { sendMessage, getMessages } from "../api/messageApi";

export default function ChatWindow({ socket, selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!selectedUser) return;

    getMessages(selectedUser._id).then(setMessages);
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receiveMessage", (msg) => {
      if (
        msg.sender === selectedUser._id ||
        msg.receiver === selectedUser._id
      ) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => socket.off("receiveMessage");
  }, [selectedUser]);

  const handleSend = async () => {
    if (!text) return;

    const msg = await sendMessage({
      receiver: selectedUser._id,
      text,
    });

    setMessages(prev => [...prev, msg]);
    setText("");
  };

  return (
    <div>
      <h3>Chat with {selectedUser.name}</h3>

      <div style={{ height: "300px", overflowY: "auto" }}>
        {messages.map(msg => (
          <p key={msg._id}>{msg.text}</p>
        ))}
      </div>

      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}