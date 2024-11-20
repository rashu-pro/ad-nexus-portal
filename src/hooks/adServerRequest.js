import axios from '@/lib/axios';

const request = async ({ setErrors, endPoint, ...props }) => {
    // Make the POST request to adServer
    const response = await axios.post(endPoint, props);
    return response.data;
};

export default request;
