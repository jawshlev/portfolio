import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import model from '../assets/image.png';
import "./style.css";

// Define transition settings
const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };
const clickTransition = { duration: 1.2, ease: [0.25, 1, 0.5, 1] };

export const Box = () => {
    const imageRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [initialSize, setInitialSize] = useState({ width: 0, height: 0, top: 0, left: 0 });

    const handleClick = () => {
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
    };

    const handleReset = () => {
        setIsClicked(false);
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
                                    {/* Normal state image with hover effect */}
                                    <motion.img 
                                        className="model" 
                                        alt="Model" 
                                        src={model} 
                                        ref={imageRef}
                                        onClick={handleClick}
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        layout
                                        animate={{ 
                                            opacity: 1, 
                                            scale: isHovered ? 1.1 : 1
                                        }}
                                        style={{ cursor: 'pointer' }}
                                        transition={transition}
                                    />

                                    {/* Text with hover animation */}
                                    <motion.div
                                        className="text-wrapper-container"
                                        onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}
                                        animate={{ 
                                            opacity: 1,
                                            x: isHovered ? -30 : 0, 
                                            y: isHovered ? 25 : 0,
                                            scale: isHovered ? 1.05 : 1
                                        }}
                                        transition={transition}
                                    >
                                        <div className="text-wrapper">Joshua Levano</div>
                                    </motion.div>
                                </>
                            ) : (
                                // Clicked state - transition to bottom half
                                <motion.div className="clicked-container">
                                    <motion.img 
                                        className="model-clicked" 
                                        alt="Model" 
                                        src={model}
                                        onClick={handleReset}
                                        initial={() => ({
                                            width: initialSize.width,
                                            height: initialSize.height,
                                            top: initialSize.top,
                                            left: initialSize.left,
                                            opacity: 1
                                        })}
                                        animate={{ 
                                            width: "100vw", 
                                            height: "50vh",
                                            top: "50vh", // Move downwards
                                            left: "0",  // Ensure it aligns correctly with full width
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
        </div>
    );
};
