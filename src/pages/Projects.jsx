"use client";
import React, { useEffect, useState } from "react";
import { motion, useTransform} from "framer-motion";
import "./style.css"; // Import styles
import Project from "../components/project";
import Modal from "../components/modal";
import reformed from '../assets/reformed.png';
import valentine from '../assets/valentineCard.png';
import necro from '../assets/necroboticwebsite.png';
import Header from '../components/header';
import Menu from '../components/menu';
import PixelBackground from '../components/pixelBackground';

const Projects = ({scrollYProgress}) => {

  //Add to this page a description to each of the projects that you'll
  //pull from in the modal component. This will make a changing description
  //depending on the project you are hovering over.
  const projects = [
    {
      title: "Refor(me)d",
      src: reformed,
      color: "#000000",
      href: "https://jawshlev.github.io/reformed/"
    },
    {
      title: "DigitalValentine",
      src: valentine,
      color: "#8C8C8C",
      href: "https://jawshlev.github.io/digitalvalentine/"
    },
    {
      title: "Necrobotic",
      src: necro,
      color: "#EFE8D3",
      href: "https://jawshlev.github.io/necroboticweb-deploy/"
    },
    {
      title: "BreakTheIce",
      src: necro,
      color: "#706D63",
      href: "https://jawshlev.github.io/breakTheIce/"
    }
  ]

  const [modal, setModal] = useState({active:false, index: 0});
  const [menuIsActive, setMenuIsActive] = useState(false);

  return (
    <div className="projects-page">
      <Header menuIsActive={menuIsActive} setMenuIsActive={setMenuIsActive}/>
      <Menu menuIsActive={menuIsActive}/>
      <PixelBackground menuIsActive={menuIsActive}/> <PixelBackground/>
      <div className="projects-main">
          <div className="projects-body">
          <h1 className="projects-header">Projects</h1>
            {
              projects.map( (project, index) => {
                return <Project 
                  key={index} 
                  index={index} 
                  title={project.title} 
                  href={project.href}
                  setModal={setModal}/>
                })
            }
          </div>
        </div>
        <Modal modal={modal} projects={projects}/>
    </div>
    
  );
};

export default Projects;
