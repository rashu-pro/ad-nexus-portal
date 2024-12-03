import Header from '@/app/(app)/Header'
import FormAddAdvertiser from "@/components/FormAddAdvertiser";

export const metadata = {
    title: 'Add Advertiser',
}
const AddAdvertiser = () => {

    return (
        <>
            <Header title="Add Advertiser" />
            <FormAddAdvertiser />
        </>
    )
}

export default AddAdvertiser
