import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFilePdf } from "react-icons/fa";
import { FiLogIn, FiUser, FiUpload, FiLogOut } from "react-icons/fi";
import { getUserInfo } from "../utils/getUserInfo";
const Navbar = () => {
  const token = localStorage.getItem("userDetails");
  const isLoggedIn = token ? JSON.parse(token).token : null;
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("userDetails");
    setTimeout(() => {
      navigate("/login");
    }, 900);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="text-2xl font-extrabold text-red-500 flex items-center gap-2 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          <FaFilePdf className="text-red-500 text-3xl" />
          <span className="font-extrabold">DropDock</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex">
          {getUserInfo("role_id") === 1 && (
            <NavItem to="/admin-panel" icon={FiUser}>
              Admin
            </NavItem>
          )}
          <NavItem to="/upload" icon={FiUpload}>
            Upload
          </NavItem>
          {isLoggedIn ? (
            <NavItem icon={FiLogOut} onClick={handleLogOut}>
              Logout
            </NavItem>
          ) : (
            <NavItem to="/login" icon={FiLogIn}>
              Login
            </NavItem>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-16 left-0 w-full bg-white shadow-md transition-all duration-300 z-50 ${
          isOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-4 py-4">
          {isLoggedIn ? (
            <NavItem icon={FiLogOut} onClick={handleLogOut}>
              Logout
            </NavItem>
          ) : (
            <NavItem to="/login" icon={FiLogIn}>
              Login
            </NavItem>
          )}
          <NavItem to="/admin-panel" icon={FiUser}>
            Admin
          </NavItem>
          <NavItem to="/upload" icon={FiUpload}>
            Upload
          </NavItem>
        </ul>
      </div>
    </nav>
  );
};

// Reusable Nav Item Component
const NavItem = ({ to, icon: Icon, children, onClick }) => (
  <li>
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition duration-300 rounded-md"
    >
      {Icon && <Icon className="text-lg" />} {/* Check if Icon exists */}
      <span className="font-medium">{children}</span>
    </Link>
  </li>
);
export default Navbar;
