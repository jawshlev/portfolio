import React from 'react';
import styles from './style.module.css';
import {motion} from 'framer-motion';

const scaleAnimation = {
    initial: {scale: 0, x: "-50%", y: "-50%"},
    open: {scale: 1, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
    closed: {scale: 0, x: "-50%", y: "-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 1]}},

}

export default function index({ modal, projects }) {

  const {active, index} = modal;

  return (
    <motion.div variants={scaleAnimation} initial={"initial"} animate={active ? "open": "closed"}className={styles.modalContainer}>
      <div
        className={styles.modalSlider}
        style={{
            transform: `translateX(-${modal.index * 40}vw)`
        }}
      >
        {projects.map((project, index) => {
          const { src, color } = project;
          return (
            <div
              key={`modal_${index}`}
              className={styles.modal}
              style={{ backgroundColor: color }}
            >
              <img
                src={src}
                className={styles.modalimg}
                alt={`Preview of ${project.title}`}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
