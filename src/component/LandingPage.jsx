import React from 'react';
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import logo from '../images/logo.png'
import privacy from '../images/privacy.svg'
import face from '../images/face.svg'
import { CiLock } from "react-icons/ci";
import video from '../images/main-video.mp4'
import '../styles/LandingPage.css'
function LandingPage () {
    return (
        <>
        <header>
            <div className='landing_header'>
                <div className="header_logo">
                    <img src={logo} style={{ border: "0px",width: "100%" }} alt='logo' />
                </div>
                <nav className='landing_nav'>
                    <ul>
                        <li><a href="/login">Home</a></li>
                        <li><a href="/login">Pricing</a></li>
                        <li><a href="/login">FAQ</a></li>
                        <div className="dropdown" >
                            <p className="dropbtn">Use for <RiArrowDropDownLine /></p>
                                <div className="dropdown-content">
                                    <Link to="#">Wedding</Link>
                                    <Link to="#">Private Events</Link>
                                    <Link to="#">College Events</Link>
                                    <Link to="#">Sporting Events</Link>
                                    <Link to="#">Social Clubs</Link>
                                    <Link to="#">Corporate Events</Link>
                                    <Link to="#">Lounges or Hotels</Link>
                                </div>
                        </div>
                        <button className="landing_Getbtn btn btn-outline-dark">Get in Touch</button>
                    </ul>
                </nav>
                <div className='landing_Login'>
                    <Link to="/login"><CiLock className='icon'/>Login</Link>
                </div>
            </div>
        </header>
        <main className='main_landing_container'>
          <div className='landing_heading'>
            <div className='head_landing'>
                <h1>Share Event Photos using Face Recognition</h1>
                <span className='span_landing'>Guests click a selfie and find their photos instantly</span>
                <div className='features_landing'>
                    <div className='features_flex'>
                        <span><img src={face} style={{width: '70px',color: 'white',padding: '10px',border: '0'}} ></img>Face Recognition</span>
                    </div>
                    <div className='features_flex'>
                     <span><img src={privacy} style={{width: '70px',color: 'white',padding: '10px',border: '0'}} ></img>Privacy First</span>
                    </div>
                </div>                
            </div>
            <div className='landing_video'>
             <video className="video_mob_landing" loading="lazy" autoPlay loop muted playsInline src={video}> </video>
            </div>
          </div>
          <div>
          </div>
        </main>
        </>
    )
}

export default LandingPage;
