import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'student' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/register/', formData);
            alert("Registered successfully!");
        } catch (error) {
            alert("Registration failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center text-success">Create a Accounts</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input className="form-control" name="username" placeholder="Username" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <select className="form-select" name="role" onChange={handleChange}>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
