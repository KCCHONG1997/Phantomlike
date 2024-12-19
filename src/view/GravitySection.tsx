import React, { useEffect, useRef } from "react";
import planck from "planck";

// Import the uploaded images
import topMid from "../assets/topmid.png";
import bottomLeft from "../assets/bottomleft.png";
import bottomRight from "../assets/bottomright.png";
import topRight from "../assets/topright.png";
import topLeft from "../assets/topleft.png";

const GravitySection: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const pl = planck;

        // Create the world with gravity
        const world = new pl.World(new pl.Vec2(0, -10));

        // Create static boundaries (left, right, top, and bottom walls)
        const createBoundary = (x1: number, y1: number, x2: number, y2: number) => {
            const boundary = world.createBody();
            boundary.createFixture(new pl.Edge(new pl.Vec2(x1, y1), new pl.Vec2(x2, y2)));
        };

        createBoundary(-7, 0.5, 7, 0.5); // Ground
        createBoundary(-7, 0, -7, 10); // Left wall
        createBoundary(7, 0, 7, 7); // Right wall
        createBoundary(-7, 7, 7, 7); // Top wall

        // Define scaling factor for the images
        const scalingFactor = 0.5;

        // Load all images with their dimensions
        const images = [
            { src: topMid, width: (265 / 50) * scalingFactor, height: (304 / 50) * scalingFactor },
            { src: bottomLeft, width: (217 / 50) * scalingFactor, height: (315 / 50) * scalingFactor },
            { src: bottomRight, width: (257 / 50) * scalingFactor, height: (264 / 50) * scalingFactor },
            { src: topRight, width: (186 / 50) * scalingFactor, height: (274 / 50) * scalingFactor },
            { src: topLeft, width: (161 / 50) * scalingFactor, height: (148 / 50) * scalingFactor },
        ].map(({ src, width, height }) => {
            const img = new Image();
            img.src = src;
            return { img, width, height };
        });

        // Create dynamic bodies for each image
        const objects = images.map(({ img, width, height }, index) => {
            const body = world.createBody({
                type: "dynamic",
                position: new pl.Vec2(-3 + index * 2, 5), // Spread them apart horizontally
            });

            // Use the correct dimensions for the fixture
            body.createFixture(new pl.Box(width / 2, height / 2), { density: 0.7, friction: 0.3 });

            return { body, image: img, width, height };
        });

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const scale = 50; // Scale for rendering
        let mouseJoint: planck.MouseJoint | null = null;

        // Utility to convert screen coordinates to world coordinates
        const toWorldCoords = (x: number, y: number) => {
            const rect = canvas.getBoundingClientRect();
            return new pl.Vec2(
                (x - rect.left) / scale - canvas.width / (2 * scale),
                (canvas.height - (y - rect.top)) / scale
            );
        };

        // Mouse event handlers
        const handleMouseDown = (e: MouseEvent) => {
            const mousePos = toWorldCoords(e.clientX, e.clientY);

            // Find the body under the mouse
            let bodyUnderMouse: planck.Body | null = null;
            world.queryAABB(new pl.AABB(mousePos, mousePos), (fixture) => {
                const body = fixture.getBody();
                if (body.isDynamic()) {
                    bodyUnderMouse = body;
                    return false; // Stop searching
                }
                return true;
            });

            // Create a MouseJoint if a body was found
            if (bodyUnderMouse) {
                const groundBody = world.createBody(); // Ground body required by MouseJoint
                mouseJoint = new pl.MouseJoint(
                    {
                        maxForce: 500.0,
                    },
                    groundBody,
                    bodyUnderMouse
                );
                world.createJoint(mouseJoint); // Add the MouseJoint to the world
                mouseJoint.setTarget(mousePos); // Set the initial target position
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (mouseJoint) {
                const mousePos = toWorldCoords(e.clientX, e.clientY);
                mouseJoint.setTarget(mousePos); // Update the target position
            }
        };

        const handleMouseUp = () => {
            if (mouseJoint) {
                world.destroyJoint(mouseJoint); // Destroy the joint on mouse release
                mouseJoint = null;
            }
        };

        // Attach event listeners
        canvas.addEventListener("mousedown", handleMouseDown);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseup", handleMouseUp);

        // Render loop
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        
            // Draw boundaries
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "black";
            ctx.stroke();
        
            // Draw objects
            objects.forEach(({ body, image, width, height }) => {
                const position = body.getPosition();
                const angle = body.getAngle();
                ctx.save();
                ctx.translate(
                    canvas.width / 2 + position.x * scale,
                    canvas.height - position.y * scale
                );
                ctx.rotate(-angle);
        
                if (image.complete) {
                    // Calculate "contain" dimensions
                    const imageAspectRatio = image.width / image.height;
                    const boxAspectRatio = width / height;
        
                    let drawWidth = width * scale;
                    let drawHeight = height * scale;
        
                    if (imageAspectRatio > boxAspectRatio) {
                        drawWidth = drawHeight * imageAspectRatio;
                    } else {
                        drawHeight = drawWidth / imageAspectRatio;
                    }
        
                    // Draw the image with "contain" scaling
                    ctx.drawImage(image, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
                } else {
                    // Fallback rectangle if the image isn't loaded
                    ctx.fillStyle = "blue";
                    ctx.fillRect(-width * scale / 2, -height * scale / 2, width * scale, height * scale);
                }
        
                ctx.restore();
            });
        
            // Step the physics simulation
            world.step(1 / 60);
        
            requestAnimationFrame(render);
        };
        

        render();

        return () => {
            cancelAnimationFrame(render as any);
            canvas.removeEventListener("mousedown", handleMouseDown);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            // style={{ border: "1px solid red" }}
        />
    );
};

export default GravitySection;
