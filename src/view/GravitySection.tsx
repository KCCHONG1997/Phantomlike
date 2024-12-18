import React, { useEffect, useRef } from "react";
import planck from "planck";
import cardTorn from "../assets/card_back.png";

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

        createBoundary(-7, 0, 7, 0); // Ground
        createBoundary(-6, 0, -6, 7); // Left wall
        createBoundary(6, 0, 6, 6); // Right wall
        createBoundary(-8, 8, 8, 8); // Top wall

        const objects: planck.Body[] = []; // Explicitly type the objects array

        // Create a random shape (rectangle, triangle)
        const createRandomShape = () => {
            const randomX = Math.random() * 12 - 6; // Random x position
            const position = new pl.Vec2(randomX, 8); // Starting position (top)

            // Randomly decide shape
            const shapeType = Math.random();
            let body;
            if (shapeType < 0.33) {
                // Rectangle
                body = world.createBody({
                    type: "dynamic",
                    position,
                });
                body.createFixture(new pl.Box(0.5, 0.5), {
                    density: 1.0,
                    friction: 0.3,
                });
            } else if (shapeType < 0.66) {
                // Triangle (approximated as a polygon)
                body = world.createBody({
                    type: "dynamic",
                    position,
                });
                const vertices = [
                    new pl.Vec2(0, 0.5),
                    new pl.Vec2(-0.5, -0.5),
                    new pl.Vec2(0.5, -0.5),
                ];
                body.createFixture(new pl.Polygon(vertices), {
                    density: 1.0,
                    friction: 0.3,
                });
            } else {
                // Another rectangle with a different aspect ratio
                body = world.createBody({
                    type: "dynamic",
                    position,
                });
                body.createFixture(new pl.Box(0.3, 0.7), {
                    density: 1.0,
                    friction: 0.3,
                });
            }

            objects.push(body); // Add to objects array
        };

        // Spawn initial objects
        for (let i = 0; i < 5; i++) {
            createRandomShape();
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const scale = 70; // Scale for rendering
        // const boxImage = new Image(); // Load the image
        // boxImage.src = cardTorn;

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
                        maxForce: 1000.0,
                    },
                    groundBody,
                    bodyUnderMouse
                );
                world.createJoint(mouseJoint); // Add the MouseJoint to the world
                mouseJoint.setTarget(mousePos); // Set the target position
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

            // Draw objects
            objects.forEach((body) => {
                const position = body.getPosition();
                const angle = body.getAngle();
                ctx.save();
                ctx.translate(
                    canvas.width / 2 + position.x * scale,
                    canvas.height - position.y * scale
                );
                ctx.rotate(-angle);

                // if (boxImage.complete) {
                if (false) {
                    // ctx.drawImage(boxImage, -25, -25, 50, 50); // Draw as card image
                } else {
                    ctx.fillStyle = "blue"; // Fallback color
                    ctx.fillRect(-25, -25, 50, 50);
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
            style={{ border: "1px solid red" }}
        />
    );
};

export default GravitySection;
