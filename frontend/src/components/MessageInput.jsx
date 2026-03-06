import { useState } from "react";
import { sendMessage } from "../api/messageApi";

export default function MessageInput({ userId, socket }) {

  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text) return;

    try {
      const res = await sendMessage({
        receiver: userId,
        text
      });

      socket.emit("sendMessage", res.data);
      setText("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}