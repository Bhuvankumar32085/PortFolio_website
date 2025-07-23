import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const EditDocument = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    marksheet10th: null,
    marksheet12th: null,
    graduationMarksheet: null,
    profilePicture: null,
  });

  const handleFormData = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    setInput((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    Object.entries(input).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const res = await axios.post(
        "https://portfolio-website-tnpr.onrender.com/api/image/upload-images",
        formData,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
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
        className="w-full max-w-5xl bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/20"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-10">
          📁 Upload or Update Your Documents
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* 10th */}
          <div>
            <label htmlFor="marksheet10th" className="block font-semibold mb-2">
              10th Marksheet
            </label>
            <Input
              id="marksheet10th"
              type="file"
              name="marksheet10th"
              onChange={handleFormData}
              className="file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200 file:font-semibold file:rounded-full file:px-2"
            />
          </div>

          {/* 12th */}
          <div>
            <label htmlFor="marksheet12th" className="block font-semibold mb-2">
              12th Marksheet
            </label>
            <Input
              id="marksheet12th"
              type="file"
              name="marksheet12th"
              onChange={handleFormData}
              className="file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 file:font-semibold file:rounded-full file:px-2"
            />
          </div>

          {/* Graduation */}
          <div>
            <label
              htmlFor="graduationMarksheet"
              className="block font-semibold mb-2"
            >
              Graduation Marksheet
            </label>
            <Input
              id="graduationMarksheet"
              type="file"
              name="graduationMarksheet"
              onChange={handleFormData}
              className="file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 file:font-semibold file:rounded-full file:px-2"
            />
          </div>

          {/* Profile Picture */}
          <div>
            <label
              htmlFor="profilePicture"
              className="block font-semibold mb-2"
            >
              Profile Photo
            </label>
            <Input
              id="profilePicture"
              type="file"
              name="profilePicture"
              onChange={handleFormData}
              className="file:bg-green-100 file:text-green-700 hover:file:bg-green-200 file:font-semibold file:rounded-full file:px-2"
            />
          </div>

          {/* Submit */}
          <div className="col-span-full flex justify-center pt-6">
            <Button
              disabled={loading}
              type="submit"
              className="bg-[#00FFC6] text-black font-semibold text-lg px-8 py-3 rounded-full hover:bg-white/30 hover:text-white transition duration-300"
            >
              {loading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                "✅ Upload Documents"
              )}
            </Button>
          </div>
        </form>

        <p className="font-bold">
          Upload Your Social Media{" "}
          <Link className="text-blue-500 cursor-pointer" to="/uploadLinks">
            Links...
          </Link>
        </p>
      </motion.div>
    </section>
  );
};

export default EditDocument;
