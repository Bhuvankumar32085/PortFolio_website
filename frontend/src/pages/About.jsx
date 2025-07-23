import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const About = () => {
  const links = useSelector((store) => store.admin.links);
  return (
    <div className="min-h-screen bg-[#0e1012] text-white px-6 py-16 flex flex-col items-center">
      {/* Hero Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold mb-3 text-center text-[#00FFA3]"
      >
        Welcome to My World of Code & AI 🌍💡
      </motion.h1>

      {/* Intro Paragraph */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-lg md:text-xl text-gray-300 max-w-4xl text-center mb-10"
      >
        Hello! I'm{" "}
        <span className="text-[#00FFA3] font-semibold">Bhuvan Kumar</span>, a
        creative Full Stack Developer and AI Enthusiast. From crafting dynamic
        web applications to exploring cutting-edge AI tools like ChatGPT &
        LangChain, I'm on a mission to blend technology with innovation.
      </motion.p>

      {/* Skill Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl"
      >
        {/* Frontend */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1c1f] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#00FFA3]">
            Frontend Development
          </h3>
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            <li>HTML, CSS, JavaScript</li>
            <li>React.js, EJS</li>
            <li>Tailwind CSS, Bootstrap</li>
            <li>Framer Motion</li>
            <li> Next.js (Learning)</li>
          </ul>
        </motion.div>

        {/* Backend */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1c1f] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#00FFA3]">
            Backend & Dev Tools
          </h3>
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            <li>Node.js, Express.js, MongoDB</li>
            <li>JWT Auth, REST APIs</li>
            <li>Cloudinary, Multer, JOI</li>
            <li>Git, GitHub, Postman</li>
            <li>TypeScript (Learning)</li>
          </ul>
        </motion.div>

        {/* AI Tools */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1c1f] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#00FFA3]">
            AI Tools & Frameworks
          </h3>
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            <li>OpenAI API, LangChain</li>
            <li>Prompt Engineering with ChatGPT</li>
            <li>Jupyter Notebook, Google Colab</li>
            <li>Working on Generative AI Projects</li>
          </ul>
        </motion.div>

        {/* Machine Learning */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1c1f] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#00FFA3]">
            Machine Learning
          </h3>
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            <li>Python, Pandas, NumPy, Scikit-learn</li>
            <li>Supervised & Unsupervised Algorithms</li>
            <li>Model Training, Testing & Evaluation</li>
            <li>Linear/Logistic Regression, KNN, SVM</li>
            <li>Model Deployment Concepts (learning)</li>
          </ul>
        </motion.div>

        {/* Deep Learning */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1c1f] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#00FFA3]">
            Deep Learning
          </h3>
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            <li>Neural Networks Fundamentals</li>
            <li>TensorFlow & Keras (learning stage)</li>
            <li>Image Classification & CNN Basics</li>
            <li>Activation Functions, Optimizers</li>
            <li>Hands-on Projects in Progress</li>
          </ul>
        </motion.div>

        {/* Extra Info */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-[#1a1c1f] p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-semibold mb-4 text-[#00FFA3]">
            More About Me
          </h3>
          <ul className="text-gray-300 list-disc list-inside space-y-2">
            <li>🎯 Aim: M.Tech from IIT in AI/Data Science</li>
            <li>🚀 Passionate about Tech & Learning</li>
            <li>🤝 Hackathons, Freelance Projects</li>
            <li>🌐 Fluent in Hindi & English</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Social Media Links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="flex gap-6 mt-16 text-2xl text-[#00FFA3]"
      >
        {links?.github && (
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-200"
          >
            <FaGithub />
          </a>
        )}
        {links?.linkedin && (
          <a
            href={links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-200"
          >
            <FaLinkedin />
          </a>
        )}
        {links?.instagram && (
          <a
            href={links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-200"
          >
            <FaInstagram />
          </a>
        )}
        {links?.facebook && (
          <a
            href={links.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-200"
          >
            <FaFacebook />
          </a>
        )}
        {links?.twitter && (
          <a
            href={links.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-all duration-200"
          >
            <FaTwitter />
          </a>
        )}
      </motion.div>

      {/* Footer Quote */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-10 text-center text-sm text-gray-500 max-w-md"
      >
        "Code is my paintbrush, AI is my canvas. Let’s build the future — one
        line at a time." – Bhuvan Kumar
      </motion.p>
    </div>
  );
};

export default About;
