import { useEffect, useState } from "react";

export const useMousePosition = (
    containerRef
) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updatePosition = (x, y) => {
            // If we are given a container, calculate relative position
            // Otherwise, keep using page coordinates, but the user prompt implementation 
            // suggests handling container rect if specific reference passed.
            if (containerRef && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const relativeX = x - rect.left;
                const relativeY = y - rect.top;

                // Calculate relative position everywhere to allow tracking outside
                setPosition({ x: relativeX, y: relativeY });
            } else {
                // Fallback to window coordinates if no container
                setPosition({ x, y });
            }
        };

        const handleMouseMove = (ev) => {
            updatePosition(ev.clientX, ev.clientY);
        };

        const handleTouchMove = (ev) => {
            const touch = ev.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        };

        // Listen for both mouse and touch events
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchmove", handleTouchMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, [containerRef]);

    return position;
};
