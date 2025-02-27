
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Discord Nitro Basic",
      description: "Unlock essential Discord perks",
      price: "$4.99",
      features: ["Custom emoji anywhere", "Animated avatars", "30MB file uploads"],
      badge: "Popular"
    },
    {
      id: 2,
      name: "Discord Nitro Premium",
      description: "The complete Discord experience",
      price: "$9.99",
      features: ["Server boosts included", "HD video streaming", "100MB file uploads"],
      badge: "Best Value"
    }
  ]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-4">
            Available Subscriptions
          </h1>
          <p className="text-gray-300">
            Choose the perfect Discord Nitro subscription for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="bg-glass-primary backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader>
                {product.badge && (
                  <Badge variant="secondary" className="self-start mb-2">
                    {product.badge}
                  </Badge>
                )}
                <CardTitle className="text-2xl font-bold text-white">{product.name}</CardTitle>
                <CardDescription className="text-gray-300">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-4">{product.price}<span className="text-sm text-gray-400">/month</span></div>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-gray-300 flex items-center">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary hover:bg-primary-hover text-white transition-all duration-300">
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
