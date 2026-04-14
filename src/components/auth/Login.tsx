"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AuthCard,
  AuthField,
  AuthForm,
} from "@/components/auth/auth-form";
import { buildApiUrl, getErrorMessage, parseApiData } from "@/services/api";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(buildApiUrl("/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      const currentUser = parseApiData<Record<string, unknown> | null>(data, null) ?? data.user;
      const token = typeof data.token === "string" ? data.token : data.data?.token;

      if (res.ok && data.success && token && currentUser) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(currentUser));

        if (currentUser.role === "admin") {
          navigate("/admin/dashboard");
        } else if (currentUser.role === "faculty") {
          navigate("/dashboard/faculty");
        } else {
          navigate("/");
        }
      } else {
        setError(getErrorMessage(data, "Login failed"));
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Please try again.");
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
          <Link to="/signup" className="font-medium text-foreground transition-colors hover:text-muted-foreground">
            Create one
          </Link>
        </p>
      }
    >
      <AuthForm onSubmit={form.handleSubmit(onSubmit)}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <AuthField id="email" label="Email">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      className="h-11 rounded-md border-border/40 bg-transparent"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </AuthField>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <AuthField id="password" label="Password">
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="••••••••"
                      className="h-11 rounded-md border-border/40 bg-transparent"
                      disabled={loading}
                    />
                  </FormControl>
                  <FormMessage />
                </AuthField>
              )}
            />

            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button className="h-11 w-full rounded-md mt-6" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="text-center pt-2">
              <Link
                to="/forgot-password"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Forgot your password?
              </Link>
            </div>
          </form>
        </Form>
      </AuthForm>
    </AuthCard>
  );
};

export default Login;
