import React, { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const finalOtp = otp.join("");
    try {
      const res = await axios.post(
        "https://portfolio-website-tnpr.onrender.com/api/user/verify-otp",
        { otp: finalOtp },
        { withCredentials: true }
      );
      if (res.data.success === true) {
        toast.success(res.data?.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex items-center justify-center px-4 py-12 text-white relative overflow-hidden">
      {/* Animated Glow Circles */}
      <div className="absolute top-[-60px] left-[-40px] w-96 h-96 bg-[#00FFC6]/10 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl animate-ping -z-10" />

      {/* Card */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-8"
      >
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-[#00FFC6]">
            🔐 Verify OTP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-3 my-6">
            {otp.map((digit, index) => (
              <Input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-14 text-center text-lg font-bold bg-white/20 text-white border-white/30 border rounded-lg focus:ring-2 focus:ring-[#00FFC6] placeholder:text-gray-400"
              />
            ))}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-[#00FFC6] text-black font-semibold hover:bg-[#00FFC6]/80 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" /> Verifying...
              </>
            ) : (
              "Verify OTP"
            )}
          </Button>
        </CardContent>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
