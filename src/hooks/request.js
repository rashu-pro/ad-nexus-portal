import useSWR from 'swr'
import axios from '@/lib/axios'

const useRequest = () => {
    const { data, error } = useSWR('/api/demo-data', () =>
        axios
            .post('/api/demo-data')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
            }),
    )
    return { data, error };
};

export default useRequest;
