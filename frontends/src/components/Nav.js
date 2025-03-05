import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFilePdf, FaHome, FaUpload, FaDollarSign, FaSignInAlt, FaBars } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";

export default function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    const token = localStorage.getItem("userDetails");
    const isLoggedIn = token ? JSON.parse(token).token : null;
    const handleLogOut = () => {
        localStorage.removeItem("userDetails");
        setTimeout(() => {
            navigate("/login")
        }, 900)
    }

    console.log(isLoggedIn)

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white py-4 px-6 flex items-center justify-between border-b shadow-md">
                {/* Logo */}
                <h1
                    className="text-2xl font-extrabold text-red-500 flex items-center gap-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <FaFilePdf className="text-red-500 text-3xl" />
                    <span className="font-extrabold">DropDock</span>
                </h1>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-2">
                    <NavLink to="/" icon={<FaHome />} label="Home" location={location} />
                    <NavLink to="/upload" icon={<FaUpload />} label="Upload PDF" location={location} />
                    <NavLink to="/pricing" icon={<FaDollarSign />} label="Pricing" location={location} />
                    <NavLink to="/review" icon={<AiFillMessage />} label="Review" location={location} />
                    {isLoggedIn ? (
                        <NavLink icon={<FiLogIn />} label="LogOut" onClick={handleLogOut} location={location} />
                    ) : (
                        <NavLink to="/login" label="LogIn" icon={<FiLogOut />} location={location} />
                    )}
                </div>
                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
                    <FaBars className="text-2xl" />
                </button>
            </nav>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div className="md:hidden flex flex-col items-center bg-white shadow-md">
                    <NavLink to="/" icon={<FaHome />} label="Home" location={location} onClick={() => setMenuOpen(false)} />
                    <NavLink to="/upload" icon={<FaUpload />} label="Upload PDF" location={location} onClick={() => setMenuOpen(false)} />
                    <NavLink to="/pricing" icon={<FaDollarSign />} label="Pricing" location={location} onClick={() => setMenuOpen(false)} />
                    <NavLink to="/review" icon={<AiFillMessage />} label="Review" location={location} />
                    {isLoggedIn ? (
                        <NavLink icon={<FiLogIn />} label="LogOut" onClick={handleLogOut} location={location} />
                    ) : (
                        <NavLink to="/login" label="LogIn" icon={<FiLogOut />} location={location} />
                    )}
                </div>
            )}
        </>
    );
}

// Reusable NavLink Component
const NavLink = ({ to, icon, label, location, onClick }) => (
    <Link
        to={to}
        className={`flex items-center gap-2 font-semibold text-sm transition px-1 py-2 rounded-md 
            ${location.pathname === to
                ? "text-indigo-600 border-b-2 border-indigo-600" // Active link
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-200" // Hover effect
            }`}
        onClick={onClick}
    >
        {icon} {label}
    </Link>
);

