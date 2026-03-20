"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export const title = "Login Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); // Includes role

        // Redirect based on role
        if (data.user.role === 'admin') {
          window.location.href = '/admin/dashboard';
        } else if (data.user.role === 'faculty') {
          window.location.href = '/dashboard/faculty';
        } else {
          window.location.href = '/';
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-3xl border-border/60 bg-card/95 shadow-xl shadow-black/5 backdrop-blur-xl">
      <CardHeader className="space-y-4 pb-5">
        <Badge variant="outline" className="w-fit rounded-full border-border/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Welcome Back
        </Badge>
        <div className="space-y-2">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription className="leading-6">
            Enter your email and password to open your academic workspace.
          </CardDescription>
        </div>
      </CardHeader>
      <Separator className="bg-border/60" />
      <form onSubmit={handleLogin}>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="m@example.com"
              type="email"
              required
              value={email}
              className="h-11 rounded-xl border-border/60 bg-background"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              required
              value={password}
              className="h-11 rounded-xl border-border/60 bg-background"
            />
          </div>
          <Button className="h-11 w-full rounded-xl" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Logging in...
              </>
            ) : (
              <>
                Login
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-foreground transition-colors hover:text-primary">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
