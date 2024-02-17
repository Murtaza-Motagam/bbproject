import React from "react";

const Home = ({ theme }) => {

  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      Homepage
    </div>
  )

};

export default Home;
