import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Ensure styles are applied

const NavBar = ({ show }) => {
    const [hovering, setHovering] = useState(false);
    const [cursorY, setCursorY] = useState(0);
    const [cursorX, setCursorX] = useState(0);
    const navBarRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (event) => {
            if (navBarRef.current) {
                const navRect = navBarRef.current.getBoundingClientRect();
                if (event.clientY >= navRect.top && event.clientY <= navRect.bottom) {
                    setCursorY(event.clientY - navRect.top - 7);
                    setCursorX(navRect.width / 2);
                }
            }
        };

        if (hovering) {
            window.addEventListener("mousemove", handleMouseMove);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [hovering]);

    // Get the border radius based on normalized Y position
    const getBorderRadius = () => {
        if (!hovering) {
            return "1000px 0px 0px 182.5px"; // Default when not hovering
        }

        // Normalize cursor Y position to a range [0, 1]
        const normalizedY = cursorY / (navBarRef.current?.clientHeight || 1);

        // Determine which state to use based on normalizedY
        if (normalizedY <= 0.35) {
            return "182.5px 0px 0px 1000px"; // Top section
        } else if (normalizedY <= 0.65) {
            return "500px 0px 0px 500px"; // Middle section
        } else {
            return "1000px 0px 0px 182.5px"; // Bottom section
        }
    };


    return (
        <motion.div
            ref={navBarRef}
            className="nav-bar"
            initial={{ x: "100vw", opacity: 0 }}
            animate={show ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
                borderRadius: getBorderRadius(),
                transition: "border-radius 0.5s ease-in-out", // Smooth transition
            }}
        >
            <div 
                className={`nav-hover-rectangle ${hovering ? "visible" : ""}`} 
                style={{ top: `${cursorY}px`, left: `${cursorX}px`, transform: "translate(-50%, -50%)" }}
            />
            <div className="nav-text-container">
                <div className="nav-flex">
                    <Link to="/about" className="nav-item">aBout</Link>
                    <Link to="/projects" className="nav-item">ProjecTs</Link>
                    <Link to="/contact" className="nav-item">ContacT</Link>
                </div>
            </div>
        </motion.div>
    );
};

export default NavBar;
