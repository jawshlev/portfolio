import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform} from "framer-motion";
import Lenis from '@studio-freight/lenis';
import model from '../assets/image.png';
import About from "./About"; // Import About Section
import NavBar from "../components/NavBar"; // Import NavBar Component
import TypingEffect from "../components/TypingEffect"; // Import TypingEffect Component
import "./style.css";

const transition = { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] };
const homeTransition = { duration: 1.2, ease: [0.5, 1, 0.5, 1] };

const Home = () => {
    const [menuIsActive, setMenuIsActive] = useState(false);
    const container = useRef();
    const [lenisInstance, setLenisInstance] = useState(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        setLenisInstance(lenis);

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    return (
        <main ref={container} className="parent-container">
            <Box
            scrollYProgress={scrollYProgress}
            lenis={lenisInstance}
            menuIsActive={menuIsActive}
            setMenuIsActive={setMenuIsActive}
            />
            <section id="about">
                <About
                scrollYProgress={scrollYProgress}
                menuIsActive={menuIsActive}
                setMenuIsActive={setMenuIsActive}
                />
            </section>
            {/* <section id="projects">
                <Projects scrollYProgress={scrollYProgress} />
            </section> */}
        </main>
    )
}


export const Box = ({ scrollYProgress, lenis, menuIsActive, setMenuIsActive }) => {
    const imageRef = useRef(null);
    const [isClicked, setIsClicked] = useState(false);
    const [showTitle, setShowTitle] = useState(false);
    const [showNavBar, setShowNavBar] = useState(false);
    const [initialSize, setInitialSize] = useState({ width: 0, height: 0, top: 0, left: 0 });

    useEffect(() => {
        // Get initial size after mount
        const timer = setTimeout(() => {
            if (imageRef.current) {
                const rect = imageRef.current.getBoundingClientRect();
                setInitialSize({
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left,
                });
            }
            setIsClicked(true);
        }, 1400);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isClicked) {
            setTimeout(() => setShowTitle(true), 1200);  // after transition
            setTimeout(() => setShowNavBar(true), 2000); // after text
        }
    }, [isClicked]);

    const rotate = useTransform(scrollYProgress, [0, 0.25], [0, -5]);
    const scale = useTransform(scrollYProgress, [0, 0.25], [1, 0.95]);

    return (
        <motion.div style={{ scale, rotate }} className="box">
            <div className="entry-page">
                <motion.div className="overlap-group" transition={transition}>
                    <div className="content-container">
                        <div className="image-text-wrapper">
                            {!isClicked ? (
                                <>
                                    <motion.img
                                        className="model"
                                        alt="Model"
                                        src={model}
                                        ref={imageRef}
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: 1.0 }}
                                        transition={transition}
                                    />

                                    <motion.div
                                        className="text-wrapper-container"
                                        initial={{ scale: 0.8, right: "52vw", opacity: 0}}
                                        animate={{ scale: 1.0, top: "80vh", right: "54.5vw", opacity: 1}}
                                        transition={transition}
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
                                        initial={{
                                            width: initialSize.width,
                                            height: initialSize.height,
                                            top: "0%",
                                            left: "0%",
                                            opacity: 1,
                                        }}
                                        animate={{
                                            width: "100vw",
                                            height: "100vh",
                                            left: "0%",
                                            opacity: 1,
                                        }}
                                        style={{
                                            objectFit: 'cover',
                                            objectPosition: 'center 0%',
                                            position: "absolute",
                                        }}
                                        transition={homeTransition}
                                    />
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>

            {showTitle && (
                <div>
                    <TypingEffect text="Joshua" />
                    <TypingEffect text="Levano" />
                    <TypingEffect text="Portfolio." />
                </div>
            )}
                
                {showNavBar && (
                    <NavBar
                        show={showNavBar}
                        lenis={lenis}
                        menuIsActive={menuIsActive}
                        setMenuIsActive={setMenuIsActive}
                    />
                )}
        </motion.div>
        
    );
};


export default Home;
