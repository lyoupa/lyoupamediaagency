import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'es' | 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'es'; // Spanish as default
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [language, isRTL]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

const translations: Record<Language, any> = {
  es: {
    nav: {
      home: "Inicio",
      services: "Servicios",
      portfolio: "Portafolio",
      about: "Nosotros",
      pricing: "Precios",
      contact: "Contacto",
      getStarted: "Comenzar"
    },
    hero: {
      title1: "Excelencia Digital",
      title2: "Comienza Aquí",
      subtitle: "Transformamos ideas en realidad digital. Desde sitios web impresionantes hasta aplicaciones móviles potentes, ofrecemos soluciones de vanguardia que impulsan tu negocio.",
      getStarted: "Comenzar",
      watchDemo: "Ver Demo",
      projectsCompleted: "Proyectos Completados",
      yearsExperience: "Años de Experiencia",
      clientSatisfaction: "Satisfacción del Cliente",
      whatsappMessage: "¡Hola! Me gustaría comenzar con sus servicios."
    },
    services: {
      title: "Nuestros",
      titleHighlight: "Servicios",
      subtitle: "Ofrecemos soluciones digitales integrales para ayudar a tu negocio a prosperar en el panorama digital.",
      webDesign: "Diseño Web",
      webDesignDesc: "Sitios web modernos y responsivos que cautivan a tu audiencia e impulsan conversiones.",
      webDev: "Desarrollo Web",
      webDevDesc: "Aplicaciones web personalizadas construidas con tecnologías de vanguardia y mejores prácticas.",
      androidApps: "Apps Android",
      androidAppsDesc: "Aplicaciones móviles nativas que ofrecen experiencias de usuario excepcionales en Android.",
      communityManager: "Community Manager",
      communityManagerDesc: "Gestión estratégica de redes sociales para construir y comprometer tu comunidad en línea.",
      cmsSolutions: "Soluciones CMS",
      cmsSolutionsDesc: "Sistemas de gestión de contenido fáciles de usar para la administración sencilla del sitio web.",
      digitalMarketing: "Marketing Digital",
      digitalMarketingDesc: "Estrategias de marketing basadas en datos para aumentar tu presencia en línea y ROI."
    },
    portfolio: {
      title: "Nuestro",
      titleHighlight: "Portafolio",
      subtitle: "Explora nuestros últimos proyectos y descubre cómo hemos ayudado a empresas a alcanzar sus objetivos digitales.",
      viewProject: "Ver Proyecto",
      ecommerce: "Plataforma E-Commerce",
      ecommerceCategory: "Desarrollo Web",
      ecommerceDesc: "Plataforma de compras moderna con funciones avanzadas",
      banking: "App de Banca Móvil",
      bankingCategory: "Desarrollo Android",
      bankingDesc: "Solución de banca móvil segura e intuitiva",
      corporate: "Sitio Web Corporativo",
      corporateCategory: "Diseño Web",
      corporateDesc: "Sitio web profesional de negocios con CMS",
      socialDashboard: "Panel de Redes Sociales",
      socialDashboardCategory: "Aplicación Web",
      socialDashboardDesc: "Herramienta integral de gestión de redes sociales",
      cms: "Sistema de Gestión de Contenido",
      cmsCategory: "Desarrollo CMS",
      cmsDesc: "CMS personalizado para creadores de contenido",
      analytics: "Analítica de Marketing",
      analyticsCategory: "Marketing Digital",
      analyticsDesc: "Plataforma avanzada de analítica y reportes"
    },
    about: {
      title: "Sobre",
      titleHighlight: "Lyoupa Media",
      description: "Somos un equipo apasionado de expertos digitales dedicados a transformar negocios a través de soluciones web innovadoras. Con más de 5 años de experiencia, hemos ayudado a más de 50 empresas a alcanzar sus objetivos digitales.",
      happyClients: "Clientes Felices",
      projectsDelivered: "Proyectos Entregados",
      supportAvailable: "Soporte Disponible"
    },
    pricing: {
      title: "Elige Tu",
      titleHighlight: "Paquete",
      subtitle: "Selecciona el paquete perfecto para las necesidades de tu negocio. Todos los paquetes incluyen nuestro soporte premium.",
      mostPopular: "Más Popular",
      getStarted: "Comenzar",
      starter: "Inicial",
      professional: "Profesional",
      enterprise: "Empresarial",
      responsiveDesign: "Diseño Web Responsivo",
      pages5: "5 Páginas",
      contactForm: "Formulario de Contacto",
      basicSeo: "SEO Básico",
      support1Month: "1 Mes de Soporte",
      customDev: "Desarrollo Web Personalizado",
      pages10: "10 Páginas",
      cmsIntegration: "Integración CMS",
      advancedSeo: "SEO Avanzado",
      ecommerceReady: "Listo para E-commerce",
      support3Months: "3 Meses de Soporte",
      fullStack: "Desarrollo Full-Stack",
      unlimitedPages: "Páginas Ilimitadas",
      customFeatures: "Funciones Personalizadas",
      mobileApp: "App Móvil",
      advancedAnalytics: "Analítica Avanzada",
      support12Months: "12 Meses de Soporte"
    },
    contact: {
      title: "Ponte en",
      titleHighlight: "Contacto",
      subtitle: "¿Listo para comenzar tu viaje digital? Contáctanos hoy y hablemos de tu proyecto.",
      emailUs: "Envíanos un Email",
      sendEmail: "Enviar Email",
      whatsapp: "WhatsApp",
      chatWhatsapp: "Chatear por WhatsApp",
      followUs: "Síguenos"
    }
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      portfolio: "Portfolio",
      about: "About",
      pricing: "Pricing",
      contact: "Contact",
      getStarted: "Get Started"
    },
    hero: {
      title1: "Digital Excellence",
      title2: "Starts Here",
      subtitle: "We transform ideas into digital reality. From stunning websites to powerful mobile apps, we deliver cutting-edge solutions that drive your business forward.",
      getStarted: "Get Started",
      watchDemo: "Watch Demo",
      projectsCompleted: "Projects Completed",
      yearsExperience: "Years Experience",
      clientSatisfaction: "Client Satisfaction",
      whatsappMessage: "Hi! I would like to get started with your services."
    },
    services: {
      title: "Our",
      titleHighlight: "Services",
      subtitle: "We offer comprehensive digital solutions to help your business thrive in the digital landscape.",
      webDesign: "Web Design",
      webDesignDesc: "Modern, responsive websites that captivate your audience and drive conversions.",
      webDev: "Web Development",
      webDevDesc: "Custom web applications built with cutting-edge technologies and best practices.",
      androidApps: "Android Apps",
      androidAppsDesc: "Native mobile applications that deliver exceptional user experiences on Android.",
      communityManager: "Community Manager",
      communityManagerDesc: "Strategic social media management to build and engage your online community.",
      cmsSolutions: "CMS Solutions",
      cmsSolutionsDesc: "User-friendly content management systems for easy website administration.",
      digitalMarketing: "Digital Marketing",
      digitalMarketingDesc: "Data-driven marketing strategies to boost your online presence and ROI."
    },
    portfolio: {
      title: "Our",
      titleHighlight: "Portfolio",
      subtitle: "Explore our latest projects and see how we've helped businesses achieve their digital goals.",
      viewProject: "View Project",
      ecommerce: "E-Commerce Platform",
      ecommerceCategory: "Web Development",
      ecommerceDesc: "Modern shopping platform with advanced features",
      banking: "Mobile Banking App",
      bankingCategory: "Android Development",
      bankingDesc: "Secure and intuitive mobile banking solution",
      corporate: "Corporate Website",
      corporateCategory: "Web Design",
      corporateDesc: "Professional business website with CMS",
      socialDashboard: "Social Media Dashboard",
      socialDashboardCategory: "Web Application",
      socialDashboardDesc: "Comprehensive social media management tool",
      cms: "Content Management System",
      cmsCategory: "CMS Development",
      cmsDesc: "Custom CMS for content creators",
      analytics: "Marketing Analytics",
      analyticsCategory: "Digital Marketing",
      analyticsDesc: "Advanced analytics and reporting platform"
    },
    about: {
      title: "About",
      titleHighlight: "Lyoupa Media",
      description: "We are a passionate team of digital experts dedicated to transforming businesses through innovative web solutions. With over 5 years of experience, we've helped 50+ companies achieve their digital goals.",
      happyClients: "Happy Clients",
      projectsDelivered: "Projects Delivered",
      supportAvailable: "Support Available"
    },
    pricing: {
      title: "Choose Your",
      titleHighlight: "Package",
      subtitle: "Select the perfect package for your business needs. All packages include our premium support.",
      mostPopular: "Most Popular",
      getStarted: "Get Started",
      starter: "Starter",
      professional: "Professional",
      enterprise: "Enterprise",
      responsiveDesign: "Responsive Web Design",
      pages5: "5 Pages",
      contactForm: "Contact Form",
      basicSeo: "Basic SEO",
      support1Month: "1 Month Support",
      customDev: "Custom Web Development",
      pages10: "10 Pages",
      cmsIntegration: "CMS Integration",
      advancedSeo: "Advanced SEO",
      ecommerceReady: "E-commerce Ready",
      support3Months: "3 Months Support",
      fullStack: "Full-Stack Development",
      unlimitedPages: "Unlimited Pages",
      customFeatures: "Custom Features",
      mobileApp: "Mobile App",
      advancedAnalytics: "Advanced Analytics",
      support12Months: "12 Months Support"
    },
    contact: {
      title: "Get In",
      titleHighlight: "Touch",
      subtitle: "Ready to start your digital journey? Contact us today and let's discuss your project.",
      emailUs: "Email Us",
      sendEmail: "Send Email",
      whatsapp: "WhatsApp",
      chatWhatsapp: "Chat on WhatsApp",
      followUs: "Follow Us"
    }
  },
  ar: {
    nav: {
      home: "الرئيسية",
      services: "الخدمات",
      portfolio: "الأعمال",
      about: "من نحن",
      pricing: "الأسعار",
      contact: "اتصل بنا",
      getStarted: "ابدأ الآن"
    },
    hero: {
      title1: "التميز الرقمي",
      title2: "يبدأ من هنا",
      subtitle: "نحوّل الأفكار إلى واقع رقمي. من مواقع الويب المذهلة إلى تطبيقات الهاتف القوية، نقدم حلولاً متطورة تدفع عملك للأمام.",
      getStarted: "ابدأ الآن",
      watchDemo: "شاهد العرض",
      projectsCompleted: "مشاريع منجزة",
      yearsExperience: "سنوات خبرة",
      clientSatisfaction: "رضا العملاء",
      whatsappMessage: "مرحباً! أود البدء في خدماتكم."
    },
    services: {
      titleHighlight: "خدماتنا",
      subtitle: "نقدم حلولاً رقمية شاملة لمساعدة عملك على الازدهار في المشهد الرقمي.",
      webDesign: "تصميم المواقع",
      webDesignDesc: "مواقع ويب حديثة ومتجاوبة تجذب جمهورك وتحفز التحويلات.",
      webDev: "تطوير الويب",
      webDevDesc: "تطبيقات ويب مخصصة مبنية بأحدث التقنيات وأفضل الممارسات.",
      androidApps: "تطبيقات أندرويد",
      androidAppsDesc: "تطبيقات هاتف أصلية تقدم تجارب مستخدم استثنائية على أندرويد.",
      communityManager: "إدارة المجتمع",
      communityManagerDesc: "إدارة استراتيجية لوسائل التواصل الاجتماعي لبناء مجتمعك عبر الإنترنت.",
      cmsSolutions: "حلول CMS",
      cmsSolutionsDesc: "أنظمة إدارة محتوى سهلة الاستخدام لإدارة الموقع بسهولة.",
      digitalMarketing: "التسويق الرقمي",
      digitalMarketingDesc: "استراتيجيات تسويق قائمة على البيانات لتعزيز حضورك عبر الإنترنت."
    },
    portfolio: {
      titleHighlight: "أعمالنا",
      subtitle: "استكشف أحدث مشاريعنا وشاهد كيف ساعدنا الشركات على تحقيق أهدافها الرقمية.",
      viewProject: "عرض المشروع",
      ecommerce: "منصة التجارة الإلكترونية",
      ecommerceCategory: "تطوير الويب",
      ecommerceDesc: "منصة تسوق حديثة مع ميزات متقدمة",
      banking: "تطبيق البنك المحمول",
      bankingCategory: "تطوير أندرويد",
      bankingDesc: "حل مصرفي آمن وسهل الاستخدام",
      corporate: "موقع الشركات",
      corporateCategory: "تصميم الويب",
      corporateDesc: "موقع أعمال احترافي مع CMS",
      socialDashboard: "لوحة وسائل التواصل",
      socialDashboardCategory: "تطبيق ويب",
      socialDashboardDesc: "أداة شاملة لإدارة وسائل التواصل الاجتماعي",
      cms: "نظام إدارة المحتوى",
      cmsCategory: "تطوير CMS",
      cmsDesc: "CMS مخصص لمنشئي المحتوى",
      analytics: "تحليلات التسويق",
      analyticsCategory: "التسويق الرقمي",
      analyticsDesc: "منصة تحليلات وتقارير متقدمة"
    },
    about: {
      title: "عن",
      titleHighlight: "ليوبا ميديا",
      description: "نحن فريق شغوف من الخبراء الرقميين المكرسين لتحويل الأعمال من خلال حلول ويب مبتكرة. مع أكثر من 5 سنوات من الخبرة، ساعدنا أكثر من 50 شركة على تحقيق أهدافها الرقمية.",
      happyClients: "عملاء سعداء",
      projectsDelivered: "مشاريع منجزة",
      supportAvailable: "دعم متاح"
    },
    pricing: {
      title: "اختر",
      titleHighlight: "باقتك",
      subtitle: "اختر الباقة المثالية لاحتياجات عملك. جميع الباقات تشمل دعمنا المميز.",
      mostPopular: "الأكثر شيوعاً",
      getStarted: "ابدأ الآن",
      starter: "المبتدئة",
      professional: "الاحترافية",
      enterprise: "المؤسسات",
      responsiveDesign: "تصميم ويب متجاوب",
      pages5: "5 صفحات",
      contactForm: "نموذج اتصال",
      basicSeo: "SEO أساسي",
      support1Month: "دعم لمدة شهر",
      customDev: "تطوير ويب مخصص",
      pages10: "10 صفحات",
      cmsIntegration: "تكامل CMS",
      advancedSeo: "SEO متقدم",
      ecommerceReady: "جاهز للتجارة الإلكترونية",
      support3Months: "دعم لمدة 3 أشهر",
      fullStack: "تطوير Full-Stack",
      unlimitedPages: "صفحات غير محدودة",
      customFeatures: "ميزات مخصصة",
      mobileApp: "تطبيق هاتف",
      advancedAnalytics: "تحليلات متقدمة",
      support12Months: "دعم لمدة 12 شهر"
    },
    contact: {
      title: "تواصل",
      titleHighlight: "معنا",
      subtitle: "هل أنت مستعد لبدء رحلتك الرقمية؟ تواصل معنا اليوم ودعنا نناقش مشروعك.",
      emailUs: "راسلنا",
      sendEmail: "إرسال بريد",
      whatsapp: "واتساب",
      chatWhatsapp: "تحدث عبر واتساب",
      followUs: "تابعنا"
    }
  }
};
