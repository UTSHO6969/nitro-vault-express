
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    document.body.style.background = "linear-gradient(to bottom right, #1a1a2e, #16213e)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="relative pt-32 pb-20 sm:pt-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-down">
            <span className="inline-block px-4 py-1 text-xs font-medium text-primary-hover bg-primary/10 rounded-full mb-4">
              Premium Discord Subscriptions
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple via-primary to-neon-blue mb-6">
              Elevate Your Discord Experience
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Get instant access to Discord Nitro and premium subscriptions. Enhance your Discord journey with exclusive perks and features.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/products">
                <Button className="bg-primary hover:bg-primary-hover text-white px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-neon-purple/20 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-blue/20 rounded-full filter blur-3xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
