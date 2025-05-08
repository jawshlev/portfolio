import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Ensure styles are applied

const NavBar = ({ show, lenis, menuIsActive, setMenuIsActive }) => {
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
            return "1000px 0px 0px 500px"; // Default when not hovering
        }

        // Normalize cursor Y position to a range [0, 1]
        const normalizedY = cursorY / (navBarRef.current?.clientHeight || 1);

        // Determine which state to use based on normalizedY
        if (normalizedY <= 0.40) {
            return "500px 0px 0px 1000px"; // Top section
        } else if (normalizedY <= 0.60) {
            return "1000px 0px 0px 1000px"; // Middle section
        } else {
            return "1000px 0px 0px 500px"; // Bottom section
        }
    };


    return (
        <motion.div
            ref={navBarRef}
            className="nav-bar"
            initial={{ x: "100vw", opacity: 0 }} // Initial opacity for background only
            animate={show ? { x: 0, opacity: 1 } : {}} // Set opacity to 1 for full rgba control in CSS
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.25 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
                borderRadius: getBorderRadius(),
                transition: "border-radius 0.5s ease-in-out",
            }}
        >
            <div 
                className={`nav-hover-rectangle ${hovering ? "visible" : ""}`} 
                style={{ top: `${cursorY}px`, left: `${cursorX}px`, transform: "translate(-50%, -50%)" }}
            />
            
            {/* Animate text separately */}
            <motion.div
                className="nav-text-container"
                initial={{ opacity: 0 }}
                animate={show ? { opacity: 1 } : {}}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            >
                <div className="nav-flex">
                    <a
                    className="nav-item"
                    onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector('#about');
                        if (target && lenis) {
                            lenis.scrollTo(target, {
                                duration: 2.8, // feels smooth without dragging too long
                                easing: (t) => 1 - Math.cos((t * Math.PI) / 1.25), // slower scroll in seconds
                            });
                        }
                        if (menuIsActive) {
                            setMenuIsActive(false); // ✅ close the menu if it's open
                          }
                    }}
                    >
                    aBout
                    </a>
                    <Link to="/Projects" className="nav-item">ProjecTs</Link>
                    <a
                    className="nav-item"
                    onClick={(e) => {
                        e.preventDefault();
                        const target = document.querySelector('#about');
                        if (target && lenis) {
                        lenis.scrollTo(target, {
                            duration: 2.8,
                            easing: (t) => 1 - Math.cos((t * Math.PI) / 1.25),
                        });
                        }

                        setTimeout(() => {
                            setMenuIsActive(true); // always open menu after Contact
                          }, 1000);
                    }}
                    >
                    ContacT
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default NavBar;
