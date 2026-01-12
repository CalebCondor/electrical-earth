import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProducts, type Product } from "@/hook/use-products";

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, index, onClick }: ProductCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
          },
        },
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <Card
        className="overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300 h-full"
        onClick={() => onClick(product)}
      >
        <div className="relative overflow-hidden bg-muted h-48 w-full">
          <img
            src={product.imagen || "/placeholder.svg"}
            alt={product.titulo}
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fontSize="18" fill="%239ca3af" textAnchor="middle" dominantBaseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {product.titulo}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.resumen}
          </p>

          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <span className="text-lg font-bold text-primary">
              ${Number.parseFloat(product.precio).toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.tags.length} tags
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
