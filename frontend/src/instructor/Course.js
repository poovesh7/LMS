import React, { useState, useEffect } from "react";
import axios from "axios";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);

  // Fetch courses
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/courses/")
      .then(response => setCourses(response.data))
      .catch(error => console.log(error));
  }, []);

  // Add or Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title,
      price,
      thumbnail_url: thumbnailUrl,  // Change to URL field
    };

    try {
      if (editingCourse) {
        await axios.put(`http://127.0.0.1:8000/api/courses/${editingCourse.id}/`, courseData);
        setEditingCourse(null);
      } else {
        await axios.post("http://127.0.0.1:8000/api/courses/", courseData);
      }
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{editingCourse ? "Edit Course" : "Add Course"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Thumbnail URL</label>
          <input type="text" className="form-control" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} placeholder="Enter image URL" required />
        </div>
        <button type="submit" className="btn btn-primary">{editingCourse ? "Update" : "Add"} Course</button>
      </form>

      <h3 className="mt-5">Courses List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td>{course.title}</td>
              <td>${course.price}</td>
              <td>
                {course.thumbnail_url ? <img src={course.thumbnail_url} alt={course.title} width="100" /> : "No Image"}
              </td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => { setEditingCourse(course); setTitle(course.title); setPrice(course.price); setThumbnailUrl(course.thumbnail_url); }}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
