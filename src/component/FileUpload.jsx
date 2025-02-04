import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Sidebar from "./Sidebar";
import AWS from 'aws-sdk';
import { toast } from "react-toastify";
import Loader from "./Loader";

const dropzoneStyle = {
	flex: 1,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	padding: "20px",
	marginTop: "2rem",
	borderWidth: "2px",
	borderRadius: "2px",
	borderColor: "#eeeeee",
	borderStyle: "dashed",
	backgroundColor: "#fafafa",
	color: "#bdbdbd",
	outline: "none",
	transition: "border 0.24s ease-in-out",
	cursor: "pointer",
	width: "76vw",
	margin: "2rem",
};

const activeDropzoneStyle = {
	borderColor: "#00adb5",
};

const BUCKET_NAME = process.env.REACT_APP_PARTY_BUCKET_NAME
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

const FileUpload = () => {
	const [files, setFiles] = useState([]);
	const [partyCode, setPartyCode] = useState("");
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setPartyCode(generatePartyCode());
	}, []);

	const generatePartyCode = () => {
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let partyCode = "";
		for (let i = 0; i < 5; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			partyCode += characters.charAt(randomIndex);
		}
		return partyCode;
	};

	const onDrop = useCallback((acceptedFiles) => {
		setFiles(
			acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
				})
			)
		);
	}, []);

	async function onUploadClick(e) {
		e.preventDefault();

		if (files.length === 0) {
			toast.error("Please select a file to upload");
			return;
		}

		if (files.length > 20) {
			toast.error("You can only upload 20 files at a time")
			return
		}

		if (!title) {
			toast.error("Please give a title to the album")
			return
		}

		// toast.promise("Uploading files:", files);

		setLoading(true)

		const s3 = new AWS.S3({
			accessKeyId: ACCESS_KEY,
			secretAccessKey: SECRET_KEY,
			region: REGION,
		});

		const promises = files.map((file, index) => {
			const params = {
				Bucket: BUCKET_NAME,
				Key: `${partyCode}/${file.name}`,
				Body: file,
				//   ACL: 'public-read', // Adjust the ACL based on your requirements
			};

			return s3.upload(params).promise();
		});

		try {
			await Promise.all(promises);
			console.log('Files uploaded successfully');
			setFiles([]);
			const uploadData = {
				partyCode,
				title,
			};
			const response = await fetch('http://localhost:8081/upload', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(uploadData),
			});

			if (response.ok) {
				toast.success('Upload data sent to server successfully');
			} else {
				toast.error('Error sending upload data to server');
			}

			setPartyCode(generatePartyCode());
			setTitle("");
			setLoading(false);

		} catch (error) {
			console.error('Error uploading files:', error.message);
			toast.error('Error uploading files. Please try again.', error.message);
		}
	};

	const copyButtonClicked = (e) => {
		e.currentTarget.classList.toggle("fadeanime")
		navigator.clipboard.writeText(partyCode)
		console.log("click")
	};

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		// accept: "image/*",
		// maxSize: 1024 * 1024 * 5,
		maxFiles: 20,
		name: "images",
	});

	const fileList = files.map((file) => (
		<li className="ListItem" key={file.name}>
			<img className="ImagePreview" src={file.preview} alt={file.name} />
			<span className="FileName" >{file.name}</span>
		</li>
	));

	return (

		<div className="dashboard">
			<Sidebar />

			{
				loading ? (
					<div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
						<Loader />
					</div>
				) : (
					<div className="d-flex flex-column">
						<div className="partyCodeDiv">
							<input type="text" placeholder="Title" className="titleInput" value={title} onChange={(e) => setTitle(e.target.value)} />
							<b>Party Code:</b> {partyCode} <svg xmlns="http://www.w3.org/2000/svg" className="copyIcon" style={{ width: "1.3rem", margin: "0px 1rem" }} onClick={copyButtonClicked} viewBox="0 0 448 512"><path d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z" /></svg>
						</div>
						<form method="post" onSubmit={onUploadClick}>
							<div
								style={
									isDragActive
										? { ...dropzoneStyle, ...activeDropzoneStyle }
										: dropzoneStyle
								}
								{...getRootProps()}
							>
								<input type="file" name="images" {...getInputProps()} />
								<p className="DropzoneText" >
									Drag and drop your files here, or click to select files
								</p>
								<ul className="ImageContainer">{fileList}</ul>
							</div>
							<button type="submit" className="uploadButton" >
								Upload
							</button>
							<div className="imageDescription">

							</div>
						</form>
					</div>
				)
			}
		</div>
	);
};

export default FileUpload;
