import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            {t('about.title')} <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{t('about.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('about.description')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">{t('about.happyClients')}</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">{t('about.projectsDelivered')}</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">{t('about.supportAvailable')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
