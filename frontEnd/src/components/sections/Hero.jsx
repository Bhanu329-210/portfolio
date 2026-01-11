import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { AnimatedHeroSection } from '../ui/animated-hero-section';
import LightRays from '../ui/LightRays';

const Hero = () => {
    const ctaRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
            ctaRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 1 }
        );
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
        >
            {/* Background Light Rays */}
            <div className="absolute inset-0 z-0">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#3B82F6"
                    raysSpeed={1.5}
                    lightSpread={0.8}
                    rayLength={1.2}
                    followMouse={true}
                    mouseInfluence={0.1}
                    noiseAmount={0.1}
                    distortion={0.05}
                />
            </div>

            {/* Canvas Animation Background/Foreground */}
            <AnimatedHeroSection />
            <h2 className="absolute top-[25%] left-0 right-0 text-center z-20 text-3xl md:text-5xl font-bold text-white tracking-wide pointer-events-none">
                Hi, I am
            </h2>
            {/* Overlay Content (CTA) - Pushed to bottom or stylized to sit on top */}
            <div className="relative z-20 mt-[60vh]"> {/* Push content down so canvas text is visible */}
                <p className="text-gray-400 mb-8 max-w-xl mx-auto backdrop-blur-sm bg-black/30 p-2 rounded-lg border border-white/5">
                    Full Stack Developer crafting digital experiences.
                </p>

                <div ref={ctaRef} className="flex flex-col items-center">
                    {/* Social Icons */}
                    <div className="flex gap-6 mb-8">
                        <a
                            href="https://github.com/Bhanu329-210"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                            aria-label="GitHub"
                        >
                            <FaGithub size={28} />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/alahari-bhanu-prakash-43aa4b2b9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={28} />
                        </a>
                        <a
                            href="https://leetcode.com/u/Bhanuprakashalahari/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300 transition-colors"
                            aria-label="LeetCode"
                        >
                            <SiLeetcode size={28} />
                        </a>
                    </div>

                    <a
                        href="https://wa.me/918500292426"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                        <FaWhatsapp size={20} />
                        Let's talk
                    </a>
                </div>
            </div>

        </section>
    );
};

export default Hero;
