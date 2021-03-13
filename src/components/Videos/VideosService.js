import axios from 'axios';

const API = 'https://apirest-react-integration.herokuapp.com'
export const loadVideos = async ()=>{
    const getVideos = await axios.get(`${API}/getVideos`);
    return getVideos;
}

export const createVideo = async (video)=>{
    const createVideo = await axios.post(`${API}/createVideo`, video);
    return createVideo;
}

export const getVideo = async (id) => {
    const getVideo = await axios.get(`${API}/getVideo/${id}`)
    return getVideo;
}

export const updateVideo = async (id, video) =>{
    
    console.log({video})
    const updateVideo = await axios.patch(`${API}/updateVideo/${id}`,video)
    return updateVideo;
}

export const deleteVideo = async (id) =>{
    const deleteVideo = await axios.delete(`${API}/deleteVideo/${id}`)
    return deleteVideo;
}