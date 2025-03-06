import { useState } from "react";
import Nav from "./Nav";
import {
  AiFillCheckCircle,
  AiOutlineClose,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { UserFeedbacks } from "./UserFeedbacks";
import Footer from "./Footer";
import { QRCodeSVG } from "qrcode.react";

import { FaQrcode } from "react-icons/fa"; // QR Code
import { FaCheck } from "react-icons/fa"; // Check
import { FaTimes } from "react-icons/fa"; // X (Close)
import { FaCreditCard } from "react-icons/fa"; // Credit Card
import { useNavigate } from "react-router-dom";
const Pricing = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [showOkMessage, setShowOkMessage] = useState(false);
  const navigate = useNavigate();

  const plans = [
    {
      title: "Free",
      unlimited_access: false,
      price: 0,
      limit: "20 Limits",
      color: "blue",
    },
    {
      title: "Pro",
      unlimited_access: false,
      price: 25,
      limit: "200 Limits",
      color: "purple",
    },
    {
      title: "Premium",
      unlimited_access: false,
      price: 40,
      limit: "500 Limits",
      color: "green",
    },
    {
      title: "Elite",
      unlimited_access: true,
      price: 199,
      limit: "1 Year Unlimited Access",
      color: "yellow",
    },
  ];

  const upiId = "6201855200@ibl";
  const upiPaymentUrl = `upi://pay?pa=${upiId}&pn=Md%20Faizaan&am=${selectedAmount}&cu=INR`;

  // WhatsApp QR Code (Direct Chat)
  const phoneNumber = "6201855200"; // Change to your WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setIsModalOpen(true);
    setIsScanned(false);
    if (amount == 0) {
      navigate("/upload");
    }
  };

  const handleScan = () => {
    // Simulate scanning process
    setTimeout(() => {
      setIsScanned(true);
    }, 1500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsScanned(false);
  };
  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center py-12">
        {/* Pricing Plans */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8">
          Choose Your Plan
        </h2>
        <div className="flex flex-wrap justify-center gap-8 w-[90%] max-w-6xl">
          {plans.map(
            ({ title, price, limit, color, unlimited_access }, index) => (
              <div
                key={index}
                className={`relative bg-white p-6 rounded-tl-md rounded-tr-[80px] rounded-bl-lg rounded-br-sm h-80 shadow-lg w-full sm:w-[48%] md:w-[45%] lg:w-[22%] flex flex-col items-center border-t-4 border-yellow-200 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                {/* Title Badge */}
                <span
                  className={`absolute -top-0 left-1 border border-black-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md bg-yellow-500`}
                >
                  {title} Plan
                </span>

                <p className={`text-5xl font-extrabold text-yellow-600 mt-10`}>
                  ₹{price}
                </p>

                {/* Features */}
                <div className="mt-5 space-y-2 text-gray-600 text-md">
                  <div className="flex items-center gap-2">
                    <AiFillCheckCircle className="text-green-500" />
                    {limit}
                  </div>
                  <div className="flex items-center gap-2">
                    {unlimited_access ? (
                      <AiFillCheckCircle className="text-green-500" />
                    ) : (
                      <AiOutlineCloseCircle className="text-red-500" />
                    )}
                    Unlimited Access
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={() => handleAmountSelect(price)}
                  className={`mt-auto border border-yellow-500 hover:border-yellow-700 text-yellow-600 text-sm py-2 px-4 rounded-lg shadow-md transition-all duration-300`}
                >
                  Get Started with {title}
                </button>
              </div>
            )
          )}
        </div>

        {/* Key Features Section */}
        <section className="mt-16 w-[90%] max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              "Fast PDF Upload",
              "Secure Encryption",
              "Storage Support",
              "AI-Powered",
              "Easy Tools",
              "24/7 Support",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-md"
              >
                <AiFillCheckCircle className="text-green-500 text-xl" />
                <p className="text-lg font-medium text-gray-700">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        <UserFeedbacks showLimit={3} />

        {/* Comparison Table */}
        <section className="mt-16 w-[90%] max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Compare Our Plans
          </h2>
          <table className="w-full border-collapse border border-gray-300 text-gray-700">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-3">Features</th>
                <th className="border p-3">Free</th>
                <th className="border p-3">Pro</th>
                <th className="border p-3">Premium</th>
                <th className="border p-3">Elite</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: "24/7 Support", plans: [false, false, true, true] },
                { feature: "AI", plans: [false, false, false, true] },
                {
                  feature: "Unlimited Storage",
                  plans: [false, false, false, true],
                },
                {
                  feature: "Limited Storage",
                  plans: [true, true, true, false],
                },
              ].map(({ feature, plans }, index) => (
                <tr key={index} className="text-center">
                  <td className="border p-3 font-medium">{feature}</td>
                  {plans.map((available, i) => (
                    <td key={i} className="border p-3">
                      {available ? "✅" : "❌"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-semibold">
                  Scan to{" "}
                  {!isScanned
                    ? `Pay ₹${selectedAmount}`
                    : "Share Payment ScreenShot!"}
                </h2>

                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 flex flex-col items-center">
                {!isScanned ? (
                  <>
                    <div className="bg-gray-100 rounded-xl p-4 mb-4 w-64 h-64 flex items-center justify-center">
                      <QRCodeSVG value={upiPaymentUrl} size={200} />
                    </div>
                    <p className="text-gray-600 text-center">
                      Scan this QR code with your UPI app to pay ₹
                      {selectedAmount}
                    </p>
                    <p className="text-sm font-semibold text-center text-blue-600 mb-4">
                      After completing your payment,{" "}
                      <span className="text-red-500">click the button</span>{" "}
                      below!
                    </p>

                    <button
                      onClick={handleScan}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Payment Done
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-6">
                    <div className="bg-green-100 rounded-xl p-4 mb-4 w-64 h-64 flex items-center justify-center">
                      <QRCodeSVG value={whatsappUrl} size={200} />
                    </div>
                    <p className="text-sm font-semibold text-blue-600 mb-4">
                      Your payment of
                      <span className="text-red-500"> ₹{selectedAmount}</span>{" "}
                      has been done!
                    </p>

                    <button
                      onClick={() => {
                        closeModal();
                        setShowOkMessage(true);
                      }}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {showOkMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
              <div className="flex flex-col bg-white items-center justify-center text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheck className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Payment Successful!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your <span className="font-semibold">Payment</span> of ₹
                  {selectedAmount} and{" "}
                  <span className="font-semibold">ScreenShot</span> has been
                  sent.
                </p>
                <button
                  onClick={() => setShowOkMessage(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Pricing;
