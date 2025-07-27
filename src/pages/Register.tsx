import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import axios from 'axios';

const Register: React.FC = () => {
    const [fullName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(true)

    const [registerUser, setRegisterUser] = useState<any>(null)
    const [confirmPassword, setConfirmPassword] = useState('');
    // const { register, isLoading } = useAuth();
    const [error, setError] = useState<any>(null);

    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullName || !email || !password || !confirmPassword) {
            toast({
                title: "Error",
                description: "Please fill in all fields.",
                variant: "destructive",
            });
            return;
        }

        // if (password !== confirmPassword) {
        //     toast({
        //         title: "Error",
        //         description: "Passwords don't match.",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // if (password.length < 6) {
        //     toast({
        //         title: "Error",
        //         description: "Password must be at least 6 characters.",
        //         variant: "destructive",
        //     });
        //     return;
        // }

        // call the register api and handle the response
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_DEV_URL}/auth/register`, {
                fullName, email, password, confirmPassword
            }
                , {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }

            )
            console.log('register user data', response.data)
            setRegisterUser(response?.data)
            setIsLoading(false)
            setSuccess(true)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { response } = error;
                console.log('errr data', response?.data);
                setError(response?.data)
                setSuccess(false)
            } else {
                console.log('Errr', error);
            }
        }

        if (success) {
            toast({
                title: `!Welcome@${registerUser?.user?.fullName}`,
                description: "Account created successfully. fell free to login ",
            });
            navigate('/login');
        } else {
            toast({
                title: `${error.message}`,
                description: "Please try again.",
                variant: "destructive",
            });
        }
    };
    console.log("resposen", registerUser)
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            {/* Background Effects */}
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
                            <User className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                        <CardDescription>
                            Join to explore the AI-powered portfolio experience
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setName(e.target.value)}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

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
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirm your password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Register;