const express = require('express');
const router = express.Router();

// Hard-coded trivia questions
const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];


let currentQuestionIndex = 0;
let score = 0;
let quizCompleted = false;

// GET /quiz - Start the quiz and display the first question
router.get('/', (req, res) => {
  // Reset quiz state when starting a new quiz
  currentQuestionIndex = 0;
  score = 0;
  quizCompleted = false;
  
  if (currentQuestionIndex < triviaQuestions.length) {
    res.render('question', {
      question: triviaQuestions[currentQuestionIndex].question,
      questionNumber: currentQuestionIndex + 1,
      totalQuestions: triviaQuestions.length
    });
  } else {
    res.send('No questions available');
  }
});

// POST /quiz - Submit an answer and move to the next question
router.post('/', (req, res) => {
  if (quizCompleted) {
    return res.redirect('/quiz/score');
  }
  
  const userAnswer = req.body.answer;
  const correctAnswer = triviaQuestions[currentQuestionIndex].answer;
  
  if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    feedback = 'Correct!';
  } else {
    feedback = `Incorrect! The correct answer is ${correctAnswer}.`;
  }
  
  currentQuestionIndex++;
  
  if (currentQuestionIndex < triviaQuestions.length) {
    res.render('question', {
      question: triviaQuestions[currentQuestionIndex].question,
      questionNumber: currentQuestionIndex + 1,
      totalQuestions: triviaQuestions.length,
      feedback: feedback,
      score: score
    });
  } else {
    quizCompleted = true;
    res.redirect('/quiz/score');
  }
});

// GET /quiz/score - Display final score
router.get('/score', (req, res) => {
  res.render('score', {
    score: score,
    totalQuestions: triviaQuestions.length,
    percentage: Math.round((score / triviaQuestions.length) * 100)
  });
});

module.exports = router;