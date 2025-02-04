import React from 'react';
import { useNavigate } from 'react-router-dom';
import Validation from './SignupValidation';
import { useState } from 'react';
import axios from 'axios';
import girlImg from '../images/girlPhotoGrapher.jpg'
import { Link } from 'react-router-dom';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post(`${process.env.REACT_APP_API_URL}/signup`, values)
                .then((res) => {
                    navigate('/selfImageUpload')
                    // console.log(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }


    return (
        // <!----------------------- Main Container -------------------------->
        <div class="container d-flex justify-content-center align-items-center min-vh-100">
            {/* <!----------------------- Login Container --------------------------> */}
            <div class="row border rounded-5 p-3 bg-white shadow box-area">
                {/* <!--------------------------- Left Box -----------------------------> */}
                <div class="col-md-6  rounded-4 d-flex justify-content-center align-items-center flex-column left-box ">
                    <div class="featured-image mb-3">
                        <img src={girlImg} className="img-fluid" style={{ width: "320px", borderRadius: "50px" }} alt='girl photographer' />

                    </div>
                </div>
                {/* <!-------------------- ------ Right Box ----------------------------> */}

                <div class="col-md-6 right-box mt-4">
                    <div class="row align-items-center">
                        <div class="header-text mb-4">
                            <h2>Hello,Again</h2>
                            <p>We are happy to have you back.</p>
                        </div>
                        <form action='' onSubmit={handleSubmit} className=' w-100'>
                            <div class="input-group mb-1 ">
                                <input type="text" class="form-control form-control-lg bg-light fs-6" placeholder="Enter your Name" name='name' onChange={handleInput} />
                                {errors.name && <span className='text-danger w-100'>{errors.name}</span>}
                            </div>
                            <div class="input-group mb-1">
                                <input type="text" class="form-control form-control-lg bg-light fs-6 w-100 " placeholder="Email address" name="email" onChange={handleInput} />
                                {errors.email && <span className='text-danger w-100 '>{errors.email}</span>}
                            </div>
                            <div class="input-group mb-1">
                                <input type="password" class="form-control form-control-lg bg-light fs-6" placeholder="Password" name='password' onChange={handleInput} />
                            </div>
                            {errors.password && <span className='text-danger w-100'>{errors.password}</span>}
                            <div class="input-group mb-1">
                                <button class="btn btn-lg btn-primary w-100 fs-6" type="submit">Signup</button>
                            </div>
                            <div class="text-center">
                                <p>
                                    Member Already? <Link to="/Login">Login</Link>
                                </p>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;