import React, { useEffect, useState } from "react";
import axios from "axios"
import { FiMessageSquare } from "react-icons/fi";
import { API_KEY, baseUrl } from "../configs/config";
import { FaFacebookMessenger, FaUser } from "react-icons/fa";
import { AiOutlineCalendar } from "react-icons/ai";


export const FeedbackForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [review, setReview] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/feedback`, { name, review },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY,
                    },
                }
            );

            if (response.status === 201) {
                alert("Feedback submitted successfully!");
                setIsOpen(false);
                setName("");
                setReview("");
                window.location.reload()
            }
        } catch (error) {
            alert("Error submitting feedback");
        }
    };



    return (
        <div className="flex items-center">
            <div onClick={() => setIsOpen(true)} >
                <button className="flex items-center gap-2 text-blue-600 border border-blue-600 font-bold py-2 px-6 rounded-lg shadow-md transition duration-300">
                    <FiMessageSquare className="w-5 h-5" /> Feedback
                </button>

            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 px-4 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Feedback</h2>
                        <form onSubmit={handleSubmit}>

                            {/* Name Input */}
                            <div className="mb-2">
                                <label className="block text-gray-700 font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Review Input */}
                            <div className="mb-2">
                                <label className="block text-gray-700 font-medium mb-1">Review</label>
                                <textarea
                                    className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    rows="4"
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    required
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="bg-gray-300 text-gray-800 font-medium px-4 py-2 rounded-md hover:bg-gray-400 transition"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-green-600 text-white font-medium px-4 py-2 rounded-md hover:bg-green-700 transition"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            )}
        </div>
    );
};


export const UserFeedbacks = ({ showLimit }) => {
    const [userFeedbacks, setUserFeedbacks] = useState([]);

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(`${baseUrl}/feedback`, {
                    headers: {
                        "x-api-key": API_KEY,
                    },
                });

                if (response.status === 200) {
                    setUserFeedbacks(response.data);
                }
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetchFeedbacks();
    }, []);

    // If showLimit is provided, slice the array
    const displayedFeedbacks = showLimit ? userFeedbacks.slice(0, showLimit) : userFeedbacks;

    return (
        <section className="mt-8 w-[90%] text-center p-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedFeedbacks.length > 0 ? (
                    displayedFeedbacks.map(({ name, createdAt, review }, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <p className="italic text-gray-600 flex justify-center items-start gap-1"> <FaFacebookMessenger /> "{review}"</p>
                            <div className="flex justify-between items-center mt-4">
                                <h3 className="font-bold text-gray-800 flex justify-center items-center gap-2"> <FaUser /> {name}</h3>
                                <p className="text-gray-800 text-sm flex justify-center items-center gap-2"> <AiOutlineCalendar /> {new Date(createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600 col-span-full">No feedback available yet.</p>
                )}
            </div>
        </section>
    );
};


