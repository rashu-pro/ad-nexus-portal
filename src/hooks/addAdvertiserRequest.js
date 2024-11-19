import axios from '@/lib/axios';

const addAdvertiser = async ({ setErrors, ...props }) => {
    // Make the POST request to add a new advertiser
    const response = await axios.post('/api/add-advertiser', props);
    return response.data;
};

export default addAdvertiser;
