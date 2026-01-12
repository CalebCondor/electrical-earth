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
        hidden: { opacity: 0, y: 100, scale: 0.5, rotateX: 45 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 20,
            mass: 1,
          },
        },
      }}
      whileHover={{
        y: -15,
        scale: 1.05,
        rotateZ: Math.random() < 0.5 ? 1 : -1,
        transition: { type: "spring", stiffness: 400, damping: 25 },
      }}
      whileTap={{ scale: 0.95 }}
      className="h-full perspective-1000"
    >
      <Card
        className="overflow-hidden cursor-pointer h-full border-muted-foreground/20 hover:border-primary/50 relative group bg-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-500"
        onClick={() => onClick(product)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />

        <div className="relative overflow-hidden bg-muted h-52 w-full z-10">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <img
              src={product.imagen || "/placeholder.svg"}
              alt={product.titulo}
              className="object-cover w-full h-full"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" fontSize="18" fill="%239ca3af" textAnchor="middle" dominantBaseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
              }}
            />
          </motion.div>

          {/* Price Tag Float */}
          <div className="absolute top-3 right-3 z-20">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Badge className="bg-background/80 hover:bg-background text-foreground backdrop-blur-md shadow-sm text-sm px-3 py-1 font-bold border border-border/50">
                ${Number.parseFloat(product.precio).toFixed(2)}
              </Badge>
            </motion.div>
          </div>
        </div>

        <div className="p-5 space-y-4 relative z-10">
          <h3 className="font-bold text-xl line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {product.titulo}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {product.resumen}
          </p>

          <motion.div className="flex flex-wrap gap-1.5">
            {product.tags.slice(0, 3).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-secondary/30 text-secondary-foreground/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  {tag}
                </Badge>
              </motion.span>
            ))}
          </motion.div>

          <div className="pt-2">
            <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-transparent transition-all duration-500 ease-out rounded-full" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
