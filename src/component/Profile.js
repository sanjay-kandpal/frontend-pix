import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import ProfilePicture from "../images/profilePicture.jpg";
import { useUserData } from '../context/UserContext';
import AuthMiddleware from './AuthMiddleware';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axios';

function Profile() {
  AuthMiddleware();
  const { userData } = useUserData();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    axiosInstance.get(`/user?id=${localStorage.getItem('id')}`)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setEmail(res.data.email);
        setPassword(res.data.password)
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    
    // Name validation
    if (name.length < 3) {
      setNameError('Name must be at least 3 characters long');
    }

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
    }

    // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit');
    }

    if (nameError || emailError || passwordError) {
      return;
    }

    try {
      const response = await axiosInstance.put(`/update?id=${localStorage.getItem('id')}`, {
        name,
        email,
        password
      });

      if (response.data.valid) {
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error:', error);
    }
  };

  return (
    <div className="d-flex">
    <style>
        {`
          .card {
            transition: none; /* Remove the transition effect */
          }
        `}
      </style>
      <Sidebar />
      <div className="container my-4">
        <div className="row">
          <div className="col-md-4">
            <div className="card mb-4 ">
              <div className="card-body  text-center">
                <img src={ProfilePicture} alt="Profile Picture" className="rounded-circle img-fluid" />
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">{name}</label>
                  <input
                    type="text"
                    className={`form-control ${nameError ? 'is-invalid' : ''}`}
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  {nameError && <div className="invalid-feedback d-block">{nameError}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-body w-100">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && <div className="invalid-feedback d-block">{emailError}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    readOnly
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {passwordError && <div className="invalid-feedback d-block">{passwordError}</div>}
                </div>
                <button onClick={handleSubmit} className="btn btn-primary">Update Profile</button>
                <Link to='/selfImageupload' className="btn btn-primary">upload More Selfies ?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;