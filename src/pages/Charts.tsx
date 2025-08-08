import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProjectsBarChart = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [projectCounts, setProjectCounts] = useState([18, 12, 9, 7]);

  const handleBarClick = (_: any, elements: string | any[]) => {
    if (elements.length > 0) {
      setSelectedIndex(elements[0].index);
      setModalOpen(true);
    }
  };

  const handleUpdate = (e: {
    preventDefault: () => void;
    target: { updatedValue: { value: string } };
  }) => {
    e.preventDefault();
    const newCount = parseInt(e.target.updatedValue.value);
    if (!isNaN(newCount) && selectedIndex !== null) {
      const updatedCounts = [...projectCounts];
      updatedCounts[selectedIndex] = newCount;
      setProjectCounts(updatedCounts);
      setModalOpen(false);
    }
  };

  const data = {
    labels: [
      "Web Application",
      "SEO",
      "Game Development",
      "IoT / AI / Robotic",
    ],
    datasets: [
      {
        label: "Completed Projects",
        data: projectCounts,
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    onClick: handleBarClick,
    plugins: {
      title: {
        display: true,
        text: "Project Distribution by Category",
      },
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative w-full px-4 sm:px-6 lg:px-8">
      {modalOpen && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-10"></div>
      )}

      <div className="relative w-full max-w-6xl h-[400px] sm:h-[450px] md:h-[500px] mx-auto bg-white p-4 rounded-lg shadow-md z-20">
        <Bar data={data} options={options} />
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            className="bg-white w-full max-w-md rounded-xl shadow-2xl p-6 md:p-8 z-50"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Update Project Count for{" "}
              <span className="text-indigo-600 font-bold">
                {data.labels[selectedIndex!]}
              </span>
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">
              <div>
                <label
                  htmlFor="updatedValue"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  New Project Count
                </label>
                <input
                  name="updatedValue"
                  id="updatedValue"
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter new count"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsBarChart;
