import { Navbar } from "./navbard";
import { motion } from "framer-motion";
import { ProductsCatalog } from "./catalogo/products-catalog";
export function App() {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Catálogo de Productos
          </h1>
          <p className="text-muted-foreground text-lg">
            Descubre nuestros servicios de salud profesionales
          </p>
        </motion.div>

        <ProductsCatalog />
      </div>
    </div>
  );
}
