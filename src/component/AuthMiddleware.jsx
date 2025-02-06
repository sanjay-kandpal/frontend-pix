import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const AuthMiddleware = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return null;
};

export default AuthMiddleware;