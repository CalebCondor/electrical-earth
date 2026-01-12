import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 pb-6 border-b border-border/50 justify-center sm:justify-start">
      {categories.map((category, index) => {
        const isActive = activeCategory === category;
        return (
          <motion.button
            key={category}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                delay: index * 0.1,
              },
            }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.9, rotate: -2 }}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out z-0",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-primary rounded-full -z-10 shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {category}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
