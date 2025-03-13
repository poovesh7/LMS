import React, { useState, useEffect } from "react";
import axios from "axios";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [editingCourse, setEditingCourse] = useState(null);

  // Fetch courses function
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses/");
      setCourses(response.data);
    } catch (error) {
      console.log("Error fetching courses:", error);
    }
  };

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Add or Update Course
  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = { title, price, thumbnail_url: thumbnailUrl };

    try {
      if (editingCourse) {
        await axios.put(`http://127.0.0.1:8000/api/courses/${editingCourse.id}/`, courseData);
        setEditingCourse(null);
      } else {
        await axios.post("http://127.0.0.1:8000/api/courses/", courseData);
      }
      fetchCourses(); // Refresh list after add/update
      setTitle("");
      setPrice("");
      setThumbnailUrl("");
    } catch (error) {
      console.log("Error saving course:", error);
    }
  };

  // Delete Course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.log("Error deleting course:", error);
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
                <button 
                  className="btn btn-success btn-sm me-2 rounded-circle" 
                  onClick={() => {
                    setEditingCourse(course);
                    setTitle(course.title);
                    setPrice(course.price);
                    setThumbnailUrl(course.thumbnail_url);
                  }}
                >
                   <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-danger btn-sm rounded-circle" onClick={() => handleDelete(course.id)}><i className="bi bi-trash3"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Course;
