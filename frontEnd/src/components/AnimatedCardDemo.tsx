'use client';

import * as React from 'react';
import {
    AnimatedProfileCard,
    ProfileCardContent,
    SocialLink,
} from './ui/animated-profile-card';

import { Github, Twitter } from 'lucide-react';

// --- Helper Data & Icons ---
// Removed custom SVG icons as per instruction

const cardData = {
    avatarSrc:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww',
    avatarFallback: 'SK',
    name: 'Satish Kumar',
    location: 'Bengaluru, India',
    bio: 'Design Engineer, Building UI components for developers. Building MVPs for clients. Building some more for myself.',
    socials: [
        {
            id: 'github',
            url: 'https://github.com/satishkumarsajjan',
            label: 'GitHub',
            icon: <Github className='h-5 w-5' />,
        },
        {
            id: 'twitter',
            label: 'X (Twitter)',
            url: 'https://x.com/iamsatish4564',
            icon: <Twitter className='h-4 w-4' />,
        },
    ] as SocialLink[],
};

export default function AnimatedProfileCardLightDemo() {
    return (
        <div className='flex min-h-[500px] w-full items-center justify-center bg-background p-4'>
            <AnimatedProfileCard
                accentColor='#e0f2fe'
                onAccentForegroundColor='#0f172a'
                onAccentMutedForegroundColor='#475569'
                baseCard={
                    <ProfileCardContent
                        {...cardData}
                        variant='default'
                        showAvatar={false}
                    />
                }
                overlayCard={
                    <ProfileCardContent
                        {...cardData}
                        variant='on-accent'
                        showAvatar={true}
                        cardStyle={{ backgroundColor: 'var(--accent-color)' }}
                    />
                }
            />
        </div>
    );
}
