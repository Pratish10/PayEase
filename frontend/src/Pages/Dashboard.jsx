import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Loader2 } from "lucide-react";
import { Users } from "../components/Users";
import { getCurrentUser } from "../api/api";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../recoil/atom";

const Dashboard = () => {
  const setUser = useSetRecoilState(userAtom);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      const data = await getCurrentUser("/app/v1/user");
      setUser(data);
      setLoading(false);
    };
    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <AppBar />
      <div className="pt-20">
        <div className="container mx-auto px-4 space-y-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Balance />
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <Users />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
