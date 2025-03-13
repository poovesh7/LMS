import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Card, Container, Row, Col, Button } from 'react-bootstrap';

const AdminDashboard = () => {
    const [instructors, setInstructors] = useState(0);
    const [students, setStudents] = useState(0);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCounts();
        fetchUsers();
    }, []);

    const fetchCounts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/user-counts/');
            setInstructors(response.data.instructors);
            setStudents(response.data.students);
        } catch (error) {
            console.error('Error fetching counts:', error);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/admin/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleCreateAccount = () => {
        navigate('/account');
    };

    const handleUpdate = (user) => {
        navigate(`/update-user/${user.id}`, { state: { user } });
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/admin/users/${userId}/delete/`); // Updated path
                setUsers(users.filter(user => user.id !== userId));  // Remove from UI
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Instructors</Card.Title>
                            <h3 className="text-primary">{instructors}</h3>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Total Students</Card.Title>
                            <h3 className="text-primary">{students}</h3>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleUpdate(user)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default AdminDashboard;
