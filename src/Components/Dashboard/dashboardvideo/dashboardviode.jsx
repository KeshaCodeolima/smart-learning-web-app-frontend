import { useEffect, useRef, useState } from 'react';
import './dashboardvideo.css';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';

function Dashboardviode() {
  const [filename, setFilename] = useState('');
  const [videoSrc, setVideoSrc] = useState(null);
  const [prediction, setPrediction] = useState('Normal');
  const [videoFile, setVideoFile] = useState(null);
  const webcamRef = useRef(null);
  const mainVideoRef = useRef(null);

  const handlefile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoFile(file);
      setFilename(file.name);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const handleuploadfile = async () => {
    const user = JSON.parse(localStorage.getItem('currentuser'));
    if (!videoFile) {
      return alert('Please Select Some Video');
    }
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('userId', user.id)

      await axios.post('http://localhost:5000/api/users/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(formData);
      alert('Video Send Successfully Check the Quiz Section!');
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Uploading Error!');
    }
  };

  useEffect(() => {
    const runPrediction = async () => {
      if (webcamRef.current && videoSrc) {
        const imageSrc = webcamRef.current.getScreenshot();

        if (imageSrc) {
          try {
            const response = await fetch("http://localhost:5000/api/users/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image: imageSrc }),
            });
            const data = await response.json();
            const currentLabel = data.label;

            setPrediction(data.label);

            if (mainVideoRef.current) {
              if (currentLabel === "happy") mainVideoRef.current.playbackRate = 1.5;
              else if (currentLabel === "fear") mainVideoRef.current.playbackRate = 0.5;
              else mainVideoRef.current.playbackRate = 1.0;
            }
          } catch (err) {
            console.error("Prediction Error: ", err);
          }
        }
      }
    };
    const interval = setInterval(runPrediction, 3000);
    return () => clearInterval(interval);
  }, [videoSrc])

  return (
    <>
      <div className="video-content-card">
        <div className="videomain">
          <h2>Watch Video with Your Emotions</h2>
          <div style={{ position: 'fixed', bottom: 80, right: 20, width: 150, borderRadius: '10px', overflow: 'hidden', border: '2px solid #007bff' }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{ advanced: [{ zoom: 2.0 }] }}
            />
            <div style={{ background: '#000', color: '#fff', textAlign: 'center', fontSize: '12px' }}>
              Status: {prediction}
            </div>
          </div>
          <div className="videoadd">
            <input type="file" accept='video' onChange={handlefile} />
            <span>Video Selected: {filename} </span>
          </div>
          <div className="videoinput">
            {videoSrc ? (
              <video ref={mainVideoRef} key={videoSrc} width="100%" controls autoPlay>
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
          <button className='proccesbtn' onClick={handleuploadfile}>Convert Video to Text</button>
        </div>
      </div>
    </>
  )
}

export default Dashboardviode
