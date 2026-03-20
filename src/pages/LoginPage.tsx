import Login from "@/components/auth/Login";
import { AuthShell } from "@/components/auth/auth-shell";

export default function LoginPage() {
    return (
        <AuthShell
            badge="Member Access"
            title="Pick up your syllabus, resources and progress from one place."
            description="Sign in to continue with faculty-approved materials, structured syllabus views and your personalized academic workspace."
            highlights={[
                "Continue where you left off across study materials and syllabus sections.",
                "Access one dashboard for student, faculty and admin workflows.",
                "Keep profile, branch and learning context synced in one place.",
                "Move from search to subject topics without switching tools."
            ]}
        >
            <div className="w-full space-y-8">
                <Login />
            </div>
        </AuthShell>
    );
}
