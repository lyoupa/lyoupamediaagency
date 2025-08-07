import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your digital journey? Contact us today and let's discuss your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Contact Info */}
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">Email Us</h4>
              <p className="text-muted-foreground">contact@lyoupamedia.com</p>
              <Button variant="outline" className="mt-4 w-full">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h4 className="font-semibold mb-2">WhatsApp</h4>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
              <Button variant="outline" className="mt-4 w-full">
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <h4 className="font-semibold mb-4">Follow Us</h4>
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