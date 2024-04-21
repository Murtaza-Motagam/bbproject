import React, { useContext, useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Rectangle } from 'recharts';
import { BlogContext } from '../../BlogContext';

const AdminDashboard = () => {

  const context = useContext(BlogContext);
  const { data, trendingBlogs } = context;

  const [stats, setStats] = useState([]);
  const [chart1, setChart1] = useState([]);

  const bloginStats = async () => {
    const response = await fetch(`http://localhost:5000/api/admin/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'admin-token': localStorage.getItem('admin-token')
      }
    });

    const json = await response.json();
    setStats(json);

  }

  const mostCategoryVisit = async () => {
    const response = await fetch(`http://localhost:5000/api/admin/most-category-visit`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'admin-token': localStorage.getItem('admin-token')
      }
    });

    const json = await response.json();
    setChart1(json);

  }

  useEffect(() => {
    bloginStats();
    mostCategoryVisit();
    trendingBlogs();
  }, [])
  console.log(data)



  return (
    <div className="min-h-screen w-full font-roboto text-white">


      {
        stats.map((s, index) => {
          return (

            <div className="container grid grid-cols-3 space-x-5 mx-auto px-4 py-8" key={index}>
              <div className="bg-gray-800 rounded-lg mb-4 text-center space-y-5 flex flex-col justify-between py-12">
                <h2 className="text-xl font-poppins text-white font-semibold mb-2">Total Active Users</h2>
                <div className="text-4xl font-extrabold">{s.totalUsers}+</div>
              </div>


              <div className="bg-gray-800 rounded-lg mb-4 text-center space-y-5 flex flex-col justify-between py-12">
                <h2 className="text-xl font-poppins text-white font-semibold mb-2">Total Likes on All Posts</h2>
                <div className="text-4xl font-extrabold">{s.totalLikes}+</div>
              </div>


              <div className="bg-gray-800 rounded-lg mb-4 text-center space-y-5 flex flex-col justify-between py-12">
                <h2 className="text-xl font-poppins text-white font-semibold mb-2">Total Blogs Posted</h2>
                <div className="text-4xl font-extrabold">{s.totalBlogs}+</div>
              </div>

            </div>
          )
        })
      }



      {/* Charts */}

      <div className="flex items-center w-full">
        <h1 className="text-xl font-semibold mr-48 mb-5 font-poppins">Most Posted Categories in Blogin</h1>
        <h1 className="text-xl font-semibold mb-5 ml-48 font-poppins">Most Liked Blogs</h1>
      </div>
      <hr className="h-2 w-full border-2 bg-gray-200 mb-5 " />
      <div className="w-full grid grid-cols-2 text-white text-xs mb-20">
        <ResponsiveContainer width={700} height={600}>
          <BarChart
            data={chart1}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="category" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="likesOnPost" name="Likes on Post" fill="#8884d8" />
            <Bar dataKey="usersPostedOnCategory" name="Users Posted" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width={700} height={600}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="likes.length" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend />
            <Bar dataKey="title" name="Blog Title" fill="#8884d8" />
            <Bar dataKey="likes.length" name="Total Likes" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>

      </div>


    </div>
  )
}

export default AdminDashboard