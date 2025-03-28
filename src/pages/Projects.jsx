import React, { useEffect, useState } from "react";
import { motion, useTransform} from "framer-motion";
import "./style.css"; // Import styles

const Projects = ({scrollYProgress}) => {
  const scale = useTransform(scrollYProgress, [0.75, 1], [0.95, 1]);
  const rotate = useTransform(scrollYProgress, [0.75, 1], [2, 0]);

  const projects = [
    {
      title: "Refor(me)d",
      src: "reformed.png",
      color: "#000000"
    },
    {
      title: "DigitalValentine",
      src: "officestudio.png",
      color: "#8C8C8C"
    },
    {
      title: "Necrobotic",
      src: "locomotive.png",
      color: "#EFE8D3"
    },
    {
      title: "BreakTheIce",
      src: "silencio.png",
      color: "#706D63"
    }
  ]
  return (
   <motion.div style={{scale, rotate}} className="projects-page">
      <h1>Projects</h1>
    </motion.div>
  );
};

export default Projects;
