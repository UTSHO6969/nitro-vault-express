
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CreditCard, Zap, Clock, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  useEffect(() => {
    document.body.style.background = "linear-gradient(to bottom right, #1a1a2e, #16213e)";
    return () => {
      document.body.style.background = "";
    };
  }, []);

  // Popular product data
  const popularProducts = [
    {
      id: 1,
      name: "Discord Nitro 1 Month",
      price: 9.99,
      description: "Upgrade your Discord experience for 1 month",
      imageUrl: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
    },
    {
      id: 2,
      name: "Discord Nitro 1 Year",
      price: 99.99,
      description: "Enjoy Discord premium features for a full year",
      imageUrl: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
    },
    {
      id: 3,
      name: "Discord Nitro Classic",
      price: 4.99,
      description: "Basic premium features for Discord users",
      imageUrl: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
    }
  ];

  // New products data with updated prices
  const newProducts = [
    {
      id: 1,
      name: "Discord Nitro",
      price: 5.5,
      description: "Essential Discord premium features at an affordable price",
      imageUrl: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
    },
    {
      id: 2,
      name: "Discord Nitro 1 Year",
      price: 50,
      description: "A full year of Discord premium features at a special price",
      imageUrl: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
    },
    {
      id: 3,
      name: "Discord Decorations",
      price: null,
      description: "Customize your Discord experience with unique decorations. Custom pricing based on selection.",
      imageUrl: "https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png"
    }
  ];

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
              <a href="https://discord.gg/QNg9TNZ9" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#5865F2] hover:bg-[#4752c4] text-white px-8 py-6 rounded-lg transition-all duration-300 transform hover:scale-105">
                  Join our Discord
                  <MessageSquare className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Instant Delivery</h3>
              <p className="text-gray-300">
                Get your subscription codes delivered instantly after purchase.
              </p>
            </div>
            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Payments</h3>
              <p className="text-gray-300">
                All transactions are encrypted and secure with multiple payment options.
              </p>
            </div>
            <div className="p-6 glass-card rounded-xl">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">24/7 Support</h3>
              <p className="text-gray-300">
                Our customer support team is available around the clock to assist you.
              </p>
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-24">
            <div className="mb-12">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                Popular Products
              </h2>
              <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
                Browse our selection of premium Discord subscriptions and enhance your Discord experience today.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularProducts.map((product) => (
                <div key={product.id} className="glass-card rounded-xl overflow-hidden transition-transform hover:scale-105">
                  <div className="h-48 bg-primary/10 flex items-center justify-center">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="h-24 w-24 object-contain" 
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                    <p className="text-gray-300 mb-4 text-sm">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                      <Link to="/products">
                        <Button className="bg-primary/20 hover:bg-primary/30 text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* New Products Section */}
            <div className="mt-24 pt-16 border-t border-primary/20">
              <div className="mb-12">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue">
                  Special Offers
                </h2>
                <p className="text-gray-300 mt-4 max-w-3xl mx-auto">
                  Limited time deals on our most popular Discord products
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {newProducts.map((product) => (
                  <div key={product.id} className="glass-card rounded-xl overflow-hidden transition-transform hover:scale-105">
                    <div className="h-48 bg-primary/10 flex items-center justify-center">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="h-24 w-24 object-contain" 
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                      <p className="text-gray-300 mb-4 text-sm">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-primary">
                          {product.price ? `$${product.price.toFixed(2)}` : 'Custom Price'}
                        </span>
                        <Link to="/products">
                          <Button className="bg-primary/20 hover:bg-primary/30 text-white">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12">
              <Link to="/products">
                <Button className="bg-primary/20 hover:bg-primary/30 text-white px-6 py-3">
                  View All Products <ArrowRight className="ml-2 h-5 w-5" />
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

      {/* About Section */}
      <div className="bg-glass-primary backdrop-blur-md border-t border-primary/20 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-6">
            About NitroVault
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto">
            NitroVault is your trusted destination for Discord Nitro subscriptions. We provide instant delivery, competitive prices, and exceptional customer service. Our platform ensures a secure and seamless experience for all your Discord premium needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
