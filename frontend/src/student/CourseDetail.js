import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Card, ListGroup, Button, Row, Col } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [completedItems, setCompletedItems] = useState(0);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/courses/${id}/`)
      .then((response) => setCourse(response.data))
      .catch((error) => console.error("Error fetching course:", error));

    axios
      .get(`http://127.0.0.1:8000/api/topics/`)
      .then((response) => {
        const courseTopics = response.data.filter(
          (topic) => topic.course === parseInt(id)
        );
        setTopics(courseTopics);
        if (courseTopics.length > 0) {
          setCurrentTopic(courseTopics[0]);
          setTopics(courseTopics.slice(1));
        }
      })
      .catch((error) => console.error("Error fetching topics:", error));
  }, [id]);

  const extractYouTubeID = (url) => {
    const match = url?.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/embed\/|.*\/v\/|.*\/watch\?v=|.*\/shorts\/|.*&v=))([^?&"'>]+)/i
    );
    return match ? match[1] : null;
  };

  if (!course || !currentTopic) return <h2>Loading...</h2>;

  const handleTopicClick = (selectedTopic) => {
    setTopics((prevTopics) => {
      const updatedTopics = prevTopics.filter((topic) => topic.id !== selectedTopic.id);
      return [...updatedTopics, currentTopic];
    });
    setCurrentTopic(selectedTopic);
    setCompletedItems((prev) => prev + 1);
  };

  const calculateCompletionPercentage = () => {
    return (completedItems / (topics.length + completedItems)) * 100;
  };

  return (
    <Container className="my-2">
      <h2 className="text-center mb-4">{course.title}</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-3" border="0">
            <div style={{ position: "relative", width: "100%", height: "400px" }}>
              {extractYouTubeID(currentTopic.video) && (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${extractYouTubeID(currentTopic.video)}?autoplay=1`}
                  title={currentTopic.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ borderRadius: "12px", overflow: "hidden" }}
                ></iframe>
              )}
            </div>
            <Card.Body>
              <Card.Title>{currentTopic.title}</Card.Title>
              <h4>Description:</h4>
              <Card.Text>{currentTopic.description}</Card.Text>
            </Card.Body>
            <div className="mt-4 d-flex flex-column align-items-center">
        <h5>Completion Progress</h5>
        <div style={{ width: 100, height: 100 }}>
          <CircularProgressbar
            value={calculateCompletionPercentage()}
            text={`${calculateCompletionPercentage().toFixed(2)}%`}
            styles={buildStyles({
              textSize: "16px",
              pathColor: "#28a745",
              textColor: "#000",
              trailColor: "#d6d6d6",
            })}
          />
        </div>
      </div>
          </Card>
        </Col>
        <Col md={4}>
          <h4>Other Topics</h4>
          <ListGroup>
            {topics.map((topic) => (
              <ListGroup.Item
                key={topic.id}
                className="p-0 border-0"
                action
                onClick={() => handleTopicClick(topic)}
              >
                <Card border="0" className="shadow-sm rounded-3">
                  <Card.Body>
                    <Card.Title>{topic.title}</Card.Title>
                    <div style={{ position: "relative", width: "100%", height: "200px" }}>
                      <img
                        className="shadow-sm rounded-3"
                        src={course.thumbnail_url || "default-thumbnail.jpg"}
                        alt={course.title}
                        style={{ width: "100%", height: "200px", objectFit: "cover", cursor: "pointer" }}
                        onClick={(e) => {
                          e.target.style.display = "none";
                          document.getElementById(`video-frame-${topic.id}`).style.display = "block";
                        }}
                      />
                      {extractYouTubeID(topic.video) && (
                        <iframe
                          id={`video-frame-${topic.id}`}
                          width="100%"
                          height="200"
                          src={`https://www.youtube.com/embed/${extractYouTubeID(topic.video)}`}
                          title={topic.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: "12px", overflow: "hidden", display: "none" }}
                        ></iframe>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button href={`/studentquiz/${id}`} variant="success">
          Take Quiz
        </Button>
        
      </div>
      {/* Circular Progress Bar */}
     
    </Container>
  );
}

export default CourseDetail;
