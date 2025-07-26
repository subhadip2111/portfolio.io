import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { 
  Brain, 
  Code2, 
  Trophy, 
  TrendingUp, 
  GitBranch, 
  Star, 
  Calendar,
  Target,
  Zap,
  MessageCircle
} from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/button';
import AIAssistant from '../components/AIAssistant';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
// import AIAssistant from '@/components/AIAssistant';

const Home: React.FC = () => {
  // Mock data for DSA stats
  const dsaStats = {
    totalSolved: 234,
    easy: 87,
    medium: 112,
    hard: 35,
    streak: 15,
    ranking: 12567
  };

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "AI Chat Application",
      description: "Real-time chat with AI integration",
      tech: ["React", "Node.js", "OpenAI"],
      status: "Live",
      stars: 24
    },
    {
      id: 2,
      title: "Portfolio Dashboard",
      description: "Interactive developer portfolio",
      tech: ["React", "TypeScript", "Tailwind"],
      status: "Development",
      stars: 12
    },
    {
      id: 3,
      title: "Data Visualization Tool",
      description: "Analytics dashboard for developers",
      tech: ["D3.js", "React", "Python"],
      status: "Planning",
      stars: 8
    }
  ];

  return (
    <div className="container py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Developer vs DSA
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Tracking my journey through code and algorithms. Real-time insights into development progress and problem-solving skills.
        </p>
      </div>

      {/* DSA vs Dev Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* DSA Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">DSA Analytics</h2>
          </div>

          <Card className="ai-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                LeetCode Statistics
                <Badge variant="secondary" className="bg-success/10 text-success">
                  Active Streak: {dsaStats.streak} days
                </Badge>
              </CardTitle>
              <CardDescription>Problem solving progress and analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">{dsaStats.totalSolved}</div>
                  <div className="text-sm text-muted-foreground">Total Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">#{dsaStats.ranking}</div>
                  <div className="text-sm text-muted-foreground">Global Rank</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Easy ({dsaStats.easy})</span>
                    <span>{Math.round((dsaStats.easy / dsaStats.totalSolved) * 100)}%</span>
                  </div>
                  <Progress value={(dsaStats.easy / dsaStats.totalSolved) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Medium ({dsaStats.medium})</span>
                    <span>{Math.round((dsaStats.medium / dsaStats.totalSolved) * 100)}%</span>
                  </div>
                  <Progress value={(dsaStats.medium / dsaStats.totalSolved) * 100} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hard ({dsaStats.hard})</span>
                    <span>{Math.round((dsaStats.hard / dsaStats.totalSolved) * 100)}%</span>
                  </div>
                  <Progress value={(dsaStats.hard / dsaStats.totalSolved) * 100} className="h-2" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-4 h-4 text-warning" />
                  <span className="text-sm">Recent Achievement</span>
                </div>
                <Badge variant="outline">100 Days Streak</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Development Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Code2 className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-bold">Development Portfolio</h2>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <Card key={project.id} className="ai-card hover:ai-glow transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-muted-foreground text-sm">{project.description}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-warning" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={project.status === 'Live' ? 'default' : 'secondary'}
                      className={project.status === 'Live' ? 'bg-success/10 text-success' : ''}
                    >
                      {project.status}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <GitBranch className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="ai-card text-center p-6">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold">98%</div>
          <div className="text-sm text-muted-foreground">Code Quality</div>
        </Card>

        <Card className="ai-card text-center p-6">
          <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold">47</div>
          <div className="text-sm text-muted-foreground">Days Active</div>
        </Card>

        <Card className="ai-card text-center p-6">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-sm text-muted-foreground">Projects</div>
        </Card>

        <Card className="ai-card text-center p-6">
          <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="text-2xl font-bold">156</div>
          <div className="text-sm text-muted-foreground">Commits</div>
        </Card>
      </div>

      <AIAssistant />
    </div>
  );
};

export default Home;