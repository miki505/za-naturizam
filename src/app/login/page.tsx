import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Prijava / Login",
  description: "Sign in to Za Naturizam to contribute places and ratings.",
};

export default function LoginPage() {
  return (
    <div className="relative mx-auto max-w-md space-y-8 px-4 py-12 md:py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full bg-sky-200/50 blur-3xl"
      />
      <LoginForm />
    </div>
  );
}
