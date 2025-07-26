import React, { useState } from 'react';

import { 
  User, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Circle, 
  Plus,
  TrendingUp,
  Target,
  Clock,
  Award
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import DailyDiary from '../components/DailyDiary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Profile: React.FC = () => {
  const { user } = useAuth();

  // Mock profile data
  const profileData = {
    name: "John Doe",
    email: "john.doe@example.com",
    joinDate: "January 2024",
    bio: "Full-stack developer passionate about AI, algorithms, and creating innovative solutions. I love solving complex problems and building user-centric applications.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    skills: [
      { name: "React", level: 95, category: "Frontend" },
      { name: "TypeScript", level: 90, category: "Language" },
      { name: "Node.js", level: 85, category: "Backend" },
      { name: "Python", level: 88, category: "Language" },
      { name: "MongoDB", level: 80, category: "Database" },
      { name: "AI/ML", level: 75, category: "Specialized" },
      { name: "AWS", level: 70, category: "Cloud" },
      { name: "Docker", level: 82, category: "DevOps" }
    ],
    achievements: [
      { title: "100 Days Coding Streak", date: "2024-01-15", icon: Award },
      { title: "10 Open Source Contributions", date: "2024-01-10", icon: Target },
      { title: "First AI Project Deployed", date: "2024-01-05", icon: TrendingUp }
    ]
  };

  // Mock daily tasks completion data
  const completionStats = {
    today: 75,
    thisWeek: 68,
    thisMonth: 72,
    total: 156
  };

  const skillCategories = [...new Set(profileData.skills.map(skill => skill.category))];

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Developer Profile
          </span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Comprehensive view of skills, achievements, and daily development progress.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="space-y-6">
          <Card className="ai-card">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-12 h-12 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl">{profileData.name}</CardTitle>
              <p className="text-muted-foreground">{profileData.bio}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="ai-card">
            <CardHeader>
              <CardTitle className="text-lg">Daily Completion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{completionStats.today}%</div>
                  <div className="text-xs text-muted-foreground">Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{completionStats.thisWeek}%</div>
                  <div className="text-xs text-muted-foreground">This Week</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Monthly Average</span>
                  <span>{completionStats.thisMonth}%</span>
                </div>
                <Progress value={completionStats.thisMonth} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="ai-card">
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {profileData.achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-md bg-muted/50">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{achievement.title}</div>
                      <div className="text-xs text-muted-foreground">{achievement.date}</div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="skills" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
              <TabsTrigger value="diary">Daily Diary</TabsTrigger>
            </TabsList>
            
            <TabsContent value="skills" className="space-y-6">
              <Card className="ai-card">
                <CardHeader>
                  <CardTitle>Technical Skills</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Proficiency levels across different technologies and domains
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillCategories.map((category) => (
                      <div key={category} className="space-y-3">
                        <h4 className="font-semibold text-lg flex items-center">
                          <Badge variant="secondary" className="mr-2">
                            {category}
                          </Badge>
                        </h4>
                        <div className="grid gap-4">
                          {profileData.skills
                            .filter(skill => skill.category === category)
                            .map((skill, index) => (
                              <div key={index} className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">{skill.name}</span>
                                  <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                </div>
                                <Progress value={skill.level} className="h-2" />
                              </div>
                            ))
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="diary" className="space-y-6">
              <DailyDiary />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;