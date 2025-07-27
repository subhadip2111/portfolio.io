import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Code2, Brain, Zap, Github, Linkedin } from 'lucide-react';
// import heroImage from '@/assets/hero-bg.jpg';
import { Button } from '../components/ui/button';
import { useSelector } from 'react-redux';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const user=useSelector((state :any)=>state.auth.user)
const accessToken=useSelector((state :any)=>state.auth.accessToken)





  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
        //   backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-6 md:p-8">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>
          
           <div className="flex items-center space-x-6">
  
    </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center px-6 py-20 md:py-32">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <br />
                <span className="text-foreground">Developer Portfolio</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Where cutting-edge AI meets exceptional development. Explore my journey through 
                code, algorithms, and innovative solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="ai-button text-lg px-8 py-6"
                onClick={() => navigate('/home')}
              >
                Explore Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
           <Link 
  to="https://github.com/subhadip2111"
  className="flex items-center gap-2 text-lg px-6 py-3 border rounded-md border-primary/20 hover:border-primary/40 transition-colors duration-200"
>
  <Github className="w-5 h-5" />
  <span>View Code</span>
</Link>

            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  What Makes This Special
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience a portfolio that showcases both technical expertise and innovative thinking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="ai-card p-8 rounded-xl text-center space-y-4 animate-float">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">AI Integration</h3>
                <p className="text-muted-foreground">
                  Interactive AI assistant to help you understand my projects and capabilities.
                </p>
              </div>

              <div className="ai-card p-8 rounded-xl text-center space-y-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center mx-auto">
                  <Code2 className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Live Analytics</h3>
                <p className="text-muted-foreground">
                  Real-time GitHub activity, LeetCode stats, and project development insights.
                </p>
              </div>

              <div className="ai-card p-8 rounded-xl text-center space-y-4 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Interactive Experience</h3>
                <p className="text-muted-foreground">
                  Explore projects with interactive demos and comprehensive documentation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {/* <div className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="ai-card p-12 rounded-2xl space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Dive In?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join me on this journey through technology, innovation, and continuous learning.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="ai-button text-lg px-8 py-6"
                  onClick={() => navigate('/register')}
                >
                  Create Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <div className="flex items-center space-x-4">
                  <a href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Landing;