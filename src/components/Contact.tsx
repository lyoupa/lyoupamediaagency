import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('contact.title')} <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">{t('contact.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">{t('contact.emailUs')}</h4>
              <p className="text-muted-foreground">lyoupamedia@gmail.com</p>
              <Button variant="outline" className="mt-4 w-full">
                {t('contact.sendEmail')}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">{t('contact.whatsapp')}</h4>
              <p className="text-muted-foreground">+34 666 003 838</p>
              <Button variant="outline" className="mt-4 w-full">
                {t('contact.chatWhatsapp')}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold mb-4">{t('contact.followUs')}</h4>
              <div className="grid grid-cols-2 gap-3 max-w-32 mx-auto">
                <Button variant="ghost" size="lg" className="h-12 w-12">
                  <Facebook className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="lg" className="h-12 w-12">
                  <Twitter className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="lg" className="h-12 w-12">
                  <Instagram className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="lg" className="h-12 w-12">
                  <Linkedin className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
