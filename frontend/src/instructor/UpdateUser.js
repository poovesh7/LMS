import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const UpdateUser = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState({ username: '', email: '', role: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Wrap fetchUser with useCallback
    const fetchUser = useCallback(async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/admin/user/${id}/`);
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('Failed to fetch user details.');
        }
    }, [id]);

    useEffect(() => {
        if (state && state.user) {
            setUser(state.user);
        } else {
            fetchUser();
        }
    }, [state, fetchUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/admin/users/${id}/update/`, user);
            setSuccess(true);
            setTimeout(() => navigate('/admin'), 2000);
        } catch (error) {
            console.error('Error updating user:', error);
            setError('Failed to update user.');
        }
    };

    return (
        <Container className="mt-4">
            <h2>Update User</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">User updated successfully!</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" value={user.username} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={user.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Select name="role" value={user.role} onChange={handleChange} required>
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="student">Student</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">Update User</Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/admin')}>Cancel</Button>
            </Form>
        </Container>
    );
};

export default UpdateUser;
