import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const UserDetail = ({ user }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out my-6"
    >
      <div className="rounded-full h-16 w-16 bg-blue-100 flex justify-center items-center mb-4 mr-8">
        <span className="text-2xl font-semibold text-blue-600">
          {user.firstName ? user.firstName.charAt(0).toUpperCase() : "U"}
        </span>
      </div>
      <div className="text-left mb-4">
        <p className="text-xl font-bold text-gray-800">{user.firstName}</p>
        <p className="text-base text-gray-500">{user.email}</p>
      </div>
      <div className="ml-auto">
        <button
          onClick={() => {
            navigate(`/send?userId=${user._id}&name=${user.firstName}`);
          }}
          className="mt-4 px-6 py-2 w-full text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Money
        </button>
      </div>
    </motion.div>
  );
};

UserDetail.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    email: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};
