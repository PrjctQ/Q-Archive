"use client";

import { useState, useEffect } from "react";
import { GithubIcon, LogOut, PlayIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "./ui/theme-toggle";
import LoginModal from "./LoginModal";
import { getUser, logout } from "@/lib/auth.actions";
import { toast } from "react-hot-toast";
import { Spinner } from "./Spinner";

export default function Footer() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  // Fetch current user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const u = await getUser(); // server action/API route
      setUser(u);
    };
    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout(); // client-friendly logout
      if (result.success) {
        toast.success("Logged out successfully!");
        setUser(null);
      } else {
        toast.error(result.message || "Logout failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="flex shrink-0 items-center w-full mx-auto flex-row justify-between gap-2 py-2 md:py-4 border-t">
      <Link
        target="_blank"
        href="https://github.com/prjctq"
        className="font-bold"
        prefetch={false}
      >
        Q-Archive | ProjectQ
      </Link>

      <div className="flex items-center justify-end gap-4">
      <ModeToggle />
        {/* Social Links */}
        <Link
          href="#"
          className="h-8 rounded-full border border-gray-200 dark:border-stone-700 w-8 hover:scale-125 hover:rotate-12 transition-transform p-2"
          prefetch={false}
        >
          <span className="sr-only">Twitter</span>
          <TwitterIcon className="w-4 h-4" />
        </Link>

        <Link
          target="_blank"
          href="https://github.com/prjctq#"
          className="h-8 rounded-full border border-gray-200 dark:border-stone-700 w-8 hover:scale-125 hover:rotate-12 transition-transform p-2"
          prefetch={false}
        >
          <span className="sr-only">GitHub</span>
          <GithubIcon className="w-4 h-4" />
        </Link>

        <Link
          href="#"
          className="h-8 rounded-full border border-gray-200 dark:border-stone-700 w-8 hover:scale-125 hover:rotate-12 transition-transform p-2"
          prefetch={false}
        >
          <span className="sr-only">YouTube</span>
          <PlayIcon className="w-4 h-4" />
        </Link>


        {/* Conditional Login / Logout */}
        {user ? (
          <button
            onClick={handleLogout}
            className="h-8 rounded-full border border-gray-200 dark:border-stone-700 w-8 hover:scale-125 hover:rotate-12 transition-transform p-2"
            disabled={loading}
          >
            {loading ? <Spinner/> : <LogOut className="w-4 h-4"/>}
          </button>
        ) : (
          <LoginModal onLogin={(newUser: unknown) => setUser(newUser)} />
        )}
      </div>
    </footer>
  );
}
