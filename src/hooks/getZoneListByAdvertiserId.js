import useSWR from 'swr'
import axios from '@/lib/axios'

const getZones = (advertiserId) => {
    const { data, error } = useSWR('api/get-zones/'+advertiserId, () =>
        axios
            .get('/api/get-zones/'+advertiserId)
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )
    return { data, error };
};

export default getZones;
