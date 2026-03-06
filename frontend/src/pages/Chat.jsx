import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getUsers } from "../api/userApi";
import ChatWindow from "../components/ChatWindow";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    socket.emit("join", userId);

    getUsers().then(setUsers);
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <h3>Users</h3>
        {users.map(user => (
          <div key={user._id}>
            <button onClick={() => setSelectedUser(user)}>
              {user.name}
            </button>
          </div>
        ))}
      </div>

      {selectedUser && (
        <ChatWindow socket={socket} selectedUser={selectedUser} />
      )}
    </div>
  );
}