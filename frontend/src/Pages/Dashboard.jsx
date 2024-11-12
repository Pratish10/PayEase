import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { Users } from "../components/Users";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "https://paytm-backend-liart.vercel.app/app/v1/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data?.data || {});
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <AppBar firstName={user?.firstName ?? ""} />
      <div className="pt-20">
        <div className="container mx-auto px-4 space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Balance value={user?.balance ?? 0} />
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <Users userId={user?._id ?? ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
