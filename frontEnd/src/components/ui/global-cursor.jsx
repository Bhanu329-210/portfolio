import { useRef } from 'react';
import { motion } from 'motion/react';
import { useMousePosition } from '../../hooks/use-mouse-position';

const GlobalCursor = () => {
    // We don't pass a container ref, so it defaults to window/viewport coordinates
    const mousePosition = useMousePosition();

    // Check if mouse has moved at least once (initially 0,0)
    // To prevent cursor jumping from top-left on load, we can hide it initially or just let it snap.
    // For simplicity, we just render it.

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 z-50 w-6 h-6 rounded-full bg-orange-500 mix-blend-difference"
            style={{
                x: mousePosition.x - 12, // Center the 24px ball
                y: mousePosition.y - 12,
                // Optional: add a slight spring or lag if desired via transition prop on motion.div directly
                // But for "ball moving along cursor", direct mapping feels most responsive.
            }}
            transition={{
                type: "spring",
                damping: 25,
                stiffness: 400,
                mass: 0.5
            }}
            animate={{
                x: mousePosition.x - 12,
                y: mousePosition.y - 12
            }}
        />
    );
};

export default GlobalCursor;
