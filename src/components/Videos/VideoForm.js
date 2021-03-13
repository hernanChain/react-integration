import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import * as videoServices from "./VideosService";
import { toast } from "react-toastify";

const VideoForm = () => {
  const initialState = () => {
    return {
      url: "",
      title: "",
      description: "",
      reactions:{
        likes:0,
        dislikes:0,
      }
    };
  };

  const [video, setVideo] = useState(initialState);
  const [isNew, setIsNew] = useState(true);
  let history = useHistory();
  const params = useParams();

  const loadVideo = async (id) => {
    const getVideo = await videoServices.getVideo(id);
    const { title, url, description } = getVideo.data;
    setVideo({ url: url, title: title, description: description });
  };

  useEffect(() => {
    if (params.id) {
      loadVideo(params.id);
    } else {
      setVideo(initialState);
    }
  }, [params.id]);

  const handleInputChange = (e) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };

  function handleClick() {
    history.push("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNew) {
      await videoServices.createVideo(video);
      await toast.success("Video Created");
    } else {
      await videoServices.updateVideo(params.id, video);
      await toast.success("Video Updated");
    }
    handleClick();
  };

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="title"
                  placeholder="Title of video"
                  className="form-control"
                  autoFocus
                  value={video.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="url"
                  placeholder="http://www.youtube.com/video"
                  className="form-control"
                  value={video.url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="description"
                  placeholder="Description of video"
                  rows={3}
                  className="form-control"
                  value={video.description}
                  onChange={handleInputChange}
                />
              </div>
              {params.id ? (
                <button
                  className="btn btn-primary"
                  onClick={() => setIsNew(false)}
                >
                  Update Video
                </button>
              ) : (
                <button className="btn btn-info" onClick={() => setIsNew(true)}>
                  Create Video
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
