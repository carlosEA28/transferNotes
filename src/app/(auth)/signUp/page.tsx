"use client";

import { authClient } from "@/src/lib/auth-client";
import SignInFormComponent from "@/src/app/(auth)/signUp/components/signInFormComponent";

const SignUp = () => {
  const { data: session, isPending } = authClient.useSession();

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4" >
      <SignInFormComponent/>
    </main>
  );
};

export default SignUp;