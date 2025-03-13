import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Card, Container, Row, Col, Button } from 'react-bootstrap';

const AdminDashboard = () => {
    const [instructors, setInstructors] = useState(0);
    const [students, setStudents] = useState(0);
    const [users, setUsers] = useState([]);
    const [progressData, setProgressData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCounts();
        fetchUsers();
        fetchProgress();
    }, []);

    const fetchCounts = async () => {
        try {
            const response = await axios.get('/api/admin/user-counts/');
            setInstructors(response.data.instructors);
            setStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/admin/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchProgress = async () => {
        try {
            const response = await axios.get('/api/admin/progress/');
            setProgressData(response.data);
        } catch (error) {
            console.error('Error fetching progress data:', error);
        }
    };

    const handleCreateAccount = () => {
        navigate('/account');
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Instructors</Card.Title>
                            <h3>{instructors}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Students</Card.Title>
                            <h3>{students}</h3>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h4 className="mt-4">Account Management</h4>
            <Button variant="primary" className="mb-3" onClick={handleCreateAccount}>Create Account</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h4 className="mt-4">Student Progress</h4>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Course</th>
                        <th>Progress (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {progressData.map(progress => (
                        <tr key={progress.id}>
                            <td>{progress.student_name}</td>
                            <td>{progress.course}</td>
                            <td>{progress.progress}%</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminDashboard;
