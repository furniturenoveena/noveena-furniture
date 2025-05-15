"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { login } from "../actions";

export default function AdminLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [state, formAction] = useActionState(login, {
    errors: {},
  });

  const handleFormAction = async (formData: FormData) => {
    setIsLoading(true);
    await formAction(formData);
    setIsLoading(false);
  };

  // Use useEffect to show toast when errors change
  useEffect(() => {
    if (state?.errors && Object.keys(state.errors).length > 0) {
      toast({
        title: "Login Failed",
        description:
          Object.values(state.errors)[0]?.[0] ||
          "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  }, [state?.errors, toast]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/20 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-lg border bg-background p-6 sm:p-8 shadow-lg"
      >
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className="text-xl sm:text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base">
            Sign in to access your dashboard
          </p>
        </div>

        <form action={handleFormAction} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                name="username"
                placeholder="Username"
                className="pl-10"
                required
              />
            </div>
            {state?.errors?.username && (
              <p className="text-sm text-destructive">
                {state.errors.username[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 h-5 w-5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {state?.errors?.password && (
              <p className="text-sm text-destructive">
                {state.errors.password[0]}
              </p>
            )}
          </div>{" "}
          <Button
            type="submit"
            size="lg"
            className="w-full font-montserrat transition-all duration-100 py-6 md:py-5 text-base hover:bg-white hover:text-primary border border-transparent hover:border-primary"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Back to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
