import PropTypes from "prop-types";
import { motion } from "framer-motion";
import clsx from "clsx";

export const Card = ({ children, header, description, className = "" }) => {
  return (
    <motion.div
      className={clsx(
        "bg-white border border-gray-200 rounded-xl p-6 md:p-8 max-w-lg mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="font-bold text-2xl md:text-3xl lg:text-4xl text-center text-gray-800 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {header}
      </motion.h1>
      {description && (
        <motion.p
          className="text-gray-600 mt-2 text-sm md:text-base text-center mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        className="bg-gray-50 rounded-lg p-6 md:p-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
};
