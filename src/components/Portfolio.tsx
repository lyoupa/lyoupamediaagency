import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Import portfolio images
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";

const Portfolio = () => {
  const { t } = useLanguage();

  const projects = [
    {
      titleKey: "portfolio.ecommerce",
      categoryKey: "portfolio.ecommerceCategory",
      image: portfolio1,
      descKey: "portfolio.ecommerceDesc"
    },
    {
      titleKey: "portfolio.banking",
      categoryKey: "portfolio.bankingCategory",
      image: portfolio2,
      descKey: "portfolio.bankingDesc"
    },
    {
      titleKey: "portfolio.corporate",
      categoryKey: "portfolio.corporateCategory",
      image: portfolio3,
      descKey: "portfolio.corporateDesc"
    },
    {
      titleKey: "portfolio.socialDashboard",
      categoryKey: "portfolio.socialDashboardCategory",
      image: portfolio4,
      descKey: "portfolio.socialDashboardDesc"
    },
    {
      titleKey: "portfolio.cms",
      categoryKey: "portfolio.cmsCategory",
      image: portfolio5,
      descKey: "portfolio.cmsDesc"
    },
    {
      titleKey: "portfolio.analytics",
      categoryKey: "portfolio.analyticsCategory",
      image: portfolio6,
      descKey: "portfolio.analyticsDesc"
    }
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('portfolio.title') && <>{t('portfolio.title')} </>}<span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{t('portfolio.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.titleKey} 
              className="group overflow-hidden shadow-card hover-lift transition-smooth border-0 bg-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={t(project.titleKey)}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="sm" variant="secondary">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t('portfolio.viewProject')}
                  </Button>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="text-sm text-primary font-medium mb-2">{t(project.categoryKey)}</div>
                <h3 className="text-xl font-semibold mb-2">{t(project.titleKey)}</h3>
                <p className="text-muted-foreground">{t(project.descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
