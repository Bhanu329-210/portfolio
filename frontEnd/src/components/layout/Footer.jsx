
import { motion } from 'motion/react';

const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4">
                <p className="text-gray-500 text-sm flex items-center gap-2">
                    Made with
                    <motion.span
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-block"
                        aria-label="love"
                    >
                        ❤️
                    </motion.span>
                    by Bhanu Prakash
                </p>
            </div>
        </footer>
    );
};

export default Footer;
