import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import InstructorDashboard from "./instructor/InstructorDashboard";
import Course from "./instructor/Course";
import Topic from "./instructor/Topic";
import Quiz from "./instructor/Quiz";
import Courses from "./student/Courses";
import CourseDetail from "./student/CourseDetail";
import StudentQuiz from "./student/StudentQuiz";

const AppContent = ({ user, setUser }) => {
    const location = useLocation(); 
    const hideHeaderRoutes = ["/login", "/register"]; 

    return (
        <>
            {!hideHeaderRoutes.includes(location.pathname) && <Header user={user} setUser={setUser} />}
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/instructor" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login setUser={setUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/instructor" element={user ? <InstructorDashboard /> : <Navigate to="/login" />} />
                    <Route path="/course" element={<Course />} />
                    <Route path="/topic" element={<Topic />} />
                    <Route path="/quiz" element={<Quiz />} />
                    <Route path="/courses" element={<Courses />} />
                    <Route path="/course/:id" element={<CourseDetail />} />
                    <Route path="/studentquiz" element={<StudentQuiz />} />
                    <Route path="/studentquiz/:id" element={<StudentQuiz />} />
                </Routes>
            </div>
        </>
    );
};

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
            <AppContent user={user} setUser={setUser} />
        </Router>
    );
};

export default App;
