import { useState } from "react";
import { loginUser } from "../api/userApi";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(form);

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user._id);

    navigate("/chat");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({...form, email:e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password:e.target.value})} />
      <button>Login</button>
      <p><Link to="/register">Register</Link></p>
    </form>
  );
}