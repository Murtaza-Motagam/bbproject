import React, { useContext, useEffect, useState } from 'react';
import { FaUserAlt } from "react-icons/fa";
import Loader from '../components/Loader/Loader';

const AdminProfile = () => {
    const [adminInfo, setAdminInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Admin Profile | Checkout your details and information within the system.";
        fetchAdminInfo();
    }, []);

    const fetchAdminInfo = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/getadmin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'admin-token': localStorage.getItem('admin-token')
                },
            });

            const json = await response.json();
            setAdminInfo(json)


        } catch (error) {
            // Handle network errors
            console.error('Error fetching admin info:', error.message);
        }
    };

    // loading implementation

    setTimeout(() => {
        setLoading(false)
    }, 500);

    const MainFunction = () => {

        return (
            <div className="min-h-screen w-full font-poppins">
                <div className=" py-3 mt-5 bg-gray-50 flex items-center justify-start text-gray-800 rounded-lg ml-5 ">
                    <div className="image p-5 rounded-xl mx-4 bg-gray-300 object-contain">
                        <FaUserAlt size={80}/>
                    </div>
                    {adminInfo.map((e, index) => {
                        return (
                            <div className=" ml-3 info flex flex-col gap-y-2 items-start justify-start" key={index}>
                                <h1 className="text-2xl uppercase bold-700">{e.name}</h1>
                                <h1 className="text-lg text-gray-700">{e.emailId}</h1>
                            </div>
                        )
                    })}
                </div>


                <div className="flex justify-center lg:flex-row xl:flex-row md:flex-col sm:flex-col w-full gap-x-3 items-center">


                    <div className="mt-10 ml-5 flex flex-col w-full rounded-lg gap-y-4 bg-white items-start  text-gray-800 p-5">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-2xl bold-600 text-gray-800 font-roboto">Profile Information</h1>
                        </div>

                        <hr style={{
                            background: 'gray',
                            height: "2px",
                            width: "100%"
                        }} />

                        {
                            adminInfo.map((e) => {
                                return (
                                    <table className="table-auto w-full mb-16 font-roboto" key={e.username}>
                                        <tbody>
                                            <tr>
                                                <td className=" text-gray-800  text-lg">
                                                    <div style={{ marginBottom: '8px' }}>Admin ID:</div>
                                                </td>
                                                <td className="font-semibold text-green-500 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>{e.adminId}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-800 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>Username:</div>
                                                </td>
                                                <td className="font-semibold text-green-500 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>{e.username}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-800 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>Full Name:</div>
                                                </td>
                                                <td className="font-semibold text-green-500 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>{e.name}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-800  text-lg">
                                                    <div style={{ marginBottom: '8px' }}>Email ID:</div>
                                                </td>
                                                <td className="font-semibold text-green-500 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>{e.emailId}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-800 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>Phone Number:</div>
                                                </td>
                                                <td className="font-semibold text-green-500 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>+91 - {e.phoneNumber}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-800 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>Admin Priority:</div>
                                                </td>
                                                <td className="font-semibold text-green-500 text-lg">
                                                    <div style={{ marginBottom: '8px' }}>{e.adminPriority}</div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-gray-800  text-lg">
                                                    <div style={{ marginBottom: '8px' }}>Admin Created:</div>
                                                </td>
                                                <td className="font-semibold text-lg text-green-500">
                                                    <div style={{ marginBottom: '8px' }}>{e.datacreated.substring(0, 10)}</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {loading ? <Loader message="Getting Admin Profile" /> : <MainFunction />}
        </div>
    )
};

export default AdminProfile;

