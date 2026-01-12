
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Tag, AlertCircle, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { mockCatalogData } from '@/lib/data';

// --- Types ---
interface RawProduct {
    titulo: string;
    precio: string;
    imagen: string;
    tags: string | string[]; // Handling potential inconsistency
    detalle: string;
    url: string;
}

interface Product extends RawProduct {
    id: string; // Generated for keying
    parsedTags: string[];
}

type ApiResponse = Record<string, RawProduct[]>;

interface CatalogData {
    categories: string[];
    items: Record<string, Product[]>;
}


export function ProductCatalog() {
    const [data, setData] = useState<CatalogData | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [activeCategory, setActiveCategory] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    // --- 1. Load & Transform ---
    useEffect(() => {
        const loadData = () => {
            setStatus('loading');
            try {
                // Use local mock data
                const rawData = mockCatalogData as unknown as ApiResponse;

                // Transformation
                const categories = Object.keys(rawData);
                const items: Record<string, Product[]> = {};

                categories.forEach(cat => {
                    items[cat] = rawData[cat].map((item: any, idx) => ({
                        ...item,
                        id: item.id ? item.id.toString() : `${cat}-${idx}-${item.titulo.substring(0, 5)}`,
                        parsedTags: Array.isArray(item.tags)
                            ? item.tags
                            : (item.tags ? item.tags.split(',').map((t: string) => t.trim()) : [])
                    }));
                });

                setData({ categories, items });
                if (categories.length > 0) setActiveCategory(categories[0]);
                setStatus('success');
            } catch (error) {
                console.error(error);
                setStatus('error');
            }
        };

        loadData();
    }, []);

    // --- Filtering ---
    const filteredItems = useMemo(() => {
        if (!data || !activeCategory) return [];
        const items = data.items[activeCategory] || [];
        if (!searchQuery) return items;

        const lowerQuery = searchQuery.toLowerCase();
        return items.filter(item =>
            item.titulo.toLowerCase().includes(lowerQuery) ||
            item.parsedTags.some(tag => tag.toLowerCase().includes(lowerQuery))
        );
    }, [data, activeCategory, searchQuery]);

    // --- Render Helpers ---
    if (status === 'error') {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-destructive">
                <AlertCircle className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold">Error loading catalog</h3>
                <p>Please try again later.</p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>Retry</Button>
            </div>
        );
    }

    return (
        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-8 space-y-4">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Digital Catalog
                </h2>
                <p className="text-muted-foreground">Explore our curated collection of products.</p>
            </div>

            {/* --- 2. Category Selector (Tabs) --- */}
            {status === 'loading' ? (
                <div className="space-y-8">
                    <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-full" />)}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-80 w-full rounded-xl" />)}
                    </div>
                </div>
            ) : (
                <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
                        <ScrollArea className="w-full md:w-auto max-w-[100vw] whitespace-nowrap pb-2">
                            <TabsList className="bg-transparent p-0 h-auto gap-2">
                                {data?.categories.map(cat => (
                                    <TabsTrigger
                                        key={cat}
                                        value={cat}
                                        className="rounded-full border border-border bg-card px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                                    >
                                        {cat}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </ScrollArea>

                        {/* --- 5. Search --- */}
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search items or tags..."
                                className="pl-9 rounded-full bg-card/50 backdrop-blur-sm focus-visible:ring-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <TabsContent value={activeCategory} className="mt-0">
                        {/* --- 3. Grid of Cards --- */}
                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item) => (
                                    <motion.div
                                        layout
                                        key={item.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                        onClick={() => setSelectedProduct(item)}
                                    >
                                        <Card className="h-full cursor-pointer hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm group">
                                            <div className="aspect-square relative overflow-hidden bg-muted">
                                                <img
                                                    src={item.imagen}
                                                    alt={item.titulo}
                                                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                <div className="absolute top-2 right-2">
                                                    <Badge variant="secondary" className="backdrop-blur-md bg-background/80 font-mono">
                                                        {item.precio}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardHeader className="p-4">
                                                <CardTitle className="line-clamp-1 text-lg group-hover:text-primary transition-colors">
                                                    {item.titulo}
                                                </CardTitle>
                                                <div className="flex flex-wrap gap-1 mt-2">
                                                    {item.parsedTags.slice(0, 3).map(tag => (
                                                        <Badge key={tag} variant="outline" className="text-xs px-1.5 py-0 h-5">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredItems.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 text-muted-foreground"
                            >
                                <p>No items found matching your search.</p>
                            </motion.div>
                        )}
                    </TabsContent>
                </Tabs>
            )}

            {/* --- 4. Detail Modal --- */}
            <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-border bg-card/95 backdrop-blur-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                    >
                        <div className="aspect-video w-full overflow-hidden bg-muted relative">
                            <img
                                src={selectedProduct?.imagen}
                                alt={selectedProduct?.titulo}
                                className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <h2 className="text-2xl font-bold mb-1">{selectedProduct?.titulo}</h2>
                                <p className="text-white/80 font-mono text-lg">{selectedProduct?.precio}</p>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {selectedProduct?.parsedTags.map(tag => (
                                    <Badge key={tag} variant="secondary" className="bg-secondary/50">
                                        <Tag className="w-3 h-3 mr-1" />
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <ScrollArea className="h-[100px] sm:h-[150px] pr-4">
                                <p className="text-muted-foreground leading-relaxed">
                                    {selectedProduct?.detalle || "No details available."}
                                </p>
                            </ScrollArea>

                            <DialogFooter className="gap-2 sm:gap-0 mt-4">
                                <Button variant="outline" onClick={() => setSelectedProduct(null)}>
                                    Close
                                </Button>
                                <Button
                                    className="gap-2"
                                    onClick={() => selectedProduct && window.open(selectedProduct.url, '_blank')}
                                >
                                    View Product <ExternalLink className="w-4 h-4" />
                                </Button>
                            </DialogFooter>
                        </div>
                    </motion.div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
