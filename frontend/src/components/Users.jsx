import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { UserDetail } from "./UserDetail";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";

export const Users = ({ userId }) => {
  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://paytm-backend-liart.vercel.app/app/v1/user/bulk?filter=${filter}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res?.data.success) {
          const filteredUsers = res?.data?.data.filter(
            (item) => item._id !== userId
          );
          setUsers(filteredUsers);
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filter, userId]);

  return (
    <div className="p-4 space-y-6">
      <div className="w-full mb-4">
        <input
          name="Search"
          type="text"
          placeholder="Search users"
          className="w-full p-2 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          onChange={(event) => setFilter(event.target.value)}
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div>
          <AnimatePresence>
            {users.length > 0 ? (
              users.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <UserDetail user={item} />
                </motion.div>
              ))
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500"
              >
                No users found.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

Users.propTypes = {
  userId: PropTypes.string.isRequired,
};
