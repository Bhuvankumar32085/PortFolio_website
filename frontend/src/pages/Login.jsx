import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setAuthUser, setIsLogin } from "@/redux/slices/authSlice";

const Login = () => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setinput] = useState({
    email: "",
    password: "",
  });

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/user/login",
        input,
        { withCredentials: true }
      );
      if (res.data.success === true) {
        toast.success(res.data?.message);
        dispatch(setAuthUser(res.data?.user))
        dispatch(setIsLogin(true))
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setinput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-12 text-white relative overflow-hidden">
      {/* Background Circles */}
      <div className="absolute top-[-60px] left-[-40px] w-96 h-96 bg-[#00FFC6]/10 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl animate-ping -z-10" />

      {/* Animated Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8"
      >
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#00FFC6]">
            🔐 Login
          </CardTitle>
          <CardDescription className="text-gray-300 mt-2">
            Access your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={sumbitHandler} className="flex flex-col gap-6">
            <div>
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email"
                name="email"
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
                type="password"
                name="password"
                value={input.password}
                onChange={changeHandler}
                placeholder="Enter password"
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00FFC6] text-black font-semibold hover:bg-[#00FFC6]/80 transition-all"
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : "Login"}
            </Button>
          </form>
        </CardContent>
      </motion.div>
    </div>
  );
};

export default Login;
