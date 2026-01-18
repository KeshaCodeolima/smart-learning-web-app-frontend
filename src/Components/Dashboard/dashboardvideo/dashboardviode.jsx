import { useState } from 'react';
import './dashboardvideo.css';
import { Link } from 'react-router-dom'

function Dashboardviode() {
  const [filename, setFilename]= useState('');

  const handlefile = (e)=>{
    if(e.target.files.length > 0 ){
      setFilename(e.target.files[0].name);
    }
  };

  return (
    <>
      <div className="video-content-card">
        <div className="videomain">
          <h2>Watch Video with Your Emotions</h2>
          <div className="videoadd">
            <input type="file" accept='video' onChange={handlefile} />
            <span>Video Selected: {filename} </span>
          </div>
          <div className="videoinput">
            <span>Video</span>
          </div>
          <div className="videobtn">
            <Link to={'/dashboard'}><button>Back to Dashboard</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboardviode
