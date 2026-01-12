"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface CategoryTabsProps {
    categories: string[]
    activeCategory: string
    onCategoryChange: (category: string) => void
}

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
    return (
        <div className="flex flex-wrap gap-2 pb-6 border-b border-border">
            {categories.map((category) => (
                <motion.div
                    key={category}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <Button
                        variant={activeCategory === category ? "default" : "outline"}
                        onClick={() => onCategoryChange(category)}
                        className="capitalize transition-all duration-200"
                    >
                        {category}
                    </Button>
                </motion.div>
            ))}
        </div>
    )
}
