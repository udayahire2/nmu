import SignUp from "@/components/auth/SignUp";
import { AuthShell } from "@/components/auth/auth-shell";

export default function SignUpPage() {
    return (
        <AuthShell
            badge="New Account"
            title="Create a cleaner academic workspace for every role."
            description="Set up your account once and the platform can organize materials, syllabus and role-specific access around your profile."
            highlights={[
                "Students get branch and year based navigation from day one.",
                "Faculty onboarding supports department and subject ownership.",
                "Verification keeps approvals and protected sections cleaner.",
                "The same design system carries across the full product flow."
            ]}
        >
            <div className="w-full space-y-8">
                <SignUp />
            </div>
        </AuthShell>
    );
}
