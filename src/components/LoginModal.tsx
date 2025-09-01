"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/lib/auth.actions";
import { LogIn } from "lucide-react";

interface LoginModalProps {
  onLogin?: (user: unknown) => void;
}

export default function LoginModal({ onLogin }: LoginModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await login(formData);

      if (result.success) {
        toast.success("Logged in successfully!");
        setEmail("");
        setPassword("");
        setIsOpen(false);

        if (onLogin) onLogin(result.user); // update Footer state
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-stone-700 hover:scale-125 hover:rotate-12 transition-transform"
      >
        <span className="sr-only">Open Login Modal</span>
        <LogIn className="w-4 h-4" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <DialogClose asChild>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
}
