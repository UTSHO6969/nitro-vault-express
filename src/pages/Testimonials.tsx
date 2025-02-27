
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const Testimonials = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: "Alex Thompson",
      rating: 5,
      date: "2 days ago",
      content: "NitroVault made getting Discord Nitro super easy. The instant delivery was fantastic!",
      product: "Discord Nitro Premium"
    },
    {
      id: 2,
      name: "Sarah Chen",
      rating: 5,
      date: "1 week ago",
      content: "Great service and competitive prices. Will definitely buy from here again!",
      product: "Discord Nitro Basic"
    }
  ]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-neon-blue mb-4">
            Customer Reviews
          </h1>
          <p className="text-gray-300">
            See what our verified customers have to say
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-glass-primary backdrop-blur-md border border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 mb-2">{testimonial.content}</p>
                <p className="text-sm text-primary-hover">Purchased: {testimonial.product}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
