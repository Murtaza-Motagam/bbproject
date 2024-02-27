import React, {useEffect} from "react";
import { Link } from "react-router-dom";

const Home = ({ theme }) => {

  useEffect(()=>{
    document.title = "BLOGIN - Exclusive Blog Content Service Media Platform.";
  },[])

  return (
    <div className={`${theme === "dark" ? "dark" : "light"}`}>
      Homepage
    </div>
  );
};

export default Home;
