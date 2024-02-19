import React from 'react'

const Contact = ({ theme }) => {
  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
        Contact
    </div>
  )
}

export default Contact