import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-10 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left text */}
        <p className="text-sm text-gray-300 text-center md:text-left">
          © 2025 <span className="text-[#00FFC6] font-semibold">Bhuvan Kumar</span>. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-6 text-sm justify-center md:justify-end">
          <a
            href="/privacy"
            className="hover:text-[#00FFC6] transition duration-300"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="hover:text-[#00FFC6] transition duration-300"
          >
            Terms
          </a>
          <a
            href="/contact"
            className="hover:text-[#00FFC6] transition duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
