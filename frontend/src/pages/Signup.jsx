import React, { useState } from "react";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/signup",
        input,
        { withCredentials: true }
      );
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate("/verifyOtp");
      } else if (res.data?.message) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-12 text-white relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-60px] left-[-40px] w-96 h-96 bg-[#00FFC6]/10 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl animate-ping -z-10" />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#00FFC6]">
            ✨ Sign Up
          </CardTitle>
          <CardDescription className="text-gray-300 mt-2">
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6" onSubmit={sumbitHandler}>
            <div>
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter username"
                value={input.username}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={input.email}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={input.password}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00FFC6] text-black font-semibold hover:bg-[#00FFC6]/80 transition-all"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Signup"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00FFC6] underline hover:text-white">
              Login here
            </Link>
          </p>
        </CardContent>
      </motion.div>
    </div>
  );
};

export default Signup;
