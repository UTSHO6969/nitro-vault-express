
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, User, Shield, Loader2 } from "lucide-react";

const Settings = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUserAndProfile = async () => {
      setIsFetching(true);
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        navigate("/auth");
        return;
      }

      setUser(userData.user);
      setEmail(userData.user.email || "");

      // Fetch user profile
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.user.id)
        .single();

      if (!error && profileData) {
        setProfile(profileData);
      }
      
      setIsFetching(false);
    };

    fetchUserAndProfile();
  }, [navigate]);

  const updateEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ email });
      
      if (error) throw error;
      
      toast({
        title: "Email Update Initiated",
        description: "Check your new email for a confirmation link.",
      });
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

  if (isFetching) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-white">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
            Account Settings
          </h1>
          <p className="text-gray-400 mt-2">
            Manage your account preferences and information
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-glass-primary">
            <TabsTrigger value="account" className="data-[state=active]:bg-primary/30">
              <User className="h-4 w-4 mr-2" /> Account
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-primary/30">
              <Shield className="h-4 w-4 mr-2" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="bg-glass-primary backdrop-blur-md border border-primary/20">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account email and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={updateEmail} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
                      disabled={isLoading || email === user?.email}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Email"
                      )}
                    </Button>
                  </div>
                </form>

                <div className="pt-4 border-t border-primary/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium text-white">Account Role</h3>
                      <p className="text-xs text-gray-400 mt-1">Your current account permissions</p>
                    </div>
                    <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-white">
                      {profile?.role || "User"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-glass-primary backdrop-blur-md border border-primary/20">
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your password and account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-white">Password</h3>
                  <p className="text-xs text-gray-400">Update your password to keep your account secure</p>
                  <Button
                    className="w-full bg-primary/20 hover:bg-primary/30 text-white"
                    onClick={() => navigate("/auth?mode=update")}
                  >
                    Change Password
                  </Button>
                </div>

                <div className="pt-4 border-t border-primary/20">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-white">Account Created</h3>
                    <p className="text-sm text-gray-400">
                      {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
