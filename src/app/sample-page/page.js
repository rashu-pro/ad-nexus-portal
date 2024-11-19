'use client'

import Image from "next/image";
import useRequest from "@/hooks/request";

const SamplePage = () => {
    const { data } = useRequest();

    return (
        <>
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
                        <Image
                            src="/images/logo-adnexus.min.png"
                            width={516}
                            height={47}
                            alt="adNexusRevive"
                        />
                    </div>

                    <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                        <div className="p-10">
                            <h2 className="text-2xl font-bold">Demo Request</h2>
                            <p className="text-gray-400">Endpoint: /api/demo-data</p>
                            <hr />
                            <div className="pt-2">
                                {data?.status && (
                                    <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Success</span>
                                )}

                                <div className="pt-2">

                                    {!data ? (
                                        <div className="text-gray-500">Loading...</div>
                                    ) : data.status ? (
                                        <div className="relative overflow-x-auto">
                                            <table
                                                className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <thead
                                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Label
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Value
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        ID
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {data.data.id}
                                                    </td>
                                                </tr>

                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Author
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {data.data.author}
                                                    </td>
                                                </tr>
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Time
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {data.data.date}
                                                    </td>
                                                </tr>

                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        Content
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {data.data.content}
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : (
                                        <div className="mt-4 p-4 text-red-800 bg-red-200 rounded">
                                            <p>Something went wrong.</p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SamplePage
