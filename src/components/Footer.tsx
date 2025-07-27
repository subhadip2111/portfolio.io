import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setProfile } from '../store/features/profileSlice';
import axios from 'axios';

const Footer: React.FC = () => {


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

  const profile=useSelector((state :any)=>state.profile.profie)
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Code2 className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Building innovative solutions with cutting-edge technology and AI-driven approaches.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/home" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
              <li><a href="/profile" className="text-muted-foreground hover:text-primary transition-colors">Profile</a></li>
            </ul>
          </div>

 {profile?.skills?.length > 0 ? (
  <div className="space-y-4">
    <h3 className="font-semibold text-foreground">Skills</h3>

    {Object.entries(
      profile.skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      }, {})
    ).map(([category, skills]: [any, any]) => (
      <div key={category} className="space-y-2">
        <h4 className="text-muted-foreground capitalize">{category}</h4>
        <div className="flex flex-wrap gap-2 ml-2 text-sm">
          {skills?.map((skill: any, index: number) => (
            <span
              key={index}
              className="bg-muted px-2 py-1 rounded-md text-foreground"
            >
              {skill?.name ?? 'Unnamed Skill'}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-sm text-muted-foreground">No skills available.</div>
)}



          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/subhadip2111" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/subhadip-shee" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="subahdipshee20010521@gmail.com" 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Portfolio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0">
            Built with React & AI ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;