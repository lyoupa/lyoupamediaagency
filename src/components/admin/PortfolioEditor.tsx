import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Loader2, Plus, Trash2, GripVertical, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PortfolioItem {
  id?: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  category_es: string;
  category_en: string;
  category_ar: string;
  description_es: string;
  description_en: string;
  description_ar: string;
  image_url: string | null;
  display_order: number;
  is_active: boolean;
}

const PortfolioEditor = () => {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && data) {
      setItems(data);
    }
    setIsLoading(false);
  };

  const addItem = () => {
    setItems([...items, {
      title_es: '',
      title_en: '',
      title_ar: '',
      category_es: '',
      category_en: '',
      category_ar: '',
      description_es: '',
      description_en: '',
      description_ar: '',
      image_url: null,
      display_order: items.length,
      is_active: true,
    }]);
  };

  const updateItem = (index: number, field: keyof PortfolioItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleImageUpload = async (index: number, file: File) => {
    setUploadingIndex(index);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio')
      .upload(fileName, file);

    if (uploadError) {
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to upload image.' });
      setUploadingIndex(null);
      return;
    }

    const { data } = supabase.storage.from('portfolio').getPublicUrl(fileName);
    updateItem(index, 'image_url', data.publicUrl);
    setUploadingIndex(null);
    toast({ title: 'Uploaded', description: 'Image uploaded successfully.' });
  };

  const removeItem = async (index: number) => {
    const item = items[index];
    if (item.id) {
      const { error } = await supabase.from('portfolio_items').delete().eq('id', item.id);
      if (error) {
        toast({ variant: 'destructive', title: 'Error', description: 'Failed to delete item.' });
        return;
      }
    }
    setItems(items.filter((_, i) => i !== index));
    toast({ title: 'Deleted', description: 'Portfolio item has been removed.' });
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    for (let i = 0; i < items.length; i++) {
      const item = { ...items[i], display_order: i };
      
      if (item.id) {
        await supabase.from('portfolio_items').update(item).eq('id', item.id);
      } else {
        const { data } = await supabase.from('portfolio_items').insert(item).select().single();
        if (data) {
          items[i] = data;
        }
      }
    }
    
    setItems([...items]);
    toast({ title: 'Saved', description: 'Portfolio items have been saved successfully.' });
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
        <CardTitle>Portfolio</CardTitle>
        <div className="flex gap-2">
          <Button variant="outline" onClick={addItem}>
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {items.map((item, index) => (
          <Card key={item.id || index} className="border-2">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <div className="flex items-center gap-2">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Project {index + 1}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Project Image</Label>
                <div className="flex items-center gap-4 mt-2">
                  {item.image_url && (
                    <img src={item.image_url} alt="Project" className="w-24 h-16 object-cover rounded" />
                  )}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(index, file);
                      }}
                      disabled={uploadingIndex === index}
                    />
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        {uploadingIndex === index ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                        Upload Image
                      </span>
                    </Button>
                  </label>
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
                    <Label>Title (ES)</Label>
                    <Input value={item.title_es} onChange={(e) => updateItem(index, 'title_es', e.target.value)} />
                  </div>
                  <div>
                    <Label>Category (ES)</Label>
                    <Input value={item.category_es} onChange={(e) => updateItem(index, 'category_es', e.target.value)} />
                  </div>
                  <div>
                    <Label>Description (ES)</Label>
                    <Textarea value={item.description_es} onChange={(e) => updateItem(index, 'description_es', e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="en" className="space-y-3">
                  <div>
                    <Label>Title (EN)</Label>
                    <Input value={item.title_en} onChange={(e) => updateItem(index, 'title_en', e.target.value)} />
                  </div>
                  <div>
                    <Label>Category (EN)</Label>
                    <Input value={item.category_en} onChange={(e) => updateItem(index, 'category_en', e.target.value)} />
                  </div>
                  <div>
                    <Label>Description (EN)</Label>
                    <Textarea value={item.description_en} onChange={(e) => updateItem(index, 'description_en', e.target.value)} />
                  </div>
                </TabsContent>

                <TabsContent value="ar" className="space-y-3">
                  <div>
                    <Label>Title (AR)</Label>
                    <Input value={item.title_ar} onChange={(e) => updateItem(index, 'title_ar', e.target.value)} className="text-right" dir="rtl" />
                  </div>
                  <div>
                    <Label>Category (AR)</Label>
                    <Input value={item.category_ar} onChange={(e) => updateItem(index, 'category_ar', e.target.value)} className="text-right" dir="rtl" />
                  </div>
                  <div>
                    <Label>Description (AR)</Label>
                    <Textarea value={item.description_ar} onChange={(e) => updateItem(index, 'description_ar', e.target.value)} className="text-right" dir="rtl" />
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

export default PortfolioEditor;
