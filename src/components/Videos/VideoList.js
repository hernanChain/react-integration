import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import VideoItem from "./VideoItem";
import * as videoService from "./VideosService";


const VideoList = () => {
  const [videos, setVideos] = useState([]);

  const params = useParams();
  const loadVideos = async () => {
    const getVideos = await videoService.loadVideos();
    const sortedVideos = getVideos.data
      .map((video) => {
        return {
          ...video,
          createdAt: video.createdAt ? new Date(video.createdAt) : new Date(),
          updatedAt: video.updatedAt ? new Date(video.updatedAt) : new Date(),
        };
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    setVideos(sortedVideos);
  };

  useEffect(() => {
    loadVideos();
  }, [params.id]);

  return (
    <div className="row">
      {videos.map((video) => {
        return <VideoItem key={video._id} video={video} loadVideos={loadVideos}></VideoItem>;
      })}
    </div>
  );
};

export default VideoList;