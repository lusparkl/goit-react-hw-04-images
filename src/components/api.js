import axios from "axios";

axios.defaults.baseURL = 'https://pixabay.com/api/?key="38383817-08d467796504eaf729c6ce1f4"&per_page="12"&image_type="photo"&orientation="horizontal"';
const defaultParams = {
    key: '38383817-08d467796504eaf729c6ce1f4',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
};

export const getImages = async (query, page) => {
    const queryParams = {
        ...defaultParams,
        q: query,
        page: page,
    };
    
    const response = await axios.get('', { params: queryParams });
    return response.data;
};