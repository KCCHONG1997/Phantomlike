import React, { useEffect } from "react";
import { motion } from "framer-motion";

const DevilordPage: React.FC = () => {
    useEffect(()=>{
        localStorage.setItem("Devilord","true");
    });
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
                    #2(alt) The Devilord
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
                    You must have some remarkable determination and observation.
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
                    You have chosen a different path, one that avoids the curse of the Devil.
                    The Devilord awaits you with secrets untold. Will you uncover them?
                </motion.p>
            </div>
        </>
    );
};

export default DevilordPage;
