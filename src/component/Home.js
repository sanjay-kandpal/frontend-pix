import axios from "axios";
import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Loader from "./Loader";
import Content from "./Content";
import "../App.css";
import { BiSearch } from "react-icons/bi";
import { toast } from 'react-toastify'
import axiosInstance from '../utils/axios';

function Home() {

	const [name, setName] = useState("");
	const [userId, setUserId] = useState("");
	const [partyCode, setPartyCode] = useState("");
	const [isActive, setIsActive] = useState(false);
	const [isAuthenticated, setAuthentic] = useState(false);
	const [codes, setCodes] = useState({});
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	axios.defaults.withCredentials = true;

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate("/Login");
			return;
		}

		axiosInstance.get('/')
			.then((res) => {
				if (res.data.valid === true) {
					setName(res.data.username);
					setUserId(res.data.userId);
					setAuthentic(true);
					setCodes(res.data.userCodes);
				} else {
					navigate("/Login");
				}
			})
			.catch((err) => {
				console.log(err);
				navigate("/Login");
			});
		setLoading(false);
	}, [navigate]);

	const toggleNotification = () => {
		setIsActive(!isActive);

		const notifications = document.querySelectorAll(".notification");

		notifications.forEach((notification) => {
			notification.classList.add("show");
		});

		setTimeout(() => {
			notifications.forEach((notification) => {
				notification.classList.remove("show");
			});
			setIsActive(false);
		}, 3000);
	};

	const addPartyCode = async () => {


		setLoading(true)

		try {
			const response = await axiosInstance.post('/addPartcodeForUser', {
				partyCode,
			});
			

			if (response.status === 200) {
				toast.success("PartyCode added Successfully");
				window.location.reload();
			}
		} catch (error) {
			console.error('Error Adding PartyCode', error.message);
			toast.error("Error adding PartyCode. Please try again.");
		}
		setLoading(false)
	}

	return (
		<>
			<div className="dashboard">
				<Sidebar />

				{loading ? (
					<div className="w-100 d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
						<Loader />
					</div>
				) : (
					<div className="dashboard--content">
						<div className="content--header">
							<h1 className="header--title">Dashboard</h1>
							<div className="header--activity">
								<div className="search-box">
									<input type="text" placeholder="Enter Party Code here" value={partyCode} onChange={(e) => { setPartyCode(e.target.value) }} />
									<BiSearch className="icon" onClick={addPartyCode} />
								</div>
							</div>
						</div>
						<Content codes={codes} />
					</div>
				)
				}

			</div>
		</>
	);
}

export default Home;
