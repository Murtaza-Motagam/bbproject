import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Users = () => {

  const Navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAllUsersInfo();
  }, []);

  const fetchAllUsersInfo = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/fetchallusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'admin-token': localStorage.getItem('admin-token')
        },
      });

      const json = await response.json();
      setUsers(json.fetchAllUsers);
    } catch (error) {
      console.error('Error fetching admin info:', error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const searchValue = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(searchValue) ||
      user.emailId.toLowerCase().includes(searchValue) 
    );
  });

  const handleClickTr = (id) => {
    Navigate(`/users/${id}`);
  }
  

  return (
    <div className="users min-h-screen">
      <div className="info flex items-center mb-5 gap-x-2">
        <button className="text-md flex items-center gap-x-1 hover:rounded-full hover:bg-gray-600 hover:py-2 hover:px-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Add New User
        </button>
      </div>

      <form className="mb-5 font-roboto" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-md text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Search Admin Users"
            value={searchQuery}
            onChange={handleSearchChange}
            autoComplete='off'
            required
          />
          <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>

      <div className="overflow-x-auto rounded-md justify-center">
        <table className="min-w-full divide-y divide-gray-200 justify-center items-center">
          {/* Table headers */}
          <thead className="bg-gray-900 items-center">
            <tr>
              <th scope="col" className="pl-4 pr-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Sno.</th>
              <th scope="col" className="px-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Username</th>
              <th scope="col" className="px-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Email-ID</th>
              <th scope="col" className="px-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">User Created</th>
              <th scope="col" className="pl-3 py-3 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200 text-gray-900 font-roboto">
            {searchQuery !== '' ? (
              filteredUsers.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr>
                    <td className="px-7 py-4 text-center whitespace-nowrap">{index+1}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">{user.username}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">{user.emailId}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">{user.datacreated.substring(0, 10)}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap flex gap-x-3 items-center">
                      <Link to={`/users/${user._id}`} className="py-2 px-4 text-white bg-green-600 hover:bg-green-500 rounded font-medium">Edit</Link>
                      <Link to={`/deleteuser/${user.adminId}`} className="py-2 px-4 text-white bg-red-600 hover:bg-red-500 rounded font-medium">Delete</Link>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              users.map((user, index) => (
                <React.Fragment key={user._id}>
                  <tr className="hover:bg-gray-100 hover:cursor-pointer" onClick={()=>{handleClickTr(user._id)}}>
                    <td className="px-7 py-4 text-center whitespace-nowrap">{index+1}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">{user.username}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">{user.emailId}</td>
                    <td className="px-3 py-4 text-center whitespace-nowrap">{user.datacreated.substring(0, 10)}</td>
                    <td className="pl-3 py-4 text-center whitespace-nowrap flex gap-x-3 justify-center">
                      <Link to={`/users/${user._id}`} className="py-2 px-4 text-white bg-green-600 hover:bg-green-500 rounded font-medium">View User</Link>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Users;
