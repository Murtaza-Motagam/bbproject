import React, { useEffect, useState } from 'react';
import admin from "../../../assets/admin-person.png"  
import './user.scss';
import "../../styles/global.scss";
import { Link, useParams } from 'react-router-dom';

const User = () => {

  const [userInfo, setUserInfo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    
    closeModal();
  };

  const { id } = useParams();

  const handleChange = () => {
    setIsChecked(prevState => !prevState);
  };

  useEffect(() => {
    fetchSingleUserInfo(id);
  }, []);

  const fetchSingleUserInfo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/fetchuser/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'admin-token': localStorage.getItem('admin-token')
        },
      });

      const json = await response.json();
      setUserInfo(json)


    } catch (error) {
      // Handle network errors
      console.error('Error fetching admin info:', error.message);
    }
  };




  return (
    <div className="w-full font-roboto min-h-screen relative">
      <div className=" mx-5 py-3 mt-5 bg-gray-50 flex items-center justify-start text-gray-800 rounded-lg ">
        <div className="image p-2 rounded-xl mx-4 bg-gray-300 h-[150px] w-[150px] object-contain">
          <img src={admin} alt="" />
        </div>
        {userInfo.map((e, index) => {
          return (
            <div className=" ml-3 info flex flex-col gap-y-2 items-start justify-start" key={index}>
              <h1 className="text-2xl uppercase bold-700">{e.username}</h1>
              <h1 className="text-lg text-gray-700 ">{e.emailId}</h1>
            </div>
          )
        })}
      </div>


      <div className="overflow-x-auto flex justify-center gap-x-2 items-start">
        <table className="mt-5 min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-900">
            <tr>
              <th scope="col" className="px-7 pr-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Sno.</th>
              <th scope="col" className="px-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Email-ID</th>
              <th scope="col" className="px-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">User Created</th>
              <th scope="col" className="px-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-gray-900 font-roboto">
            {
              userInfo.map((user, index) => {
                return (
                  <React.Fragment key={user._id}>
                    <tr>
                      <td className="px-7 py-4 text-center whitespace-nowrap">{index + 1}</td>
                      <td className="px-3 py-4 text-center whitespace-nowrap">{user.username}</td>
                      <td className="px-3 py-4 text-center whitespace-nowrap">{user.emailId}</td>
                      <td className="px-3 py-4 text-center whitespace-nowrap">{user.datacreated.substring(0, 10)}</td>
                      <td className="px-3 py-4 text-center whitespace-nowrap flex gap-x-3 justify-center">
                        <button  onClick={openModal} className="py-2 px-3 text-white bg-red-600 hover:bg-red-500 rounded font-medium ">Delete user</button>
                      </td>
                    </tr>
                  </React.Fragment>
                )
              })
            }
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div id="popup-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden setModal z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" onClick={closeModal} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete profile of this user?</h3>
                <button onClick={handleDelete} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">  
                  Yes, I'm sure
                </button>
                <button onClick={closeModal} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;

