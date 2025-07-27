import React, { useEffect, useState } from 'react';
import {
  Github,
  ExternalLink,
  GitBranch,
  GitCommit,
  Star,
  Filter,
  Search,
  Users,
  Activity,
  Clock,
  Zap,
  Loader2
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import axios from 'axios';

const Projects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState<any>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [githubStats, setGithubStats] = useState<any>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const getProjectData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV_URL}/project/all?status=${activeFilter}&keyword=${searchTerm}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
      console.log('api response', response?.data?.data)
      setProjects(response?.data?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getTechColor = (tech: string) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes("react")) return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    if (techLower.includes("node")) return "bg-green-500/10 text-green-400 border-green-500/30";
    if (techLower.includes("mongo")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (techLower.includes("socket")) return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    if (techLower.includes("nest")) return "bg-red-500/10 text-red-400 border-red-500/30";
    return "bg-purple-500/10 text-purple-400 border-purple-500/30";
  };

  const getFeatureColor = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes("real-time") || featureLower.includes("live")) return "bg-primary/10 text-primary border-primary/30";
    if (featureLower.includes("ai") || featureLower.includes("ml")) return "bg-accent/10 text-accent border-accent/30";
    if (featureLower.includes("auth") || featureLower.includes("security")) return "bg-warning/10 text-warning border-warning/30";
    return "bg-success/10 text-success border-success/30";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-success/20 text-success border-success/40';
      case 'development': return 'bg-primary/20 text-primary border-primary/40';
      case 'ongoing': return 'bg-warning/20 text-warning border-warning/40';
      case 'pipeline': return 'bg-accent/20 text-accent border-accent/40';
      default: return 'bg-muted/20 text-muted-foreground border-muted/40';
    }
  };

  const handleProjectClick = async (project: any, e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('[role="tab"]') || target.closest('[role="tablist"]')) {
      return;
    }
    if (selectedProjectId === project.id) {
      setSelectedProjectId(null);
      setGithubStats(null);
      return;
    }

    setSelectedProjectId(project.id);
    setIsLoadingStats(true);
    setGithubStats(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV_URL}/githubstats/repo-data?owner=${import.meta.env.VITE_USER}&repo=${project?.repos?.[0]?.repoName}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log("github stats", response.data)
      setGithubStats(response?.data)
    } catch (error) {
      console.log(error)
      setGithubStats(null)
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleActivityButtonClick = async (project: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedProjectId === project.id) {
      setSelectedProjectId(null);
      setGithubStats(null);
      return;
    }

    setSelectedProjectId(project.id);
    setIsLoadingStats(true);
    setGithubStats(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV_URL}/githubstats/repo-data?owner=${import.meta.env.VITE_USER}&repo=${project?.repos?.[0]?.repoName}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      console.log("github stats", response.data)
      setGithubStats(response?.data)
    } catch (error) {
      console.log(error)
      setGithubStats(null)
    } finally {
      setIsLoadingStats(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
      
      if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    } catch {
      return 'Unknown time';
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      getProjectData();
    }, 500);
    return () => clearTimeout(handler);
  }, [activeFilter, searchTerm]);

  if (!projects) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="text-muted-foreground">Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary via-accent to-success bg-clip-text text-transparent">
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
              className="pl-10 bg-card border-border/40"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {['all', 'development', 'pipeline', 'live', 'ongoing'].map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="capitalize"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects?.map((project: any) => (
            <Card 
              key={project.id} 
              className={`overflow-hidden bg-gradient-to-br from-card/95 to-card/80 border-border/40 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-sm cursor-pointer ${
                selectedProjectId === project.id ? 'border-primary/60 shadow-[0_8px_30px_rgb(0,0,0,0.15)]' : ''
              }`}
              onClick={(e) => handleProjectClick(project, e)}
            >
              <div className={`grid gap-6 transition-all duration-300 ${
                selectedProjectId === project.id && (githubStats || isLoadingStats) 
                  ? 'grid-cols-1 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                <div className={`${
                  selectedProjectId === project.id && (githubStats || isLoadingStats) 
                    ? 'lg:col-span-2' 
                    : ''
                } p-6`}>
                  <div className="space-y-4">
                    {/* Project Header */}
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h3 className="text-2xl font-bold text-foreground">{project.name}</h3>
                        <p className="text-base text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4 flex-shrink-0 ml-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-warning fill-warning" />
                          <span className="text-sm font-medium">{project?.stars || 0}</span>
                        </div>
                        <Badge className={`${getStatusColor(project.status)} font-medium`}>
                          {project?.status}
                        </Badge>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                          onClick={(e) => handleActivityButtonClick(project, e)}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          {selectedProjectId === project.id ? 'Hide Activity' : 'View Activity'}
                        </Button>
                      </div>
                    </div>

                    {/* Project Tabs */}
                    <div onClick={(e) => e.stopPropagation()}>
                      <Tabs defaultValue="overview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
                          <TabsTrigger value="overview" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                            Overview
                          </TabsTrigger>
                          <TabsTrigger value="why" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                            Why Built
                          </TabsTrigger>
                          <TabsTrigger value="activity" className="data-[state=active]:bg-background data-[state=active]:text-foreground">
                            Activity
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-4 mt-4">
                          {/* Key Features */}
                          {project?.features && project.features.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
                                <Zap className="w-4 h-4 mr-2 text-primary" />
                                Key Features
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {project.features.map((feature: string, index: number) => (
                                  <span
                                    key={index}
                                    className={`text-xs font-medium px-3 py-1.5 rounded-full border ${getFeatureColor(feature)} transition-all duration-200`}
                                  >
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Tech Stack */}
                          {project?.techStack && project.techStack.length > 0 && (
                            <div>
                              <h4 className="text-sm font-semibold text-foreground mb-3">Tech Stack</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.techStack.map((tech: string, index: number) => (
                                  <span
                                    key={index}
                                    className={`text-xs font-medium px-2.5 py-1 rounded-full border ${getTechColor(tech)}`}
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </TabsContent>

                        <TabsContent value="why" className="space-y-4 mt-4">
                          <div className="min-h-[100px]">
                            <p className="text-base text-foreground leading-relaxed">
                              {project?.reasonBehindTheProject || 'No information available about why this project was built.'}
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="activity" className="space-y-3 mt-4">
                          <div className="min-h-[100px]">
                            {project.activity && project.activity.length > 0 ? (
                              <div className="space-y-2">
                                {project.activity.map((activity: any, index: number) => (
                                  <div key={index} className="flex items-center space-x-3 text-sm p-3 rounded-lg bg-muted/30 border border-border/20">
                                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                    <div className="flex-1">
                                      <span className="font-medium text-foreground">{activity.message}</span>
                                      <div className="text-muted-foreground text-xs">
                                        {activity.time} • {activity.author}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                No recent activity available
                              </div>
                            )}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4" onClick={(e) => e.stopPropagation()}>
                      <Button variant="outline" size="sm" asChild>
                        <a 
                          href={project.links?.[0]?.url || '#'} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Collaborate
                      </Button>
                    </div>
                  </div>
                </div>

                {/* GitHub Dashboard - Only show for selected project */}
                {selectedProjectId === project.id && (
                  <div className="p-6 bg-gradient-to-br from-muted/20 to-muted/10 border-l border-border/40">
                    <h4 className="font-semibold mb-4 flex items-center text-foreground">
                      <Activity className="w-4 h-4 mr-2 text-primary" />
                      GitHub Activity {githubStats?.name && `- ${githubStats.name}`}
                    </h4>

                    {isLoadingStats ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-primary" />
                        <span className="ml-2 text-sm text-muted-foreground">Loading GitHub data...</span>
                      </div>
                    ) : githubStats ? (
                      <div className="space-y-4">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 rounded-lg bg-background/50">
                            <div className="text-lg font-bold text-primary">{githubStats?.commits_count || 0}</div>
                            <div className="text-xs text-muted-foreground">Commits</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-background/50">
                            <div className="text-lg font-bold text-accent">{githubStats?.contributors?.length || 0}</div>
                            <div className="text-xs text-muted-foreground">Contributors</div>
                          </div>
                        </div>

                        {/* Repository Info */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 rounded-lg bg-background/50">
                            <div className="text-lg font-bold text-yellow-400">{githubStats?.stars || 0}</div>
                            <div className="text-xs text-muted-foreground">Stars</div>
                          </div>
                          <div className="text-center p-3 rounded-lg bg-background/50">
                            <div className="text-lg font-bold text-green-400">{githubStats?.forks || 0}</div>
                            <div className="text-xs text-muted-foreground">Forks</div>
                          </div>
                        </div>

                        {/* Additional Stats */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <GitCommit className="w-3 h-3 text-muted-foreground" />
                              <span className="text-foreground">Pull Requests</span>
                            </div>
                            <span className="text-muted-foreground">{githubStats?.pullRequestsCount || 0}</span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <GitBranch className="w-3 h-3 text-muted-foreground" />
                              <span className="text-foreground">Open Issues</span>
                            </div>
                            <span className="text-muted-foreground">{githubStats?.open_issues || 0}</span>
                          </div>
                        </div>

                        {/* Languages */}
                        {githubStats?.languages && Object.keys(githubStats.languages).length > 0 && (
                          <div className="pt-2 border-t border-border/40">
                            <div className="text-xs text-muted-foreground mb-2">Languages</div>
                            <div className="flex flex-wrap gap-1">
                              {Object.entries(githubStats.languages).map(([language, bytes]) => (
                                <span
                                  key={language}
                                  className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                                >
                                  {language}: {typeof bytes === 'number' ? `${Math.round(bytes / 1024)}KB` : bytes}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Contributors */}
                        {githubStats?.contributors && githubStats.contributors.length > 0 && (
                          <div className="pt-2 border-t border-border/40">
                            <div className="text-xs text-muted-foreground mb-2">Contributors ({githubStats.contributors.length})</div>
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {githubStats.contributors.map((contributor: any, index: number) => (
                                <div key={index} className="flex items-center justify-between text-xs p-2 rounded bg-background/30 border border-border/20">
                                  <div className="font-medium text-foreground">{contributor.login}</div>
                                  <div className="text-muted-foreground">{contributor.contributions} contributions</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Recent Commits */}
                        {githubStats?.commitMessages && Array.isArray(githubStats.commitMessages) && githubStats.commitMessages.length > 0 && (
                          <div className="pt-2 border-t border-border/40">
                            <div className="text-xs text-muted-foreground mb-2">Recent Commits</div>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                              {githubStats.commitMessages.slice(0, 5).map((commit: any, index: number) => (
                                <div key={index} className="text-xs p-2 rounded bg-background/30 border border-border/20">
                                  <div className="font-medium truncate text-foreground">
                                    {commit.message || 'No commit message'}
                                  </div>
                                  <div className="text-muted-foreground mt-1 flex items-center justify-between">
                                    <span>{commit.author || 'Unknown'}</span>
                                    <span>{commit.date ? formatTimeAgo(commit.date) : 'Unknown date'}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-muted-foreground text-sm">Failed to load GitHub data</div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => handleActivityButtonClick(project, { stopPropagation: () => {} } as React.MouseEvent)}
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {projects?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">No projects found matching your criteria.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;