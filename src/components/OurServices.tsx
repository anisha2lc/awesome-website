const services = [
  {
    title: "Web Application",
    description: "Platform independent business solutions for maximum availability",
    icon: "🧩",
    bg: "bg-red-100",
  },
  {
    title: "SEO",
    description: "Let the world find you on top of others",
    icon: "🚀",
    bg: "bg-blue-100",
  },
  {
    title: "Game Development",
    description: "Interactive games with perfect graphics",
    icon: "🎮",
    bg: "bg-yellow-100",
  },
  {
    title: "IoT / AI / Robotic",
    description: "Advanced autonomous technologies to make life simple",
    icon: "🤖",
    bg: "bg-pink-100",
  },
];

const OurServices = () => {
  return (
    <section className="py-6 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#3B3950] mb-10">
        What we do
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col items-center text-center p-3">
            <div className={`w-16 h-16 flex items-center justify-center rounded-xl cursor-pointer mb-4 ${service.bg}`}>
              <span className="text-2xl transform transition-transform duration-300 hover:scale-125">{service.icon}</span>
            </div>
            <h3 className="font-semibold text-lg text-[#3B3950] mb-2">{service.title}</h3>
            <p className="text-sm text-[#797979]">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
