import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Education = () => {
  const { images } = useSelector((store) => store.image);
  const { isLogin } = useSelector((store) => store.auth);

  useEffect(()=>{
    let message=isLogin?'You Can See all details':'You must log in to view full details.'
    toast.success(message)
  },[1])

  const educationData = [
    {
      title: "Secondary School (10th)",
      board: "CBSE",
      school: "Saraswati Vidya Mandir, Siau Chandpur Road, Bijnor",
      year: "2019",
      percentage: "Approx. 55%",
      subjects: [
        "English Communication",
        "Hindi Course A",
        "Mathematics",
        "Science",
        "Social Science",
        "Information Technology",
      ],
      achievements: [
        "Developed strong fundamentals in Science & Math",
        "Introduced to coding via IT subject",
        "Achieved passing grade in all subjects",
      ],
      image: images?.marksheet10th?.url,
    },
    {
      title: "Senior Secondary (12th)",
      board: "UP Board",
      school: "Vivekanand Inter College, Darwara Bijnor",
      year: "2021",
      percentage: "53%",
      stream: "Science (Maths Group)",
      subjects: ["Maths", "Physics", "Chemistry", "English", "Hindi"],
      achievements: [
        "Gained interest in logic-based subjects",
        "Focused on building core knowledge in PCM",
        "Balanced education with personal self-learning in computer basics",
      ],
      image: images?.marksheet12th?.url,
    },
    {
      title: "Bachelor of Technology - Computer Science & Engineering",
      college: "Teerthanker Mahaveer University, Moradabad",
      year: "2024-25 (3rd Sem)",
      sgpa: "6.32 SGPA",
      specialization: "Full Stack Development & Data Science (Self-learning)",
      subjects: [
        "Mathematics III",
        "Data Structures in C++",
        "Database Management System",
        "Digital Electronics",
        "Foundation in Quantitative Aptitude",
      ],
      achievements: [
        "Started building full-stack projects",
        "Explored core CS subjects hands-on",
        "Created personal portfolio & dashboards",
        "Actively learning Data Science & AI",
      ],
      image: images?.graduationMarksheet?.url,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center text-[#00FFC6] mb-14"
        >
          My Educational Journey
        </motion.h1>
        <div className="flex flex-col gap-14">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3, duration: 0.7 }}
              className="bg-[#1e1b3a] rounded-2xl shadow-xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center"
            >
              <img
                src={edu.image}
                alt={edu.title}
                className={`rounded-xl w-full max-h-[400px] object-contain border border-[#00FFC6]/20 shadow-md ${
                  isLogin ? "" : "blur"
                }`}
              />

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#00FFC6] mb-4">
                  {edu.title}
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Board/University :-</span>{" "}
                  {edu.board || edu.college}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">School/College :-</span>{" "}
                  {edu.school || edu.college}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Year :</span> {edu.year}
                </p>
                {edu.percentage && (
                  <p className="mb-2">
                    <span className="font-semibold">Marks:</span>{" "}
                    {isLogin
                      ? edu.percentage
                      : "You must log in to view full details."}
                  </p>
                )}
                {edu.sgpa && (
                  <p className="mb-2">
                    <span className="font-semibold">SGPA:</span> {edu.sgpa}
                  </p>
                )}
                {edu.stream && (
                  <p className="mb-2">
                    <span className="font-semibold">Stream:</span> {edu.stream}
                  </p>
                )}
                {edu.specialization && (
                  <p className="mb-2">
                    <span className="font-semibold">Specialization:</span>{" "}
                    {edu.specialization}
                  </p>
                )}
                <p className="mt-4 mb-1 font-semibold text-[#00FFC6]">
                  Subjects Studied:
                </p>
                <ul className="list-disc ml-6 text-sm text-white/90">
                  {edu.subjects.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <p className="mt-4 mb-1 font-semibold text-[#00FFC6]">
                  Achievements:
                </p>
                <ul className="list-disc ml-6 text-sm text-white/90">
                  {edu.achievements.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
