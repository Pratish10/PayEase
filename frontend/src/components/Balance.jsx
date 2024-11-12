import PropTypes from "prop-types";

export const Balance = ({ value }) => {
  return (
    <div className="container">
      <h1 className="text-2xl">
        Your Balance: <span>Rs {value}</span>
      </h1>
    </div>
  );
};

Balance.propTypes = {
  value: PropTypes.number,
};
