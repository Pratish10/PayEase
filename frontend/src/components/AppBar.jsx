import clsx from "clsx";
import { motion } from "framer-motion";
import useScroll from "../../hooks/useScroll";
import PropTypes from "prop-types";

export const AppBar = ({ firstName }) => {
  const size = useScroll();

  return (
    <nav
      className={clsx(
        "flex items-center justify-between h-16 fixed top-0 left-0 w-full z-10 px-4 md:px-6 bg-slate-300 shadow-md transition-all ease-in-out",
        size.scrollY > 50 && "bg-white border-b-2 border-gray-200"
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-lg text-gray-800">Payments App</span>
        </div>

        <div className="flex items-center space-x-4">
          <motion.div
            className="hidden md:flex flex-col justify-center h-full text-sm text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-semibold">Hello,</span>
            <span className="font-medium text-gray-900">
              {firstName || "User"}
            </span>
          </motion.div>

          <motion.div
            className="rounded-full h-12 w-12 bg-slate-200 flex justify-center items-center"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-xl font-semibold text-gray-700">
              {firstName ? firstName.charAt(0).toUpperCase() : "U"}
            </span>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

AppBar.propTypes = {
  firstName: PropTypes.string.isRequired,
};
