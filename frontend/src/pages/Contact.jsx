import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, isLogin } = useSelector((state) => state.auth);
  const {admin}=useSelector(store=>store.admin)
  const [input, setinput] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });



  const changeHandler = (e) => {
    let value = e.target.value;
    if (e.target.name === "senderEmail") {
      let trimEmail = value.trim();
      setinput({ ...input, [e.target.name]: trimEmail });
    } else {
      setinput({ ...input, [e.target.name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if(!isLogin){
      toast.error('Please Login')
      return
    }

    setLoading(true);
  

    // api implementation
    try {
      const res = await axios.post(
        "http://localhost:8000/api/link/sendEmail",
        input,
        { withCredentials: true }
      );
      if (res.data?.success === true) {
        toast.success(res.data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Message Send failed");
    } finally {
      setLoading(false);
      setinput({
        senderName: "",
        senderEmail: "",
        message: "",
      });
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-[#0f172a] text-white px-6 py-16 gap-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Left Section - Contact Info */}
      <div className="w-full md:w-1/2 space-y-6">
        <h2 className="text-4xl font-bold text-blue-400 mb-4">Contact Me</h2>
        <p className="text-lg text-gray-300">
          Have a project in mind, or just want to say hi? Fill the form or reach
          out directly.
        </p>
        <div className="space-y-3">
          <p className="flex items-center gap-3">
            <Mail /> {admin?.email}
          </p>
          <p className="flex items-center gap-3">
            <Phone /> +91 {admin?.contactNumber}
          </p>
          <p className="flex items-center gap-3">
            <MapPin /> India
          </p>
        </div>
        <div className="flex gap-5 mt-4">
          <a
            href="https://github.com/bhuvankumar32085"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="hover:text-blue-400 transition mb-1" />Github
          </a>
          <a
            href="https://www.linkedin.com/in/bhuvan-kumar-318392370"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="hover:text-blue-400 transition mb-1" />Linkedin
          </a>
          {/* Add more if you want */}
        </div>
      </div>

      {/* Right Section - Contact Form */}
      <motion.form
        className="w-full md:w-1/2 bg-[#1e293b] p-8 rounded-2xl shadow-md space-y-6"
        whileHover={{ scale: 1.02 }}
        onSubmit={submitHandler}
      >
        <Input
          placeholder="Your Name"
          className="bg-[#0f172a] text-white"
          name="senderName"
          value={input.senderName}
          onChange={changeHandler}
        />
        <Input
          type="email"
          placeholder="Your Email"
          className="bg-[#0f172a] text-white"
          name="senderEmail"
          value={input.senderEmail}
          onChange={changeHandler}
        />
        <Textarea
          placeholder="Your Message"
          className="bg-[#0f172a] text-white"
          rows={6}
          name="message"
          value={input.message}
          onChange={changeHandler}
        />

        {loading ? (
          <Button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            <Loader2 className="animate-spin mr-2" /> Send Message
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            Send Message
          </Button>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Contact;
