import * as Yup from 'yup';

export const CreateBlogSchema = Yup.object().shape({
    title: Yup.string().required('Blog title is required!!')
        .min(10, 'Title should must be at least 50 character long'),

    category: Yup.string().required('Category is required field')
        .min(5, 'Category should must be at least 5 character long'),

    description: Yup.string().required('Description is required!!')
        .min(100, 'Description should must be at least 200 character long'),
    
    
});