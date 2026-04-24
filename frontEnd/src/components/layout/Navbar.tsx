import { useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        if (window.lenis) {
            window.lenis.scrollTo(href);
        } else {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[90%] md:w-fit ${scrolled ? 'top-4' : 'top-6'
                }`}
        >
            <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-2xl flex justify-between items-center md:gap-12">
                <a href="#" className="flex items-center gap-3 text-2xl font-bold font-display tracking-tighter group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-colors">
                        <img
                            src="/profile-icon.png"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span>Bhanu<span className="text-blue-500">.</span></span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-sm font-medium hover:text-blue-400 transition-colors uppercase tracking-wider text-gray-200"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden ml-4">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-[calc(100%+1rem)] left-0 w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col space-y-4 md:hidden shadow-2xl transform origin-top animate-in fade-in slide-in-from-top-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-lg font-medium hover:text-blue-400 transition-colors text-center"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
