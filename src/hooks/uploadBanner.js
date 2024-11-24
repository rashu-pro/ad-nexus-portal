import axios from '@/lib/axios';

const uploadBanner = async (formData) => {
    try {
        const response = await axios.post('/api/add-banner-test', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('Banner uploaded successfully:', response.data);
        return response.data; // Return the response if needed
    } catch (error) {
        console.error('Error uploading banner:', error.response?.data || error.message);
        throw error; // Propagate the error for further handling
    }
};

export default uploadBanner;
