import './dashboardquiz.css';
import { Link } from 'react-router-dom'

function Dashboardquiz() {
    return (
        <>
            <div className="quizmain">
                <h2>Create Quiz</h2>
                <div className="quizmain2">
                    <div className="quiznormal">
                        <span>Create New Quiz</span>
                        <input type="text" name="" id="" placeholder='Quiz Title' />
                        <textarea
                            name="question"
                            id="question"
                            placeholder='Add Question / Prompt here...'
                            className='inputbox'
                            rows="4"
                        />
                        <button>Create Quiz</button>
                    </div>
                    <div className="quizauto">
                        <span>Automated Quiz from Video</span>
                        <button>Create Quiz</button>
                    </div>
                </div>
                <Link to={'/dashboard'}><button>Back to Dashboard</button></Link>
            </div>
        </>
    )
}

export default Dashboardquiz
