import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform} from "framer-motion";
import Lenis from '@studio-freight/lenis';
import model from '../assets/image.png';
import About from "./About"; // Import About Section
import Projects from "./Projects"; // Import About Section
import NavBar from "../components/NavBar"; // Import NavBar Component
import TypingEffect from "../components/TypingEffect"; // Import TypingEffect Component
import "./style.css";

// Define transition settings
const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };
const fadeTransition = { duration: 0.5, ease: "easeOut" };
const clickTransition = { duration: 1.2, ease: [0.5, 1, 0.5, 1] };

// ✅ Parent container for scrolling sections
const Home = () => {
    const container = useRef();
    const {scrollYProgress} = useScroll({
        target: container,
        offset: ["start start", "33% start", "66% start", "end end"],
    })
    useEffect ( () => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Approx. expo out
            direction: 'vertical', // vertical or horizontal
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main ref={container} className="parent-container">
                <Box scrollYProgress = {scrollYProgress}/>
                <About scrollYProgress = {scrollYProgress}/>
                <Projects scrollYProgress = {scrollYProgress}/>
        </main>
    )
}


export const Box = ({scrollYProgress}) => {
    const imageRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);
    const [initialSize, setInitialSize] = useState({ width: 0, height: 0, top: 0, left: 0 });

    const handleClick = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                setInitialSize({
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left
                });
            }
            setIsClicked(true);

            // Step 2: Show the title after image transition
            setTimeout(() => {
                setShowTitle(true);
            }, 1200);

            // Step 3: Show the NavBar after the text animation
            setTimeout(() => {
                setShowNavBar(true);
            }, 2000);
        }, 500);
    };

    const handleReset = () => {
        setIsClicked(false);
        setIsFadingOut(false);
        setShowTitle(false);
        setShowNavBar(false);
    };

    const rotate = useTransform(scrollYProgress, [0, 0.25], [0, -5]); // Stops rotation at About
    const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);
    
    return (
        <motion.div style={{scale, rotate}} className="box">
            <div className="entry-page">
                <motion.div 
                    className="overlap-group"
                    whileTap={{ scale: 0.98 }}
                    transition={transition}
                >
                    <div className="content-container">
                        <div className="image-text-wrapper">
                            {!isClicked ? (
                                <>
                                    <motion.img 
                                        className="model" 
                                        alt="Model" 
                                        src={model} 
                                        ref={imageRef}
                                        onClick={handleClick}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        layout
                                        initial={{ scale: 0.8 }}  
                                        whileHover={{ scale: 1.0, transition: { duration: 0.5 } }}
                                        style={{ cursor: 'pointer' }}
                                        transition={transition}
                                    />

                                    {/* Text with fade-out animation before image click */}
                                    <motion.div
                                        className="text-wrapper-container"
                                        animate={{ 
                                            opacity: isFadingOut ? 0 : 1, 
                                            scale: isHovered ? 1.25 : 1,
                                            x: isHovered ? -30 : 0,  
                                            y: isHovered ? 50 : 0,
                                        }}
                                        transition={isFadingOut ? fadeTransition : transition}
                                        style={{ position: 'absolute' }}
                                    >
                                        <div className="text-wrapper">Joshua Levano</div>
                                    </motion.div>
                                </>
                            ) : (
                                <motion.div className="clicked-container">
                                    <motion.img 
                                        className="model-clicked" 
                                        alt="Model" 
                                        src={model}
                                        onClick={handleReset}
                                        initial={{ 
                                            width: initialSize.width, 
                                            height: initialSize.height, 
                                            top: "0%", 
                                            left: "0%",
                                            opacity: 1
                                        }}
                                        animate={{ 
                                            width: "100vw", 
                                            height: "50vh",
                                            top: "25vh",  
                                            left: "0%",  
                                            opacity: 1
                                        }}
                                        style={{ 
                                            cursor: 'pointer',
                                            objectFit: 'cover',
                                            objectPosition: 'center 50%',
                                            position: "absolute"
                                        }}
                                        transition={clickTransition}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Title Label (Typing Effect) - Appears After Image Transition */}
            {showTitle && (
                <div className="">
                    <TypingEffect text="Joshua" />
                    <TypingEffect text="Levano" />
                </div>  
            )}


            {/* ✅ NavBar appears last after text animation */}
            {showNavBar && <NavBar show={showNavBar} />}
        </motion.div>
    );
};

export default Home;