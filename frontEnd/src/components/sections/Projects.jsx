import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadialScrollGallery } from '../ui/portfolio-and-image-gallery';
import { Badge } from '../ui/badge';
import { ArrowUpRight } from 'lucide-react';
import { AnimatedProfileCard } from '../ui/animated-profile-card';
import { BGPattern } from '../ui/bg-pattern';

gsap.registerPlugin(ScrollTrigger);

import Carousel from '../ui/carousel';

const Projects = () => {
    const [showConstruction, setShowConstruction] = useState(false);

    // ... projects data ...
    const projects = [
        {
            id: 1,
            title: "SynapStore",
            cat: "AI Pharmacy",
            description: "An smart pharmacy system with AI features",
            color: "#10b981", // Emerald Green
            textColor: "#ffffff",
            liveLink: "https://www.synapstore.me"
        },
        {
            id: 2,
            title: "Jobby",
            cat: "Job Portal",
            description: "A full stack job searching platform",
            color: "#8b5cf6", // Violet
            textColor: "#ffffff",
            liveLink: "https://joby.ccbp.tech"
        },
        {
            id: 3,
            title: "Nxtwatch",
            cat: "Streaming",
            description: "An YouTube clone with CRUD operations",
            color: "#ef4444", // Red
            textColor: "#ffffff",
            liveLink: "https://nxtwatch.ccbp.tech"
        },
        {
            id: 4,
            title: "Nxttrendz",
            cat: "E-Commerce",
            description: "An ecommerce shopping platform",
            color: "#f59e0b", // Amber
            textColor: "#ffffff",
            liveLink: "https://nxtz.ccbp.tech"
        },
    ];

    const renderProjectCard = (project) => (
        <AnimatedProfileCard
            key={project.id}
            className="w-[280px] h-[390px] p-0 border-white/10 bg-transparent"
            accentColor={project.color}
            baseCard={
                <div className="relative w-full h-full bg-black border border-white/10 rounded-xl p-6 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-50">
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cursor-pointer hover:text-blue-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ArrowUpRight className="text-white w-6 h-6" />
                        </a>
                    </div>

                    <div className="mt-10">
                        <Badge variant="outline" className="text-xs border-white/20 text-gray-400 mb-3 w-fit">
                            {project.cat}
                        </Badge>
                        <h3 className="text-3xl font-bold text-white font-display uppercase tracking-wider break-words">
                            {project.title}
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="h-px bg-white/10 w-full" />
                        <p className="text-gray-500 text-sm line-clamp-3">
                            {project.description}
                        </p>
                    </div>
                </div>
            }
            overlayCard={
                <div
                    className="relative w-full h-full rounded-xl p-6 flex flex-col justify-between overflow-hidden"
                    style={{ backgroundColor: project.color }}
                >
                    <div className="absolute top-0 right-0 p-4 z-20">
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/20 p-2 rounded-full backdrop-blur-sm block hover:bg-white/30 transition-colors cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ArrowUpRight className="w-5 h-5" style={{ color: project.textColor }} />
                        </a>
                    </div>

                    <div className="mt-10">
                        <Badge className="text-xs mb-3 w-fit bg-white/20 hover:bg-white/30 backdrop-blur-md border-none" style={{ color: project.textColor }}>
                            {project.cat}
                        </Badge>
                        <h3 className="text-3xl font-bold font-display uppercase tracking-wider break-words" style={{ color: project.textColor }}>
                            {project.title}
                        </h3>
                    </div>

                    <div className="space-y-4">
                        <div className="h-px w-full bg-white/30" />
                        <p className="text-lg font-medium" style={{ color: project.textColor }}>
                            {project.description}
                        </p>
                        <div className="pt-2">
                            <button
                                onClick={() => setShowConstruction(true)}
                                className="text-sm font-bold underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity cursor-pointer bg-transparent border-none p-0"
                                style={{ color: project.textColor }}
                            >
                                View Project
                            </button>
                        </div>
                    </div>
                </div>
            }
        />
    );

    return (
        <section id="projects" className="py-24 px-6 relative min-h-screen overflow-hidden">
            <BGPattern variant="dots" mask="fade-y" size={20} fill="#444" className="opacity-20" />

            <div className="max-w-7xl mx-auto mb-10 text-center relative z-10">
                <h1 className="text-6xl font-semibold text-blue-500 uppercase tracking-widest mb-2">
                    Projects
                </h1>
                <p className="text-gray-400 mt-4">Scroll to explore</p>
            </div>

            {/* Desktop View: Rotating Radial Gallery */}
            <div className="hidden lg:block mt-10 relative z-10">
                <RadialScrollGallery
                    className="!min-h-[800px]"
                    baseRadius={350}
                    mobileRadius={200}
                    visiblePercentage={40}
                    scrollDuration={1500}
                >
                    {() => projects.map(project => renderProjectCard(project))}
                </RadialScrollGallery>
            </div>

            {/* Mobile/Tablet View: Carousel */}
            <div className="block lg:hidden mt-12 relative z-10 pb-20">
                <Carousel
                    items={projects.map(project => renderProjectCard(project))}
                    cardsPerView={1}
                />
            </div>

            {/* Construction Overlay */}
            {showConstruction && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-2xl max-w-lg w-full text-center relative shadow-2xl">
                        <button
                            onClick={() => setShowConstruction(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                        </button>

                        <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M14 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" /><path d="M10 20h4" /><path d="M10 16v4" /><path d="M14 16v4" /><path d="M12 12v4" /></svg>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">Under Construction</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            The project case study section is currently being crafted to perfection.
                            Please bear with me—a detailed breakdown is coming shortly!
                        </p>

                        <button
                            onClick={() => setShowConstruction(false)}
                            className="mt-8 px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition-colors"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;
