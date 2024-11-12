import PropTypes from "prop-types";
import { cn } from "../lib/utils";

export const Input = ({ label, name = "", register, error, type, ...rest }) => {
  const isNumber = type.toLowerCase() === "number";

  return (
    <div className="flex flex-col space-y-2 w-full">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          {...register(name, isNumber ? { valueAsNumber: true } : {})}
          className={cn(
            "w-full px-3 py-2 text-sm border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
            error ? "border-red-500" : "border-gray-300"
          )}
          type={type}
          {...rest}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.object,
};
