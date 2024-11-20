'use client'

import Header from '@/app/(app)/Header'
import Label from "@/components/Label"
import Input from "@/components/Input"
import InputError from "@/components/InputError"
import Button from "@/components/Button"
import {useState} from "react"
import { useAuth } from "@/hooks/auth";
import request from '@/hooks/adServerRequest'
import Image from "next/image"
import { useEffect } from "react";
import axios from '@/lib/axios'

const AddWebsite = () => {
    // Get the logged in user object
    const { user } = useAuth({ middleware: 'auth' })
    const emailAddress = user?.email

    const [websiteId, setWebsiteId] = useState('')
    const [zoneName, setZoneName] = useState('')
    const [type, setType] = useState(0)
    const [width, setWidth] = useState(null)
    const [height, setHeight] = useState(null)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState(null)

    const [websites, setWebsites] = useState([]);

    useEffect(() => {
        axios
            .post('/api/get-website-list-by-advertiser', {emailAddress})
            .then((response)=>{
                setWebsites(response.data.websites)
            })
            .catch(error => {
                if (error.response.status !== 409) throw error
            }).finally(()=>{
            // setLoading(true)
        })
    }, []);


    const submitForm = async event => {
        event.preventDefault()
        // Show the loader
        setLoading(true);
        setErrors([])
        setStatus(null);
        setSuccessMessage(null)

        const endPoint = '/api/add-zone'
        try {
            await request({
                websiteId: websiteId,
                zoneName: zoneName,
                type: type,
                width: parseInt(width),
                height: parseInt(height),
                endPoint,
                setErrors,
            });
            setSuccessMessage(`Website "${zoneName}" has been successfully added!`)
            setStatus({ type: 'success', message: 'Zone added successfully!' })
        } catch (error) {
            let errorMessage = 'Failed to add Zone.'
            if(error.response.data.errors){
                setErrors(error.response.data.errors)
            }else{
                errorMessage = error.response.data.message
            }
            setStatus({ type: 'error', message: error.response.data.message })
        } finally {
            setLoading(false)
            // Redirect to add-campaign route after 15 seconds
            setTimeout(() => {
                // router.push('/dashboard/add-campaign');
            }, 5000)
        }

    }

    return (
        <>
            <Header title="Add Zone" />

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
                            <h2 className="text-2xl font-semibold mb-4">Add Website</h2>

                            <form onSubmit={submitForm}>
                                {/* Select Website */}
                                <div>
                                    <Label htmlFor="websiteId"> Select Website <span>*</span></Label>

                                    <select
                                        id="websiteId"
                                        className="block mt-1 w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                        value={websiteId}
                                        onChange={event => setWebsiteId(event.target.value)}
                                        required
                                        autoFocus
                                    >
                                        <option value=''>Select a Website</option>
                                        {websites.map((website)=>(
                                            <option key={website.id} value={website.id}>{website.name}</option>
                                        ))}

                                    </select>

                                    <InputError messages={errors.websiteId} className="mt-2" />
                                </div>

                                {/* Zone Name */}
                                <div className="mt-4">
                                    <Label htmlFor="zoneName"> Zone Name <span>*</span></Label>

                                    <Input
                                        id="zoneName"
                                        type="text"
                                        value={zoneName}
                                        className="block mt-1 w-full"
                                        onChange={event => setZoneName(event.target.value)}
                                        required
                                    />

                                    <InputError messages={errors.zoneName} className="mt-2" />
                                </div>

                                {/* Zone Width */}
                                <div className="mt-4">
                                    <Label htmlFor="width"> Zone Width (px) <span>*</span></Label>

                                    <Input
                                        id="width"
                                        type="number"
                                        value={width}
                                        className="block mt-1 w-full"
                                        onChange={event => setWidth(event.target.value)}
                                        required
                                    />

                                    <InputError messages={errors.width} className="mt-2" />
                                </div>

                                {/* Zone Height */}
                                <div className="mt-4">
                                    <Label htmlFor="height"> Zone Height (px) <span>*</span></Label>

                                    <Input
                                        id="height"
                                        type="number"
                                        value={height}
                                        className="block mt-1 w-full"
                                        onChange={event => setHeight(event.target.value)}
                                        required
                                    />

                                    <InputError messages={errors.height} className="mt-2" />
                                </div>

                                <div className="hidden-field">
                                    <Input
                                        id="type"
                                        type="hidden"
                                        value={type}
                                        onChange={event => setType(event.target.value)}
                                    />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-3">Add Zone</Button>
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
