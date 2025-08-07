import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  const packages = [
    {
      name: "Starter",
      price: "$999",
      features: ["Responsive Web Design", "5 Pages", "Contact Form", "Basic SEO", "1 Month Support"]
    },
    {
      name: "Professional",
      price: "$2,499",
      popular: true,
      features: ["Custom Web Development", "10 Pages", "CMS Integration", "Advanced SEO", "E-commerce Ready", "3 Months Support"]
    },
    {
      name: "Enterprise",
      price: "$4,999",
      features: ["Full-Stack Development", "Unlimited Pages", "Custom Features", "Mobile App", "Advanced Analytics", "12 Months Support"]
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Package</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the perfect package for your business needs. All packages include our premium support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <Card key={pkg.name} className={`relative shadow-card hover-lift transition-smooth ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
                <div className="text-4xl font-bold text-primary">{pkg.price}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                {pkg.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
                <Button className="w-full mt-6" variant={pkg.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;