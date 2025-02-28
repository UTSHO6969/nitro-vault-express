
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Products = () => {
  const [products] = useState([
    {
      id: 1,
      name: "Discord Nitro",
      description: "Essential Discord premium features at an affordable price",
      price: "$5.50",
      badge: null
    },
    {
      id: 2,
      name: "Discord Nitro 1 Year",
      description: "A full year of Discord premium features at a special price",
      price: "$50.00",
      badge: null
    },
    {
      id: 3,
      name: "Discord Decorations",
      description: "Customize your Discord experience with unique decorations. Custom pricing based on selection.",
      price: "Custom Price",
      badge: null
    }
  ]);

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#161b33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-[#5865F2] mb-4">
            Special Offers
          </h1>
          <p className="text-gray-300 text-lg">
            Limited time deals on our most popular Discord products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="bg-[#212552] border-none text-white shadow-xl overflow-hidden">
              <div className="h-48 bg-[#2a2f5a] flex items-center justify-center">
                <img 
                  src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" 
                  alt={product.name} 
                  className="h-24 w-24 object-contain" 
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white text-center">{product.name}</CardTitle>
                <CardDescription className="text-gray-300 text-center">{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-[#5865F2] text-center mb-4">{product.price}</div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button className="bg-[#5865F2] hover:bg-[#4752c4] px-6">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button className="bg-[#353a6e] hover:bg-[#424680] text-white flex items-center gap-2 px-6 py-3">
            View All Products <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
