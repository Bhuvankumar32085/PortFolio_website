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
import axios from "axios";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setLinks } from "@/redux/slices/adminSlice";

const UploadLinks = () => {
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    facebook: "",
  });

  const sumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/link/upload-link",
        input,
        { withCredentials: true }
      );
      if (res.data?.success === true) {
        dispatch(setLinks(res.data?.links))
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload Links failed");
    } finally {
      setLoading(false);
      setInput({
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        facebook: "",
      });
    }
  };

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value.trim() });
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
            ✨ Upload Links...
          </CardTitle>
          <CardDescription className="text-gray-300 mt-2">
            Upload your Links
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6 [&>div>Label]:mb-2"
            onSubmit={sumbitHandler}
          >
            <div>
              <Label htmlFor="github" className="text-white">
                Github
              </Label>
              <Input
                id="github"
                name="github"
                type="text"
                placeholder="Enter github links"
                value={input.github}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>

            <div>
              <Label htmlFor="linkedin" className="text-white">
                Linkedin
              </Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="text"
                placeholder="Enter linkedin Link"
                value={input.linkedin}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>

            <div>
              <Label htmlFor="twitter" className="text-white">
                Twitter
              </Label>
              <Input
                id="twitter"
                name="twitter"
                type="text"
                placeholder="Enter twitter Link"
                value={input.twitter}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>
            <div>
              <Label htmlFor="instagram" className="text-white">
                Instagram
              </Label>
              <Input
                id="instagram"
                name="instagram"
                type="text"
                placeholder="Enter instagram Link"
                value={input.instagram}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>
            <div>
              <Label htmlFor="facebook" className="text-white">
                Facebook
              </Label>
              <Input
                id="facebook"
                name="facebook"
                type="text"
                placeholder="Enter facebook Link"
                value={input.facebook}
                onChange={changeHandler}
                className="bg-white/20 text-white placeholder:text-gray-400 border border-white/20"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00FFC6] text-black font-semibold hover:bg-[#00FFC6]/80 transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "Upload Links"
              )}
            </Button>
          </form>
        </CardContent>
      </motion.div>
    </div>
  );
};

export default UploadLinks;
