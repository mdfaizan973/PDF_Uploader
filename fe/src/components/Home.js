import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import { FiUploadCloud } from "react-icons/fi";
import Nav from "./Nav";
import { UserFeedbacks } from "./UserFeedbacks";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Nav />

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight">
          Store & Manage Your PDFs Securely 📂
        </h1>
        <p className="text-gray-600 text-lg mt-4 max-w-2xl">
          Easily upload, store, and access your PDF files anytime, anywhere.
        </p>
        <Link to="/upload">
          <button className="mt-6 flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition">
            <FiUploadCloud className="mr-2 text-xl" />
            Upload Your PDF
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-indigo-500 cursor-pointer">
          <h3 className="text-xl font-semibold text-gray-800">Easy Upload</h3>
          <p className="text-gray-600 mt-2">
            Drag and drop or select files easily.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-indigo-500 cursor-pointer">
          <h3 className="text-xl font-semibold text-gray-800">
            Secure Storage
          </h3>
          <p className="text-gray-600 mt-2">
            Your files are stored with top security.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center transform transition duration-300 hover:scale-105 hover:shadow-lg border border-gray-200 hover:border-indigo-500 cursor-pointer">
          <h3 className="text-xl font-semibold text-gray-800">
            Access Anywhere
          </h3>
          <p className="text-gray-600 mt-2">
            Access your PDFs from any device.
          </p>
        </div>
      </section>
      <div className="flex justify-center bg-purple-100 p-2">
        <UserFeedbacks showLimit={3} />
      </div>

      {/* New Section: Why Choose Us */}
      <section className="bg-indigo-50 py-12 px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Why Choose Our PDF Storage?
        </h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          We provide a seamless experience for uploading, organizing, and
          accessing your PDF files. Our platform is designed to keep your
          documents secure and always within reach.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Fast & Simple
            </h3>
            <p className="text-gray-600 mt-2">
              Quickly upload and manage PDFs with ease.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Cloud Access
            </h3>
            <p className="text-gray-600 mt-2">
              Access your documents from anywhere, anytime.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              High Security
            </h3>
            <p className="text-gray-600 mt-2">
              Your PDFs are encrypted and stored safely.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              User-Friendly
            </h3>
            <p className="text-gray-600 mt-2">
              Designed for a seamless and intuitive experience.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}
