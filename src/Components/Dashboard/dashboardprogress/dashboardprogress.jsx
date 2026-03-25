import { useEffect, useState } from 'react';
import './dashboardprogress.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Dashboardprogress() {
  const {t}=useTranslation();
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
      }).catch(err=>{
        console.log(err);
      });
  }, [])
  return (
    <>
      <div className="progressmain">
        <div className="progressmain2">
          <h2>{t("progress_Title")}</h2>
          <div className="progressresults">
            <div className="overall">
              <span>{t("overallScore")}</span>
              <p>{progress.averageprogress}%</p>
            </div>
            <Link to='/totaltopic' state={{ results: progress.allResults }} style={{ textDecoration: 'none' }}>
              <div className="totaltopic">
                <span>{t("totalTopicResults")}</span>
                <p>{t("clickToView")} ( {progress.allResults.length} )</p>
              </div>
            </Link>
            <Link to='/weakconcept' state={{ weaktopics: progress.weakTopics }} style={{ textDecoration: 'none' }} >
              <div className="weekconcept">
                <span>{t("weakConcepts")}</span>
                <p>{t("clickToView")} ( {progress.weakTopics.length} )</p>
              </div>
            </Link>
          </div>
          <Link to={'/dashboard'}><button>{t("backDashboard")}</button></Link>
        </div>
      </div>
    </>
  )
}

export default Dashboardprogress
