import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(user);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://little-basket.onrender.com/api/auth/register",
        {
          name: user.name,
          password: user.password,
          email: user.email,
        }
      );
      console.log(res);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="wrapper">
        <h1>Register</h1>
        <div className="content">
          <form>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Full Name"
            />
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email Address"
            />
            <input
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Password"
            />
            <button onClick={handleClick}>Register me!</button>
          </form>
          <Link to="/login" style={{ color: "black", textDecoration: "none" }}>
            <h3>Already Registred?</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
