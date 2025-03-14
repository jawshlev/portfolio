import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "../pages/style.css"; // Ensure styles are applied

const TypingEffect = ({ text = "Joshua Levano" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <h2 ref={ref} className="label" style={{ fontFamily: '"Major Mono Display", monospace', color: "#000000" }}>
            {text.split("\n").map((line, lineIndex) => (
                <span key={lineIndex} style={{ display: "block" }}>
                    {line.split("").map((letter, index) => (
                        <motion.span
                            key={`${lineIndex}-${index}`}
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.2, delay: (lineIndex * 5 + index) * 0.1 }}
                            style={{ display: "inline-block" }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </span>
            ))}
        </h2>
    );
};

export default TypingEffect;
