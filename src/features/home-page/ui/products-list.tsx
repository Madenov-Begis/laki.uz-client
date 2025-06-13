import { Dispatch, SetStateAction } from 'react'
import { Product } from '../types/types'
import { ProductCard } from './product-card'

interface ProductsListProps {
  isLoading: boolean
  products: Product[] | undefined
  locale: string | undefined
  setBasketCount: Dispatch<SetStateAction<number>>
}

export const ProductsList = ({
  isLoading,
  locale,
  products,
  setBasketCount,
}: ProductsListProps) => {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {isLoading &&
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div key={item} className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 space-y-4 animate-pulse">
            <div className="bg-gray-200 rounded-xl h-48"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg"></div>
          </div>
        ))}

      {!isLoading &&
        products?.map((product, index) => {
          return (
            <div 
              key={product.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProductCard
                locale={locale}
                product={product}
                setBasketCount={setBasketCount}
              />
            </div>
          )
        })}
    </div>
  )
}
