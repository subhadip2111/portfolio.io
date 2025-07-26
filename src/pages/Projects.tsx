import React, { useState } from 'react';

import { 
  Github, 
  ExternalLink, 
  GitBranch, 
  GitCommit, 
  Star, 
  Clock,
  Filter,
  Search,
  Users,
  Calendar,
  Activity
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock project data with GitHub activity
  const projects = [
    {
      id: 1,
      title: "AI Chat Application",
      description: "A real-time chat application with AI integration using OpenAI's GPT. Features include message history, typing indicators, and smart responses.",
      longDescription: "This project demonstrates my ability to integrate AI services into real-time applications. I built this to explore conversational AI and improve user engagement through intelligent responses.",
      whyBuilt: "I wanted to understand how AI can enhance user interactions and create more engaging chat experiences. This project helped me learn about WebSocket connections, AI API integration, and real-time data handling.",
      tech: ["React", "Node.js", "OpenAI", "Socket.io", "MongoDB"],
      status: "Live",
      category: "development",
      githubUrl: "https://github.com/user/ai-chat",
      liveUrl: "https://ai-chat-demo.com",
      stars: 24,
      forks: 8,
      lastCommit: "2 hours ago",
      commits: 156,
      contributors: 3,
      activity: [
        { type: "commit", message: "Add message encryption", time: "2 hours ago", author: "You" },
        { type: "pr", message: "Feature: Voice messages support", time: "1 day ago", author: "contributor1" },
        { type: "commit", message: "Fix typing indicator bug", time: "2 days ago", author: "You" },
        { type: "issue", message: "Add dark mode support", time: "3 days ago", author: "contributor2" }
      ]
    },
    {
      id: 2,
      title: "Portfolio Dashboard",
      description: "Interactive developer portfolio with real-time GitHub integration, analytics, and AI-powered chat assistant.",
      longDescription: "A comprehensive portfolio solution that showcases not just projects, but also provides real-time insights into development activity and progress.",
      whyBuilt: "Traditional portfolios are static. I wanted to create a dynamic experience that shows my active development process and allows visitors to interact with my work.",
      tech: ["React", "TypeScript", "Tailwind CSS", "GitHub API", "Chart.js"],
      status: "Development",
      category: "development",
      githubUrl: "https://github.com/user/portfolio",
      liveUrl: "https://portfolio-demo.com",
      stars: 12,
      forks: 4,
      lastCommit: "30 minutes ago",
      commits: 89,
      contributors: 1,
      activity: [
        { type: "commit", message: "Add project filters", time: "30 minutes ago", author: "You" },
        { type: "commit", message: "Improve AI assistant UI", time: "3 hours ago", author: "You" },
        { type: "commit", message: "Add dark theme support", time: "5 hours ago", author: "You" }
      ]
    },
    {
      id: 3,
      title: "Data Visualization Tool",
      description: "Analytics dashboard for developers to visualize GitHub activity, code metrics, and productivity insights.",
      longDescription: "A powerful tool that helps developers understand their coding patterns and productivity trends through beautiful visualizations.",
      whyBuilt: "I noticed a lack of comprehensive tools for developers to analyze their own productivity and coding patterns. This tool fills that gap with actionable insights.",
      tech: ["D3.js", "React", "Python", "FastAPI", "PostgreSQL"],
      status: "Planning",
      category: "pipeline",
      githubUrl: "https://github.com/user/data-viz",
      stars: 8,
      forks: 2,
      lastCommit: "1 week ago",
      commits: 23,
      contributors: 2,
      activity: [
        { type: "commit", message: "Initial project setup", time: "1 week ago", author: "You" },
        { type: "commit", message: "Add basic chart components", time: "2 weeks ago", author: "You" }
      ]
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Project Showcase
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore my development journey through detailed project insights, real-time GitHub activity, and collaborative opportunities.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('all')}
          >
            All
          </Button>
          <Button
            variant={activeFilter === 'development' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('development')}
          >
            Development
          </Button>
          <Button
            variant={activeFilter === 'pipeline' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveFilter('pipeline')}
          >
            Pipeline
          </Button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="ai-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Info */}
              <div className="lg:col-span-2 p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-muted-foreground">{project.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-warning" />
                        <span className="text-sm">{project.stars}</span>
                      </div>
                      <Badge
                        variant={project.status === 'Live' ? 'default' : 'secondary'}
                        className={project.status === 'Live' ? 'bg-success/10 text-success' : ''}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="why">Why Built</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {project.longDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="why" className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {project.whyBuilt}
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="activity" className="space-y-3">
                      <div className="space-y-2">
                        {project.activity?.map((activity, index) => (
                          <div key={index} className="flex items-center space-x-3 text-sm p-2 rounded-md bg-muted/50">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <div className="flex-1">
                              <span className="font-medium">{activity.message}</span>
                              <div className="text-muted-foreground text-xs">
                                {activity.time} • {activity.author}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex flex-wrap gap-3 pt-4">
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                    {project.liveUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    <Button className="ai-button" size="sm">
                      <Users className="w-4 h-4 mr-2" />
                      Collaborate
                    </Button>
                  </div>
                </div>
              </div>

              {/* GitHub Dashboard */}
              <div className="p-6 bg-muted/30 border-l border-border/40">
                <h4 className="font-semibold mb-4 flex items-center">
                  <Activity className="w-4 h-4 mr-2" />
                  GitHub Activity
                </h4>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">{project.commits}</div>
                      <div className="text-xs text-muted-foreground">Commits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-accent">{project.contributors}</div>
                      <div className="text-xs text-muted-foreground">Contributors</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <GitCommit className="w-3 h-3" />
                        <span>Last Commit</span>
                      </div>
                      <span className="text-muted-foreground">{project.lastCommit}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <GitBranch className="w-3 h-3" />
                        <span>Forks</span>
                      </div>
                      <span className="text-muted-foreground">{project.forks}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/40">
                    <div className="text-xs text-muted-foreground mb-2">Recent Activity</div>
                    <div className="space-y-1">
                      {project.activity?.slice(0, 3).map((activity, index) => (
                        <div key={index} className="text-xs p-2 rounded bg-background/50">
                          <div className="font-medium truncate">{activity.message}</div>
                          <div className="text-muted-foreground">{activity.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No projects found matching your criteria.</div>
        </div>
      )}
    </div>
  );
};

export default Projects;