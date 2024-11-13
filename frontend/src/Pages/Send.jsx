import { useNavigate, useSearchParams } from "react-router-dom";
import { Card } from "../components/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transferSchema } from "../schemas";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "../components/Input";
import { sendMoney } from "../api/api";

const Send = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const name = searchParams.get("name");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(transferSchema) });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const res = await sendMoney("/app/v1/accounts/transfer", data);
    if (res.success) {
      setLoading(false);
      navigate("/dashboard");
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    setValue("to", userId);
  }, [userId, setValue]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <Card
        header="Send Money"
        description="Enter amount to send"
        className="w-full max-w-md"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
          </div>
          <h3 className="text-2xl font-semibold">{name}</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Amount in (Rs)"
            name="amount"
            type="number"
            register={register}
            error={errors.amount}
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
                  Sending...
                </>
              ) : (
                "Send Money"
              )}
            </button>
          </motion.div>
        </form>
      </Card>
    </div>
  );
};

export default Send;
