"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Gift, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle } = useAuth();
  const googleButtonRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const initializeGoogle = () => {
      if (window.google && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: 400,
          text: "continue_with",
        });
      }
    };

    const timer = setTimeout(initializeGoogle, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleGoogleResponse = async (response: { credential: string }) => {
    setLoading(true);
    try {
      await loginWithGoogle(response.credential);
      toast.success("Logged in with Google!");
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      router.push("/");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      await login("hriditest@example.com", "test1234");
      toast.success("Logged in with demo account!");
      router.push("/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Demo login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-velvet px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gold/20 bg-velvet-light p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <Gift className="text-gold" size={32} />
          <h1 className="mt-3 font-display text-2xl italic text-ivory">
            Welcome Back
          </h1>
          <p className="mt-1 font-body text-sm text-ivory/60">
            Login to continue to Hridi&apos;s Diary
          </p>
        </div>

        {/* Custom styled Google button, with real Google button hidden underneath */}
        <div className="relative mb-5 h-12 w-full">
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-full border border-gold/30 bg-velvet font-body text-sm font-semibold text-ivory transition hover:bg-velvet/60"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continue with Google
          </button>
          <div
            ref={googleButtonRef}
            className="absolute inset-0 opacity-0 [&>div]:h-full [&>div]:w-full"
          />
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-gold/20" />
          <span className="font-body text-xs text-ivory/40">OR</span>
          <div className="h-px flex-1 bg-gold/20" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40"
            />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-gold/30 bg-velvet py-3 pl-11 pr-4 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-gold/30 bg-velvet py-3 pl-11 pr-14 font-body text-sm text-ivory placeholder:text-ivory/40 focus:border-gold focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-gold hover:text-blush"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-full bg-blush py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="mt-4 w-full rounded-full border border-gold/40 py-3 font-body text-sm font-semibold text-gold transition hover:bg-gold hover:text-velvet disabled:opacity-60"
        >
          Try Demo Login
        </button>

        <p className="mt-6 text-center font-body text-sm text-ivory/60">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-gold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
