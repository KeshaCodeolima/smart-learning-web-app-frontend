import { useState } from 'react';
import './dashboardvideo.css';
import { Link } from 'react-router-dom'

function Dashboardviode() {
  const [filename, setFilename] = useState('');
  const [videoSrc, setVideoSrc] = useState(null);

  const handlefile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setFilename(file.name);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
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
            {videoSrc ? (
              <video key={videoSrc} width="100%" controls autoPlay>
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <div className="video-placeholder">
                <span> Please Select a video to play. </span>
              </div>
            )}
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
