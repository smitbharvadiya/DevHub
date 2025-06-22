import aiIcon from "../assets/ai-technology.png"
import Lottie from "lottie-react";
import loading from "../assets/animations/AILoading.json";

export default function AISummaryBox({ summary, loadingStatus }) {

    return (
        <>
            {loadingStatus ? (
                <div className="flex justify-center items-center w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-fadeIn backdrop-blur-sm rounded-xl shadow-md mx-3 my-3 p-6">
                    <Lottie animationData={loading} loop={true} className="w-32 h-32 sm:w-40 sm:h-40" />
                </div>)
                :
                (
                    <div className="w-full max-h-120 sm:h-full overflow-y-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 animate-fadeIn backdrop-blur-sm rounded-xl shadow-md px-5 py-4 sm:px-6 sm:py-5">
                        <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent  mb-3 flex items-center gap-2.5">
                            <img src={aiIcon} alt="AI Icon" className="h-5 w-5 sm:h-6 sm:w-6 object-contain drop-shadow-glow animate-pulse" />
                            AI Powered Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line tracking-wide text-[15px]">
                            {summary}
                        </p>
                    </div>)
            }</>
    )
};