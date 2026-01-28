import './about.css';
import MyImage from '../../../Images/DSC_0194.jpg';
import { Link } from 'react-router-dom';

function About() {
    return (
        <>
            <div className="aboutmain">
                <div className="aboutmain1">
                    <h1>Unlock Your Potantial <h5>with</h5>Smart Learn AI</h1>
                </div>
                <div className="aboutmain2">
                    <div className="aboutleftside">
                        <h3>Our Mission & Vision</h3>
                        <span> <p style={{ fontWeight: 'bold' }}>Our Mission</p>At Smart Learn AI, we are on a mission to democratize elite education by merging cutting-edge Artificial Intelligence with intuitive learning design. We believe that every student deserves a personalized tutor that understands their unique pace, strengths, and challenges.</span>

                        <span> <p style={{ fontWeight: 'bold' }}>Our Vision</p>To become the world's leading intelligent learning ecosystem where technology doesn't just deliver content, but actively inspires curiosity and accelerates human potential through data-driven insights.</span>

                        <h3>What We Offer</h3>
                        <span>Personalized Learning</span>
                        <span>AI-Powered Personalization</span>
                        <span>AI-Powered Lecture Video Control</span>
                        <span>AI-Powered Quiz</span>
                        <span>AI-Powered Short Notes</span>
                        <span>Progress Tracking</span>
                    </div>
                    <div className="aboutrigthside">
                        <h3>Meet the Founder</h3>
                        <img src={MyImage} alt="MyPicture" className='myimage' />
                        <span>Mr.Keshan Kulasekara</span>
                    </div>
                </div>
                <div className="aboutbtn">
                    <Link to={'/'}><button>Back</button></Link>
                </div>
            </div>
        </>
    )
}

export default About
