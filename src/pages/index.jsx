import { Link, useNavigate } from 'react-router-dom';
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import model from '../assets/image.png';
import "./style.css";

// Define the same transition settings from home.js
const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

export const Box = () => {
    // For programmatic navigation
    const navigate = useNavigate();
    
    // Reference for the image (optional)
    const imageRef = useRef(null);
    
    // State to track hover for both elements
    const [isHovered, setIsHovered] = useState(false);

    // Handlers to update the hover state
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    // Handler for navigation - updated to use the correct route path
    const handleClick = () => {
        // Adjust this path to match your actual route configuration
        navigate('/model/joshua-levano');
    };

    return (
        <div className="box">
            <div className="entry-page">
                <motion.div 
                    className="overlap-group"
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                    whileTap={{ scale: 0.98 }}
                    transition={transition}
                >
                    {/* Image with its own hover handlers but animation controlled by shared state */}
                    <motion.img 
                        className="model" 
                        alt="Model" 
                        src={model} 
                        ref={imageRef}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: isHovered ? 1.1 : 1
                        }}
                        transition={transition}
                    />

                    {/* Text with its own hover handlers but animation controlled by shared state */}
                    <motion.div
                        className="text-wrapper-container"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            scale: isHovered ? 1.05 : 1
                        }}
                        exit={{ opacity: 0 }}
                        transition={transition}
                    >
                        <div className="text-wrapper">Joshua Levano</div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};