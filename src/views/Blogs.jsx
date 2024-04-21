import React, { useRef } from "react";
import Input from "../components/Input";
import { useFormik } from 'formik';
import { CreateBlogSchema } from '../YSchema/schema';
import SelectInput from "../components/SelectInput";
import TextArea from "../components/TextArea";
import toast, { Toaster } from "react-hot-toast";
import { blogUrl } from "../utils/constant";

const initialValues = {
  title: "",
  category: "Education",
  description: ""
}

const Blogs = ({ theme }) => {


  const quillRef = useRef(null);

  const submitForm = async (values, { resetForm }) => {
    const response = await fetch(`${blogUrl}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'user-token': localStorage.getItem('user-token')
      },
      body: JSON.stringify(values)
    });

    const json = await response.json();

    if (json.success) {
      toast.success("Blog is successfully created.");
      quill.setText('');
      resetForm();
    }
    else {
      toast.error("Oops! Something went wrong.")
      quill.setText('');
      resetForm();
    }
  }


  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: CreateBlogSchema,
    onSubmit: submitForm
  })


  return (
    <div className={`${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className="text-lg font-poppins font-medium">
        <Toaster
          position="top-right"
        />
      </div>


      <div className="max-w-[1500px] flex items-center lg:flex-row xl:flex-row flex-col justify-center mx-auto py-20 roboto">
        <div className="w-full font-poppins">
          <form className="flex flex-col pb-10 items-start justify-start px-10 space-y-5" onSubmit={handleSubmit}>
            <Input labelName="Blog Title" name="title" value={values} onChange={handleChange} placeholder="Title here" errors={errors} touched={touched} />
            <SelectInput labelName="Choose category" name="category" value={values} onChange={handleChange} errors={errors} />
            <TextArea
              name="description"
              value={values}
              onChange={handleChange}
              errors={errors}
              touched={touched}
              placeholder="Note:- Content should must be atleast 200 characters long"
              theme={theme}
              ref={quillRef}
            />
            <button type="submit" className="py-3 px-5 my-5 text-sm rounded-md border-none focus:outline-none hover:bg-indigo-400 font-semibold bg-indigo-500 text-white">Create Post</button>
          </form>
        </div>
      </div>



    </div>
  );
};

export default Blogs;
