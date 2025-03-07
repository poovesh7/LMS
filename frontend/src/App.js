import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import axios from "axios";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import InstructorDashboard from "./instructor/InstructorDashboard";
import Course from "./instructor/Course";  // Ensure this import is correct

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get("http://127.0.0.1:8000/api/user/", { 
                headers: { Authorization: `Bearer ${token}` } 
            })
            .then(response => setUser(response.data))
            .catch(() => setUser(null));
        }
    }, []);

    return (
        <Router>
            <Header user={user} setUser={setUser} />
            <div className="container mt-4">
                <Routes>
                    {/* Redirect to dashboard if authenticated, else to login */}
                    <Route path="/" element={user ? <Navigate to="/instructor" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Restrict access to protected routes */}
                    <Route path="/instructor" element={user ? <InstructorDashboard /> : <Navigate to="/login" />} />
                    <Route path="/course" element={user ? <Course /> : <Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
