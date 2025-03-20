import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, ProgressBar, Card, Button } from "react-bootstrap";

function Progress() {
  const { id } = useParams();
  const [topics, setTopics] = useState([]);
  const [completedTopics, setCompletedTopics] = useState([]);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/topics/`)
      .then((response) => {
        const courseTopics = response.data.filter(
          (topic) => topic.course === parseInt(id)
        );
        setTopics(courseTopics);
      })
      .catch((error) => console.error("Error fetching topics:", error));

    axios
      .get(`http://127.0.0.1:8000/api/progress/${id}/`)
      .then((response) => {
        setCompletedTopics(response.data.completedTopics || []);
      })
      .catch((error) => console.error("Error fetching progress:", error));
  }, [id]);

  const handleComplete = (topicId) => {
    if (!completedTopics.includes(topicId)) {
      const updatedCompletedTopics = [...completedTopics, topicId];
      setCompletedTopics(updatedCompletedTopics);

      axios
        .post(`http://127.0.0.1:8000/api/progress/${id}/`, {
          completedTopics: updatedCompletedTopics,
        })
        .catch((error) => console.error("Error updating progress:", error));
    }
  };

  const progressPercentage = topics.length
    ? (completedTopics.length / topics.length) * 100
    : 0;

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Course Progress</h2>
      <ProgressBar now={progressPercentage} label={`${Math.round(progressPercentage)}%`} />
      {topics.map((topic) => (
        <Card key={topic.id} className="my-3 p-3 shadow-sm">
          <Card.Body>
            <Card.Title>{topic.title}</Card.Title>
            <Button
              variant={completedTopics.includes(topic.id) ? "success" : "primary"}
              onClick={() => handleComplete(topic.id)}
              disabled={completedTopics.includes(topic.id)}
            >
              {completedTopics.includes(topic.id) ? "Completed" : "Mark as Completed"}
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Progress;