"use client";

import { createClient } from "@/lib/supabase/client";

export function LoginButton() {
  const supabase = createClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <button
      onClick={handleLogin}
      className="btn-glow group inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-base font-semibold text-neutral-800 shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
    >
      <span>Get Started</span>
      
      {/* Arrow */}
      <svg 
        className="h-5 w-5 text-indigo-500 transition-transform duration-200 group-hover:translate-x-1" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </button>
  );
}
