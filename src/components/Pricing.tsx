import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();

  const packages = [
    {
      nameKey: "pricing.starter",
      price: "$999",
      featureKeys: [
        "pricing.responsiveDesign",
        "pricing.pages5",
        "pricing.contactForm",
        "pricing.basicSeo",
        "pricing.support1Month"
      ]
    },
    {
      nameKey: "pricing.professional",
      price: "$2,499",
      popular: true,
      featureKeys: [
        "pricing.customDev",
        "pricing.pages10",
        "pricing.cmsIntegration",
        "pricing.advancedSeo",
        "pricing.ecommerceReady",
        "pricing.support3Months"
      ]
    },
    {
      nameKey: "pricing.enterprise",
      price: "$4,999",
      featureKeys: [
        "pricing.fullStack",
        "pricing.unlimitedPages",
        "pricing.customFeatures",
        "pricing.mobileApp",
        "pricing.advancedAnalytics",
        "pricing.support12Months"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('pricing.title')} <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{t('pricing.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <Card key={pkg.nameKey} className={`relative shadow-card hover-lift transition-smooth ${pkg.popular ? 'ring-2 ring-primary' : ''}`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <h3 className="text-2xl font-bold">{t(pkg.nameKey)}</h3>
                <div className="text-4xl font-bold text-primary">{pkg.price}</div>
              </CardHeader>
              <CardContent className="space-y-4">
                {pkg.featureKeys.map((featureKey) => (
                  <div key={featureKey} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{t(featureKey)}</span>
                  </div>
                ))}
                <Button className="w-full mt-6" variant={pkg.popular ? "default" : "outline"}>
                  {t('pricing.getStarted')}
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
