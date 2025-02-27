
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Mail, ArrowLeft, KeyRound } from "lucide-react";

type AuthMode = "login" | "signup" | "reset" | "update";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate("/products");
      } else if (mode === "signup") {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email to verify your account.",
        });
        setMode("login");
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth?mode=update`,
        });
        if (error) throw error;
        setResetSent(true);
        toast({
          title: "Password Reset Email Sent",
          description: "Check your email for a password reset link",
        });
      } else if (mode === "update") {
        if (password !== confirmPassword) {
          throw new Error("Passwords don't match");
        }
        const { error } = await supabase.auth.updateUser({
          password,
        });
        if (error) throw error;
        toast({
          title: "Password Updated",
          description: "Your password has been updated successfully",
        });
        setMode("login");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if we're in update mode from URL
  useState(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("mode") === "update") {
      setMode("update");
    }
  });

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-glass-primary backdrop-blur-md border border-primary/20 rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            {mode === "login" ? "Welcome Back" : 
             mode === "signup" ? "Create Account" :
             mode === "reset" ? "Reset Password" : "Update Password"}
          </h1>
          <p className="text-gray-400 text-center mb-6">
            {mode === "login" ? "Sign in to continue" : 
             mode === "signup" ? "Create a new account" :
             mode === "reset" ? "Enter your email to reset password" : 
             "Enter your new password"}
          </p>
          
          {mode === "reset" && resetSent ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-white">Password reset email sent!</p>
                <p className="text-gray-400 text-sm mt-2">Check your inbox for a reset link.</p>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
                onClick={() => setMode("login")}
              >
                Back to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {(mode === "login" || mode === "signup" || mode === "reset") && (
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
              
              {(mode === "login" || mode === "signup" || mode === "update") && (
                <div className="space-y-2">
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              {(mode === "signup" || mode === "update") && (
                <div className="space-y-2">
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading
                  ? "Loading..."
                  : mode === "login"
                  ? "Sign In"
                  : mode === "signup"
                  ? "Create Account"
                  : mode === "reset"
                  ? "Send Reset Link"
                  : "Update Password"}
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            {mode === "login" && (
              <>
                <button
                  onClick={() => setMode("signup")}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Don't have an account? Sign up
                </button>
                <div className="mt-2">
                  <button
                    onClick={() => setMode("reset")}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Forgot your password?
                  </button>
                </div>
              </>
            )}
            {mode === "signup" && (
              <button
                onClick={() => setMode("login")}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Already have an account? Sign in
              </button>
            )}
            {(mode === "reset" || mode === "update") && !resetSent && (
              <button
                onClick={() => setMode("login")}
                className="flex items-center justify-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mx-auto"
              >
                <ArrowLeft className="h-4 w-4" /> Back to login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
