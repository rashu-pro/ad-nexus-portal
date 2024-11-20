import axios from '@/lib/axios';

const getWebsiteList = async ({ ...props }) => {
    // Make the POST request to add a new advertiser
    const response = await axios.post('/api/get-website-list-by-advertiser', props);
    return response.data;
};

export default getWebsiteList;
