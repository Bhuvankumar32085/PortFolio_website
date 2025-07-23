import useGetAdmin from "@/Hook/adminHook";
import useAdminLinks from "@/Hook/adminLinksHook";
import useGetImages from "@/Hook/useImageHook";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Home = () => {
  useGetAdmin()
  useGetImages();
  useAdminLinks()
  const images = useSelector((store) => store.image.images);
  const {admin}=useSelector(store=>store.admin)


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white relative overflow-hidden">
      {/* HERO SECTION */}
      <section className="px-6 md:px-16 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* LEFT */}
        <motion.div
          className="w-full md:w-1/2 space-y-6 z-10"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Hi 👋, I'm{" "}
            <span className="text-[#00FFC6] drop-shadow">{admin?.username}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            <span className="text-[#00FFC6] font-mono">▌</span>{" "}
            <span className="italic">
              Full Stack Developer | UI/UX Lover | MERN Wizard | Backend
              Craftsman
            </span>
          </p>

          <p className="text-sm md:text-base text-gray-400">
            🚀 Passionate about building blazing-fast apps, solving real-world
            problems & crafting elegant user interfaces. Over 2+ years working
            experience in JavaScript, React, Node.js, MongoDB, Tailwind, and
            more!
          </p>

          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-semibold hover:bg-[#00FFC6]/20 transition"
            >
              🚀 Explore Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-3 border border-[#00FFC6] text-[#00FFC6] rounded-xl hover:bg-[#00FFC6] hover:text-black transition"
            >
              <Link to="/contact">💬 Let's Connect</Link>
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center relative z-10"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.img
            src={images?.profilePicture?.url}
            alt="Profile"
            className="w-72 h-72 object-cover rounded-full shadow-[0_20px_60px_-15px_#00FFC6] border-4 border-[#00FFC6]"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section className="px-6 md:px-16 py-8 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-[#00FFC6]">
          🚀 My Tech Arsenal
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          I specialize in crafting scalable and beautiful full stack
          applications using modern tools and frameworks.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          {[
            "React",
            "Node.js",
            "MongoDB",
            "Tailwind",
            "Express",
            "Redux",
            "Git",
            "Framer Motion",
          ].map((skill) => (
            <span
              key={skill}
              className="bg-white/10 border border-white/20 text-sm px-4 py-2 rounded-full text-white hover:bg-[#00FFC6]/20 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* QUOTE SECTION */}
      <motion.section
        className="text-center py-16 px-6 md:px-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-xl md:text-2xl italic text-gray-300 max-w-2xl mx-auto">
          "Code is not just code – it's a language I use to create meaning,
          solve problems, and build dreams into reality."
        </h2>
      </motion.section>

      {/* SCROLL CTA */}
      <div className="text-center pb-10 animate-bounce text-[#00FFC6] text-sm tracking-widest uppercase">
        ↓ Scroll down to see more
      </div>

      {/* BACKGROUND CIRCLES */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#00FFC6]/10 rounded-full blur-3xl animate-pulse -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-ping -z-10" />

      <section className="py-16 px-6 bg-white text-gray-800 text-center md:text-left">
        <h2 className="text-3xl font-bold mb-6 text-[#302b63]">About Me</h2>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 animate-fadeIn">
          Hi! I'm{" "}
          <span className="font-semibold text-primary">Bhuvan Kumar</span>, a
          passionate full-stack developer and aspiring data scientist. I love
          turning complex problems into simple, beautiful, and intuitive
          designs. With a strong foundation in the MERN stack, I specialize in
          building high-performance web applications, interactive UIs, and
          seamless user experiences.
        </p>

        {/* Button */}
        <div className="mt-6">
          <Link
            to="/about"
            className="inline-block px-6 py-3 bg-[#302b63] text-white rounded-xl shadow-md hover:bg-[#4b3d91] transition duration-300"
          >
            🌟 Learn More About Me
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
