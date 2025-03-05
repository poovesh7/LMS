import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        formData
      );
      localStorage.setItem("token", res.data.access);
      setUser(res.data.user);
      alert(`Logged in as ${res.data.user.role}`);
      window.location.href = "/dashboard";
    } catch (error) {
      setErrorMessage(
        error.response?.data?.detail || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center text-success">Login</h2>
        {errorMessage && (
          <p className="text-danger text-center">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
        </form>
        <div>
            <br></br>
          <p className="ms-5">
            Don't have an account?{" "}
            <a href="/register" className="text-primary">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
