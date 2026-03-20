"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
export const title = "Login Card";

type UserRole = "student" | "faculty";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  branch?: string;
  year?: string;
  designation?: string;
  department?: string;
  collegeName?: string;
  subjects?: string[];
}

const SignUp = () => {
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

  // Faculty specific state
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [subjects, setSubjects] = useState("");
  const [collegeName, setCollegeName] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';

      const payload: RegisterPayload = { name, email, password, role };

      if (role === 'student') {
        payload.branch = branch;
        payload.year = year;
      } else {
        payload.designation = designation;
        payload.department = department;
        payload.collegeName = collegeName;
        // Split subjects by comma and trim
        payload.subjects = subjects.split(',').map(s => s.trim()).filter(s => s);
      }

      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        // Redirect to verify otp page, passing email
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        alert(data.message || data.error || 'Registration failed');
      }
    } catch (error: unknown) {
      console.error('Registration Error:', error);
      alert(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md rounded-3xl border-border/60 bg-card/95 shadow-xl shadow-black/5 backdrop-blur-xl">
      <CardHeader className="space-y-4 pb-5">
        <Badge variant="outline" className="w-fit rounded-full border-border/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Create Account
        </Badge>
        <div className="space-y-2">
          <CardTitle className="text-2xl">Get Started</CardTitle>
          <CardDescription className="leading-6">
            Register as a student or faculty member and personalize your workspace.
          </CardDescription>
        </div>
      </CardHeader>
      <Separator className="bg-border/60" />
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="role">I am a...</Label>
            <Select onValueChange={(val) => setRole(val as UserRole)} value={role} required>
              <SelectTrigger id="role" className="h-11 w-full rounded-xl border-border/60 bg-background">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="faculty">Faculty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="e.g. Hitesh Patil"
              required
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              className="h-11 rounded-xl border-border/60 bg-background"
            />
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
              className="h-11 rounded-xl border-border/60 bg-background"
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
              className="h-11 rounded-xl border-border/60 bg-background"
            />
          </div>

          {role === 'student' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="branch">Branch Name</Label>
                <Select onValueChange={setBranch} value={branch} required>
                  <SelectTrigger id="branch" className="h-11 w-full rounded-xl border-border/60 bg-background">
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
                  <SelectTrigger id="year" className="h-11 w-full rounded-xl border-border/60 bg-background">
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
            </>
          )}

          {role === 'faculty' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  placeholder="e.g. Assistant Professor"
                  required
                  value={designation}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesignation(e.target.value)}
                  className="h-11 rounded-xl border-border/60 bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g. Computer Engineering"
                  required
                  value={department}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}
                  className="h-11 rounded-xl border-border/60 bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collegeName">College Name</Label>
                <Input
                  id="collegeName"
                  placeholder="e.g. GPJ"
                  required
                  value={collegeName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCollegeName(e.target.value)}
                  className="h-11 rounded-xl border-border/60 bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects (comma separated)</Label>
                <Input
                  id="subjects"
                  placeholder="e.g. TOC, OS, DBMS"
                  required
                  value={subjects}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubjects(e.target.value)}
                  className="h-11 rounded-xl border-border/60 bg-background"
                />
              </div>
            </>
          )}

          <Button className="h-11 w-full rounded-xl" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                Register
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-foreground transition-colors hover:text-primary">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
