"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  AuthCard,
  AuthField,
  AuthForm,
  AuthInput,
} from "@/components/auth/auth-form";
import { buildApiUrl, getErrorMessage, parseApiData } from "@/services/api";

export const title = "Login Card";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(buildApiUrl("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      const currentUser = parseApiData<Record<string, unknown> | null>(data, null) ?? data.user;
      const token = typeof data.token === "string" ? data.token : data.data?.token;

      if (res.ok && data.success && token && currentUser) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(currentUser));

        if (currentUser.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else if (currentUser.role === "faculty") {
          window.location.href = "/dashboard/faculty";
        } else {
          window.location.href = "/";
        }
      } else {
        alert(getErrorMessage(data, "Login failed"));
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Sign in"
      description="Use your email and password to continue."
      footer={
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="font-medium text-foreground transition-colors hover:text-primary">
            Create one
          </Link>
        </p>
      }
    >
      <AuthForm onSubmit={handleLogin}>
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

        <Button className="h-11 w-full rounded-xl" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </AuthForm>
    </AuthCard>
  );
};

export default Login;
