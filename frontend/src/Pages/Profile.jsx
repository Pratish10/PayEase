import { Card } from "../components/Card";
import { motion } from "framer-motion";
import { Input } from "../components/Input";
import { updateUserSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateCredentials } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(updateUserSchema) });

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      const res = await updateCredentials("/app/v1/user", data);

      if (res.success) {
        setLoading(false);
        navigate("/dashboard");
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
        header="Profile"
        description="Update your Credentials"
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
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </button>
          </motion.div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
