import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/courses/")
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the courses!", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="my-4 text-center">Available Courses</h2>
      <div className="row">
        {courses.map(course => (
          <div key={course.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={course.thumbnail_url || "default-thumbnail.jpg"} className="card-img-top" alt={course.title} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">Price: ${course.price}</p>
                <Link to={`/course/${course.id}`} className="btn btn-primary">View Course</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
