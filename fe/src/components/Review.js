import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";
import { API_KEY, baseUrl } from "../configs/config";
import axios from "axios";

export default function Review() {
  const [feedbackArr, setFeedbackArr] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${baseUrl}/feedback`, {
          headers: {
            "x-api-key": API_KEY,
          },
        });
        setFeedbackArr(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center min-h-screen bg-blue-50 p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Users Feedback
        </h2>

        {loading ? (
          <h3>Loading.......</h3>
        ) : (
          <div className="w-full max-w-2xl space-y-6">
            {feedbackArr?.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl shadow-lg flex items-start space-x-4 transition-all duration-300 hover:scale-[1.03] bg-white border-l-4 border-blue-500`}
              >
                <FaUserCircle className="text-blue-600 text-4xl" />
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-gray-700 mt-1">{item.review}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
