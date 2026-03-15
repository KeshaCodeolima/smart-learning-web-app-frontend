import { useEffect, useState } from 'react';
import './dashboardprogress.css';
import { Link } from 'react-router-dom'
import axios from 'axios';

function Dashboardprogress() {
  const [progress, setProgress] = useState({
    averageprogress: 0,
    allResults: [],
    weakTopics: []
  });
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentuser'));
    axios.get(`http://localhost:5000/api/users/getdetail?userId=${user.id}`)
      .then(res => {
        setProgress(res.data)
      });
  }, [])
  return (
    <>
      <div className="progressmain">
        <div className="progressmain2">
          <h2>Your Learning Progress</h2>
          <div className="progressresults">
            <div className="overall">
              <span>Overall Score</span>
              <p>{progress.averageprogress}%</p>
            </div>
            <Link to='/totaltopic' state={{ results: progress.allResults }} style={{ textDecoration: 'none' }}>
              <div className="totaltopic">
                <span>Total Topic Results</span>
                <p>Click to View ( {progress.allResults.length} )</p>
              </div>
            </Link>
            <Link to='/weakconcept' state={{ weaktopics: progress.weakTopics }} style={{ textDecoration: 'none' }} >
              <div className="weekconcept">
                <span>Week Concepts</span>
                <p>Click to View ( {progress.weakTopics.length} )</p>
              </div>
            </Link>
          </div>
          <Link to={'/dashboard'}><button>Back to Dashboard</button></Link>
        </div>
      </div>
    </>
  )
}

export default Dashboardprogress
