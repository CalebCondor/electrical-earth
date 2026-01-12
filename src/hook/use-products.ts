import { useEffect, useState } from "react"
import axios from "axios"
import { mockCatalogData } from "@/lib/data"

export interface Product {
    id: number
    slug: string
    titulo: string
    resumen: string
    detalle: string
    precio: string
    imagen: string
    tags: string[]
    url: string
}

export interface CategorizedProducts {
    [category: string]: Product[]
}

export function useProducts() {
    const [products, setProducts] = useState<CategorizedProducts | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 🔹 MOCK (actual)
                setProducts(mockCatalogData)

                // 🔹 API REAL (cuando tengas proxy / backend)
                // const response = await axios.get<CategorizedProducts>("/api/products")
                // setProducts(response.data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return {
        products,
        isLoading,
        isError: !!error,
        error,
    }
}
