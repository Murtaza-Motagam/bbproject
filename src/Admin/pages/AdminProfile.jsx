import React, { useContext, useEffect, useState } from 'react';
import admin from "../../assets/admin-person.png"
import "../styles/global.scss";
import { Link } from 'react-router-dom';
import { checkBox } from '../data';
import Loader from '../components/Loader/Loader';

const AdminProfile = () => {
    const [adminInfo, setAdminInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                <div className=" ml-5 py-3 mt-5 bg-gray-50 flex items-center justify-start text-gray-800 rounded-lg ">
                    <div className="image p-2 rounded-xl mx-4 bg-gray-300 h-[150px] w-[150px] object-contain">
                        <img src={admin} alt="" />
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


                <div className="flex justify-center gap-x-3 items-center">


                    <div className="mt-10 ml-5 flex flex-col w-[50vw] rounded-lg gap-y-4 bg-white items-start  text-gray-800 p-5">
                        <div className="flex items-center justify-between w-full">
                            <h1 className="text-2xl bold-600 text-gray-800 font-roboto">Profile Information</h1>
                            {adminInfo.map((admin, index) => {
                                return (
                                    <Link
                                        to={`/admin/edit/${admin._id}`}
                                        className=" bg-gray-700 hover:bg-black text-white p-2 rounded-full"
                                        key={index}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                        </svg>
                                    </Link>
                                )
                            })}
                        </div>

                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, explicabo earum sapiente illum assumenda voluptas, mollitia officiis autem blanditiis pariatur natus ducimus sunt ipsam beatae vero facilis neque nobis! Voluptatibus doloremque quibusdam quisquam atque.</p>

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

                    <div className="mt-10 ml-5 flex flex-col w-[30vw] rounded-lg gap-y-4 bg-white items-start  text-gray-800 p-5">
                        <div className="flex items-center mb-2 justify-between w-full">
                            <h1 className="text-2xl text-gray-800 bold-600 font-roboto">Platform Settings</h1>
                        </div>

                        <div className="mb-16 gap-y-2 flex flex-col items-start justify-start">

                            <h1 className="mb-4 text-md font-roboto font-semibold text-gray-500 uppercase">Account</h1>

                            {
                                checkBox.map((e) => {
                                    return (
                                        <div className="checkbox-wrapper-51 mb-4 flex items-center gap-x-2" key={e.id}>
                                            <div>
                                                <input type="checkbox" id={e.cbxId} />
                                                <label htmlFor={e.cbxId} className="toggle">
                                                    <span>
                                                        <svg width="10px" height="10px" viewBox="0 0 10 10">
                                                            <path d="M5,1 L5,1 C2.790861,1 1,2.790861 1,5 L1,5 C1,7.209139 2.790861,9 5,9 L5,9 C7.209139,9 9,7.209139 9,5 L9,5 C9,2.790861 7.209139,1 5,1 L5,9 L5,1 Z"></path>
                                                        </svg>
                                                    </span>
                                                </label>
                                            </div>
                                            <h1 className="text-lg  text-gray-900">{e.title}</h1>
                                        </div>
                                    )
                                })
                            }

                        </div>

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

