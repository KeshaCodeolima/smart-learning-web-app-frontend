import './dashboard.css';
import Camera from '../../Images/Camera.png';
import Quiz from '../../Images/Quiz.png';
import ShortNote from '../../Images/ShortNote.png';
import Progres from '../../Images/Progres.png';

function Dashboard() {
    return (
        <>
            <div className="dashmain">
                <h2>DashBoard</h2>
                <div className="dashmain2">
                    <div className="dashsection">
                        <div className="dashvideo">
                            <img src={Camera} alt="Camera" className='image' />
                            <p>Watch video with Your Emotions</p>
                        </div>
                        <div className="dashquiz">
                            <img src={Quiz} alt="Quiz" className='image' />
                            <p>Answer Your Quiz</p>
                        </div>
                        <div className="dashshort">
                            <img src={ShortNote} alt="ShortNote" className='image' />
                            <p>Make Short Notes</p>
                        </div>
                        <div className="dashprogres">
                            <img src={Progres} alt="Progress" className='image' />
                            <p>Check Your Progress</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
