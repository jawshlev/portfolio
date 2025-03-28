'use client';
import React, { useEffect, useState } from "react";
import { motion, useTransform} from "framer-motion";
import aboutMe from '../assets/AboutMe.png';
import aboutTitle from '../assets/AboutTitleBg.png';
import aboutCard from '../assets/AboutCardBg.png';
import "./style.css"; // Import styles

const About = ({scrollYProgress}) => {

  const rotate = useTransform(scrollYProgress, [0.45, 0.6], [0, 3]); 
  const scale = useTransform(scrollYProgress, [0.45, 0.6], [1, 0.95]);  

  return (  
    <motion.div style={{scale, rotate}}className="page-container">
      <div className="about-container">
          <img className="aboutMe" alt="About Me" src={aboutMe} />
          <img className="aboutTitle" alt="Title" src={aboutTitle} />
          <img className="aboutCard" alt="Card" src={aboutCard} />
          <div className="aboutTitleText">About</div>
      </div>
    </motion.div>
    
  );
};

export default About;
