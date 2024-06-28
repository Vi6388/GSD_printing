import React, { Fragment, useState } from "react";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import { VideoData } from "@/data";

const VideoCard = () => {
  const [isOpen, setOpen] = useState(false);
  const { image, ID, caption } = VideoData;
  return (
    <Fragment>
      <div className="video-box">
        <img src={image} alt="Awesome Image" />
        <div className="content">
          <h3>{caption}</h3>
        </div>
        <a
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          href="#"
          className="video-btn video-popup"
        >
          <i className="fas fa-play"></i>
        </a>
      </div>

      <ModalVideo
        channel="youtube"
        autoplay
        isOpen={isOpen}
        videoId={ID}
        onClose={() => setOpen(false)}
      />
    </Fragment>
  );
};

export default VideoCard;
