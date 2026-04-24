import React from 'react';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { MinimalistHero } from '../ui/minimalist-hero';

const Hero = () => {
    const navLinks = [
        { label: 'HOME', href: '#home' },
        { label: 'ABOUT', href: '#about' },
        { label: 'SKILLS', href: '#skills' },
        { label: 'PROJECTS', href: '#projects' },
        { label: 'CONTACT', href: '#contact' },
    ];

    const socialLinks = [
        { icon: FaGithub, href: 'https://github.com/BhanuPrakashAlahari' },
        { icon: FaLinkedin, href: 'https://www.linkedin.com/in/alahari-bhanu-prakash-43aa4b2b9' },
        { icon: SiLeetcode, href: 'https://leetcode.com/u/Bhanuprakashalahari/' },
        { icon: FaWhatsapp, href: 'https://wa.me/918500292426' },
    ];

    return (
        <section id="home">
            <MinimalistHero
                logoText="Bhanu."
                navLinks={navLinks}
                mainText="Full Stack Developer crafting digital experiences. Passionate about building scalable applications and intuitive user interfaces."
                readMoreLink="#about"
                imageSrc="https://res.cloudinary.com/diipfzmyj/image/upload/v1777009789/hero-optimized-removebg-preview_dvosti.png"
                imageAlt="Bhanu Prakash Alahari"
                overlayText={{
                    part1: 'learn ship',
                    part2: 'repeat.',
                }}
                socialLinks={socialLinks}
                locationText="India"
            />
        </section>
    );
};

export default Hero;
