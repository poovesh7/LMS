import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, ProgressBar, Card } from "react-bootstrap";

function TrackProgress() {
  const { id } = useParams();
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/progress/${id}/`)
      .then((response) => setProgress(response.data))
      .catch((error) => console.error("Error fetching progress:", error));
  }, [id]);

  if (!progress) return <h2>Loading progress...</h2>;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Your Progress</h2>
      <Card className="p-4 shadow-sm">
        <h5>Course: {progress.course_title}</h5>
        <ProgressBar now={progress.percentage} label={`${progress.percentage}%`} />
      </Card>
    </Container>
  );
}

export default TrackProgress;
