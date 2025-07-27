import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import Loader from '../components/common/Loader';
import ProjectDetails from './ProjectDetails';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [leetcodeResponse, setLetcodeResponse] = useState<any>(null)
    const [projectsData,setProjectsData]=useState<any>(null);
      const [showDetails, setShowDetails] = useState(false);
const navigate = useNavigate();
    const getDsaData = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_DEV_URL}/leetcode/sync`, {
                "username": `${import.meta.env.VITE_USER}`
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setLetcodeResponse(response?.data?.data)
        }

        catch (error) {
            console.log(error)
        }
    }
    const rawCalendar = leetcodeResponse?.matchedUser?.submissionCalendar;
    let formattedData: { date: string; count: number }[] = [];
    if (rawCalendar) {
        try {
            const calendarObject = JSON.parse(rawCalendar);
            formattedData = Object.entries(calendarObject).map(([timestamp, count]) => ({
                date: new Date(Number(timestamp) * 1000).toDateString(),
                count: Number(count),
            }));
        } catch (err) {
            console.error("Failed to parse submissionCalendar JSON:", err);
        }
    } else {
        console.warn("submissionCalendar is undefined or empty");
    }
    formattedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const getDevelopmentData=async()=>{
try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV_URL}/project/all`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            setProjectsData(response?.data?.data)
            
} catch (error) {
    console.log(error)
}
}
 
    useEffect(() => {

        getDsaData()
getDevelopmentData()
    }, [])
 if(!leetcodeResponse || !projectsData ){
    return (<Loader/>)
 }
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

                    <Card className="ai-card ">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between h-24">
                                LeetCode Statistics
                                <Badge variant="secondary" className="bg-success/10 text-success">
                                    Active Streak: {30} days
                                </Badge>
                            </CardTitle>
                            <CardDescription>Problem solving progress and analytics</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{leetcodeResponse?.matchedUser?.submitStatsGlobal?.acSubmissionNum[0]?.count}</div>
                                    <div className="text-sm text-muted-foreground">Total Solved</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-accent">#{leetcodeResponse?.matchedUser?.profile?.ranking}</div>
                                    <div className="text-sm text-muted-foreground">Global Rank</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Easy ({leetcodeResponse?.matchedUser?.submitStatsGlobal?.acSubmissionNum[1]?.count})</span>
                                        <span>{leetcodeResponse?.matchedUser?.problemsSolvedBeatsStats[0]?.percentage}%</span>
                                    </div>
                                    <Progress value={leetcodeResponse?.matchedUser?.problemsSolvedBeatsStats[0]?.percentage} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Medium ({leetcodeResponse?.matchedUser?.submitStatsGlobal?.acSubmissionNum[2]?.count})</span>
                                        <span>{leetcodeResponse?.matchedUser?.problemsSolvedBeatsStats[1]?.percentage}%</span>
                                    </div>
                                    <Progress value={leetcodeResponse?.matchedUser?.problemsSolvedBeatsStats[0]?.percentage} className="h-2" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Hard ({leetcodeResponse?.matchedUser?.submitStatsGlobal?.acSubmissionNum[3]?.count})</span>
                                        <span>{leetcodeResponse?.matchedUser?.problemsSolvedBeatsStats[2]?.percentage}%</span>
                                    </div>
                                    <Progress value={leetcodeResponse?.matchedUser?.problemsSolvedBeatsStats[1]?.percentage} className="h-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-border/40">
                                <div className="flex items-center space-x-2">
                                    <Trophy className="w-4 h-4 text-warning" />
                                    <span className="text-sm">Recent Achievement</span>
                                </div>
                                <Badge variant="outline">Last 100 Days Streak</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="ai-card hover:ai-glow transition-all duration-300 h-52 overflow-auto p-4">
                        <h3 className="font-semibold text-lg mb-2">Submission Calendar</h3>
                        <ul className="text-sm space-y-1">
                            {formattedData.map(({ date, count }, index) => (
                                <li key={index} className="flex justify-between border-b pb-1">
                                    <span>{date}</span>
                                    <span className="font-bold text-blue-600">{count} submissions</span>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Development Section */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <Code2 className="w-6 h-6 text-accent" />
                        <h2 className="text-2xl font-bold">Development Portfolio</h2>
                    </div>

                 <div className="space-y-6">
  {projectsData?.slice(0,2).map((project: any) => (
    <Card key={project.id} className="ai-card hover:ai-glow transition-all h-72 duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">{project.name}</h3>
            <p className="text-sm text-zinc-400">{project.description}</p>
          </div>
          <div className="flex items-center space-x-1 text-amber-400">
            <Star className="w-4 h-4" />
            <span className="text-sm">{project.stars}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech: string, index: number) => (
            <span
              key={index}
              className={`text-xs font-medium px-2.5 py-1 rounded-full 
                ${
                  tech.toLowerCase().includes("react")
                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                    : tech.toLowerCase().includes("node")
                    ? "bg-green-500/10 text-green-400 border border-green-500/30"
                    : tech.toLowerCase().includes("mongo")
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                    : tech.toLowerCase().includes("socket")
                    ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30"
                    : tech.toLowerCase().includes("nest")
                    ? "bg-red-500/10 text-red-400 border border-red-500/30"
                    : "bg-purple-500/10 text-purple-300 border border-purple-500/30"
                }`}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <Badge
            variant={project.status === "Live" ? "default" : "secondary"}
            className={`text-xs px-3 py-1 rounded-full 
              ${
                project.status === "Live"
                  ? "bg-green-500/10 text-green-400 border border-green-500/30"
                  : "bg-zinc-700 text-zinc-300 border border-zinc-600"
              }`}
          >
            {project.status}
          </Badge>
          <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-200" onClick={() => navigate(`/projectDetails/${project?.id}`)}
  >
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