import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGithub, FaFacebook, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Validation from "./LoginValidation";
import "../styles/AuthForm.css";
import girlPhoto from "../images/girlPhotoGrapher.jpg";
import boyPhoto from '../images/boyPhotoGrapher.jpg'
import axios from "axios";
import logo from "../images/logo.png";
import { toast } from "react-toastify";
import { useUserData } from '../context/UserContext';

function Login() {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();
	const { setUserData } = useUserData();
	const handleInput = (event) => {
		setValues((prev) => ({
			...prev,
			[event.target.name]: [event.target.value],
		}));
	};
	axios.defaults.withCredentials = true;

	const togglePasswordVisibility = () => {
		setShowPassword(prevState => !prevState);
	};

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_URL}`)
			.then((res) => {
				console.log(res);
				
				if (res.data.valid === true) {
					toast.success('Login Successfully')
					
					navigate("/");
				} else {
					navigate("/Login");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrors(Validation(values));
		if (errors.email === "" && errors.password === "") {
			axios
				.post(`${process.env.REACT_APP_API_URL}/login`, values)
				.then((res) => {
					console.log(res.data);
					if (res.data.message === true) {
						toast.success('Login Successfully')
						setUserData(res.data)
						localStorage.setItem('id',res.data.id);
						// localStorage.setItem('profile', res.data.name);
                    // localStorage.setItem('email',res.data.email)
					// localStorage.setItem('password', res.data.password);
						navigate("/");
					} else {
						toast.error('Login Failed ')
					}
				})
				.catch((err) => {
					console.log(err);
					toast.error(err)
				});
		}
	};

	return (

		<>
			<img src={logo} id="logo" alt="logo" />

			<div className="flex-container">
				<div className="sidebar-img">
					<img
						src={boyPhoto}
						alt="photographer Boy"
					/>
				</div>
				<div className="sidebar-img">
					<img src={girlPhoto} alt="photographer Girl" />
				</div>
				<div className="sidebar-main d-flex justify-content-center align-items-center h-100 ">
					<div className="flex-login">
						<ul
							class="nav nav-pills nav-justified mb-3"
							id="ex1"
							role="tablist"
						>
							<li class="nav-item" role="presentation">
								<a
									class="nav-link active"
									id="tab-login"
									data-mdb-toggle="pill"
									href="#pills-login"
									role="tab"
									aria-controls="pills-login"
									aria-selected="true"
								>
									Login
								</a>
							</li>
							<li class="nav-item" role="presentation">
								<a
									class="nav-link"
									id="tab-register"
									data-mdb-toggle="pill"
									href="#pills-register"
									role="tab"
									aria-controls="pills-register"
									aria-selected="false"
								>
									<Link to="/signup">Create Account</Link>
								</a>
							</li>
						</ul>

						<form action="" onSubmit={handleSubmit} >
							<div>

								<div className="form-outline mb-4">
									<label htmlFor="email" className="form-label">
										<strong>Email</strong>
									</label>
									<input
										type="email"
										placeholder="Enter Email"
										name="email"
										onChange={handleInput}
										className="form-control"
									/>
									{errors.email && <span className="">{errors.email}</span>}
								</div>
								<div className="form-outline mb-4 password-container">
									<label htmlFor="password" className="form-label">
										<strong>Password</strong>
									</label>
									<input
										type={showPassword ? "text" : "password"}
										id="password"
										placeholder="Enter Password"
										name="password"
										onChange={handleInput}
										className="form-control"
									/>
									<span className="password-toggle-icon" onClick={togglePasswordVisibility}>
										{showPassword ? <FaEyeSlash /> : <FaEye />}
									</span>
									{errors.password && <span className="">{errors.password}</span>}
								</div>
								<button
									type="submit"
									className="w-100 btn btn-primary btn-block mb-3"
								>
									Log In
								</button>

								<div class="form-check d-flex justify-content-center mb-4">
									{/* <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="registerCheck"
                  checked
                  aria-describedby="registerCheckHelpText"
                /> */}
									{/* <label class="form-check-label w-100" for="registerCheck">
                  I have read and agree to the terms
                </label> */}
								</div>
							</div>
						</form>
						{/* <!-- Register buttons --> */}
						{/* <div class="text-center">
							<p>
								Not a member? <Link to="/signup">Create Account</Link>
							</p>
						</div> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
