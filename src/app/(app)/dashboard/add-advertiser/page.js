'use client'

import Header from '@/app/(app)/Header'
import Label from "@/components/Label";
import Input from "@/components/Input";
import InputError from "@/components/InputError";
import Button from "@/components/Button";
import {useState} from "react";
import addAdvertiserRequest from "@/hooks/addAdvertiserRequest";

const AddAdvertiser = () => {
    const [advertiserName, setAdvertiserName] = useState('');
    const [advertiserEmail, setAdvertiserEmail] = useState('');
    const [advertiserContactName, setAdvertiserContactName] = useState('');
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);


    const submitForm = async event => {
        event.preventDefault()

        try {
            await addAdvertiserRequest({
                advertiserName: advertiserName,
                contactName: advertiserContactName,
                emailAddress: advertiserEmail,
                setErrors,
            });
            setStatus({ type: 'success', message: 'Advertiser added successfully!' });
        } catch (error) {
            setStatus({ type: 'error', message: 'Failed to add advertiser. '+error.response.data.message });
        }

    }
    return (
        <>
            <Header title="Add Advertiser" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-center">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg w-full md:w-1/2">
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
                            <h2 className="text-2xl font-semibold mb-4">Add Advertiser</h2>

                            <form onSubmit={submitForm}>
                                {/* Advertiser Name */}
                                <div>
                                    <Label htmlFor="advertiserName">Advertiser Name <span>*</span></Label>

                                    <Input
                                        id="advertiserName"
                                        type="text"
                                        value={advertiserName}
                                        className="block mt-1 w-full"
                                        onChange={event => setAdvertiserName(event.target.value)}
                                        required
                                        autoFocus
                                    />

                                    <InputError messages={errors.advertiserName} className="mt-2" />
                                </div>

                                {/* Advertiser Email Address */}
                                <div className="mt-4">
                                    <Label htmlFor="advertiserEmail">Advertiser Email <span>*</span></Label>

                                    <Input
                                        id="advertiserEmail"
                                        type="email"
                                        value={advertiserEmail}
                                        className="block mt-1 w-full"
                                        onChange={event => setAdvertiserEmail(event.target.value)}
                                        required
                                    />

                                    <InputError messages={errors.advertiserEmail} className="mt-2" />
                                </div>

                                {/* Advertiser Contact Name */}
                                <div className="mt-4">
                                    <Label htmlFor="advertiserContactName">Contact Name <span>*</span></Label>

                                    <Input
                                        id="advertiserContactName"
                                        type="text"
                                        value={advertiserContactName}
                                        className="block mt-1 w-full"
                                        onChange={event => setAdvertiserContactName(event.target.value)}
                                        required
                                    />

                                    <InputError messages={errors.advertiserContactName} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Button className="ml-3">Add Advertiser</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddAdvertiser
