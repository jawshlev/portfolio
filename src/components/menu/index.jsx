import React from 'react';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const anim = {
  initial: { opacity: 0 },
  open: { opacity: 1 },
  closed: { opacity: 0 },
  exit: { opacity: 0 }
};

export default function Menu({ menuIsActive, setMenuIsActive }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      setMenuIsActive(false); // ✅ close menu if already home
    }
  };

  const handleProjectsClick = () => {
    if (location.pathname !== "/projects") {
      navigate("/projects");
    } else {
      setMenuIsActive(false); // optional: close menu even if already there
    }
  };

  return (
    <motion.div 
      className={styles.menu}
      variants={anim}
      initial="initial"
      animate={menuIsActive ? "open" : "closed"}
      style={{ pointerEvents: menuIsActive ? "auto" : "none" }}
    >
      <p onClick={handleHomeClick}>Home</p>
      <p onClick={handleProjectsClick}>Projects</p>
      <div className={styles.p2}>Contact Me:</div>
      <div className={styles.menuLinks}>
        <a
          href="https://github.com/jawshlev"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.menuLink}
        >
          GitHub
        </a>
        <a
          href="mailto:joshuadlevano@gmail.com"
          className={styles.menuLink}
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/josh-levano-746908263/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.menuLink}
        >
          LinkedIn
        </a>
      </div>

    </motion.div>
  );
}
