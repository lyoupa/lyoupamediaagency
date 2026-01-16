import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FieldConfig {
  key: string;
  label: string;
  type: 'input' | 'textarea';
}

interface SectionEditorProps {
  sectionKey: string;
  title: string;
  fields: FieldConfig[];
}

interface ContentData {
  es: Record<string, string>;
  en: Record<string, string>;
  ar: Record<string, string>;
}

const SectionEditor = ({ sectionKey, title, fields }: SectionEditorProps) => {
  const [content, setContent] = useState<ContentData>({ es: {}, en: {}, ar: {} });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadContent();
  }, [sectionKey]);

  const loadContent = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('section_key', sectionKey)
      .maybeSingle();

    if (!error && data && data.content) {
      const contentData = data.content as unknown as ContentData;
      if (contentData.es && contentData.en && contentData.ar) {
        setContent(contentData);
      } else {
        initializeContent();
      }
    } else {
      initializeContent();
    }
    setIsLoading(false);
  };

  const initializeContent = () => {
    const initial: ContentData = { es: {}, en: {}, ar: {} };
    fields.forEach(field => {
      initial.es[field.key] = '';
      initial.en[field.key] = '';
      initial.ar[field.key] = '';
    });
    setContent(initial);
  };

  const handleChange = (lang: 'es' | 'en' | 'ar', key: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value
      }
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Check if record exists
    const { data: existing } = await supabase
      .from('site_content')
      .select('id')
      .eq('section_key', sectionKey)
      .maybeSingle();

    let error;
    const jsonContent = JSON.parse(JSON.stringify(content));
    
    if (existing) {
      const result = await supabase
        .from('site_content')
        .update({ content: jsonContent })
        .eq('section_key', sectionKey);
      error = result.error;
    } else {
      const result = await supabase
        .from('site_content')
        .insert([{
          section_key: sectionKey,
          content: jsonContent
        }]);
      error = result.error;
    }

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save content. Please try again.',
      });
    } else {
      toast({
        title: 'Saved',
        description: 'Content has been saved successfully.',
      });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="es">
          <TabsList className="mb-4">
            <TabsTrigger value="es">Español</TabsTrigger>
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="ar">العربية</TabsTrigger>
          </TabsList>

          {(['es', 'en', 'ar'] as const).map(lang => (
            <TabsContent key={lang} value={lang} className="space-y-4">
              {fields.map(field => (
                <div key={field.key}>
                  <Label htmlFor={`${lang}-${field.key}`}>{field.label}</Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={`${lang}-${field.key}`}
                      value={content[lang]?.[field.key] || ''}
                      onChange={(e) => handleChange(lang, field.key, e.target.value)}
                      className={lang === 'ar' ? 'text-right' : ''}
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                  ) : (
                    <Input
                      id={`${lang}-${field.key}`}
                      value={content[lang]?.[field.key] || ''}
                      onChange={(e) => handleChange(lang, field.key, e.target.value)}
                      className={lang === 'ar' ? 'text-right' : ''}
                      dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    />
                  )}
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SectionEditor;
