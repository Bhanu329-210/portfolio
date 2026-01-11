import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BGPattern } from '@/components/ui/bg-pattern';
import { Code2, Globe, Cpu, Laptop } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const el = containerRef.current;

        gsap.fromTo(
            el.querySelectorAll('.reveal'),
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    const features = [
        {
            icon: <Code2 className="w-6 h-6 text-blue-400" />,
            title: "Modern Tech",
            desc: "React, Next.js, Node.js ecosystem"
        },
        {
            icon: <Laptop className="w-6 h-6 text-purple-400" />,
            title: "Clean Code",
            desc: "Scalable & maintainable architecture"
        },
        {
            icon: <Globe className="w-6 h-6 text-green-400" />,
            title: "Global Reach",
            desc: "Accessible & responsive web apps"
        },
        {
            icon: <Cpu className="w-6 h-6 text-orange-400" />,
            title: "Performance",
            desc: "Optimized for speed & efficiency"
        }
    ];

    return (
        <section id="about" className="py-24 px-6 relative min-h-[80vh] flex items-center overflow-hidden" ref={containerRef}>
            {/* Background Pattern */}
            <BGPattern variant="dots" mask="fade-y" size={20} fill="#444" className="opacity-20" />

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 reveal">
                            <div className="h-px w-8 bg-blue-500"></div>
                            <span className="text-sm font-bold text-blue-500 uppercase tracking-widest">
                                About Me
                            </span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold font-display text-white leading-tight reveal">
                            Crafting digital experiences with <span className="text-blue-500">passion</span>.
                        </h3>
                    </div>

                    <div className="space-y-6 text-gray-400 text-lg leading-relaxed reveal">
                        <p>
                            I'm a Full Stack Developer dedicated to building software that matters. My journey is fueled by a curiosity for how things work and a drive to create seamless, user-centric interfaces.
                        </p>
                        <p>
                            I specialize in the MERN stack and modern web technologies, ensuring every line of code contributes to a robust and scalable application. Whether it's front-end polish or back-end logic, I strive for excellence in every pixel and packet.
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4 reveal">
                        <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full backdrop-blur-sm hover:bg-white/10 transition-colors duration-300">
                            <span className="text-white font-medium">Bhanu Prakash</span>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-full backdrop-blur-sm text-blue-400 font-medium">
                            Full Stack Dev
                        </div>
                    </div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal">
                    {features.map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-black/40 border border-white/10 p-6 rounded-2xl backdrop-blur-md hover:bg-white/5 hover:border-white/20 transition-all duration-300 group"
                        >
                            <div className="bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
                            <p className="text-sm text-gray-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
