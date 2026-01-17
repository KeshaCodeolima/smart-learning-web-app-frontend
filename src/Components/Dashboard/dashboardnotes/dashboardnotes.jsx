import { Link } from 'react-router-dom';
import './dashboardnotes.css';

function dashboardnotes() {
    return (
        <>
            <div className="notemain">
                <h2>Summaries Your Notes</h2>
                <div className="notemain2">
                    <span>Note Title</span>
                    <textarea name="question" id=""></textarea>
                    <div className="notemainbtn">
                        <button>Create Note</button>
                        <Link to={'/'}><button className='notebtn'>Back to Dashboard</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default dashboardnotes
