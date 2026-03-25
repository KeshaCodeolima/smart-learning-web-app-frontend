import { useEffect, useRef, useState } from 'react';
import './dashboardvideo.css';
import { Link } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function Dashboardviode() {
  const [filename, setFilename] = useState('');
  const [videoSrc, setVideoSrc] = useState(null);
  const [prediction, setPrediction] = useState('Normal');
  const [videoFile, setVideoFile] = useState(null);
  const webcamRef = useRef(null);
  const mainVideoRef = useRef(null);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const { t } = useTranslation();

  const handlefile = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setVideoFile(file);
      setFilename(file.name);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setPredictionHistory([]);
    }
  };

  const handleuploadfile = async () => {
    const user = JSON.parse(localStorage.getItem('currentuser'));
    if (!videoFile) {
      return toast.info(t("selectVideo"), { position: "top-center", autoClose: 4000, theme: "colored" });
    }
    try {
      const formData = new FormData();
      formData.append('video', videoFile);
      formData.append('userId', user.id)

      await axios.post('http://localhost:5000/api/users/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(formData);
      toast.success(t("uploadSuccess"), { position: "top-center", autoClose: 4000, theme: "colored" });
    } catch (error) {
      console.error('Upload Error:', error);
      toast.error(t("uploadError"), { position: "top-center", autoClose: 4000, theme: "colored" });
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
            let currentLabel = data.label;
            if (currentLabel === "Sad") {
              currentLabel = "Confused";
            }
            setPredictionHistory(prev => [...prev, currentLabel]);
            setPrediction(currentLabel);
            if (mainVideoRef.current) {
              if (currentLabel === "Happy") {
                mainVideoRef.current.playbackRate = 1.5;
              } else if (currentLabel === "Confused") {
                mainVideoRef.current.currentTime = Math.max(
                  0,
                  mainVideoRef.current.currentTime - 15
                );
                mainVideoRef.current.playbackRate = 0.5;
              } else { mainVideoRef.current.playbackRate = 1.0; }
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

  const handelVideoEnd = () => {
    if (predictionHistory.length === 0) {
      toast.info(t("noEmotion"), { position: "top-center", autoClose: 4000, theme: "colored" });
      return;
    }
    const counts = {
      Happy: 0, Confused: 0, Natural: 0
    };
    predictionHistory.forEach((emotion) => {
      if (counts[emotion] !== undefined) {
        counts[emotion]++;
      }
    });

    const { Happy, Natural, Confused } = counts;
    if (Happy > Natural && Happy > Confused) {
      toast.success(t("happyMsg"), { position: "top-center", autoClose: 4000, theme: "colored" });
    } else if (Natural > Happy && Natural > Confused) {
      toast.success(t("goodMsg"), { position: "top-center", autoClose: 4000, theme: "colored" });
    } else if (Confused > Happy && Confused > Natural) {
      toast.error(t("confusedMsg"), { position: "top-center", autoClose: 4000, theme: "colored" });
    } else if (Happy === Natural && Happy > Confused) {
      toast.success(t("goodMsg"), { position: "top-center", autoClose: 4000, theme: "colored" });
    } else {
      toast.info(t("averageMsg"), { position: "top-center", autoClose: 4000, theme: "colored" });
    }
  }

  return (
    <>
      <div className="video-content-card">
        <div className="videomain">
          <h2>{t("videoTitle")}</h2>
          <div style={{
            position: 'fixed', bottom: 80, right: 20, width: 150,
            borderRadius: '10px', overflow: 'hidden', border: '2px solid #007bff'
          }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              videoConstraints={{ advanced: [{ zoom: 2.0 }] }}
            />
            <div style={{ background: '#000', color: '#fff', textAlign: 'center', fontSize: '12px' }}>
              {t("status")}: {prediction}
            </div>
          </div>
          <div className="videoadd">
            <input type="file" accept='video' onChange={handlefile} />
            <span>{t("videoSelected")}: {filename} </span>
          </div>
          <div className="videoinput">
            {videoSrc ? (
              <video ref={mainVideoRef} key={videoSrc} width="100%" controls autoPlay onEnded={handelVideoEnd}>
                <source src={videoSrc} type="video/mp4" />
              </video>
            ) : (
              <div className="video-placeholder">
                <span>{t("selectVideoToPlay")}</span>
              </div>
            )}
          </div>
          <div className="videobtn">
            <Link to={'/dashboard'}><button>{t("backDashboard")}</button></Link>
          </div>
          <button className='proccesbtn' onClick={handleuploadfile}>{t("convertText")}</button>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Dashboardviode
