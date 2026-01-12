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
                <DialogTitle className="text-xl sm:text-2xl pr-8 text-left">
                  {product.titulo}
                </DialogTitle>
                <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogClose>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="relative w-full h-48 sm:h-80 bg-muted rounded-lg overflow-hidden shadow-inner">
                  <img
                    src={product.imagen || "/placeholder.svg"}
                    alt={product.titulo}
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, 500px"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src =
                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="320"%3E%3Crect fill="%23e5e7eb" width="500" height="320"/%3E%3Ctext x="50%25" y="50%25" fontSize="18" fill="%239ca3af" textAnchor="middle" dominantBaseline="middle"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground italic border-l-2 border-primary/50 pl-2">
                    {product.resumen}
                  </p>
                </div>

                <div className="prose dark:prose-invert text-sm max-w-none">
                  <p>{product.detalle}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="border-t border-border pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-0">
                  <div className="flex flex-row sm:flex-col justify-between items-center sm:items-start">
                    <p className="text-sm text-muted-foreground">Precio</p>
                    <p className="text-3xl font-bold text-primary">
                      ${Number.parseFloat(product.precio).toFixed(2)}
                    </p>
                  </div>

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-primary/20"
                    >
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
