import { FiArrowRight } from "react-icons/fi";
import Carousel from "./ReactBit/Carousel";

const InsightShowcase = () => {
    return (
        <section className="bg-white text-gray-800 mb-20 px-6 md:px-16 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-20">

            <Carousel />

            {/* Right Side - Text */}
            <div className="w-full lg:w-[55%] space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-md">
                        GitHub
                    </span>{" "}    
                    <span className="text-gray-800">Insights, Visualized</span>
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed">
                    DevHub empowers you to analyze GitHub activity, visualize your stack,
                    explore repositories, and collaborate with the community — all from a single dashboard.
                </p>
            </div>
        </section>
    );
};

export default InsightShowcase;
