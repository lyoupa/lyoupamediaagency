import { Card, CardContent } from "@/components/ui/card";
import { Globe, Code, Smartphone, Users, Settings, TrendingUp } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Design",
      description: "Modern, responsive websites that captivate your audience and drive conversions."
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Custom web applications built with cutting-edge technologies and best practices."
    },
    {
      icon: Smartphone,
      title: "Android Apps",
      description: "Native mobile applications that deliver exceptional user experiences on Android."
    },
    {
      icon: Users,
      title: "Community Manager",
      description: "Strategic social media management to build and engage your online community."
    },
    {
      icon: Settings,
      title: "CMS Solutions",
      description: "User-friendly content management systems for easy website administration."
    },
    {
      icon: TrendingUp,
      title: "Digital Marketing",
      description: "Data-driven marketing strategies to boost your online presence and ROI."
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive digital solutions to help your business thrive in the digital landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.title} 
                className="shadow-card hover-lift transition-smooth border-0 bg-card/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;