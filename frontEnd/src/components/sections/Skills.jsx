import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BGPattern } from '@/components/ui/bg-pattern';
import {
    FaReact, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaHtml5, FaCss3Alt, FaJs
} from 'react-icons/fa';
import {
    SiNextdotjs, SiTailwindcss, SiTypescript, SiExpress, SiPostgresql, SiMongodb, SiGraphql,
    SiBootstrap, SiMysql, SiC, SiCplusplus
} from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const skills = [
    { name: 'React', icon: <FaReact className="text-cyan-400" /> },
    { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
    { name: 'TypeScript', icon: <SiTypescript className="text-blue-500" /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" /> },
    { name: 'HTML5', icon: <FaHtml5 className="text-orange-500" /> },
    { name: 'CSS3', icon: <FaCss3Alt className="text-blue-600" /> },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-400" /> },
    { name: 'Bootstrap', icon: <SiBootstrap className="text-purple-600" /> },
    { name: 'C', icon: <SiC className="text-blue-500" /> },
    { name: 'C++', icon: <SiCplusplus className="text-blue-600" /> },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" /> },
    { name: 'Express', icon: <SiExpress className="text-white" /> },
    { name: 'Python', icon: <FaPython className="text-blue-400" /> },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-blue-400" /> },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-500" /> },
    { name: 'GraphQL', icon: <SiGraphql className="text-pink-500" /> },
    { name: 'MySQL', icon: <SiMysql className="text-blue-500" /> },
    { name: 'Git', icon: <FaGitAlt className="text-orange-600" /> },
    { name: 'Docker', icon: <FaDocker className="text-blue-500" /> },
    { name: 'AWS', icon: <FaAws className="text-orange-500" /> },
];

const Skills = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;

        gsap.fromTo(
            el.querySelectorAll('.skill-icon-card'),
            { y: 30, opacity: 0, scale: 0.8 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.05,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    return (
        <section id="skills" className="py-24 px-6 relative min-h-[80vh] flex items-center overflow-hidden" ref={containerRef}>
            <BGPattern variant="dots" mask="fade-y" size={20} fill="#444" className="opacity-20" />

            <div className="max-w-6xl mx-auto relative z-10 w-full">
                <div className="text-center mb-16 space-y-4">
                    <div className="flex items-center justify-center gap-2 reveal">
                        <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">
                            My Toolbox
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-white tracking-tight reveal">
                        Skills & Technologies
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg reveal">
                        A curated collection of technologies I use to build robust, scalable, and beautiful digital products.
                    </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6 justify-items-center">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="skill-icon-card group relative w-24 h-24 flex flex-col items-center justify-center gap-3 rounded-2xl bg-black/40 border border-white/10 hover:border-blue-500/50 hover:bg-white/5 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                        >
                            <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300 filter group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                {skill.icon}
                            </div>

                            <span className="text-[10px] uppercase font-bold text-gray-500 group-hover:text-white transition-colors duration-300">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
