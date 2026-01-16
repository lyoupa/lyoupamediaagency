import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ICONS = ['Globe', 'Code', 'Smartphone', 'Users', 'Settings', 'TrendingUp', 'Zap', 'Shield', 'Database', 'Cloud'];

interface Service {
  id?: string;
  icon: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  description_es: string;
  description_en: string;
  description_ar: string;
  display_order: number;
  is_active: boolean;
}

const ServicesEditor = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setServices(data);
    }
    setIsLoading(false);
  };

  const addService = () => {
    setServices([...services, {
      icon: 'Globe',
      title_es: '',
      title_en: '',
      title_ar: '',
      description_es: '',
      description_en: '',
      description_ar: '',
      display_order: services.length,
      is_active: true,
    }]);
  };

  const updateService = (index: number, field: keyof Service, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const removeService = async (index: number) => {
    const service = services[index];
    if (service.id) {
      const { error } = await supabase.from('services').delete().eq('id', service.id);
      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete service.' });
        return;
      }
    }
    setServices(services.filter((_, i) => i !== index));
    toast({ title: 'Deleted', description: 'Service has been removed.' });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    for (let i = 0; i < services.length; i++) {
      const service = { ...services[i], display_order: i };
      
      if (service.id) {
        await supabase.from('services').update(service).eq('id', service.id);
      } else {
        const { data } = await supabase.from('services').insert(service).select().single();
        if (data) {
          services[i] = data;
        }
      }
    }
    
    setServices([...services]);
    toast({ title: 'Saved', description: 'Services have been saved successfully.' });
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
        <CardTitle>Services</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addService}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {services.map((service, index) => (
          <Card key={service.id || index} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Service {index + 1}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeService(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Icon</Label>
                <Select value={service.icon} onValueChange={(v) => updateService(index, 'icon', v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {ICONS.map(icon => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="es">
                <TabsList>
                  <TabsTrigger value="es">Español</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>

                <TabsContent value="es" className="space-y-3">
                  <div>
                    <Label>Title (ES)</Label>
                    <Input value={service.title_es} onChange={(e) => updateService(index, 'title_es', e.target.value)} />
                  </div>
                  <div>
                    <Label>Description (ES)</Label>
                    <Textarea value={service.description_es} onChange={(e) => updateService(index, 'description_es', e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="en" className="space-y-3">
                  <div>
                    <Label>Title (EN)</Label>
                    <Input value={service.title_en} onChange={(e) => updateService(index, 'title_en', e.target.value)} />
                  </div>
                  <div>
                    <Label>Description (EN)</Label>
                    <Textarea value={service.description_en} onChange={(e) => updateService(index, 'description_en', e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="space-y-3">
                  <div>
                    <Label>Title (AR)</Label>
                    <Input value={service.title_ar} onChange={(e) => updateService(index, 'title_ar', e.target.value)} className="text-right" dir="rtl" />
                  </div>
                  <div>
                    <Label>Description (AR)</Label>
                    <Textarea value={service.description_ar} onChange={(e) => updateService(index, 'description_ar', e.target.value)} className="text-right" dir="rtl" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default ServicesEditor;
