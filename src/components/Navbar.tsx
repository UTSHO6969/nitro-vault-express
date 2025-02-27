
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Settings, LogOut, Key } from "lucide-react";
import { Button } from "./ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get current user on mount
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session?.user ?? null);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-glass-primary backdrop-blur-md border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                NitroVault
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-white hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/testimonials" className="text-white hover:text-primary transition-colors">
              Testimonials
            </Link>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
              <ShoppingCart className="h-5 w-5 text-white" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/20 relative">
                    <User className="h-5 w-5 text-white" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-glass-dark backdrop-blur-md border border-primary/20">
                  <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="text-xs text-gray-400 font-normal -mt-3">{user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem 
                    className="text-white hover:bg-primary/20 cursor-pointer flex items-center gap-2"
                    onClick={() => navigate("/settings")}
                  >
                    <Settings className="h-4 w-4" /> Account Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-white hover:bg-primary/20 cursor-pointer flex items-center gap-2"
                    onClick={() => navigate("/auth?mode=update")}
                  >
                    <Key className="h-4 w-4" /> Change Password
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-primary/20" />
                  <DropdownMenuItem 
                    className="text-white hover:bg-primary/20 cursor-pointer flex items-center gap-2 text-red-400 hover:text-red-300"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" className="hover:bg-primary/20" onClick={() => navigate("/auth")}>
                <User className="h-5 w-5 text-white" />
              </Button>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-glass-dark backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-3 py-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/testimonials"
              className="block px-3 py-2 text-white hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/settings"
                  className="block px-3 py-2 text-white hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Account Settings
                </Link>
                <Link
                  to="/auth?mode=update"
                  className="block px-3 py-2 text-white hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Change Password
                </Link>
                <button
                  className="block w-full text-left px-3 py-2 text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block px-3 py-2 text-white hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
