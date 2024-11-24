'use client'

import Header from '@/app/(app)/Header'
import Label from "@/components/Label"
import Input from "@/components/Input"
import InputError from "@/components/InputError"
import Button from "@/components/Button"
import {useState} from "react"
import { useAuth } from "@/hooks/auth";
import Image from "next/image"
import { useEffect } from "react";
import axios from '@/lib/axios'
import getAdvertiserId from "@/hooks/getAdvertiserId";

const AddWebsite = () => {
    // Get the logged in user object
    const { user } = useAuth({ middleware: 'auth' })
    const emailAddress = user?.email

    const advertiserId = getAdvertiserId(emailAddress)

    const [campaignId, setCampaignId] = useState('')
    const [zoneId, setZoneId] = useState('')
    const [bannerName, setBannerName] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [url, setUrl] = useState('')
    const [storageType, setStorageType] = useState('html')
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(1)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)

    const [file, setFile] = useState(null)

    const [campaigns, setCampaigns] = useState([])
    const [zones, setZones] = useState([])

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    };

    const handleZoneChange = (event) => {
        setZoneId(event.target.value)
        console.log('zone id: ', event.target.value)

        axios
            .get('/api/get-zone/'+event.target.value)
            .then((response)=>{
                console.log('zone details: ', response.data.zone)
                setWidth(response.data.zone.width)
                setHeight(response.data.zone.height)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            }).finally(()=>{
            // setLoading(true)
        })

    }

    useEffect(() => {
        axios
            .post('/api/get-campaign-list-by-advertiser', {emailAddress})
            .then((response)=>{
                setCampaigns(response.data.campaigns)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            }).finally(()=>{
            // setLoading(true)
        })

        axios
            .post('/api/get-zone-list-by-advertiser', {emailAddress})
            .then((response)=>{
                setZones(response.data.zones)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            }).finally(()=>{
            // setLoading(true)
        })
    }, [])

    const submitForm = async event => {
        event.preventDefault()
        // Show the loader
        setLoading(true)
        setErrors([])
        setStatus(null)
        setSuccessMessage(null)

        const formData = new FormData();
        formData.append('campaignId', campaignId)
        formData.append('bannerName', bannerName)
        formData.append('url', url)
        formData.append('width', width)
        formData.append('height', height)
        if (file) formData.append('file', file)

        try {
            const response = await axios.post('/api/add-banner', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response)
            setSuccessMessage(`Banner "${bannerName}" has been successfully added!`)
            setStatus({ type: 'success', message: 'Banner added successfully!' })

            // Reset form fields
            setCampaignId('')
            setBannerName('')
            setImageURL('')
            setUrl('')
            setWidth(null)
            setHeight(null)
            setFile(null)
        } catch (error) {
            setErrors(error.response?.data?.errors || {})
            setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to add Banner.' })
        } finally {
            setLoading(false)
        }

    }

    return (
        <>
            <Header title="Add Banner" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full md:w-1/2 relative">
                        {/* Loader Overlay */}
                        {loading && (
                            <div className="absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center text-center z-10">
                                <div role="status">
                                    {successMessage ? (
                                        <div className="flex flex-col items-center">
                                            {/* Blue Check Mark */}
                                            <Image
                                                src="/images/check.png"
                                                width={32}
                                                height={32}
                                                alt="success"
                                            />
                                            <p className="mt-4 text-lg text-blue-700 font-semibold">
                                                {successMessage}
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            {/* Spinner */}
                                            <svg
                                                aria-hidden="true"
                                                className="w-12 h-12 text-gray-300 animate-spin dark:text-gray-800 fill-blue-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Status Message */}
                            {status && (
                                <div
                                    className={`mb-4 px-4 py-2 rounded ${
                                        status.type === 'success'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}
                                >
                                    {status.message}
                                </div>
                            )}
                            <h2 className="text-2xl font-semibold mb-4">Add Banner</h2>

                            <form onSubmit={submitForm}>
                                {/* Select Campaign */}
                                <div>
                                    <Label htmlFor="campaignId"> Select Campaign <span>*</span></Label>

                                    <select
                                        id="campaignId"
                                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={campaignId}
                                        onChange={event => setCampaignId(event.target.value)}
                                        required
                                        autoFocus
                                    >
                                        <option value=''>Select a Campaign</option>
                                        {campaigns.map((item)=>(
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}

                                    </select>

                                    <InputError messages={errors.campaignId} className="mt-2" />
                                </div>

                                {/* Select Zone */}
                                <div className="mt-4">
                                    <Label htmlFor="campaignId"> Select Zone <span>*</span></Label>

                                    <select
                                        id="zoneId"
                                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={zoneId}
                                        onChange={handleZoneChange}
                                        required
                                    >
                                        <option value=''>Select a Campaign</option>
                                        {zones.map((item)=>(
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}

                                    </select>

                                    <InputError messages={errors.zoneId} className="mt-2" />
                                </div>

                                {/* Upload Banner */}
                                <div className="mt-4">
                                    <Label htmlFor="file">Upload Banner <span>*</span></Label>
                                    {width&& (
                                        <>
                                            <div className="mb-4 px-4 py-2 rounded bg-gray-50 text-gray-800">
                                                <p>Banner width must be {width}px</p>
                                                <p>Banner height must be {height}px</p>
                                            </div>
                                        </>
                                    )}
                                    <p></p>
                                    <input
                                        type="file"
                                        id="file"
                                        className="block mt-1 w-full"
                                        onChange={handleFileChange}
                                    />
                                    <InputError messages={errors.file} className="mt-2" />
                                </div>

                                {/* Banner Name */}
                                <div className="mt-4">
                                    <Label htmlFor="bannerName"> Banner Name <span>*</span></Label>

                                    <Input
                                        id="bannerName"
                                        type="text"
                                        value={bannerName}
                                        className="block mt-1 w-full"
                                        onChange={event => setBannerName(event.target.value)}
                                        required
                                    />

                                    <InputError messages={errors.bannerName} className="mt-2" />
                                </div>

                                {/* Target Url */}
                                <div className="mt-4">
                                    <Label htmlFor="url"> Target Url <span>*</span></Label>

                                    <Input
                                        id="url"
                                        type="text"
                                        value={url}
                                        className="block mt-1 w-full"
                                        onChange={event => setUrl(event.target.value)}
                                        required
                                    />

                                    <InputError messages={errors.url} className="mt-2" />
                                </div>

                                <div className="hidden-fields">
                                    <Input
                                        id="width"
                                        type="hidden"
                                        value={width}
                                        className="block mt-1 w-full"
                                        onChange={event => setWidth(event.target.value)}
                                    />
                                    <Input
                                        id="height"
                                        type="hidden"
                                        value={height}
                                        className="block mt-1 w-full"
                                        onChange={event => setHeight(event.target.value)}
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-3">Add Banner</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddWebsite
