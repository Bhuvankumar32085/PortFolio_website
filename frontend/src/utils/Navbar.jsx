import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setIsLogin } from "@/redux/slices/authSlice";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const admin = useSelector((store) => store.admin.admin);
  const { authUser, isLogin } = useSelector((state) => state.auth);
  const adminId = admin?._id;
  const loginUserId = authUser?._id;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get("https://portfolio-website-tnpr.onrender.com/user/logout", {
        withCredentials: true,
      });
      if (res.data.success === true) {
        dispatch(setAuthUser(null));
        dispatch(setIsLogin(false));
        toast.success(res.data?.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    } finally {
      setIsLogin(false);
    }
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Edit", path: "/edit" },
    { label: "Documents", path: "/documents" },
    { label: "About me", path: "/about" },
    { label: "Education", path: "/eduction" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-md backdrop-blur-md"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#00FFC6] tracking-wide"
        >
          Bhuvan.Dev
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {adminId === loginUserId
            ? navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-sm font-medium hover:text-[#00FFC6] transition"
                >
                  {item.label}
                </Link>
              ))
            : navItems
                .filter(
                  (item) => item.label !== "Documents" && item.label !== "Edit"
                )
                .map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="text-sm font-medium hover:text-[#00FFC6] transition"
                  >
                    {item.label}
                  </Link>
                ))}

          {isLogin ? (
            <Button
              onClick={handleLogout}
              className="bg-pink-600 text-white text-sm flex items-center gap-1"
            >
              <LogOut size={16} />
              Logout
            </Button>
          ) : (
            <>
              <Button className="bg-[#00FFC6]/20 text-[#00FFC6] border border-[#00FFC6] hover:bg-[#00FFC6] hover:text-black transition text-sm p-0">
                <Link to="/login" className="w-full h-full px-3 py-2">
                  Login
                </Link>
              </Button>
              <Button className="bg-pink-600 text-white text-sm p-0">
                <Link to="/signup" className="w-full h-full px-3 py-2">
                  Signup
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-6 h-6 text-[#00FFC6] cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#0f0c29] text-white">
              <SheetHeader>
                <SheetTitle className="text-[#00FFC6] text-lg">
                  Navigation
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4 p-3">
                {adminId === loginUserId
                  ? navItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="text-sm font-medium hover:text-[#00FFC6] transition"
                      >
                        {item.label}
                      </Link>
                    ))
                  : navItems
                      .filter(
                        (item) =>
                          item.label !== "Documents" && item.label !== "Edit"
                      )
                      .map((item) => (
                        <Link
                          key={item.label}
                          to={item.path}
                          className="text-sm font-medium hover:text-[#00FFC6] transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                <div className="pt-4 border-t border-white/20 mt-2">
                  {isLogin ? (
                    <Button
                      onClick={handleLogout}
                      className="bg-pink-600 text-white w-full"
                    >
                      Logout
                    </Button>
                  ) : (
                    <>
                      <Button className="bg-[#00FFC6]/20 text-[#00FFC6] border border-[#00FFC6] w-full mb-2">
                        <Link to="/login" className="w-full h-full text-center">
                          Login
                        </Link>
                      </Button>
                      <Button className="bg-pink-600 text-white w-full">
                        <Link
                          to="/signup"
                          className="w-full h-full text-center"
                        >
                          Signup
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
