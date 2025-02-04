import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Adjust import based on react-router-dom version
import React, { useEffect } from 'react';

const AuthMiddleware = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionID = Cookies.get('session');
    if (sessionID !== 'cookieValue') {
      navigate('/login');
    }
  }, [navigate]);

  // If you don't need to render anything, return null
  return null;
};

export default AuthMiddleware;