import { Card, CardContent } from "@/components/ui/card";
import { Globe, Code, Smartphone, Users, Settings, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Globe,
      titleKey: "services.webDesign",
      descKey: "services.webDesignDesc"
    },
    {
      icon: Code,
      titleKey: "services.webDev",
      descKey: "services.webDevDesc"
    },
    {
      icon: Smartphone,
      titleKey: "services.androidApps",
      descKey: "services.androidAppsDesc"
    },
    {
      icon: Users,
      titleKey: "services.communityManager",
      descKey: "services.communityManagerDesc"
    },
    {
      icon: Settings,
      titleKey: "services.cmsSolutions",
      descKey: "services.cmsSolutionsDesc"
    },
    {
      icon: TrendingUp,
      titleKey: "services.digitalMarketing",
      descKey: "services.digitalMarketingDesc"
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('services.title') !== 'services.title' && <>{t('services.title')} </>}<span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{t('services.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={service.titleKey} 
                className="shadow-card hover-lift transition-smooth border-0 bg-card/50 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{t(service.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(service.descKey)}</p>
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
