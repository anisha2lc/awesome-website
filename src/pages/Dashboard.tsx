import OurServices from "../components/OurServices";
import BlogSection from "../components/BlogSection";

const Dashboard = () => {
  return (
    <>
      <div className="container max-w-9/10 mx-auto px-3 md:px-6 py-6">
        <main className="flex flex-col md:flex-row items-stretch px-4">
          <section className="flex-1 flex flex-col justify-around">
            <div>
              <p className="font-bold text-2xl md:text-4xl text-[#3B3950] mb-3">
                We do the work you stay focused on your customers.
              </p>
              <p className="text-[16px] text-[#797979] mb-6">
                Awwwsome. is a digital agency passionate about storytelling,
                visual design, and technology. We collaborate with companies
                small to large around the world to help them engage their
                audiences and build brand awareness.
                <br />
                <br />
                Our team can create amazing web experiences, beginning with deep
                market research, practical strategies, and professional
                execution.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button className="bg-[#4E42D9] rounded text-white py-2 px-4">
                Explore Projects
              </button>
              <button className="bg-[#4E42D92E] rounded text-[#4E42D9] py-2 px-4">
                About Us
              </button>
            </div>
          </section>

          <section className="flex-1 flex items-stretch">
            <div className="w-full flex items-center justify-center">
              <img
                src="hero image.png"
                alt="Hero"
                className="w-auto max-h-[400px] object-contain"
              />
            </div>
          </section>
        </main>

        <OurServices />
        <BlogSection />
      </div>
    </>
  );
};

export default Dashboard;
