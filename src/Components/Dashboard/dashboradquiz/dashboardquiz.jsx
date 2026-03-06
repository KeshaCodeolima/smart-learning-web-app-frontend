import { useState } from 'react';
import './dashboardquiz.css';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Dashboardquiz() {
    const [quiznote, setQuiznote] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({})
    const [isloading, setIsLoading] = useState(false);

    const handlequiz = async () => {
        if (!quiznote)
            return alert('Please Add Some Note to Create Quiz')

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/quiz', { text: quiznote })
            const quizData = JSON.parse(response.data.quiz);
            setQuiz(quizData);

        } catch (error) {
            console.error("Error Quiz:", error);
            alert("Something went wrong with Quiz")
        } finally {
            setIsLoading(false);
        }
    }
    const handleSelect = (questionIndex, option) => {
        setAnswers({ ...answers, [questionIndex]: option });
    }

    const handleExitQuiz = () => {
        setQuiz([]);
        setQuiznote('');
        setAnswers({});
    }

    return (
        <>
            <div className="quizmain">
                <h2>{quiz.length > 0 ? 'Quiz in Progress' : 'Create New Quiz'} </h2>
                <div className="quizmain2">
                    <div className="quiznormal">
                        {quiz.length === 0 ? (
                            <>
                                <span>Create New Quiz</span>
                                <input type="text" placeholder='Quiz Title' />
                                <textarea
                                    placeholder='Add Question / Prompt here...'
                                    className='inputbox'
                                    rows="4"
                                    onChange={(e) => setQuiznote(e.target.value)}
                                />
                                <button onClick={handlequiz} disabled={isloading}>
                                    {isloading ? 'Generating Quiz...' : 'Create Quiz'}
                                </button>
                            </>
                        ) : (
                            <div className="quiz-container">
                                <div className="quiz-result">
                                    {quiz.map((q, index) => (
                                        <div key={index} className="quiz-question">
                                            <h3>{index + 1}. {q.question}</h3>
                                            {q.options.map((opt, i) => (
                                                <label key={i} className="quiz-option">
                                                    <input
                                                        type="radio"
                                                        name={`question-${index}`}
                                                        value={opt}
                                                        checked={answers[index] === opt}
                                                        onChange={() => handleSelect(index, opt)}
                                                    />
                                                    {opt}
                                                </label>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div className="quiz-action-container">
                                    <button className="submit-quiz-btn" onClick={() => alert('Quiz Submitted!')}>
                                        Submit Quiz
                                    </button>
                                    <button className="exit-btn" onClick={handleExitQuiz}>
                                        Exit Quiz
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {quiz.length === 0 && (
                        <div className="quizauto">
                            <span>Automated Quiz from Video</span>
                            <button>Create Quiz</button>
                        </div>
                    )}
                </div>
                <Link to={'/dashboard'}><button>Back to Dashboard</button></Link>
            </div>
        </>
    )
}

export default Dashboardquiz
