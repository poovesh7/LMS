
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get("http://127.0.0.1:8000/api/user/", { headers: { Authorization: `Bearer ${token}` } })
                .then(response => setUser(response.data))
                .catch(() => setUser(null));
        }
    }, []);

    return (
        <Router>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
