import React, { useState, useEffect } from "react";
import axios from "axios";

const Topic = () => {
  const [topics, setTopics] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [editingTopic, setEditingTopic] = useState(null);

  // Fetch Topics
  const fetchTopics = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/topics/");
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  // Fetch Courses (for dropdown)
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchTopics();
    fetchCourses();
  }, []);

  // Add or Update Topic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const topicData = { course: courseId, title, description, video };

    try {
      if (editingTopic) {
        await axios.put(`http://127.0.0.1:8000/api/topics/${editingTopic.id}/`, topicData);
        setEditingTopic(null);
      } else {
        await axios.post("http://127.0.0.1:8000/api/topics/", topicData);
      }
      fetchTopics();
      setCourseId("");
      setTitle("");
      setDescription("");
      setVideo("");
    } catch (error) {
      console.error("Error saving topic:", error);
    }
  };

  // Delete Topic
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/topics/${id}/`);
      setTopics(topics.filter(topic => topic.id !== id));
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  // Function to extract YouTube Video ID
  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?.+v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : null;
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{editingTopic ? "Edit Topic" : "Add Topic"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Course</label>
          <select 
            className="form-select" 
            value={courseId} 
            onChange={(e) => setCourseId(e.target.value)} 
            required
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">YouTube Video URL</label>
          <input 
            type="text" 
            className="form-control" 
            value={video} 
            onChange={(e) => setVideo(e.target.value)} 
            placeholder="Enter video URL" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingTopic ? "Update" : "Add"} Topic
        </button>
      </form>

      <h3 className="mt-5">Topics List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Course</th>
            <th>Title</th>
            <th>Description</th>
            <th>Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.map(topic => (
            <tr key={topic.id}>
              <td>
                {courses.find(course => course.id === topic.course)?.title || "No Course"}
              </td>
              <td>{topic.title}</td>
              <td>{topic.description}</td>
              <td>
                {topic.video && getYouTubeEmbedUrl(topic.video) ? (
                  <iframe
                    width="200"
                    height="120"
                    src={getYouTubeEmbedUrl(topic.video)}
                    title="YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  "No Video"
                )}
              </td>
              <td>
                <button 
                  className="btn btn-warning btn-sm me-2" 
                  onClick={() => {
                    setEditingTopic(topic);
                    setCourseId(topic.course);
                    setTitle(topic.title);
                    setDescription(topic.description);
                    setVideo(topic.video);
                  }}
                >
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(topic.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Topic;
