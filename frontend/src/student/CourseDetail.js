import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/courses/${id}/`)
      .then((response) => setCourse(response.data))
      .catch((error) => console.error("Error fetching course:", error));

    axios
      .get(`http://127.0.0.1:8000/api/topics/`)
      .then((response) => setTopics(response.data))
      .catch((error) => console.error("Error fetching topics:", error));
  }, [id]);

  // Helper function to extract YouTube video ID from URL
  const extractYouTubeID = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/embed\/|.*\/v\/|.*\/watch\?v=|.*\/shorts\/|.*&v=))([^?&"'>]+)/
    );
    return match ? match[1] : null;
  };

  if (!course) return <h2>Loading...</h2>;

  // Filter topics belonging to this course
  const courseTopics = topics.filter((topic) => topic.course === parseInt(id));

  return (
    <Container className="my-2">
      <h2 className="text-center mb-4">{course.title}</h2>

      <Row>
        {/* Left Side: Main Video */}
        <Col md={8}>
          {courseTopics.length > 0 && (
            <Card className="mb-3" border="0">
              <Card.Body>
                <Card.Title>{courseTopics[0].title}</Card.Title>
                {extractYouTubeID(courseTopics[0].video) ? (
                  <iframe
                    width="100%"
                    height="400"
                    src={`https://www.youtube.com/embed/${extractYouTubeID(
                      courseTopics[0].video
                    )}`}
                    title={courseTopics[0].title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <p>Invalid YouTube URL</p>
                )}
                <Card.Text>{course.description}</Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* Right Side: List of Other Topics */}
        <Col md={4}>
          <h4>Other Topics</h4>
          <ListGroup>
            {courseTopics.slice(1).map((topic) => (
              <ListGroup.Item key={topic.id} className="p-0 border-0">
                <Card border="0">
                  <Card.Body>
                    <Card.Title>{topic.title}</Card.Title>
                    {extractYouTubeID(topic.video) ? (
                      <iframe
                        width="100%"
                        height="200"
                        src={`https://www.youtube.com/embed/${extractYouTubeID(
                          topic.video
                        )}`}
                        title={topic.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <p>Invalid YouTube URL</p>
                    )}
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button href={`/progress/${id}`} variant="primary">
          Track Progress
        </Button>
        <Button href={`/quiz/${id}`} variant="success">
          Take Quiz
        </Button>
      </div>
    </Container>
  );
}

export default CourseDetail;
