import React, { useEffect, useState } from 'react';
import {
    Github, ExternalLink, Calendar, Code, Users, Settings,
    Database, Globe, GitBranch, FileText, Star, Zap, 
    Activity, TrendingUp
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

type Link = {
    _id: string;
    type: 'github' | 'design' | 'live' | string;
    url: string;
};

type Repo = {
    _id: string;
    type: string;
    repoName: string;
    url: string;
};

type Project = {
    name: string;
    description: string;
    status: 'development' | 'completed' | 'planning' | string;
    techStack: string[];
    features: string[];
    reasonBehindTheProject: string;
    links: Link[];
    repos: Repo[];
};

// Enhanced Card Component with 3D animations
const AnimatedCard: React.FC<{ 
    className?: string; 
    children: React.ReactNode; 
    delay?: number;
    variant?: 'default' | 'elevated' | 'glow';
}> = ({ className = '', children, delay = 0, variant = 'default' }) => {
    const variants = {
        default: 'bg-slate-900/90 border-slate-700/50 shadow-2xl shadow-slate-900/50',
        elevated: 'bg-slate-800/90 border-slate-600/50 shadow-2xl shadow-purple-900/20',
        glow: 'bg-slate-900/95 border-violet-500/30 shadow-2xl shadow-violet-900/40'
    };

    return (
        <div 
            className={`
                rounded-2xl border backdrop-blur-xl transition-all duration-700 ease-out
                hover:scale-[1.02] hover:shadow-3xl hover:border-violet-400/50
                hover:-translate-y-2 hover:rotate-x-2 hover:rotate-y-1
                transform-gpu perspective-1000 animate-fade-in
                ${variants[variant]} ${className}
            `}
            style={{ 
                animationDelay: `${delay}ms`,
                transformStyle: 'preserve-3d'
            }}
        >
            <div className="relative overflow-hidden rounded-2xl">
                {children}
            </div>
        </div>
    );
};

// Enhanced Badge Component with 3D effects
const StatusBadge: React.FC<{ 
    status: string; 
    className?: string;
    animated?: boolean;
}> = ({ status, className = '', animated = true }) => {
    const getStatusConfig = (status: string) => {
        switch (status) {
            case 'development':
                return {
                    colors: 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-400/50 shadow-orange-500/30',
                    icon: <Activity className="w-3 h-3" />,
                    animation: animated ? 'animate-pulse' : ''
                };
            case 'completed':
                return {
                    colors: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white border-emerald-400/50 shadow-emerald-500/30',
                    icon: <Star className="w-3 h-3" />,
                    animation: ''
                };
            case 'planning':
                return {
                    colors: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-blue-400/50 shadow-blue-500/30',
                    icon: <TrendingUp className="w-3 h-3" />,
                    animation: ''
                };
            default:
                return {
                    colors: 'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-200 border-slate-500/50 shadow-slate-600/30',
                    icon: <Zap className="w-3 h-3" />,
                    animation: ''
                };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span className={`
            inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium 
            border transition-all duration-300 hover:scale-110 hover:-translate-y-1
            shadow-lg transform-gpu ${config.colors} ${config.animation} ${className}
        `}>
            {config.icon}
            <span className="capitalize font-semibold">{status}</span>
        </span>
    );
};

// Enhanced Tech Badge with 3D hover effects
const TechBadge: React.FC<{ tech: string; index: number }> = ({ tech, index }) => {
    const getTechConfig = (tech: string) => {
        const techLower = tech.toLowerCase();
        if (techLower.includes('react')) return { 
            bg: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600', 
            icon: <Code className="w-3 h-3" />,
            shadow: 'shadow-blue-500/40'
        };
        if (techLower.includes('node')) return { 
            bg: 'bg-gradient-to-br from-green-400 via-green-500 to-green-600', 
            icon: <Code className="w-3 h-3" />,
            shadow: 'shadow-green-500/40'
        };
        if (techLower.includes('mongo') || techLower.includes('postgres')) return { 
            bg: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600', 
            icon: <Database className="w-3 h-3" />,
            shadow: 'shadow-purple-500/40'
        };
        if (techLower.includes('docker')) return { 
            bg: 'bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600', 
            icon: <Settings className="w-3 h-3" />,
            shadow: 'shadow-indigo-500/40'
        };
        return { 
            bg: 'bg-gradient-to-br from-violet-400 via-violet-500 to-violet-600', 
            icon: <Code className="w-3 h-3" />,
            shadow: 'shadow-violet-500/40'
        };
    };

    const config = getTechConfig(tech);

    return (
        <div
            className={`
                flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-semibold
                border border-white/20 backdrop-blur-sm transition-all duration-300
                hover:scale-110 hover:shadow-xl hover:border-white/40 hover:-translate-y-2
                hover:rotate-x-6 hover:rotate-y-3 cursor-default transform-gpu
                shadow-lg animate-fade-in ${config.bg} ${config.shadow}
            `}
            style={{ 
                animationDelay: `${index * 100}ms`,
                transformStyle: 'preserve-3d'
            }}
        >
            {config.icon}
            <span>{tech}</span>
        </div>
    );
};

// Loading Component with 3D spinner
const Loader: React.FC = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin shadow-2xl shadow-violet-500/50"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-l-purple-500 rounded-full animate-spin-reverse"></div>
            </div>
            <p className="text-slate-300 animate-pulse text-lg font-medium">Loading project details...</p>
        </div>
    </div>
);

// Helper Functions
const getLinkIcon = (type: string) => {
    switch (type) {
        case 'github': return <Github className="w-4 h-4" />;
        case 'design': return <FileText className="w-4 h-4" />;
        case 'live': return <Globe className="w-4 h-4" />;
        default: return <ExternalLink className="w-4 h-4" />;
    }
};

const ProjectDetails: React.FC = () => {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);

    const getProjectDetailsById = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV_URL}/project/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setProject(response.data?.data);
        } catch (error) {
            console.error('Error fetching project details:', error);
        }
    };

    useEffect(() => {
        getProjectDetailsById();
    }, [id]);

    if (!project) {
        return <Loader />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6 relative overflow-hidden">
            {/* Animated 3D Background Elements */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-500 to-purple-600 opacity-20 rounded-full blur-3xl animate-float shadow-2xl shadow-violet-500/30"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-500 to-blue-600 opacity-20 rounded-full blur-3xl animate-float shadow-2xl shadow-cyan-500/30" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-600 opacity-10 rounded-full blur-3xl animate-float shadow-2xl shadow-emerald-500/20" style={{ animationDelay: '2s' }}></div>

            <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                {/* Header Section */}
                <AnimatedCard variant="glow" className="relative overflow-hidden" delay={100}>
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-indigo-600/10"></div>
                    <div className="relative z-10 p-8">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <h1 className="text-5xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in drop-shadow-2xl">
                                        {project.name}
                                    </h1>
                                    <StatusBadge status={project.status} animated />
                                </div>
                                <p className="text-slate-300 text-xl leading-relaxed animate-fade-in font-medium" style={{ animationDelay: '200ms' }}>
                                    {project.description}
                                </p>
                            </div>

                            {/* Quick Action Links */}
                            <div className="flex flex-wrap gap-4">
                                {project.links?.map((link, index) => (
                                    <a
                                        key={link._id}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            flex items-center gap-3 px-6 py-3 bg-slate-800/80 border border-slate-600/50
                                            rounded-xl text-slate-300 hover:text-white hover:border-violet-400/50 
                                            hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 
                                            hover:shadow-xl hover:-translate-y-2 transform-gpu shadow-lg
                                            backdrop-blur-sm font-medium animate-fade-in
                                        "
                                        style={{ 
                                            animationDelay: `${300 + index * 100}ms`,
                                            transformStyle: 'preserve-3d'
                                        }}
                                    >
                                        {getLinkIcon(link.type)}
                                        <span className="capitalize">{link.type}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedCard>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Project Vision */}
                        <AnimatedCard variant="elevated" delay={300}>
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-cyan-600/10"></div>
                                <div className="relative z-10 p-8">
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg shadow-emerald-500/30 transform hover:rotate-12 transition-transform duration-300">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        Project Vision
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed text-lg font-medium">
                                        {project.reasonBehindTheProject}
                                    </p>
                                </div>
                            </div>
                        </AnimatedCard>

                        {/* Key Features */}
                        <AnimatedCard variant="elevated" delay={400}>
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 via-emerald-600/5 to-teal-600/10"></div>
                                <div className="relative z-10 p-8">
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg shadow-green-500/30 transform hover:rotate-12 transition-transform duration-300">
                                            <Settings className="w-6 h-6 text-white" />
                                        </div>
                                        Key Features
                                    </h2>
                                    <div className="grid gap-4">
                                        {project.features?.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="
                                                    flex items-start gap-4 p-6 rounded-xl bg-slate-800/50 
                                                    border border-slate-600/30 hover:border-violet-400/50 
                                                    transition-all duration-300 hover:bg-slate-700/50 
                                                    hover:scale-[1.02] hover:-translate-y-1 shadow-lg
                                                    hover:shadow-xl transform-gpu animate-fade-in
                                                "
                                                style={{ 
                                                    animationDelay: `${500 + index * 100}ms`,
                                                    transformStyle: 'preserve-3d'
                                                }}
                                            >
                                                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-3 flex-shrink-0 shadow-lg shadow-green-500/40"></div>
                                                <span className="text-slate-300 leading-relaxed font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>

                        {/* Repositories */}
                        {project.repos?.length > 0 && (
                            <AnimatedCard variant="elevated" delay={500}>
                                <div className="relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-red-600/5 to-pink-600/10"></div>
                                    <div className="relative z-10 p-8">
                                        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                            <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg shadow-orange-500/30 transform hover:rotate-12 transition-transform duration-300">
                                                <GitBranch className="w-6 h-6 text-white" />
                                            </div>
                                            Repositories
                                        </h2>
                                        <div className="space-y-4">
                                            {project.repos.map((repo, index) => (
                                                <a
                                                    key={repo._id}
                                                    href={repo.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="
                                                        flex items-center justify-between p-6 rounded-xl 
                                                        bg-slate-800/50 border border-slate-600/30 
                                                        hover:border-violet-400/50 hover:bg-slate-700/50
                                                        transition-all duration-300 hover:scale-[1.02] 
                                                        hover:shadow-xl hover:-translate-y-2 group 
                                                        shadow-lg transform-gpu animate-fade-in
                                                    "
                                                    style={{ 
                                                        animationDelay: `${600 + index * 100}ms`,
                                                        transformStyle: 'preserve-3d'
                                                    }}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <Github className="w-6 h-6 text-slate-400 group-hover:text-violet-400 transition-colors duration-300" />
                                                        <div>
                                                            <h3 className="font-bold text-white group-hover:text-violet-400 transition-colors duration-300 text-lg">
                                                                {repo.repoName}
                                                            </h3>
                                                            <p className="text-sm text-slate-400 capitalize font-medium">{repo.type}</p>
                                                        </div>
                                                    </div>
                                                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-violet-400 transition-colors duration-300" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </AnimatedCard>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Tech Stack */}
                        <AnimatedCard variant="elevated" delay={200}>
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-600/5 to-violet-600/10"></div>
                                <div className="relative z-10 p-8">
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/30 transform hover:rotate-12 transition-transform duration-300">
                                            <Code className="w-6 h-6 text-white" />
                                        </div>
                                        Tech Stack
                                    </h2>
                                    <div className="flex flex-wrap gap-3">
                                        {project.techStack?.map((tech, index) => (
                                            <TechBadge key={index} tech={tech} index={index} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>

                        {/* Project Statistics */}
                        <AnimatedCard variant="elevated" delay={600}>
                            <div className="relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-cyan-600/5 to-teal-600/10"></div>
                                <div className="relative z-10 p-8">
                                    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg shadow-blue-500/30 transform hover:rotate-12 transition-transform duration-300">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                        Project Stats
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Status', value: project.status, component: <StatusBadge status={project.status} animated={false} /> },
                                            { label: 'Technologies', value: project.techStack?.length || 0 },
                                            { label: 'Features', value: project.features?.length || 0 },
                                            { label: 'Repositories', value: project.repos?.length || 0 }
                                        ].map((stat, index) => (
                                            <div
                                                key={stat.label}
                                                className="
                                                    flex justify-between items-center p-6 rounded-xl 
                                                    bg-slate-800/50 border border-slate-600/30
                                                    hover:border-violet-400/50 hover:bg-slate-700/50
                                                    hover:scale-[1.02] hover:-translate-y-1
                                                    transition-all duration-300 shadow-lg
                                                    transform-gpu animate-fade-in
                                                "
                                                style={{ 
                                                    animationDelay: `${700 + index * 100}ms`,
                                                    transformStyle: 'preserve-3d'
                                                }}
                                            >
                                                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">{stat.label}</span>
                                                {stat.component || (
                                                    <span className="text-violet-400 font-bold text-xl bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                                        {stat.value}
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;