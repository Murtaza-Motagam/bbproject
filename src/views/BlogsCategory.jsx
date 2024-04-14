import React from "react";
import CategoryNav from "../components/CategoryNav";
import FeaturedBlogs from "../components/FeaturedBlogs";

const BlogsCategory = ({ theme, category }) => {
  return (
    <div className={`${theme === "dark" ? "dark" : "light"} max-w-[2000px] mx-auto`}>
      <CategoryNav theme={theme} />
      <FeaturedBlogs category={category}/>
    </div>
  );
};

export default BlogsCategory;
