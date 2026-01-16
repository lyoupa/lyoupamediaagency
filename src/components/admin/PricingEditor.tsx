import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Loader2, Plus, Trash2, GripVertical, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

interface PricingPackage {
  id?: string;
  name_es: string;
  name_en: string;
  name_ar: string;
  price: number;
  features: { es: string[]; en: string[]; ar: string[] };
  is_popular: boolean;
  display_order: number;
  is_active: boolean;
}

const PricingEditor = () => {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('pricing_packages')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setPackages(data.map(pkg => ({
        ...pkg,
        features: pkg.features as { es: string[]; en: string[]; ar: string[] }
      })));
    }
    setIsLoading(false);
  };

  const addPackage = () => {
    setPackages([...packages, {
      name_es: '',
      name_en: '',
      name_ar: '',
      price: 0,
      features: { es: [], en: [], ar: [] },
      is_popular: false,
      display_order: packages.length,
      is_active: true,
    }]);
  };

  const updatePackage = (index: number, field: keyof PricingPackage, value: any) => {
    const updated = [...packages];
    updated[index] = { ...updated[index], [field]: value };
    setPackages(updated);
  };

  const updateFeatures = (index: number, lang: 'es' | 'en' | 'ar', value: string) => {
    const features = value.split('\n').filter(f => f.trim());
    const updated = [...packages];
    updated[index] = {
      ...updated[index],
      features: { ...updated[index].features, [lang]: features }
    };
    setPackages(updated);
  };

  const removePackage = async (index: number) => {
    const pkg = packages[index];
    if (pkg.id) {
      const { error } = await supabase.from('pricing_packages').delete().eq('id', pkg.id);
      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete package.' });
        return;
      }
    }
    setPackages(packages.filter((_, i) => i !== index));
    toast({ title: 'Deleted', description: 'Package has been removed.' });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    for (let i = 0; i < packages.length; i++) {
      const pkg = { ...packages[i], display_order: i };
      
      if (pkg.id) {
        await supabase.from('pricing_packages').update(pkg).eq('id', pkg.id);
      } else {
        const { data } = await supabase.from('pricing_packages').insert(pkg).select().single();
        if (data) {
          packages[i] = { ...data, features: data.features as { es: string[]; en: string[]; ar: string[] } };
        }
      }
    }
    
    setPackages([...packages]);
    toast({ title: 'Saved', description: 'Pricing packages have been saved successfully.' });
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
        <CardTitle>Pricing Packages</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addPackage}>
            <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {packages.map((pkg, index) => (
          <Card key={pkg.id || index} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Package {index + 1}</span>
                {pkg.is_popular && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
              </div>
              <Button variant="ghost" size="sm" onClick={() => removePackage(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price ($)</Label>
                  <Input
                    type="number"
                    value={pkg.price}
                    onChange={(e) => updatePackage(index, 'price', parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={pkg.is_popular}
                    onCheckedChange={(v) => updatePackage(index, 'is_popular', v)}
                  />
                  <Label>Most Popular</Label>
                </div>
              </div>

              <Tabs defaultValue="es">
                <TabsList>
                  <TabsTrigger value="es">Español</TabsTrigger>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="ar">العربية</TabsTrigger>
                </TabsList>

                <TabsContent value="es" className="space-y-3">
                  <div>
                    <Label>Name (ES)</Label>
                    <Input value={pkg.name_es} onChange={(e) => updatePackage(index, 'name_es', e.target.value)} />
                  </div>
                  <div>
                    <Label>Features (ES) - one per line</Label>
                    <Textarea
                      value={pkg.features.es?.join('\n') || ''}
                      onChange={(e) => updateFeatures(index, 'es', e.target.value)}
                      rows={5}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="en" className="space-y-3">
                  <div>
                    <Label>Name (EN)</Label>
                    <Input value={pkg.name_en} onChange={(e) => updatePackage(index, 'name_en', e.target.value)} />
                  </div>
                  <div>
                    <Label>Features (EN) - one per line</Label>
                    <Textarea
                      value={pkg.features.en?.join('\n') || ''}
                      onChange={(e) => updateFeatures(index, 'en', e.target.value)}
                      rows={5}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="space-y-3">
                  <div>
                    <Label>Name (AR)</Label>
                    <Input value={pkg.name_ar} onChange={(e) => updatePackage(index, 'name_ar', e.target.value)} className="text-right" dir="rtl" />
                  </div>
                  <div>
                    <Label>Features (AR) - one per line</Label>
                    <Textarea
                      value={pkg.features.ar?.join('\n') || ''}
                      onChange={(e) => updateFeatures(index, 'ar', e.target.value)}
                      rows={5}
                      className="text-right"
                      dir="rtl"
                    />
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

export default PricingEditor;
