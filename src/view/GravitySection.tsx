import React, { useRef, useEffect } from "react";
import Matter from "matter-js";

const GravitySection: React.FC = () => {
    const sceneRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

        // Clean up any existing canvas in the container
        if (sceneRef.current) {
            sceneRef.current.innerHTML = "";
        }

        // Create Matter.js engine
        const engine = Engine.create();
        const world = engine.world;

        // Create Matter.js renderer
        const render = Render.create({
            element: sceneRef.current as HTMLElement, // Attach to the container
            engine: engine,
            options: {
                width: 900,
                height: 600,
                wireframes: false, // No outlines
                background: "#222", // Dark background
            },
        });

        // Add a ground
        const ground = Bodies.rectangle(450, 590, 900, 20, { isStatic: true });
        World.add(world, ground);

        // Add some shapes
        const shapes = [
            Bodies.rectangle(300, 100, 50, 50, { render: { fillStyle: "#FF6347" } }),
            Bodies.circle(500, 100, 25, { render: { fillStyle: "#4682B4" } }),
            Bodies.polygon(700, 100, 6, 40, { render: { fillStyle: "#32CD32" } }),
        ];
        World.add(world, shapes);

        // Add mouse interactivity
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false },
            },
        });
        World.add(world, mouseConstraint);

        // Run the engine and renderer
        Render.run(render);
        const runner = Runner.create();
        Runner.run(runner, engine);

        // Cleanup on unmount
        return () => {
            Matter.Engine.clear(engine);
            Render.stop(render);
            World.clear(world, false);
        };
    }, []);

};

export default GravitySection;
