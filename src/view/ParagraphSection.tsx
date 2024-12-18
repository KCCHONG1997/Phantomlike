import React from "react";

type ParagraphSectionProps = {
    cursed: boolean;
};

const ParagraphSection: React.FC<ParagraphSectionProps> = ({ cursed }) => {
    return (
        <section style={{ marginBottom: "40px", fontFamily: "Times New Roman, Times, serif" }}>
            <h1>Welcome to PHANTOMLIKE</h1>
            <p style={{ maxWidth: "600px", textAlign: "justify", margin: "0 auto", lineHeight: "1.8" }}>
                It all started 100 years ago, when the cube-like meteor fell onto our world. It tore through the skies and
                shattered the land, leaving nothing but devastation in its wake. From the meteor came the Devil, and their followers, the Devillord—humanoid creatures that walk among us.
                <br />
                <br />
                People began to change. Slowly, without warning, they lost themselves. Entire cities fell. Governments
                crumbled. The world as we knew it ceased to exist.
                <br />
                <br />
                And yet, humanity still appears.
                <br />
                <br />
                How is this possible? {cursed ? <span style={{ color: "#780606" }}>₩ɆⱠⱠ ₱Ⱡ₳₦₦ɆĐ</span> : null}
            </p>
        </section>
    );
};

export default ParagraphSection;
