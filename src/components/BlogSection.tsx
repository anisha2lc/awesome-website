import { useState } from 'react';
import blogData from '../data/blogData';
import BlogCard from './BlogCard';

const BlogSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);

  const handleViewAll = () => {
    setVisibleCount(blogData.length);
  };

  return (
    <section className="bg-gray-50 py-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold text-[#3B3950] mb-2">Blog</h2>
        <p className="text-[#797979] text-sm">Insights, thoughts, industry trends, marketing tips, eDesign news, nerdy stuff, it's all here.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {blogData.slice(0, visibleCount).map(blog => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {visibleCount < blogData.length && (
        <div className="text-center mt-10">
          <button
            onClick={handleViewAll}
            className="bg-[#4E42D9] hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition cursor-pointer"
          >
            View All
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
