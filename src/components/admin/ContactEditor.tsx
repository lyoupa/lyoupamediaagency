import SectionEditor from './SectionEditor';

const ContactEditor = () => {
  const fields = [
    { key: 'title', label: 'Title Prefix', type: 'input' as const },
    { key: 'titleHighlight', label: 'Title Highlight', type: 'input' as const },
    { key: 'subtitle', label: 'Subtitle', type: 'textarea' as const },
    { key: 'emailUs', label: 'Email Us Label', type: 'input' as const },
    { key: 'sendEmail', label: 'Send Email Button', type: 'input' as const },
    { key: 'whatsapp', label: 'WhatsApp Label', type: 'input' as const },
    { key: 'chatWhatsapp', label: 'Chat on WhatsApp Button', type: 'input' as const },
    { key: 'followUs', label: 'Follow Us Label', type: 'input' as const },
  ];

  return <SectionEditor sectionKey="contact" title="Contact Section" fields={fields} />;
};

export default ContactEditor;
