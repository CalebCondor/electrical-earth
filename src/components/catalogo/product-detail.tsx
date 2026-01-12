import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useProducts, type Product } from "@/hook/use-products";
import { X, ExternalLink } from "lucide-react";

interface ProductDetailProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetail({
  product,
  isOpen,
  onClose,
}: ProductDetailProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl">{product.titulo}</DialogTitle>
                <DialogClose className="absolute right-4 top-4">
                  <X className="h-4 w-4" />
                </DialogClose>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="relative w-full h-80 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={product.imagen || "/placeholder.svg"}
                    alt={product.titulo}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="320"%3E%3Crect fill="%23e5e7eb" width="500" height="320"/%3E%3Ctext x="50%25" y="50%25" fontSize="18" fill="%239ca3af" textAnchor="middle" dominantBaseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground italic">
                    {product.resumen}
                  </p>
                </div>

                <div className="prose dark:prose-invert text-sm max-w-none">
                  <p>{product.detalle}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Precio</p>
                    <p className="text-3xl font-bold text-primary">
                      ${Number.parseFloat(product.precio).toFixed(2)}
                    </p>
                  </div>

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="gap-2">
                      Ver en sitio
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
