import React from "react";
import { motion } from "framer-motion";

const DevilordPage: React.FC = () => {
    const textVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 1.8 },
        }),
    };

    return (
        <>
            <div
                style={{
                    fontFamily: "Times New Roman, Times, serif",
                    padding: "20px",
                    color: "#FAEBD7",
                    textAlign: "center",
                }}
            >
                <motion.h1
                    style={{ marginBottom: "20px" }}
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                >
                    #2 Phantomlike
                </motion.h1>

                <motion.p
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                >
                    A Human?
                </motion.p>

                <motion.p
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                >
                    Its all ok. You are fine here.
                </motion.p>

                <motion.p
                    style={{
                        maxWidth: "600px",
                        margin: "20px auto",
                        lineHeight: "1.8",
                        border: "1px solid #FAEBD7",
                        padding: "20px",
                    }}
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                >
                    Welcome to the Human's Safe Haven, Phantomlike.
                </motion.p>

                <motion.p
                    style={{
                        maxWidth: "600px",
                        margin: "20px auto",
                        lineHeight: "1.8",
                        padding: "20px",
                    }}
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={textVariant}
                >
                    Phantomlike is a place where no devil and hordes can invade, until now no one knows what is the reason behind.
                </motion.p>
            </div>
        </>
    );
};

export default DevilordPage;
