"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getUserInfo } from "../utils/getUserInfo";
import {
  FiUpload,
  FiDownload,
  FiTrash2,
  FiFile,
  FiRefreshCw,
  FiPlus,
  FiSearch,
  FiMessageSquare,
} from "react-icons/fi";
import Navbar from "./Navbar";
import { FaFilePdf } from "react-icons/fa";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FeedbackForm } from "./UserFeedbacks";
import { API_KEY, baseUrl, downloadUrl } from "../configs/config";
const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [fileName, setFileName] = useState("No file selected");
  const token = localStorage.getItem("userDetails");
  const dataRef = useRef([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file selected");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");
    if (!title) return alert("Please enter a title");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    formData.append("userId", getUserInfo("_id"));
    formData.append("userName", getUserInfo("name"));
    formData.append("userEmail", getUserInfo("email"));

    try {
      const res = await axios.post(`${baseUrl}/files/upload`, formData, {
        headers: {
          Authorization: JSON.parse(token).token,
          "Content-Type": "multipart/form-data",
          "x-api-key": API_KEY,
        },
      });

      //   setUploadedFiles([...uploadedFiles, res.data.file])
      fetchFiles();
      alert("File uploaded successfully");
      setTitle("");
      setDescription("");
      setFile(null);
      setFileName("No file selected");
    } catch (error) {
      alert("File upload failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchFiles = async () => {
    setLoadingFiles(true);
    try {
      const res = await axios.get(
        `${baseUrl}/files?userId=${getUserInfo("_id")}`,
        {
          headers: { Authorization: token, "x-api-key": API_KEY },
        }
      );
      setUploadedFiles(res.data);
      dataRef.current = res.data;
    } catch (error) {
      alert("Failed to load files");
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleDownload = async (filename, title) => {
    try {
      const response = await axios.get(
        `${baseUrl}/files/download/${filename}`,
        {
          responseType: "blob",
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Failed to download file");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${baseUrl}/files/${id}`, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      alert(response.data.message);
      fetchFiles();
    } catch (error) {
      alert("Failed to delete file");
    }
  };

  const handleSearch = (val) => {
    const data = [...dataRef.current];
    const searchValue = val.toLowerCase();

    const filteredData = data.filter((ele) => {
      const title = ele?.title?.toLowerCase() || "";
      const desc = ele?.description?.toLowerCase() || "";

      return title.includes(searchValue) || desc.includes(searchValue);
    });

    setUploadedFiles(filteredData);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
        {/* Header */}
        <div className="text-start mb-10">
          <div className="flex flex-col md:flex-row justify-between gap-6 p-4">
            {/* Left Section */}
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-extrabold text-gray-400 sm:text-3xl">
                Hello {getUserInfo("name")}! 👋
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                Effortless Document Management 📂
              </h2>
              <p className="mt-2 text-md text-gray-600 max-w-md">
                Seamlessly upload, organize, and manage your PDF documents with
                ease. Stay productive and keep everything in one place!
              </p>
            </div>

            {/* Right Section - Button */}
            <div>
              <FeedbackForm />
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto">
          {/* Upload Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-10">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FiUpload className="mr-2" /> Upload New Document
              </h2>

              <div className="space-y-6">
                {/* Title Input */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Document Title*
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Enter document title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Description Input */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description (Optional)
                  </label>
                  <textarea
                    id="description"
                    rows="3"
                    placeholder="Enter document description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select PDF File*
                  </label>
                  <div
                    className="mt-1 flex flex-col items-center justify-center border-2 border-dotted border-gray-400 rounded-lg p-8 hover:border-indigo-600 transition-all cursor-pointer bg-gray-50 hover:bg-gray-100 shadow-sm"
                    onClick={() => document.getElementById("pdfInput").click()}
                  >
                    <AiOutlineCloudUpload className="text-indigo-600 text-4xl mb-3 hover:text-indigo-700 transition-all" />
                    <span className="text-gray-600 text-sm font-medium">
                      {fileName ? (
                        <span className="text-indigo-700">{fileName}</span>
                      ) : (
                        "Click to upload a file"
                      )}
                    </span>
                    <input
                      id="pdfInput"
                      type="file"
                      accept=".pdf"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Upload Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`flex items-center px-4 py-2 rounded-md text-white font-medium ${
                      loading
                        ? "bg-indigo-400"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FiPlus className="mr-2" /> Upload
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Files List Section */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FaFilePdf className="text-black-500 text-3xl mr-2" />
                  My Documents
                </h2>

                <div className="flex flex-col sm:flex-row items-start sm:items-center w-full sm:w-auto mt-4 sm:mt-0">
                  {/* Search Box */}
                  <div className="relative w-full sm:w-60 mb-2 sm:mb-0 sm:mr-2">
                    <input
                      onChange={(e) => handleSearch(e.target.value)}
                      type="text"
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm text-sm"
                    />
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <button
                    onClick={fetchFiles}
                    disabled={loadingFiles}
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FiRefreshCw
                      className={`mr-2 ${loadingFiles ? "animate-spin" : ""}`}
                    />
                    {loadingFiles ? "Loading..." : "Refresh"}
                  </button>
                </div>
              </div>

              {uploadedFiles.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <FaFilePdf className="mx-auto h-12 w-12 text-gray-900" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No documents
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't uploaded any documents yet.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Document
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Create Date
                        </th>
                        <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {uploadedFiles?.map((file) => (
                        <tr key={file._id} className="hover:bg-gray-50">
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-red-100 rounded-md">
                                <FaFilePdf className="h-5 w-5 text-red-500" />
                              </div>
                              <div className="ml-4">
                                <a
                                  href={`${downloadUrl}${file.fileUrl}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sm font-medium text-indigo-600 hover:text-indigo-900 hover:underline"
                                >
                                  {file.title}.pdf
                                </a>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {file.description || "No description"}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4">
                            <div className="text-sm text-gray-500 max-w-xs truncate">
                              {file.createdAt
                                ? new Date(file.createdAt).toLocaleString()
                                : ""}
                            </div>
                          </td>
                          <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                handleDownload(file.filename, file.title)
                              }
                              className="inline-flex items-center p-2 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                            >
                              <FiDownload />
                            </button>
                            <button
                              onClick={() => handleDelete(file._id)}
                              className="inline-flex items-center p-2 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
