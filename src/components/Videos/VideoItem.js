import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import { XCircleFillIcon, PencilIcon,ThumbsupIcon,ThumbsdownIcon } from "@primer/octicons-react";
import * as videoServices from "./VideosService";
import "./VideoItem.css";

const VideoItem = ({ video, loadVideos }) => {
  const history = useHistory();

  const [likes,setLikes] = useState(video.reactions.likes)
  const [dislikes,setDislikes] = useState(video.reactions.dislikes)


  const handleDelete = async (id) => {
    await videoServices.deleteVideo(id);
    loadVideos();
  };

  const handleDislikes= async(id)=>{
    setDislikes(dislikes + 1)
    video.reactions.dislikes=(dislikes +1)
    console.log(video)
    await videoServices.updateVideo(id, video)
  }
  const handleLikes= async function(id){
    setLikes(likes + 1)
    video.reactions.likes=(likes +1)
    console.log(video)
    await videoServices.updateVideo(id, video)
  }
  return (
    <div className="col-md-4 general-card" key={video._id}>
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between">
          <h3>{video.title}</h3>
          <div className="d-flex justify-content-end">
            <div
              className="edit-button"
              onClick={() => history.push(`/update/${video._id}`)}
            >
              <PencilIcon size="small" />
            </div>
            <div
              className="close-button"
              onClick={() => video._id && handleDelete(video._id)}
            >
              <XCircleFillIcon size="small" />
            </div>
          </div>
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={video.url}
            width="100%"
            height="100%"
          />
        </div>
        <div
            className=""
            onClick={() => {
              
              video._id && handleLikes(video._id)
            }}
          >
          <ThumbsupIcon size={24} />
          {likes}
        </div>
        <div
            className=""
            onClick={() => video._id && handleDislikes(video._id)}
          >
        <ThumbsdownIcon size={24} />
        {dislikes}
        </div>
        <p>{video.description}</p>
      </div>
    </div>
  );
};

export default VideoItem;
