'use client';
import React, { useEffect, useState } from "react";
import { motion, useTransform} from "framer-motion";
import aboutMe from '../assets/AboutMe.png';
import aboutTitle from '../assets/AboutTitleBg.png';
import aboutCard from '../assets/AboutCardBg.png';
import "./style.css"; // Import styles
import Header from '../components/header';
import Menu from '../components/menu';
import PixelBackground from '../components/pixelBackground';


const About = ({ scrollYProgress, menuIsActive, setMenuIsActive }) => {

  const scale = useTransform(scrollYProgress, [0.65, 1], [0.90, 1]);
  const rotate = useTransform(scrollYProgress, [0.75, 1], [2, 0]);

  return (
  
    <motion.div style={{scale, rotate}}className="page-container">
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive}/>
      <Menu menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive} />
      <PixelBackground menuIsActive={menuIsActive}/> <PixelBackground/>
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
