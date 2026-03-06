import { useEffect, useState } from "react";
import { getUsers } from "../api/userApi";
import { useNavigate } from "react-router-dom";

export default function ChatList() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getUsers();
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div style={{ width: "30%", borderRight: "1px solid gray" }}>
      <h2>Chat List</h2>
      {users.map((user) => (
        <div
          key={user._id}
          style={{ padding: "10px", cursor: "pointer" }}
          onClick={() => navigate(`/chat/${user._id}`)}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}