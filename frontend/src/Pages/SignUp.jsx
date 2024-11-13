import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../schemas";
import { Input } from "../components/Input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signup } from "../api/api";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      const res = await signup("/app/v1/user/signup", data);

      if (res.success) {
        setLoading(false);
        navigate("/signin");
      } else {
        setApiError(res.message || "An unknown error occurred");
        setLoading(false);
      }
    } catch (error) {
      setApiError(error.message || "An error occurred while signing in");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Card
        header="Sign Up"
        description="Enter your Information to create an account"
        className="w-full max-w-md"
      >
        {apiError && (
          <motion.div
            className="text-red-600 text-sm font-semibold p-2 rounded-md bg-red-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {apiError}
          </motion.div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            register={register}
            error={errors.firstName}
            disabled={loading}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            register={register}
            error={errors.lastName}
            disabled={loading}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            disabled={loading}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
            disabled={loading}
          />
          <motion.div
            className="flex flex-col items-center justify-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                  Signing Up...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
            <motion.p
              className="text-sm text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Already Have an Account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 hover:underline font-semibold transition-colors duration-200"
              >
                Sign In
              </Link>
            </motion.p>
          </motion.div>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
