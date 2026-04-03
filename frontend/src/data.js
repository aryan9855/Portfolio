import curaConnectImg from './assets/cura-connect.jpg';
import credNovaImg from './assets/cred-nova.png';
import scaleForgeImg from './assets/scale-forge.jpg';
import portfolioImg from './assets/portfolio-project.png';

export const projects = [
    {
        title: 'CuraConnect',
        tag: 'Full-Stack Healthcare Platform',
        image: curaConnectImg,
        live: 'https://cura-connect-main.vercel.app/',
        github: 'https://github.com/aryan9855/CuraConnect'
    },
    {
        title: 'ScaleForge',
        tag: 'GenAI System Design Simulator',
        image: scaleForgeImg,
        live: 'https://scale-forge-omega.vercel.app/',
        github: 'https://github.com/aryan9855/ScaleForge'
    },
    {
        title: 'CredNova',
        tag: 'AI Credit Scoring System',
        image: credNovaImg,
        live: '',
        github: ''
    },
    {
        title: 'Portfolio Website',
        tag: 'Personal Branding',
        image: portfolioImg,
        live: '',
        github: 'https://github.com/aryan9855/myPortfolio'
    }
];

export const experience = [
    {
        year: '2023-Now',
        role: 'B.Tech ECE Student',
        company: 'IIIT Kota',
        description: 'Focused on full-stack development, DSA, and system design while building real-world scalable applications.',
        type: 'education'
    },
    {
        year: '2025-Now',
        role: 'Full-Stack Developer (MERN)',
        company: 'Personal Projects',
        description: 'Built production-grade applications like CuraConnect, ScaleForge, and CredNova with REST APIs, JWT auth, and third-party integrations.',
        type: 'work'
    },
    {
        year: '2026',
        role: 'Hackathon Winner',
        company: 'HackSprint',
        description: 'Secured 1st place for building an Explainable AI-based credit scoring system (CredNova).',
        type: 'achievement'
    }
];

export const skills = [
    { name: 'MERN Stack Development', percentage: 92 },
    { name: 'Data Structures & Algorithms', percentage: 90 },
    { name: 'Operating System', percentage: 85 },
    { name: 'Backend Development (Node.js, APIs)', percentage: 88 },
    { name: 'Frontend (React, Tailwind)', percentage: 87 },
    { name: 'Databases (MongoDB, SQL)', percentage: 84 }
];
