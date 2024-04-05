import React, { useEffect, useState } from 'react';
import admin from "../../assets/admin-person.png";
import "../styles/global.scss";
import { blogUrl } from "../../utils/constant"
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast"

const AdminUser = (props) => {


  const { id } = useParams();

  const Navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false)
  }, 400);


  const MainFunction = (props) => {

    const [userInfo, setUserInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDBOpen, setIsDBOpen] = useState(false);
    const [blogId, setBlogId] = useState("");
    const [blogs, setBlogs] = useState([]);

    const openModal = (id, blogTitle) => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const openDBModal = (id) => {
      setIsDBOpen(true);
      setBlogId(id);
    };

    const closeDBModal = () => {
      setIsDBOpen(false);
    };

    const fetchUserBlogs = async () => {
      const response = await fetch(`${blogUrl}/fetchbyid/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'admin-token': localStorage.getItem('admin-token')
        },
      });

      const json = await response.json();

      setBlogs(json)
    }


    const handleDeleteUser = async () => {

      try {

        const response = await fetch(`http://localhost:5000/api/admin/deleteuser/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'admin-token': localStorage.getItem('admin-token')
          },
        });

        const json = await response.json();

        if (json.success) {
          toast.success("User deleted successfully");
          Navigate('/users');
        }
        else {
          toast.error("Something went wrong.");
        }

      } catch (error) {
        // Handle network errors
        console.error('Error fetching admin info:', error.message);
      }

      closeModal();
    };


    useEffect(() => {
      document.title = " Blogin User | Check and edit the details of a single user";
      fetchSingleUserInfo(id);
      fetchUserBlogs();
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


    const handleDeleteBlog = async (id) => {
      id = blogId;

      try {
        const response = await fetch(`http://localhost:5000/api/blogs/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'admin-token': localStorage.getItem('admin-token')
          },
        });

        const json = await response.json();
        if (json) {
          toast.success(json.message);
          setIsDBOpen(false)
          fetchUserBlogs();
        }
        else {
          toast.error("Something went wrong!")
        }


      } catch (error) {
        console.error('Error fetching admin info:', error.message);
      }
    }

    return (
      <div className="min-h-screen">
        <Toaster
          position="top-right"
          reverseOrder="false"
        />
        <div className="w-full block font-roboto min-h-screen relative" id="displayInfo">
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
                            <button onClick={() => { openModal() }} className="py-2 px-3 text-white bg-red-600 hover:bg-red-500 rounded font-medium ">

                              <div id="deleteText" className="text flex gap-x-2 items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                <span>Delete user</span>
                              </div>
                            </button>
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
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
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
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
                    <button onClick={() => handleDeleteUser(id)} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                      Confirm Delete
                    </button>
                    <button onClick={closeModal} type="button" className="text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {isDBOpen && (
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
              <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button type="button" onClick={closeDBModal} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete blog of this user?</h3>
                    <button onClick={() => handleDeleteBlog()} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                      Confirm Delete
                    </button>
                    <button onClick={closeDBModal} type="button" className="text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}



          <div className="text-sm font-medium text-center  mt-10  font-poppins  overflow-hidden  text-gray-50">
            <ul className="flex flex-wrap -mb-px pb-2 gap-x-4">
              <li className="me-2">
                <Link to="#" className="border-b-4 border-gray-50 inline-block p-4 rounded-t-lg" aria-current="page">Blogs</Link>
              </li>
            </ul>
          </div>

          <div className="w-full mt-6">
            {blogs.map((b) => {
              return (
                <div className="blog bg-gray-900 mr-10 ml-5 200 py-5 flex justify-between items-center px-5 overflow-hidden  border-b-4 rounded-xl  mb-5 hover:bg-gray-800" key={b._id}>
                  <div className="w-full ml-5 flex items-start flex-col space-y-5">
                    <div className="space-y-2">
                      <h1 className="shortInfo p-0 text-lg lg:text-xl xl:text-xl font-semibold text-blue-500">{b.category}</h1>
                      <h1 className="Mainheading p-0 text-xl lg:text-2xl xl:text-2xl font-bold text-white">{b.title}</h1>
                    </div>
                    <p className="desc text-sm lg:text-md xl:text-md font-medium text-gray-300">{b.description}</p>
                    <div className="w-full flex items-center justify-end">
                      <div className="p-2 hover:bg-red-500 text-white rounded-full cursor-pointer" onClick={() => { openDBModal(b._id) }}>
                        <MdDelete size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>

        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen">
      {loading ? <Loader message="Getting User Details" /> : <MainFunction />}
    </div>
  )
};

export default AdminUser;

