'use client';
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./style.css"; // Import styles

const About = () => {
  const [animationStage, setAnimationStage] = useState("hidden");

  useEffect(() => {
    const blurInTimer = setTimeout(() => {
      setAnimationStage("visible");
    }, 1000);

    const blurOutTimer = setTimeout(() => {
      setAnimationStage("hidden");
    }, 4000);

    return () => {
      clearTimeout(blurInTimer);
      clearTimeout(blurOutTimer);
    };
  }, []);

  return (
    <div className="page-container">
      {/* Animated About Me Text */}
      <motion.h1
        initial={{ filter: "blur(20px)", opacity: 0 }}
        animate={
          animationStage === "visible"
            ? { filter: "blur(0px)", opacity: 1 }
            : { filter: "blur(20px)", opacity: 0 }
        }
        transition={{ duration: 1.2 }}
      >
        About Me
      </motion.h1>
    </div>
  );
};

export default About;
