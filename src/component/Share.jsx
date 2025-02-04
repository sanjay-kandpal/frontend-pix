import React from "react";
import Sidebar from "./Sidebar";
import { FacebookShareButton, RedditShareButton, WhatsappShareButton, FacebookIcon, TwitterShareButton, RedditIcon, TwitterIcon, WhatsappIcon } from "react-share";
import Cookies from 'js-cookie';
import AuthMiddleware from './AuthMiddleware';

const Share = () => {
  // Replace 'yourShareUrl' with the URL you want to share
  const shareUrl = `${process.env.API_URL}/share`;
  const sessionID = Cookies.get('session');
  console.log(sessionID);
  AuthMiddleware();

  return (
    <div className="d-flex">
      <Sidebar />
      <style>
        {`
          .card {
            transition: none; /* Remove the transition effect */
          }
        `}
      </style>
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card mx-auto">
              <div className="card-header">
                <h3 className="card-title text-center">Share Your Experience With PixSort</h3>
              </div>
              <div className="card-body">
                <p className="card-text text-center">Spread the word and share your happiness with friends and family while using this website!</p>
                <div className="share-buttons d-flex justify-content-center">
                  <FacebookShareButton url={shareUrl} quote={'Yay! I got it'} hashtag={'#pixsort #images'}>
                    <FacebookIcon size={40} round={true} className="mx-2" />
                  </FacebookShareButton>
                  <WhatsappShareButton url={shareUrl} quote={'Yay! I got it'} hashtag={'#portfolio...'}>
                    <WhatsappIcon size={40} round={true} className="mx-2" />
                  </WhatsappShareButton>
                  <TwitterShareButton url={shareUrl} quote={'Yay! I got it'} hashtag={'#portfolio...'}>
                    <TwitterIcon size={40} round={true} className="mx-2" />
                  </TwitterShareButton>
                  <RedditShareButton url={shareUrl} quote={'Yay! I got it'} hashtag={'#portfolio...'}>
                    <RedditIcon size={40} round={true} className="mx-2" />
                  </RedditShareButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;