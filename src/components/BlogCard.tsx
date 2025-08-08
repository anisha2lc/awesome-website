import React from 'react';

type Blog = {
  image: string;
  title: string;
  date: string;
  description: string;
};

type BlogCardProps = {
  blog: Blog;
};

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => (
  <div className="bg-white rounded-lg p-4">
    <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover rounded-md mb-4" />
    <p className="text-xs text-[#797979] mb-1">{blog.date}</p>
    <h3 className="text-lg font-semibold mb-2 text-[#3B3950]">{blog.title}</h3>
    <p className="text-[#797979] text-sm">{blog.description}</p>
  </div>
);

export default BlogCard;
