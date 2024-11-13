import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { userAtom } from "../../recoil/atom";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { Modal } from "./Modal";

export const AppBar = () => {
  const user = useRecoilValue(userAtom);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleYes = () => {
    localStorage.clear();
    navigate("/");
    setIsModalOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <span className="font-bold text-xl text-blue-600">PayEase</span>
          </Link>

          {token ? (
            <div className="flex items-center space-x-4 relative">
              {/* User Dropdown */}
              <div className="relative">
                <motion.div
                  className="flex items-center cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="hidden md:flex flex-col justify-center h-full text-sm text-gray-700">
                    <span className="font-semibold">Hello,</span>
                    <span className="font-medium text-gray-900">
                      {user.firstName || "User"}
                    </span>
                  </div>
                  <motion.div
                    className="rounded-full h-10 w-10 bg-blue-100 flex justify-center items-center ml-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="text-lg font-semibold text-blue-600">
                      {user.firstName ? (
                        user.firstName.charAt(0).toUpperCase()
                      ) : (
                        <User size={20} />
                      )}
                    </span>
                  </motion.div>
                </motion.div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          Profile
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <button onClick={() => setIsModalOpen(true)}>
                  <LogOut size={20} />
                </button>
              </motion.div>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-700 transition duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onYes={handleYes}>
          <h2 className="text-2xl font-bold mb-4">Logout</h2>
          <p className="text-gray-700 mb-6">Are you sure you want to logout?</p>
        </Modal>
      )}
    </nav>
  );
};
