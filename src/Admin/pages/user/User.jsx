import React, { useContext, useEffect, useState } from 'react';
import admin from "../../../../public/admin-person.png";
import './user.scss';
import "../../styles/global.scss";
import { Link } from 'react-router-dom';

const User = () => {

  const [adminInfo, setAdminInfo] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(prevState => !prevState);
  };

  useEffect(() => {
    fetchAdminInfo();
  }, []);

  const fetchAdminInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/getadmin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('admin-token') || '', // Ensure adminToken is present, provide default value if not found
        },
      });

      const json = await response.json();
      setAdminInfo(json)


    } catch (error) {
      // Handle network errors
      console.error('Error fetching admin info:', error.message);
    }
  };

 


  return (
    <div className="min-h-screen w-full font-poppins">
      <div className=" mx-5 py-3 mt-5 bg-gray-50 flex items-center justify-start text-gray-800 rounded-lg ">
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
          <div className="flex items-center mb-2 justify-between w-full">
            <h1 className="text-lg bold-600 font-roboto">Profile Information</h1>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </Link>
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
                <table className="table-auto w-full mb-20" key={e._id}>
                  <tbody>
                    <tr>
                      <td className=" text-gray-800 font-bold">
                        <div style={{ marginBottom: '8px' }}>Admin ID:</div>
                      </td>
                      <td className="font-semibold text-black">
                        <div style={{ marginBottom: '8px' }}>{e.adminId}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-800 font-bold">
                        <div style={{ marginBottom: '8px' }}>Username:</div>
                      </td>
                      <td className="font-semibold text-black">
                        <div style={{ marginBottom: '8px' }}>{e.username}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-800 font-bold">
                        <div style={{ marginBottom: '8px' }}>Full Name:</div>
                      </td>
                      <td className="font-semibold text-black">
                        <div style={{ marginBottom: '8px' }}>{e.name}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-800 font-bold">
                        <div style={{ marginBottom: '8px' }}>Email ID:</div>
                      </td>
                      <td className="font-semibold text-black">
                        <div style={{ marginBottom: '8px' }}>{e.emailId}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-800 font-bold">
                        <div style={{ marginBottom: '8px' }}>Phone Number:</div>
                      </td>
                      <td className="font-semibold text-black">
                        <div style={{ marginBottom: '8px' }}>+91 - {e.phoneNumber}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-800 font-bold">
                        <div style={{ marginBottom: '8px' }}>Admin Priority:</div>
                      </td>
                      <td className="font-semibold text-black">
                        <div style={{ marginBottom: '8px' }}>{e.adminPriority}</div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-gray-800 font-bold">
                        <div style={{ marginBottom: '8px' }}>Data Created:</div>
                      </td>
                      <td className="font-semibold text-black">
                        <div style={{ marginBottom: '8px' }}>{e.datacreated}</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              )
            })
          }
        </div>

        <div className="mt-10 ml-5 flex flex-col w-[50vw] rounded-lg gap-y-4 bg-white items-start  text-gray-800 p-5">
          <div className="flex items-center mb-2 justify-between w-full">
            <h1 className="text-lg bold-600 font-roboto">Platform Settings</h1>
          </div>

          <div className="flex flex-col items-start justify-start">

            <h1 className="mb-4 text-md font-roboto font-semibold text-gray-500 uppercase">Account</h1>

            <div className="mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isChecked} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked={isChecked} onChange={handleChange}:after:translate-x-full rtl:peer-checked={isChecked} onChange={handleChange}:after:-translate-x-full peer-checked={isChecked} onChange={handleChange}:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked={isChecked} onChange={handleChange}:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Allow notifications when someone sends me message</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked={isChecked} onChange={handleChange}:after:translate-x-full rtl:peer-checked={isChecked} onChange={handleChange}:after:-translate-x-full peer-checked={isChecked} onChange={handleChange}:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked={isChecked} onChange={handleChange}:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Allow notifications when someone sends me message</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isChecked} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked={isChecked} onChange={handleChange}:after:translate-x-full rtl:peer-checked={isChecked} onChange={handleChange}:after:-translate-x-full peer-checked={isChecked} onChange={handleChange}:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked={isChecked} onChange={handleChange}:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Allow notifications when someone sends me message</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked={isChecked} onChange={handleChange}:after:translate-x-full rtl:peer-checked={isChecked} onChange={handleChange}:after:-translate-x-full peer-checked={isChecked} onChange={handleChange}:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked={isChecked} onChange={handleChange}:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Allow notifications when someone sends me message</span>
              </label>
            </div>

            <h1 className="mb-4 text-md font-roboto font-semibold text-gray-500 uppercase">Application</h1>

            <div className="mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked={isChecked} onChange={handleChange}:after:translate-x-full rtl:peer-checked={isChecked} onChange={handleChange}:after:-translate-x-full peer-checked={isChecked} onChange={handleChange}:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked={isChecked} onChange={handleChange}:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Allow notifications when someone sends me message</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isChecked} onChange={handleChange} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked={isChecked} onChange={handleChange}:after:translate-x-full rtl:peer-checked={isChecked} onChange={handleChange}:after:-translate-x-full peer-checked={isChecked} onChange={handleChange}:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked={isChecked} onChange={handleChange}:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Allow notifications when someone sends me message</span>
              </label>
            </div>

            <div className="mb-10">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked={isChecked} onChange={handleChange}:after:translate-x-full rtl:peer-checked={isChecked} onChange={handleChange}:after:-translate-x-full peer-checked={isChecked} onChange={handleChange}:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked={isChecked} onChange={handleChange}:bg-blue-600"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Allow notifications when someone sends me message</span>
              </label>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default User;

