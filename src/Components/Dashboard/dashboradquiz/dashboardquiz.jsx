import { useState } from 'react';
import './dashboardquiz.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

function Dashboardquiz() {
    const [quiznote, setQuiznote] = useState('');
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState({})
    const [isloading, setIsLoading] = useState(false);
    const [score, setScore] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [language, setLanguage] = useState('None');
    const [quiztopic, setQuizTopic] = useState('');
    const [isAutoLoading, setIsAutoLoading] = useState(false);
    const [paragraph, setParagraph] = useState('');
    const [Autolanguage, setAutoLanguage] = useState('None')
    const [autoQuizNote, setAutoQuizNote] = useState('')
    const [autoQuizTopic, setAutoQuizTopic] = useState('')

    const NotifyInfo = () => {
        toast.info("Please Add Some Note to Create Quiz", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const NotifyError = () => {
        toast.warn("Something went wrong with Quiz", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const Notify = () => {
        toast.success("Quiz Submited", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const NotifyInfo1 = () => {
        toast.info("Please Select the Language", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const NotifyInfo2 = () => {
        toast.info("Please Enter Topic", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const handlequiz = async () => {
        if (!quiznote)
            return NotifyInfo();

        if (language === 'None')
            return NotifyInfo1();

        if (!quiztopic)
            return NotifyInfo2();

        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/quiz', { text: quiznote, language: language })
            const quizData = JSON.parse(response.data.quiz);
            console.log(quizData);
            setQuiz(quizData);

        } catch (error) {
            console.error("Error Quiz:", error);
            NotifyError();
        } finally {
            setIsLoading(false);
        }
    }

    const handleAutoQuiz = async () => {
        if (!autoQuizNote)
            return NotifyInfo();

        if (Autolanguage === 'None')
            return NotifyInfo1();

        if (!autoQuizTopic)
            return NotifyInfo2();

        setIsAutoLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/quiz', { text: autoQuizNote, language: Autolanguage })
            const quizData = JSON.parse(response.data.quiz);
            console.log(quizData);
            setQuiz(quizData);

        } catch (error) {
            console.error("Error Quiz:", error);
            NotifyError();
        } finally {
            setIsAutoLoading(false);
        }
    }

    const handleGetQuiz = async () => {
        const user = JSON.parse(localStorage.getItem('currentuser'));
        try {
            const response = await axios.post('http://localhost:5000/api/users/text', { userId: user.id })
            const dbText = response.data.text
            const dbLanguage = response.data.language
            console.log(response.data);
            
            const formattedLanguage = dbLanguage
            ? dbLanguage.charAt(0).toUpperCase() + dbLanguage.slice(1)
            : 'None';

            setParagraph(dbText);
            setAutoQuizNote(dbText);
            setAutoLanguage(formattedLanguage)
            setQuiznote('')
        } catch (error) {
            console.error("Error fetching automated quiz:", error);
            NotifyError();
        }
    }

    const handleSave = async (finalScore) => {
        const user = JSON.parse(localStorage.getItem('currentuser'));
        const allTopic = quiztopic || autoQuizTopic;
        await axios.post('http://localhost:5000/api/users/save', {
            userId: user.id,
            topic: allTopic,
            score: finalScore,
            totalQuestions: quiz.length
        });
    }

    const handleExitQuiz = () => {
        setQuiz([]);
        setQuiznote('');
        setAutoQuizNote('')
        setParagraph('')
        setAnswers({});
        setShowResult(false);
        setLanguage('None');
        setAutoLanguage('None')
        setQuizTopic('')
        setAutoQuizTopic('');
    }

    const handleSubmitQuiz = () => {
        let correctcount = 0;
        quiz.forEach((q, index) => {
            if (answers[index] === q.answer) {
                correctcount++;
            }
        });
        Notify();
        setScore(correctcount);
        setShowResult(true);
        handleSave(correctcount);
    }

    const handleSelect = (questionIndex, option) => {
        setAnswers({ ...answers, [questionIndex]: option });
    }

    return (
        <>
            <div className="quizmain">
                {/* Dynamic Title based on whether quiz is active */}
                <h2>{quiz.length > 0 ? 'Quiz in Progress' : 'Create New Quiz'}</h2>

                {/* 1. SETUP VIEW: Show this ONLY if no quiz has been generated yet */}
                {quiz.length === 0 ? (
                    <div className="quizmain2">
                        {/* Manual Section */}
                        <div className="quiznormal">
                            <div className='language-container-quiz'>
                                <label>Select Language:</label>
                                <select className='language-selector-quiz' value={language} onChange={(e) => setLanguage(e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="English">English</option>
                                    <option value="Sinhala">Sinhala</option>
                                    <option value="Tamil">Tamil</option>
                                </select>
                            </div>
                            <span>Create New Quiz</span>
                            <input type="text" placeholder='Quiz Title' value={quiztopic} onChange={(e) => setQuizTopic(e.target.value)} />
                            <textarea
                                placeholder='Add Question / Prompt here...'
                                className='inputbox'
                                value={quiznote}
                                onChange={(e) => setQuiznote(e.target.value)}
                            />
                            <button onClick={handlequiz} disabled={isloading}>
                                {isloading ? 'Generating...' : 'Create Quiz'}
                            </button>
                        </div>

                        {/* Automated Section */}
                        <div className="quizauto">
                            <div className='language-container-quiz'>
                                <label>Select Language:</label>
                                <select className='language-selector-quiz' value={Autolanguage} onChange={(e) => setAutoLanguage(e.target.value)}>
                                    <option value="None">None</option>
                                    <option value="English">English</option>
                                    <option value="Sinhala">Sinhala</option>
                                    <option value="Tamil">Tamil</option>
                                </select>
                            </div>
                            <span>Automated Quiz from Video</span>
                            <input type="text" placeholder='Quiz Topic' onChange={(e) => setAutoQuizTopic(e.target.value)} />
                            <textarea value={paragraph} readOnly className='inputbox' placeholder="Transcript text will appear here..."></textarea>
                            <button style={{ marginRight: '340px' }} onClick={handleGetQuiz}>Get Text</button>
                            <button style={{ marginLeft: '340px', marginTop: '-40px' }} onClick={handleAutoQuiz} disabled={isAutoLoading || !paragraph}>
                                {isAutoLoading ? 'Generating...' : 'Create Quiz'}
                            </button>

                        </div>
                    </div>
                ) : (
                    /* 2. QUIZ VIEW: Show this ONLY when quiz data exists. 
                       This sits OUTSIDE quizmain2 to occupy full width */
                    <div className="quiz-active-view" style={{ width: '100%', maxWidth: '800px' }}>
                        <div className="quiz-container">
                            <div className="quiz-result">
                                {quiz.map((q, index) => (
                                    <div key={index} className="quiz-question" style={{ marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '15px' }}>
                                        <h3>{index + 1}. {q.question}</h3>
                                        {q.options.map((opt, i) => (
                                            <label key={i} className="quiz-option">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={opt}
                                                    checked={answers[index] === opt}
                                                    onChange={() => handleSelect(index, opt)}
                                                    disabled={showResult}
                                                />
                                                {opt}
                                                {showResult && opt === q.answer && <span style={{ color: "green", marginLeft: "10px" }}>✔</span>}
                                                {showResult && answers[index] === opt && opt !== q.answer && <span style={{ color: "red", marginLeft: "10px" }}>✘</span>}
                                            </label>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {showResult && (
                                <div className="quiz-score" style={{ textAlign: 'center', margin: '20px 0' }}>
                                    <h2>Your Score: {score} / {quiz.length}</h2>
                                </div>
                            )}

                            <div className="quiz-action-container">
                                {!showResult && <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>Submit Quiz</button>}
                                <button className="exit-btn" onClick={handleExitQuiz}>Exit Quiz</button>
                            </div>
                        </div>
                    </div>
                )}

                <Link to={'/dashboard'} style={{ marginTop: '20px' }}>
                    <button className="back-btn">Back to Dashboard</button>
                </Link>
            </div>
        </>
    )
}

export default Dashboardquiz
