import { useState } from "react";

export default function ContactForm() {

    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just simulate submission
        console.log("Message sent:", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="px-6 py-4 bg-white rounded-xl max-w-md mx-auto shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Send us a message</h3>

            {submitted && (
                <p className="text-green-500 text-sm mb-3">Message sent successfully!</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-sm">
                {/* Name & Email */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                        required
                    />
                </div>

                {/* Message */}
                <textarea
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-yellow-400 resize-none"
                    required
                />

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-yellow-400 cursor-pointer text-black font-medium py-2 rounded-md transition"
                >
                    Send Message
                </button>
            </form>
        </div>

    )
}