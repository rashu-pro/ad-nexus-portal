import useSWR from 'swr'
import axios from '@/lib/axios'

const getAdvertiserId = (emailAddress) => {
    const { data, error } = useSWR('api/get-advertiser/'+emailAddress, () =>
        axios
            .get('/api/get-advertiser/'+emailAddress)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )
    return { data, error };
};

export default getAdvertiserId;
