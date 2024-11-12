import { Card } from "../components/Card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas";
import { Input } from "../components/Input";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (data) => {
    startTransition(async () => {
      const res = await axios.post(
        "https://paytm-backend-liart.vercel.app/app/v1/user/login",
        data
      );
      if (res.data.success) {
        localStorage.setItem("token", res?.data.data);
        navigate("/dashboard");
      } else {
        console.log(res.data?.error);
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Card
        header="Welcome Back"
        description="Enter your credentials to access your account"
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
            error={errors.password}
          />
          <motion.div
            className="flex flex-col items-center justify-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <button
              className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin inline-block" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
            <motion.p
              className="text-sm text-gray-600"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              New to our platform?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-semibold transition-colors duration-200"
              >
                Sign Up
              </Link>
            </motion.p>
          </motion.div>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;