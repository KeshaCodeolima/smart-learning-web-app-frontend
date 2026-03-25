import { useState } from 'react';
import './dashboardquiz.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

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
    const {t}=useTranslation();

    const NotifyInfo = () => {
        toast.info(t("noteRequired"), {
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
        toast.warn(t("quizError"), {
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
        toast.success(t("quizSubmit"), {
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
        toast.info(t("selectLangMsg"), {
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
        toast.info(t("enterTopic"), {
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
                <h2>{quiz.length > 0 ? t("quizProgress") : t("createQuiz")}</h2>

                {quiz.length === 0 ? (
                    <div className="quizmain2">
                        <div className="quiznormal">
                            <div className='language-container-quiz'>
                                <label>{t("selectLanguage")}:</label>
                                <select className='language-selector-quiz' value={language} onChange={(e) => setLanguage(e.target.value)}>
                                     <option value="None">None</option>
                                    <option value="English">English</option>
                                    <option value="Sinhala">Sinhala</option>
                                    <option value="Tamil">Tamil</option>
                                </select>
                            </div>
                            <span>{t("createQuiz")}</span>
                            <input type="text" placeholder={t("quizTopic")} value={quiztopic} onChange={(e) => setQuizTopic(e.target.value)} />
                            <textarea
                                placeholder={t("addPrompt")}
                                className='inputbox'
                                value={quiznote}
                                onChange={(e) => setQuiznote(e.target.value)}
                            />
                            <button onClick={handlequiz} disabled={isloading}>
                                {isloading ? t("generating") : t("createBtn")}
                            </button>
                        </div>

                        <div className="quizauto">
                            <div className='language-container-quiz'>
                                <label>{t("selectLanguage")}:</label>
                                <select className='language-selector-quiz' value={Autolanguage} onChange={(e) => setAutoLanguage(e.target.value)}>
                                     <option value="None">None</option>
                                    <option value="English">English</option>
                                    <option value="Sinhala">Sinhala</option>
                                    <option value="Tamil">Tamil</option>
                                </select>
                            </div>
                            <span>{t("autoQuiz")}</span>
                            <input type="text" placeholder={t("quizTopic")} onChange={(e) => setAutoQuizTopic(e.target.value)} />
                            <textarea value={paragraph} readOnly className='inputbox' placeholder={t("transcriptPlaceholder")}></textarea>
                            <button style={{ marginRight: '280px' }} onClick={handleGetQuiz}>{t("getText")}</button>
                            <button style={{ marginLeft: '280px', marginTop: '-40px' }} onClick={handleAutoQuiz} disabled={isAutoLoading || !paragraph}>
                                {isAutoLoading ? t("generating") : t("createBtn")}
                            </button>

                        </div>
                    </div>
                ) : (
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
                                    <h2>{t("yourScore")} {score} / {quiz.length}</h2>
                                </div>
                            )}

                            <div className="quiz-action-container">
                                {!showResult && <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>{t("submitQuiz")}</button>}
                                <button className="exit-btn" onClick={handleExitQuiz}>{t("exitQuiz")}</button>
                            </div>
                        </div>
                    </div>
                )}

                <Link to={'/dashboard'} style={{ marginTop: '20px' }}>
                    <button className="back-btn">{t("backDashboard")}</button>
                </Link>
            </div>
        </>
    )
}

export default Dashboardquiz
