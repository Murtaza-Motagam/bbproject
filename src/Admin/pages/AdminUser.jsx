import React, { useEffect, useState } from 'react';
import admin from "../../assets/admin-person.png";
import "../styles/global.scss";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const AdminUser = (props) => {

  const Navigate = useNavigate();

  const [loading, setLoading] = useState(true);


  // Loading implementation

  setTimeout(() => {
    setLoading(false)
  }, 400);


  const MainFunction = (props) => {

    const [userInfo, setUserInfo] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sentData, setSentData] = useState("");

    const openModal = (id) => {
      setIsModalOpen(true);
      setSentData(id)
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    const handleDelete = async () => {

      try {

        document.getElementById("deleteText").style.display = "none";
        document.getElementById("deleteSpinner").style.display = "flex";

        const id = sentData;

        const response = await fetch(`http://localhost:5000/api/admin/deleteuser/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'admin-token': localStorage.getItem('admin-token')
          },
        });

        const json = await response.json();


        setTimeout(() => {

          if (json.success) {

            document.getElementById("deleteSpinner").style.display = "none";
            document.getElementById("deleteText").style.display = "flex";

            Navigate('/users', { state: { userDeleted: true } });

          }
          else {
            props.showAlert("Oops!", "Something went wrong", "danger")
          }

        }, 2500);

      } catch (error) {
        // Handle network errors
        console.error('Error fetching admin info:', error.message);
      }

      closeModal();
    };

    const { id } = useParams();

    const handleChange = () => {
      setIsChecked(prevState => !prevState);
    };

    useEffect(() => {
      document.title = " Blogin User | Check and edit the details of a single user";
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
      <div className="min-h-screen">
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
                            <button onClick={() => { openModal(user._id) }} className="py-2 px-3 text-white bg-red-600 hover:bg-red-500 rounded font-medium ">

                              <div id="deleteText" className="text flex gap-x-2 items-center ">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                                <span>Delete user</span>
                              </div>

                              {/* Loader while deleting */}

                              <div role="status" id="deleteSpinner" className="hidden items-center gap-x-3">
                                <svg aria-hidden="true" className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <h1 className="font-semibold text-sm font-poppins">Removing...</h1>
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
                      Confirm Delete
                    </button>
                    <button onClick={closeModal} type="button" className="text-gray-500 bg-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}
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

