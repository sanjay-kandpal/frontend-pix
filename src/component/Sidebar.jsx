import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { FaShareAltSquare, FaCloudUploadAlt } from "react-icons/fa";
import "../styles/sidebar.css";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { FaUsersViewfinder } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { FaSignOutAlt } from "react-icons/fa";
import {toast} from 'react-toastify'
import Cookies from 'js-cookie';

const Sidebar = () => {

    const [isAuthenticated, setAuthentic] = useState(false);
    const navigate = useNavigate();

    const handleExit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setAuthentic(false);
        toast.success('Logout Successfully');
        navigate("/login");
      };

    return (
        <div className="menu">
            <div className="logo">
                <img src={logo} id="logo" />
            </div>
            <div className="menu--list">
                <Link to="/" className="item">
                    <BiHome className="icon" />
                    <h3>Dashboard</h3>
                </Link>
                <Link to="/Upload" className="item">
                    <FaCloudUploadAlt className="icon" />
                    <h3>Upload</h3>
                </Link>
                <Link to="/share" className="item">
                    <FaShareAltSquare className="icon" />
                    <h3>Share</h3>
                </Link>
                <Link to="/profile" className="item">
                    <ImProfile className="icon" />
                    <h3>Profile</h3>
                </Link>
                <div to="#" className="item" onClick={handleExit}>
                    <FaSignOutAlt className="icon" />
                    <h3>Exit</h3>
                </div>
            </div>
            
        </div>
    );
};

export default Sidebar;
