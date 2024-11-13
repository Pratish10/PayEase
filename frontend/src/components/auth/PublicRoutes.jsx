import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PublicRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token === null) {
    return children;
  } else {
    return <Navigate to={"/dashboard"} />;
  }
};

PublicRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoutes;
