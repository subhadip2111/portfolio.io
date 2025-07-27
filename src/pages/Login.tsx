import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import axios from "axios"
const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<any>(null);
     const { login, isLoading } = useAuth();


    const [loginUser, setLoginUser] = useState<any>(null)
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast({
                title: "Error",
                description: "Please fill in all fields.",
                variant: "destructive",
            });
            return;
        }
        // now in here i need to used the api call of login 
        try {
            const loginResposne = await axios.post(`${import.meta.env.VITE_BACKEND_DEV_URL}/auth/login`, {
                email, password
            }
                , {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
// setIsLoading(false)
            setSuccess(true)
            setLoginUser(loginResposne.data)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error;
                console.log('errr data', response?.data);
                setError(response?.data)
                setSuccess(false)
            } else {
                console.log('Errr happn', error);
            }
        }


        if (success) {
            toast({
                title: "Welcome back!",
                description: "Successfully logged in.",
            });
            navigate('/home');
        } else {
            toast({
                title: `${error?.message || 'Invalid Credentials'} `,
                description: "Please checked your account credential",
                variant: "destructive",
            });
        }
    };  

                console.log('Errr happn', error);


    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="mb-4"
                    >
                        <Link to="/">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>

                <Card className="ai-card">
                    <CardHeader className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                            <Lock className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                        <CardDescription>
                            Sign in to access your portfolio dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full ai-button text-lg py-6"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account?{' '}
                                <Link
                                    to="/register"
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    Create one
                                </Link>
                            </p>
                        </div>

                        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                            <p className="text-xs text-muted-foreground text-center">
                                Demo credentials: any email/password combination
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Login;