"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
export const title = "Login Card";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, branch, year }),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to verify otp page, passing email
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Student Registration</CardTitle>
        <CardDescription>
          Create your student account with email verification
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Student Name</Label>
            <Input
              id="name"
              placeholder="e.g. Hitesh Patil"
              required
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="branch">Branch Name</Label>
            <Select onValueChange={setBranch} value={branch} required>
              <SelectTrigger id="branch" className="w-full">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Computer">Computer</SelectItem>
                <SelectItem value="IT">IT</SelectItem>
                <SelectItem value="Civil">Civil</SelectItem>
                <SelectItem value="Mechanical">Mechanical</SelectItem>
                <SelectItem value="Electrical">Electrical</SelectItem>
                <SelectItem value="ENTC">ENTC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Current Year</Label>
            <Select onValueChange={setYear} value={year} required>
              <SelectTrigger id="year" className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FE">FE</SelectItem>
                <SelectItem value="SE">SE</SelectItem>
                <SelectItem value="TE">TE</SelectItem>
                <SelectItem value="BE">BE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="m@example.com"
              type="email"
              required
              value={email}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              required
              value={password}
            />
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <a className="underline" href="/login">
            Login
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
