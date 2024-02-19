import React from 'react'

const BlogsCategory = ({ theme }) => {
  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      BlogsCategory
    </div>
  )
}

export default BlogsCategory