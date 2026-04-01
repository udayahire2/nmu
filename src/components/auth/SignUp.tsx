"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AuthCard,
  AuthField,
  AuthForm,
  AuthGrid,
  AuthInput,
} from "@/components/auth/auth-form";
import { buildApiUrl, getErrorMessage } from "@/services/api";

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

const selectClassName = "h-11 w-full rounded-xl border-border/60 bg-background";

const SignUp = () => {
  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");

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
      const payload: RegisterPayload = { name, email, password, role };

      if (role === "student") {
        payload.branch = branch;
        payload.year = year;
      } else {
        payload.designation = designation;
        payload.department = department;
        payload.collegeName = collegeName;
        payload.subjects = subjects.split(",").map((s) => s.trim()).filter(Boolean);
      }

      const res = await fetch(buildApiUrl("/auth/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        alert(getErrorMessage(data, "Registration failed"));
      }
    } catch (error: unknown) {
      console.error("Registration Error:", error);
      alert(`Registration failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create account"
      description="Fill the basic details to start using the platform."
      footer={
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-foreground transition-colors hover:text-primary">
            Sign in
          </Link>
        </p>
      }
    >
      <AuthForm onSubmit={handleSubmit}>
        <AuthField id="role" label="Role">
          <Select onValueChange={(val) => setRole(val as UserRole)} value={role} required>
            <SelectTrigger id="role" className={selectClassName}>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="faculty">Faculty</SelectItem>
            </SelectContent>
          </Select>
        </AuthField>

        <AuthField id="name" label="Full name">
          <AuthInput
            id="name"
            placeholder="Your full name"
            required
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          />
        </AuthField>

        <AuthField id="email" label="Email">
          <AuthInput
            id="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            placeholder="name@example.com"
            type="email"
            required
            value={email}
          />
        </AuthField>

        <AuthField id="password" label="Password">
          <AuthInput
            id="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            type="password"
            required
            value={password}
          />
        </AuthField>

        {role === "student" && (
          <AuthGrid>
            <AuthField id="branch" label="Branch">
              <Select onValueChange={setBranch} value={branch} required>
                <SelectTrigger id="branch" className={selectClassName}>
                  <SelectValue placeholder="Select branch" />
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
            </AuthField>

            <AuthField id="year" label="Year">
              <Select onValueChange={setYear} value={year} required>
                <SelectTrigger id="year" className={selectClassName}>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FE">FE</SelectItem>
                  <SelectItem value="SE">SE</SelectItem>
                  <SelectItem value="TE">TE</SelectItem>
                  <SelectItem value="BE">BE</SelectItem>
                </SelectContent>
              </Select>
            </AuthField>
          </AuthGrid>
        )}

        {role === "faculty" && (
          <>
            <AuthField id="designation" label="Designation">
              <AuthInput
                id="designation"
                placeholder="Assistant Professor"
                required
                value={designation}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDesignation(e.target.value)}
              />
            </AuthField>

            <AuthField id="department" label="Department">
              <AuthInput
                id="department"
                placeholder="Computer Engineering"
                required
                value={department}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDepartment(e.target.value)}
              />
            </AuthField>

            <AuthField id="collegeName" label="College">
              <AuthInput
                id="collegeName"
                placeholder="College name"
                required
                value={collegeName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCollegeName(e.target.value)}
              />
            </AuthField>

            <AuthField id="subjects" label="Subjects">
              <AuthInput
                id="subjects"
                placeholder="DBMS, OS, TOC"
                required
                value={subjects}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubjects(e.target.value)}
              />
            </AuthField>
          </>
        )}

        <Button className="h-11 w-full rounded-xl" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </AuthForm>
    </AuthCard>
  );
};

export default SignUp;
