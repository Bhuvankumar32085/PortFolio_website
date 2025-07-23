import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Edit = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    contactNumber: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // API call here

    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/update-profile",
        input,
        {
          withCredentials: true,
        }
      );

      if (res.data?.success) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "update profile failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">
          ✏️ Edit Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block font-semibold mb-2">
              Username
            </label>
            <Input
              id="username"
              type="text"
              value={input.username}
              onChange={handleChange}
              placeholder="Enter your name"
              className="bg-white text-black font-medium focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="contactNumber" className="block font-semibold mb-2">
              Phone Number
            </label>
            <Input
              id="contactNumber"
              type="text"
              value={input.contactNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="bg-white text-black font-medium focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-6 flex justify-center">
            <Button
              type="submit"
              className="bg-[#00FFC6] text-black font-semibold text-lg px-8 py-3 rounded-full hover:bg-white/30 hover:text-white transition duration-300"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "💾 Save Changes"
              )}
            </Button>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Edit;
