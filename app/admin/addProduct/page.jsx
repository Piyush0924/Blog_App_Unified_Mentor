'use client';

import { assets } from '@/Assets/assets'; // Adjust import path if necessary
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        title: '',
        description: '',
        category: 'Startup',
        author: 'John Cena',
        authorImg: '/author_img.png',
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', data.category);
        formData.append('author', data.author);
        formData.append('authorImg', data.authorImg);
        formData.append('image', image);

        try {
            const response = await axios.post('/api/blog', formData);
            if (response.data.success) {
                toast.success(response.data.msg);
                setImage(null);
                setData({
                    title: '',
                    description: '',
                    category: 'Startup',
                    author: 'John Cena',
                    authorImg: '/author_img.png',
                });
            } else {
                toast.error(response.data.msg || 'Error occurred.');
            }
        } catch (error) {
            console.error('Error adding blog:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
            <p className="text-xl">Upload thumbnail</p>
            <label htmlFor="image">
                <Image
                    className="mt-4"
                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                    width={140}
                    height={70}
                    alt="Upload Area"
                />
            </label>
            <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                required
                hidden
            />
            <p className="text-xl mt-4">Blog title</p>
            <input
                className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                type="text"
                name="title"
                onChange={onChangeHandler}
                value={data.title}
                placeholder="Type here"
                required
            />
            <p className="text-xl mt-4">Blog description</p>
            <textarea
                className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
                name="description"
                onChange={onChangeHandler}
                value={data.description}
                placeholder="Write content here"
                rows={6}
                required
            />
            <p className="text-xl mt-4">Blog category</p>
            <select
                name="category"
                onChange={onChangeHandler}
                value={data.category}
                className="w-40 mt-4 px-4 py-3 border text-gray-500"
            >
                <option value="Startup">Startup</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
            </select>
            <br />
            <button className="text-white bg-black mt-8 w-40 h-12" type="submit">
                ADD
            </button>
        </form>
    );
};

export default Page;
