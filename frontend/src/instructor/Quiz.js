import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";

const Quiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [courses, setCourses] = useState([]);
    const [topics, setTopics] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [quizData, setQuizData] = useState({
        course: "",
        topic: "",
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_option: "", // Default to A
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchQuizzes();
        fetchCourses();
        fetchTopics();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/quizzes/");
            setQuizzes(response.data);
        } catch (error) {
            console.error("Error fetching quizzes", error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/courses/");
            setCourses(response.data);
        } catch (error) {
            console.error("Error fetching courses", error);
        }
    };

    const fetchTopics = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/topics/");
            setTopics(response.data);
        } catch (error) {
            console.error("Error fetching topics", error);
        }
    };

    const handleShow = (quiz = null) => {
        if (quiz) {
            setQuizData(quiz);
            setEditId(quiz.id);
            setFilteredTopics(topics.filter(topic => topic.course === quiz.course));
        } else {
            setQuizData({
                course: "",
                topic: "",
                question: "",
                option_a: "",
                option_b: "",
                option_c: "",
                option_d: "",
                correct_option: "",
            });
            setEditId(null);
            setFilteredTopics([]);
        }
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizData({ ...quizData, [name]: value });

        if (name === "course") {
            const filtered = topics.filter(topic => topic.course.toString() === value);
            setFilteredTopics(filtered);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://127.0.0.1:8000/api/quizzes/${editId}/`, quizData);
            } else {
                await axios.post("http://127.0.0.1:8000/api/quizzes/", quizData);
            }
            fetchQuizzes();
            handleClose();
        } catch (error) {
            console.error("Error saving quiz", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/quizzes/${id}/`);
            fetchQuizzes();
        } catch (error) {
            console.error("Error deleting quiz", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Quiz Management</h2>
            <Button variant="primary" onClick={() => handleShow()}>Add Quiz</Button>
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Course</th>
                        <th>Topic</th>
                        <th>Question</th>
                        <th>Options</th>
                        <th>Correct Answer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {quizzes.map((quiz, index) => (
                        <tr key={quiz.id}>
                            <td>{index + 1}</td>
                            <td>{courses.find(course => course.id === quiz.course)?.title || "N/A"}</td>
                            <td>{topics.find(topic => topic.id === quiz.topic)?.title || "N/A"}</td>
                            <td>{quiz.question}</td>
                            <td>
                                A: {quiz.option_a}, B: {quiz.option_b}, C: {quiz.option_c}, D: {quiz.option_d}
                            </td>
                            <td style={{ backgroundColor: "#2ec958" }}>{quiz.correct_option}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShow(quiz)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(quiz.id)} className="ms-2">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit Quiz" : "Add Quiz"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Select Course</Form.Label>
                            <Form.Select name="course" value={quizData.course} onChange={handleChange} required>
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>{course.title}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Select Topic</Form.Label>
                            <Form.Select name="topic" value={quizData.topic} onChange={handleChange} required>
                                <option value="">Select Topic</option>
                                {filteredTopics.length > 0 ? (
                                    filteredTopics.map((topic) => (
                                        <option key={topic.id} value={topic.id}>{topic.title}</option>
                                    ))
                                ) : (
                                    <option disabled>No topics available</option>
                                )}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Question</Form.Label>
                            <Form.Control type="text" name="question" value={quizData.question} onChange={handleChange} required />
                        </Form.Group>

                        {["A", "B", "C", "D"].map((option) => (
                            <Form.Group className="mb-3" key={option}>
                                <Form.Label>Option {option}</Form.Label>
                                <Form.Control type="text" name={`option_${option.toLowerCase()}`} value={quizData[`option_${option.toLowerCase()}`]} onChange={handleChange} required />
                            </Form.Group>
                        ))}

                        <Form.Group className="mb-3">
                            <Form.Label>Correct Option</Form.Label>
                            <Form.Select name="correct_option" value={quizData.correct_option} onChange={handleChange} required>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit">{editId ? "Update" : "Add"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Quiz;
