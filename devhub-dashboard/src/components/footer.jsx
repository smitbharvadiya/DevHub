// components/Footer.jsx
import { FaGithub, FaLinkedin, FaLocationDot } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faXmark } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../components/ContactForm";
import { useState } from "react";

export default function Footer() {

    const [showForm, setShowForm] = useState(false);


    return (
        <footer className="bg-black text-white w-full overflow-x-hidden">
            <div className="sm:relative bg-white text-black px-6 py-6 sm:py-12 border-t">
                <h2 className="text-center sm:absolute sm:left-1/2 sm:top-1/2  sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 text-2xl sm:text-3xl font-bold flex justify-center gap-2 pb-4">
                    Contact <span className="border-b-4 border-yellow-400">us</span>
                </h2>
                <div className="flex flex-row justify-between items-center">
                    <div className="text-sm font-medium uppercase tracking-wider text-left">
                        <div>Your thoughts matter</div>
                        <div>— drop a message.</div>
                    </div>

                    <button
                        onClick={() => setShowForm(prev => !prev)}
                        className="bg-yellow-300 hover:bg-yellow-400 text-black p-4 rounded-full cursor-pointer transition self-center"
                    >
                        {showForm ? (<FontAwesomeIcon icon={faXmark} />) : "→"}
                    </button>

                </div>

            </div>

            <div className={`bg-white transition-all duration-500 overflow-hidden ${showForm ? "max-h-[1000px] pb-6" : "max-h-0"}`}>
                <ContactForm />
            </div>

            {/* Main Footer */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 py-10 text-sm border-t border-gray-800">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-white">DevHub</h3>
                    <p className="text-gray-400">Your GitHub. Smarter, organized, and AI-powered.</p>
                </div>

                <div className="flex justify-start md:justify-center">
                    <div>
                        <h4 className="text-gray-300 font-semibold mb-2">Creator</h4>
                        <p className="text-gray-400 mb-2">Smit Bharvadiya</p>
                        <div className="flex items-center gap-2 mb-2">
                            <FaLocationDot className="text-gray-400" />
                            <span className="text-gray-400">Gujarat, India</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="text-gray-400" />
                            <a
                                href="mailto:smitbharvadiya@gmail.com"
                                className="text-gray-400 hover:text-white transition-colors duration-200"
                            >
                                smitbharvadiya@gmail.com
                            </a>
                        </div>
                    </div>

                </div>


                <div className="flex justify-center">
                    <div>
                        <h4 className="text-gray-300 font-semibold mb-4 flex justify-center sm:justify-start">Follow Me</h4>
                    <div className="flex space-x-6 text-white">
                        <a href="https://github.com/smitbharvadiya" target="_blank" aria-label="GitHub">
                            <FaGithub size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/smit-bharvadiya" target="_blank" aria-label="LinkedIn">
                            <FaLinkedin size={20} />
                        </a>
                        <a href="https://www.instagram.com/smit._ahir" target="_blank" aria-label="Twitter">
                            <FaInstagram size={20} />
                        </a>
                    </div>
                    </div>
                    
                </div>
                
            </div>
        </footer >
    );
}
