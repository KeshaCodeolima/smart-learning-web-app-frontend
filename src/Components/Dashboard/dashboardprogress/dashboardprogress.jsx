import './dashboardprogress.css';
import { Link } from 'react-router-dom'

function dashboardprogress() {
  return (
    <>
      <div className="progressmain">
        <div className="progressmain2">
            <h2>Your Learning Progress</h2>
            <div className="progressresults">
                <div className="overall">
                    <span>Overall Score</span>
                    <p>Average Quiz Score</p>
                </div>
                <div className="totaltopic">
                    <span>Total Topics</span>
                    <p>Under the Last Week</p>
                </div>
                <div className="weekconcept">
                    <span>Week Concepts</span>
                    <p>Overall Week Concepts</p>
                </div>
            </div>
            <Link to={'/'}><button>Back to Dashboard</button></Link>
        </div>
      </div>
    </>
  )
}

export default dashboardprogress
