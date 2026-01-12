import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CategoryTabs } from "./category-tabs";
import { SearchBar } from "./search-bar";
import { ProductCard } from "./product-card";
import { ProductDetail } from "./product-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useProducts, type Product } from "@/hook/use-products";

export function ProductsCatalog() {
  const { products, isLoading, isError } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const categories = useMemo(() => {
    if (!products) return [];
    return Object.keys(products).sort();
  }, [products]);

  const currentProducts = useMemo(() => {
    if (!products || !activeCategory) return [];
    return products[activeCategory] || [];
  }, [products, activeCategory]);

  const filteredProducts = useMemo(() => {
    return currentProducts.filter((product) => {
      const query = searchQuery.toLowerCase();
      return (
        product.titulo.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [currentProducts, searchQuery]);

  // Set first category on load
  if (categories.length > 0 && !activeCategory) {
    setActiveCategory(categories[0]);
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Categories Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className="h-10 w-24 rounded-full flex-shrink-0"
            />
          ))}
        </div>

        {/* Search Bar Skeleton */}
        <Skeleton className="h-10 w-full rounded-md" />

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card text-card-foreground shadow space-y-0 flex flex-col h-full overflow-hidden"
            >
              <Skeleton className="h-48 w-full rounded-none" />
              <div className="p-4 space-y-4 flex-1 flex flex-col">
                <Skeleton className="h-6 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <div className="pt-4 mt-auto flex items-center justify-between">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-9 w-24 rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !products) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error al cargar los productos. Por favor, intenta de nuevo.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground">
            No se encontraron productos con "{searchQuery}"
          </p>
        </motion.div>
      ) : (
        <motion.div
          layout
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={(p) => {
                setSelectedProduct(p);
                setIsDetailOpen(true);
              }}
            />
          ))}
        </motion.div>
      )}

      <ProductDetail
        product={selectedProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </div>
  );
}
