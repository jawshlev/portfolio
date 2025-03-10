import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import model from '../assets/image.png';
import "./style.css";

// Define transition settings
const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };
const fadeTransition = { duration: 0.5, ease: "easeOut" };
const clickTransition = { duration: 1.2, ease: [0.25, 1, 0.5, 1] };

// Typing Effect Component
export function TypingEffect({ text = "Joshua Levano" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <h2 
            ref={ref} 
            className="label text-wrapper"
            style={{ 
                fontFamily: '"Major Mono Display", monospace', 
                color: "#000000", 
                fontSize: "135px", /* 🔹 Adjust font size directly */
                lineHeight: "1.1",
                textAlign: "center"
            }}
        >
            {text.split("").map((letter, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    style={{ 
                        fontFamily: '"Major Mono Display", monospace', 
                        fontSize: "inherit", /* 🔹 Ensure spans inherit size */
                        color: "#000000",
                        display: "inline-block"
                    }}
                >
                    {letter}
                </motion.span>
            ))}
        </h2>
    );
}


export const Box = () => {
    const imageRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
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

            // Delay the title fade-in until the image transition completes
            setTimeout(() => {
                setShowTitle(true);
            }, 1200);
        }, 500);
    };

    const handleReset = () => {
        setIsClicked(false);
        setIsFadingOut(false);
        setShowTitle(false);
    };

    return (
        <div className="box">
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
                                        animate={{ 
                                            opacity: 1, 
                                            scale: isHovered ? 1.0 : 0.8 
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        transition={transition}
                                    />

                                    {/* Text with fade-out animation before image click */}
                                    <motion.div
                                        className="text-wrapper-container"
                                        animate={{ 
                                            opacity: isFadingOut ? 0 : 1, 
                                            x: isHovered ? -62 : 0,  
                                            y: isHovered ? 50 : 0,  
                                            scale: isHovered ? 1.25 : 1
                                        }}
                                        transition={isFadingOut ? fadeTransition : transition}
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
                                            top: initialSize.top, 
                                            left: initialSize.left,
                                            opacity: 1
                                        }}
                                        animate={{ 
                                            width: "100vw", 
                                            height: "50vh",
                                            top: "50vh",  
                                            left: "0",  
                                            opacity: 1
                                        }}
                                        style={{ 
                                            cursor: 'pointer',
                                            objectFit: 'cover',
                                            objectPosition: 'center 65%',
                                            position: "fixed"
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
            {showTitle && <TypingEffect text="Joshua Levano" />}
        </div>
    );
};
