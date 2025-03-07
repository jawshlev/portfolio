import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollForMore from "../components/ScrollForMore";
import modelImage from '../assets/image.png'; // Replace with your actual image path

// Using the same easing from Home component for consistency
const transition = { duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] };

// Animation variants
const firstName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const lastName = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
};

const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};

function Model({ imageDetails }) {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const [canScroll, setCanScroll] = useState(false);
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  
  // Account for the header height and container margins from CSS
  const headerHeight = 100; // From your CSS: header { height: 100px; }
  const containerMarginTop = 120; // From your CSS: .image-container { margin-top: 120px; }
  
  // Calculate the initial position to match home page exactly
  const initialYPosition = headerHeight + containerMarginTop + (imageDetails.height / 2);
  
  useEffect(() => {
    // Handle window resize
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (canScroll === false) {
      document.querySelector("body").classList.add("no-scroll");
    } else {
      document.querySelector("body").classList.remove("no-scroll");
    }
  }, [canScroll]);

  return (
    <motion.div
      onAnimationComplete={() => setCanScroll(true)}
      className="single"
      initial="initial"
      animate="animate"
      exit="exit">
      <div className="container fluid">
        <div className="row center top-row">
          <div className="top">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 1.2, ...transition },
              }}
              className="details">
              <div className="location">
                <span>28.538336</span>
                <span>-81.379234</span>
              </div>
              <div className="mua">MUA: @mylifeascrystall</div>
            </motion.div>
            <motion.div className="model">
              <motion.span className="first" variants={firstName}>
                <motion.span variants={letter}>Y</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>s</motion.span>
                <motion.span variants={letter}>m</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>n</motion.span>
              </motion.span>
              <motion.span className="last" variants={lastName}>
                <motion.span variants={letter}>T</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter}>i</motion.span>
                <motion.span variants={letter}>q</motion.span>
              </motion.span>
            </motion.div>
          </div>
        </div>
        <div className="row bottom-row">
          <div className="bottom">
            <motion.div 
              className="image-container-single"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}>
              <motion.div
                initial={{
                  // Position absolutely based on calculated values from CSS
                  position: "fixed",
                  top: initialYPosition,
                  left: "50%",
                  x: "-50%",
                  y: "-50%",
                  width: imageDetails.width,
                  height: imageDetails.height,
                  margin: 0,
                  zIndex: 20
                }}
                animate={{
                  position: "relative",
                  top: "0",
                  left: "0",
                  x: "0",
                  y: "0",
                  width: "100%",
                  height: dimensions.width > 1440 ? 800 : 400,
                  margin: 0,
                  transition: { 
                    duration: 1.2,
                    ease: [0.43, 0.13, 0.23, 0.96],
                    delay: 0.4
                  },
                }}
                className="thumbnail-single">
                <motion.div
                  className="frame-single"
                  whileHover="hover"
                  transition={transition}>
                  <motion.img
                    src={modelImage}
                    alt="Yasmeen Tariq"
                    style={{ scale: scale }}
                    initial={{ 
                      scale: 1.0,
                      objectFit: "cover",
                      width: "100%",
                      height: "100%"
                    }}
                    animate={{
                      y: dimensions.width > 1440 ? -400 : -200,
                      transition: { 
                        delay: 0.6, // Delay this slightly more than container
                        duration: 1.2,
                        ease: [0.43, 0.13, 0.23, 0.96]
                      },
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <ScrollForMore />
        </div>
      </div>
      <div className="detailed-information">
        <div className="container">
          <div className="row">
            <h2 className="title">
              The inspiration behind the artwork & <br /> what it means.
            </h2>
            <p>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old. Richard McClintock, a Latin
              professor at Hampden-Sydney College in Virginia, looked up one of
              the more obscure Latin words, consectetur, from a Lorem Ipsum
              passage, and going through the cites of the word in classical
              literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
              Malorum" (The Extremes of Good and Evil) by Cicero, written in 45
              BC. This book is a treatise on the theory of ethics, very popular
              during the Renaissance. The first line of Lorem Ipsum, "Lorem
              ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Model;