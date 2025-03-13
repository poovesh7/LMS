import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const About = () => {
    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="p-4 shadow-lg" style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6' }}>
                        <Card.Body>
                            <Card.Title className="text-center mb-4 text-primary">About LMS</Card.Title>
                            <Card.Text className="text-dark">
                                Welcome to <strong>LMS</strong>, your go-to platform for online learning. Our mission is to provide
                                high-quality educational resources that empower students and instructors alike. Whether you're looking
                                to enhance your skills or teach a subject, LMS is the perfect place to start your journey.
                            </Card.Text>
                            <Card className="mb-3" style={{ backgroundColor: '#e3f2fd' }}>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Key Features:</strong>
                                        <ul>
                                            <li>Interactive video lessons</li>
                                            <li>Progress tracking</li>
                                            <li>Quizzes and assessments</li>
                                            <li>Role-based access for students and instructors</li>
                                            <li>Responsive and user-friendly interface</li>
                                        </ul>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card.Text className="text-dark">
                                At LMS, we believe that learning should be accessible to everyone. Our platform is designed to cater
                                to students from all backgrounds, providing courses in various disciplines such as technology, business,
                                arts, science, and more. Whether you are a beginner or an advanced learner, our extensive catalog of courses
                                will help you achieve your academic and professional goals.
                            </Card.Text>
                            <Card className="mb-3" style={{ backgroundColor: '#e9ecef' }}>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Why Choose LMS?</strong>
                                        <ul>
                                            <li>Expert instructors with real-world experience</li>
                                            <li>Flexible learning schedule</li>
                                            <li>Interactive and hands-on learning approach</li>
                                            <li>Certificates of completion to boost career prospects</li>
                                            <li>Dedicated support team to assist learners</li>
                                            <li>Community-driven learning environment</li>
                                        </ul>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Card.Text className="text-dark">
                                <strong>Our Vision</strong>
                                <br/>
                                LMS envisions a future where education is not confined within traditional classrooms but is available
                                to learners worldwide. We aim to bridge the gap between education and technology by providing a seamless
                                online learning experience that is both efficient and enjoyable.
                            </Card.Text>
                            <Card className="mb-3" style={{ backgroundColor: '#fff3cd' }}>
                                <Card.Body>
                                    <Card.Text>
                                        <strong>Join LMS Today!</strong>
                                        <br/>
                                        Whether you are a student eager to learn, a professional looking to upskill, or an educator wanting to
                                        share your knowledge, LMS has something for you. Sign up today and be part of a growing community dedicated
                                        to lifelong learning and success.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
