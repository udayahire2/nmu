import SignUp from "@/components/auth/SignUp";

export default function SignUpPage() {
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
            <div className="w-full max-w-md space-y-8">
                <SignUp />
            </div>
        </div>
    );
}
