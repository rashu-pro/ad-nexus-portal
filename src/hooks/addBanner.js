import axios from '@/lib/axios';

const addBanner = async ({ setErrors, endPoint, ...props }) => {
    // Make the POST request to adServer
    const response = await axios.post(endPoint, props, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export default addBanner;
