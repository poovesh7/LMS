import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Added missing import
import { Card, Button } from "react-bootstrap";

const InstructorDashboard = () => {
  const [students, setStudents] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCounts();
  }, []); // Dependency array to run once

  const fetchCounts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/user-counts/"
      );
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Instructor Dashboard</h2>
      <br></br>

      <div className="row g-4 d-flex justify-content-center">
        {/* Total Students */}
        <div className="col-md-6 d-flex justify-content-center">
          <Card className="shadow border-0 w-100 text-center">
            <Card.Body>
              <h5 className="card-title">Total Students</h5>
              <h2 className="text-primary">{students}</h2>
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
