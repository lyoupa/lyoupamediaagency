import SectionEditor from './SectionEditor';

const AboutEditor = () => {
  const fields = [
    { key: 'title', label: 'Title Prefix', type: 'input' as const },
    { key: 'titleHighlight', label: 'Title Highlight', type: 'input' as const },
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'happyClients', label: 'Happy Clients Label', type: 'input' as const },
    { key: 'projectsDelivered', label: 'Projects Delivered Label', type: 'input' as const },
    { key: 'supportAvailable', label: 'Support Available Label', type: 'input' as const },
  ];

  return <SectionEditor sectionKey="about" title="About Section" fields={fields} />;
};

export default AboutEditor;
