import './dashboard.css';
import Camera from '../../Images/Camera.png';
import Quiz from '../../Images/Quiz.png';
import ShortNote from '../../Images/ShortNote.png';
import Progres from '../../Images/Progres.png';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <>
            <div className="dashmain">
                <h2>DashBoard</h2>
                <div className="dashmain2">
                    <div className="dashsection">
                        <Link to={'/video'}>
                            <div className="dashvideo">
                                <img src={Camera} alt="Camera" className='image' />
                                <p>Watch video with Your Emotions</p>
                                <span>Adjusts video playback speed based on your emotions understanding.</span>
                            </div>
                        </Link>
                        <Link to={'/quiz'}>
                            <div className="dashquiz">
                                <img src={Quiz} alt="Quiz" className='image' />
                                <p>Answer Your Quiz</p>
                                <span>Creates quizzes based on your learning progress to test your knowledge.</span>
                            </div>
                        </Link>
                        <Link to={'/note'}>
                            <div className="dashshort">
                                <img src={ShortNote} alt="ShortNote" className='image' />
                                <p>Make Short Notes</p>
                                <span>Lets you quickly make notes while studying to summarize important points.</span>
                            </div>
                        </Link>
                        <Link to={'/progress'}>
                            <div className="dashprogres">
                                <img src={Progres} alt="Progress" className='image' />
                                <p>Check Your Progress</p>
                                <span>Shows your learning stats, like quiz scores and weak areas, over time.</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
