import Login from "@/components/auth/Login";
import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
    return (
        <AuthShell
            badge="Member Access"
            title="Sign in to continue"
            description="Open your study materials and syllabus in one clean place."
            highlights={[
                "Minimal student-friendly access",
                "Works cleanly on mobile and desktop"
            ]}
        >
            <Login />
        </AuthShell>
    );
}
