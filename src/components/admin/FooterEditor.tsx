import SectionEditor from './SectionEditor';

const FooterEditor = () => {
  const fields = [
    { key: 'description', label: 'Description', type: 'textarea' as const },
    { key: 'quickLinks', label: 'Quick Links Title', type: 'input' as const },
    { key: 'followUs', label: 'Follow Us Title', type: 'input' as const },
    { key: 'rights', label: 'Rights Text', type: 'input' as const },
    { key: 'privacy', label: 'Privacy Policy Link', type: 'input' as const },
    { key: 'terms', label: 'Terms of Service Link', type: 'input' as const },
  ];

  return <SectionEditor sectionKey="footer" title="Footer Section" fields={fields} />;
};

export default FooterEditor;
