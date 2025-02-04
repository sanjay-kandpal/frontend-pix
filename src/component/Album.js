import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import AWS from 'aws-sdk';
import Sidebar from './Sidebar';
import Switch from "react-switch";
import download from "../images/download.svg"
import JSZip from "jszip";
import { saveAs } from 'file-saver';
import Loader from './Loader';


function Album() {

    const { partycode } = useParams();
    const [matchImg, setMatchImg] = useState([]);
    const [images, setImages] = useState([]);
    const [checked, setChecked] = useState(false)
    const [loading, setLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState(true);

    const BUCKET_NAME = process.env.REACT_APP_PARTY_BUCKET_NAME
    const REGION = process.env.REACT_APP_REGION
    console.log(BUCKET_NAME);
    const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY
    const SECRET_KEY = process.env.REACT_APP_SECRET_KEY

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const userDataResponse = await axios.get(`${process.env.REACT_APP_API_URL}/getUserData`);
                const { id, name } = userDataResponse.data;

                const imagesResponse = await axios.post(`${process.env.REACT_APP_API_URL}/getImageList`, { partycode: partycode });
                const fetchedImages = imagesResponse.data.images;

                setMatchImg(fetchedImages);
            } catch (error) {
                console.error('Error:', error.response ? error.response.data.error : error.message);
            }

            AWS.config.update({
                region: REGION,
                credentials: new AWS.Credentials({
                    accessKeyId: ACCESS_KEY,
                    secretAccessKey: SECRET_KEY
                })
            });

            const s3 = new AWS.S3();

            s3.listObjectsV2({ Bucket: BUCKET_NAME, Prefix: `${partycode}/` }, (err, data) => {
                if (err) {
                    console.error('Error fetching images:', err);
                } else {
                    const imageUrls = data.Contents
                        .filter(obj => obj.Key.endsWith('.jpg') || obj.Key.endsWith('.jpeg') || obj.Key.endsWith('.png'))
                        .map(obj => {
                            return {
                                url: `https://${BUCKET_NAME}.s3.amazonaws.com/${obj.Key}`,
                                name: obj.Key.split('/').pop()
                            };
                        });
                    setImages(imageUrls);
                    setImagesLoading(false);
                }
            });
            setLoading(false);
        };

        fetchData();
    }, [partycode]);

    const handleChange = (checked) => {
        setChecked(checked);
    };

    const handleDownload = async () => {
        try {
            const zip = new JSZip();
            const promises = [];

            images.forEach((image, index) => {
                if (!checked || (checked && matchImg.includes(image.name))) {
                    const filename = `image_${index + 1}.jpg`;
                    const promise = fetch(image.url)
                        .then(response => response.blob())
                        .then(blob => zip.file(filename, blob));
                    promises.push(promise);
                }
            });

            await Promise.all(promises);
            const zipBlob = await zip.generateAsync({ type: "blob" });
            saveAs(zipBlob, "images.zip");
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className="dashboard">
                <Sidebar />

                {
                    loading || imagesLoading ?
                        (
                            <div className="w-100 d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                                <Loader />
                            </div>
                        ) : (
                            <div className="dashboard--content">
                                <div className="content--header">
                                    <h1 className="header--title text-dark">{partycode}</h1>
                                    <label className='d-flex'>
                                        <Switch onChange={handleChange} checked={checked} />
                                        <h5 className='mx-2'>Only Mine</h5>
                                    </label>
                                </div>
                                <div className='text-right mb-5' style={{ cursor: "pointer" }} onClick={handleDownload}>
                                    <img src={download} alt="download Icon" style={{ width: "2rem" }} className='mx-2' />
                                    Download
                                </div>
                                <div>
                                    <div className='d-flex justify-content-center align-items-center align-self-center flex-wrap'>
                                        {images.map((image, index) => {
                                            if (checked) {
                                                if (matchImg.includes(image.name)) {
                                                    return <img className='m-2' src={image.url} key={index} width={200} alt={`Image ${index}`} />;
                                                }
                                            } else {
                                                return <img className='m-3' src={image.url} key={index} width={200} alt={`Image ${index}`} />;
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default Album
