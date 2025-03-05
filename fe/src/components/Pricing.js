import React from "react";
import Nav from "./Nav";
import { AiFillCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { UserFeedbacks } from "./UserFeedbacks";
import Footer from "./Footer";

const Pricing = () => {
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
                className={`relative bg-white p-6 rounded-tl-md rounded-tr-[80px] rounded-bl-lg rounded-br-sm h-80 shadow-lg w-full sm:w-[48%] md:w-[45%] lg:w-[22%] flex flex-col items-center border-t-4 border-${color}-500 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
              >
                {/* Title Badge */}
                <span
                  className={`absolute -top-0 left-1 border border-${color}-500 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-md bg-${color}-500`}
                >
                  {title} Plan
                </span>

                <p
                  className={`text-5xl font-extrabold text-${color}-600 mt-10`}
                >
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
                  className={`mt-auto border border-${color}-500 hover:border-${color}-700 text-${color}-600 text-sm py-2 px-4 rounded-lg shadow-md transition-all duration-300`}
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
      </div>
    </>
  );
};

export default Pricing;
