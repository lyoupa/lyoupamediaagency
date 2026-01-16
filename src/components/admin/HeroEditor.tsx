import SectionEditor from './SectionEditor';

const HeroEditor = () => {
  const fields = [
    { key: 'title1', label: 'Title Line 1', type: 'input' as const },
    { key: 'title2', label: 'Title Line 2', type: 'input' as const },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' as const },
    { key: 'getStarted', label: 'Get Started Button', type: 'input' as const },
    { key: 'watchDemo', label: 'Watch Demo Button', type: 'input' as const },
    { key: 'projectsCompleted', label: 'Projects Completed Label', type: 'input' as const },
    { key: 'yearsExperience', label: 'Years Experience Label', type: 'input' as const },
    { key: 'clientSatisfaction', label: 'Client Satisfaction Label', type: 'input' as const },
    { key: 'whatsappMessage', label: 'WhatsApp Message', type: 'input' as const },
  ];

  return <SectionEditor sectionKey="hero" title="Hero Section" fields={fields} />;
};

export default HeroEditor;
