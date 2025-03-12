import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Card, Button, Form } from "react-bootstrap";

const StudentQuiz = () => {
  const { id } = useParams(); // Get course ID from URL
  const navigate = useNavigate(); // Hook for navigation
  const [quizzes, setQuizzes] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [hasWrongAnswer, setHasWrongAnswer] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/quizzes/?course=${id}`)
      .then((response) => {
        // Ensure filtering is done in case of incorrect backend response
        const filteredQuizzes = response.data.filter(quiz => quiz.course === parseInt(id));
        setQuizzes(filteredQuizzes);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
      });
  }, [id]);

  const handleOptionSelect = (quizId, option) => {
    setSelectedAnswers({ ...selectedAnswers, [quizId]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const hasWrong = quizzes.some(quiz => selectedAnswers[quiz.id] !== quiz.correct_option);
    setHasWrongAnswer(hasWrong);
    setAllCorrect(!hasWrong); // If no wrong answers, set allCorrect to true
  };

  const handleTryAgain = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setHasWrongAnswer(false);
    setAllCorrect(false);
  };

  const handleNext = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4 text-primary">Quiz for Course</h2>
      {quizzes.length === 0 ? (
        <p className="text-danger text-center">No quizzes available for this course.</p>
      ) : (
        quizzes.map((quiz, index) => (
          <Card key={quiz.id} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title className="fw-bold">
                {index + 1}. {quiz.question}
              </Card.Title>
              <Form>
                {["A", "B", "C", "D"].map((optionKey) => {
                  const isCorrect = submitted && selectedAnswers[quiz.id] === quiz.correct_option;
                  const isWrong = submitted && selectedAnswers[quiz.id] !== quiz.correct_option;
                  return (
                    <Form.Check
                      key={optionKey}
                      type="radio"
                      name={`quiz-${quiz.id}`}
                      label={quiz[`option_${optionKey.toLowerCase()}`]}
                      checked={selectedAnswers[quiz.id] === optionKey}
                      onChange={() => handleOptionSelect(quiz.id, optionKey)}
                      className={`mb-2 ${submitted ? (isCorrect ? "text-success" : isWrong ? "text-danger" : "") : ""}`}
                      disabled={submitted}
                    />
                  );
                })}
              </Form>
            </Card.Body>
          </Card>
        ))
      )}
      {quizzes.length > 0 && (
        <div className="text-center">
          {!submitted && (
            <Button variant="success" size="lg" onClick={handleSubmit}>
              Submit Answers
            </Button>
          )}
          {submitted && hasWrongAnswer && (
            <Button variant="warning" size="lg" onClick={handleTryAgain} className="ms-3">
              Try Again
            </Button>
          )}
          {submitted && allCorrect && (
            <Button variant="primary" size="lg" onClick={handleNext} className="ms-3">
              Next
            </Button>
          )}
        </div>
      )}
    </Container>
  );
};

export default StudentQuiz;
