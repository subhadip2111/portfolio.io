import React, { useEffect, useState } from 'react';
import profileImage from "../../src/assets/profile.jpg"
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
  Award,
  Icon,
  
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import DailyDiary from '../components/DailyDiary';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProfile } from '../store/features/profileSlice';
import Loader from '../components/common/Loader';

const Profile: React.FC = () => {
  const dispatch=useDispatch()
   const [profileData, setProfileData] = useState<any>(null);
  const getProfileData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_DEV_URL}/users/68863011b897d14f09b21f9a`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      setProfileData(response.data)
    } catch (error) {
console.log(error)
    }
  }

  useEffect(()=>{
    getProfileData()
  },[])
  
dispatch(setProfile(profileData))
  const completionStats = {
    today: 90,
    thisWeek: 90,
    thisMonth: 86,
    total: 200
  };

   const skillCategories = [...new Set(profileData?.skills?.map((skill: any) => skill.category))];
  if(!profileData){
    return  (<Loader/>)
  }
  
   return (
    <div className="container py-8 space-y-8">
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
        <div className="space-y-6">
          <Card className="ai-card relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-950/95 border-gray-700/50 shadow-2xl">
  {/* Animated background effects */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5"></div>
  <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl"></div>
  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl"></div>
  
  <CardHeader className="text-center relative z-10">
    <div className="relative w-24 h-24 mx-auto mb-4 group">
      {/* Glowing ring effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full p-0.5 animate-pulse">
        <div className="w-full h-full bg-gray-900 rounded-full"></div>
      </div>
      {/* Profile image container with enhanced styling */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center p-0.5 group-hover:shadow-2xl group-hover:shadow-purple-500/30 transition-all duration-300">
        <img   
          className="w-20 h-20 rounded-full object-cover bg-black ring-2 ring-gray-800 group-hover:ring-purple-400/50 transition-all duration-300"   
          src={profileImage}   
          alt="Profile Picture" 
        />
      </div>
      {/* Floating glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
    </div>
    
    <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2 hover:scale-105 transition-transform duration-300">
      {profileData?.fullName}
    </CardTitle>
    <p className="text-gray-400 leading-relaxed">{profileData?.about}</p>
  </CardHeader>
  
  <CardContent className="space-y-4 relative z-10">
    <div className="space-y-3">
      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-800/30 to-gray-700/20 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
        <Mail className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{profileData?.email}</span>
      </div>
      
      <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-800/30 to-gray-700/20 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group">
        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">Joined {profileData?.joined}</span>
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
              {profileData?.achivments?.map((achievement:any, index:any) => {
                return (
                  <div key={index} className="flex items-center space-x-3 p-2 rounded-md bg-muted/50">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                      {achievement.icon ? (
                        React.createElement(achievement.icon, { className: "w-4 h-4 text-primary-foreground" })
                      ) : (
                        <Award className="w-4 h-4 text-primary-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{achievement?.name}</div>
<div className="text-xs text-muted-foreground">
  {achievement.date
    ? new Date(Number(achievement.date)).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : ' '}
</div>
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
         <Card className="ai-card relative overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-950/95 border-gray-700/50 shadow-2xl">
  {/* Animated background effects */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-cyan-600/5"></div>
  <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl"></div>
  <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-600/10 rounded-full blur-2xl"></div>
  
  <CardHeader className="relative z-10">
    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
      Technical Skills
    </CardTitle>
    <p className="text-gray-400 text-sm">
      Proficiency levels across different technologies and domains
    </p>
  </CardHeader>
  
  <CardContent className="relative z-10">
    <div className="space-y-6">
      {skillCategories?.map((category:any) => (
        <div key={category} className="space-y-3">
          <h4 className="font-semibold text-lg flex items-center">
            <Badge 
              variant="secondary" 
              className="mr-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
            >
              {category}
            </Badge>
          </h4>
          <div className="grid gap-4">
            {profileData?.skills
              ?.filter((skill :any) => skill.category === category)
              .map((skill :any, index:any) => (
                <div 
                  key={index} 
                  className="space-y-2 p-3 rounded-lg bg-gradient-to-r from-gray-800/30 to-gray-700/20 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-200">{skill?.name}</span>
                    <span className="text-sm text-gray-400 font-mono bg-gray-800/50 px-2 py-1 rounded">
                      {skill?.level}%
                    </span>
                  </div>
                  <Progress 
                    value={skill?.level} 
                    className="h-2 bg-gray-800 rounded-full overflow-hidden shadow-inner [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:via-purple-500 [&>div]:to-cyan-500 [&>div]:shadow-lg [&>div]:relative [&>div]:overflow-hidden [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out"
                  />
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