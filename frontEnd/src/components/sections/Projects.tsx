import { useState } from "react";
import { FocusRail, FocusRailItem } from "../ui/focus-rail";
import { BGPattern } from "../ui/bg-pattern";
import { ProjectDetails } from "../ui/project-details";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiRecoil, SiPostgresql, SiPrisma, SiExpress, SiRedis, SiVite, SiFramer, SiMongodb } from "react-icons/si";

import synapstoreImg from "@/assets/projects/synapstore.png";

const synapStoreTags = [
    "React 18", "TypeScript", "TailwindCSS", "Node.js", "Express", "PostgreSQL", "Prisma", "Redis", "Recoil"
];

const synapStoreIcons = [
    <FaReact key="react" className="text-blue-400" />,
    <SiVite key="vite" className="text-purple-500" />,
    <SiTypescript key="ts" className="text-blue-600" />,
    <SiTailwindcss key="tailwind" className="text-cyan-400" />,
    <SiRecoil key="recoil" className="text-blue-500" />,
    <FaNodeJs key="node" className="text-green-500" />,
    <SiExpress key="express" className="text-white" />,
    <SiPostgresql key="pg" className="text-blue-400" />,
    <SiPrisma key="prisma" className="text-white" />,
    <SiRedis key="redis" className="text-red-500" />
];

const movieMukkaluTags = [
    "React 19", "Vite", "Framer Motion", "Tailwind CSS", "Node.js", "Express", "MongoDB", "Mongoose", "Razorpay"
];

const movieMukkaluIcons = [
    <FaReact key="react" className="text-blue-400" />,
    <SiVite key="vite" className="text-purple-500" />,
    <SiFramer key="framer" className="text-pink-500" />,
    <SiTailwindcss key="tailwind" className="text-cyan-400" />,
    <FaNodeJs key="node" className="text-green-500" />,
    <SiExpress key="express" className="text-white" />,
    <SiMongodb key="mongodb" className="text-green-600" />,
];

const unizTags = [
    "React", "TypeScript", "Tailwind CSS", "Vite"
];

const unizIcons = [
    <FaReact key="react" className="text-blue-400" />,
    <SiVite key="vite" className="text-purple-500" />,
    <SiTypescript key="ts" className="text-blue-600" />,
    <SiTailwindcss key="tailwind" className="text-cyan-400" />
];

const projects: FocusRailItem[] = [
    {
        id: 1,
        title: "SynapStore",
        description: "An smart pharmacy system with AI features",
        longDescription: "SynapStore is a revolutionary AI-powered pharmacy management system designed to streamline specific pharmaceutical workflows. It features predictive inventory analysis.",
        meta: "AI Pharmacy",
        tags: synapStoreTags,
        techIcons: synapStoreIcons,
        imageSrc: synapstoreImg,
        href: "https://www.synapstore.me",
    },
    {
        id: 2,
        title: "Movie Mukkalu",
        description: "A premium movie ticket booking application",
        longDescription: "Movie Mukkalu is a premium movie ticket booking application designed for high-concurrency environments. It features a real-time seat reservation system, atomic database locking, and seamless payment integration.",
        meta: "Ticket Booking",
        tags: movieMukkaluTags,
        techIcons: movieMukkaluIcons,
        imageSrc: "https://res.cloudinary.com/diipfzmyj/image/upload/v1779179928/Screenshot_2026-05-19_at_14.08.40_a44zdr.png",
        href: "https://www.moviemokkalu.app",
    },
    {
        id: 3,
        title: "UniZ",
        description: "A university intelligence engine frontend portal",
        longDescription: "UniZ is a comprehensive university intelligence engine and administration portal. As a frontend developer, I built the Student and Admin/Faculty portals focusing on a responsive, high-performance UI to seamlessly interact with complex academic workflows and backend microservices.",
        meta: "Education Portal",
        tags: unizTags,
        techIcons: unizIcons,
        imageSrc: "https://res.cloudinary.com/diipfzmyj/image/upload/v1779180449/Screenshot_2026-05-19_at_14.17.21_ku9o3w.png",
        href: "https://uniz.rguktong.in",
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<FocusRailItem | null>(null);

    return (
        <section id="projects" className="min-h-screen w-full flex flex-col items-center justify-center py-20 relative overflow-hidden">
            <BGPattern variant="dots" mask="fade-y" size={20} fill="#444" className="opacity-20" />

            {/* Title */}
            <div className="mb-6 md:mb-12 text-center z-10 flex flex-col items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-yellow-400"></div>
                    <span className="text-sm font-bold text-yellow-400 uppercase tracking-widest">
                        Selected Works
                    </span>
                    <div className="h-px w-8 bg-yellow-400"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display text-white leading-tight">
                    Explore My <span className="text-yellow-400">Projects</span>
                </h1>
                <p className="text-neutral-400 max-w-lg">
                    Navigate the rail to view details of my recent work. Click on any project to see more information.
                </p>
            </div>

            {/* The Component */}
            <FocusRail
                items={projects}
                className="bg-transparent"
                autoPlay={false}
                loop={true}
                onProjectClick={(item) => setSelectedProject(item)}
            />

            {/* Project Details Modal */}
            <ProjectDetails
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default Projects;
