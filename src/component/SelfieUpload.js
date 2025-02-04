import { React, useCallback, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from 'react-router-dom';
import "../styles/fileUpload.css"
import AWS from 'aws-sdk';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

const BUCKET_NAME = process.env.REACT_APP_USER_BUCKET_NAME
const REGION = process.env.REACT_APP_REGION
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

function SelfieUpload() {

    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(
            acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            )
        );
    }, []);

    const onUploadClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/getuserdata`);

            var { id, name } = response.data;

            console.log(name)
            if (/\s/.test(name)) {
                var names = names.split(" ");
                name = names[0]
            }

            if (files.length <= 1) {
                toast("Please select minimum 2 images to upload");
                return;
            }

            if (files.length > 5) {
                toast("You can only upload 5")
                return
            }

            // console.log("Uploading files:", files);

            setLoading(true);

            const s3 = new AWS.S3({
                accessKeyId: ACCESS_KEY,
                secretAccessKey: SECRET_KEY,
                region: REGION,
            });

            const promises = files.map((file, index) => {
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: `${id}-${name}/${file.name}`,
                    Body: file,
                };

                return s3.upload(params).promise();
            });

            await Promise.all(promises);
            console.log('Files uploaded successfully');
            toast('File Uploaded Successfully')
            setFiles([]);
            setLoading(false);
            navigate('/')
        } catch (error) {
            console.error('Error uploading files:', error.message);
            toast('Error uploading files. Please try again.');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        minFiles: 2,
        // maxSize: 1024 * 1024 * 5,
        maxFiles: 4,
    });

    const fileList = files.map((file) => (
        <li className="ListItem" key={file.name}>
            <img className="ImagePreview" src={file.preview} alt={file.name} />
            <span className="FileName" >{file.name}</span>
        </li>
    ));

    return (
        <>
            {
                loading ? (
                    <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }} >
                        <Loader />
                    </div >
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center w-100 p-5 selfieInstructionsContainer">
                        <div className="selfieInstructions">
                            Upload your minimum 2 SOLO Selfies
                        </div>
                        <div
                            style={
                                isDragActive
                                    ? { ...dropzoneStyle, ...activeDropzoneStyle }
                                    : dropzoneStyle
                            }
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} />
                            <p className="DropzoneText" >
                                Drag and drop your files here, or click to select files
                            </p>
                            <ul className="ImageContainer">{fileList}</ul>
                        </div>

                        <button className="uploadButton" onClick={onUploadClick}>
                            Upload
                        </button>

                        <div className="selfieInstructions">
                            Impotant Points to take care:
                        </div>
                        <div className="selfieDesc">
                            <ul className="descList">
                                <li className="descListItem">There should be no other person in the image you upload, it should just be you.</li>
                                <li className="descListItem">Make sure that the image is not from too far and your face is clearly visible.</li>
                                <li className="descListItem">Try to upload images from two different pictures.</li>
                                <li className="descListItem">Make sure that the surrounds are well lit up and face is not dark in the picture.</li>
                            </ul>
                        </div>
                    </div>
                )

            }

        </>
    )
}

export default SelfieUpload
