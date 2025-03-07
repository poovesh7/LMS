import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const InstructorDashboard = () => {
    const navigate = useNavigate();
    
    // Dummy state for students count and login count (Replace with API data)
    const [totalStudents, setTotalStudents] = useState(0);
    const [loginCount, setLoginCount] = useState(0);

    useEffect(() => {
        // Fetch total students from API (Replace with actual API call)
        fetch("/api/students-count")
            .then((response) => response.json())
            .then((data) => setTotalStudents(data.count))
            .catch((error) => console.error("Error fetching students:", error));

        // Fetch login count from API (Replace with actual API call)
        fetch("/api/instructor-login-count")
            .then((response) => response.json())
            .then((data) => setLoginCount(data.count))
            .catch((error) => console.error("Error fetching login count:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="text-center">Instructor Dashboard</h2>
            
            <div className="row g-4">
                {/* Total Students */}
                <div className="col-md-6">
                    <Card className="shadow border-0">
                        <Card.Body>
                            <h5 className="card-title">Total Students</h5>
                            <h2 className="text-primary">{totalStudents}</h2>
                        </Card.Body>
                    </Card>
                </div>

                {/* Login Count */}
                <div className="col-md-6">
                    <Card className="shadow border-0">
                        <Card.Body>
                            <h5 className="card-title">Total Logins</h5>
                            <h2 className="text-success">{loginCount}</h2>
                        </Card.Body>
                    </Card>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-center mt-4 gap-3">
                <Button variant="primary" onClick={() => navigate("/topic")}>
                    Add Topic
                </Button>
                <Button variant="success" onClick={() => navigate("/course")}>
                    Course
                </Button>
                <Button variant="warning" onClick={() => navigate("/quiz")}>
                    Add Quiz
                </Button>
            </div>
        </div>
    );
};

export default InstructorDashboard;
