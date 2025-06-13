import { Link } from 'react-router-dom'
import { Button } from '../../../shared/ui'
import { Product } from '../types/types'
import { useAddToCart } from '@/shared/hooks/useAddToCart'
import { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { clsx } from 'clsx'

interface ProductCardProps {
  product: Product
  locale: string | undefined
  setBasketCount: Dispatch<SetStateAction<number>>
}

export const ProductCard = ({
  product,
  locale,
  setBasketCount,
}: ProductCardProps) => {
  const { t } = useTranslation()

  const { addToCArt, isLoading, error } = useAddToCart()

  return (
    <>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div
        key={product.id}
        className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 animate-fade-in overflow-hidden"
      >
        <Link to={`/${locale}/product/${product.id}`} className="block">
          <div className="relative overflow-hidden">
            <img
              loading="lazy"
              src={product.image}
              alt="product-foto"
              className="w-full aspect-[3/4] object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 right-3">
              {product.is_active ? (
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-medium">
                  В наличии
                </span>
              ) : (
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-medium">
                  Нет в наличии
                </span>
              )}
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div className="space-y-2">
              <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-primary-600 transition-colors duration-200">
                {product.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-xs font-medium px-2 py-1 rounded-full">
                  {product.category.name}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {Number(product?.price).toLocaleString()}
              </div>
            </div>
          </div>
        </Link>

        <div className="p-4 pt-0">
          {!!product.basket_count && (
            <Button
              title={t('addedToCart')}
              loading={isLoading}
              onClick={() => {}}
              variant="outline"
              size="sm"
              className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            />
          )}

          {!product.basket_count && (
            <Button
              title={t('addToCart')}
              loading={isLoading}
              variant={product.is_active ? "primary" : "outline"}
              size="sm"
              className={clsx({
                'opacity-50 cursor-not-allowed': !product.is_active,
              })}
              onClick={() => {
                if (product.is_active) {
                  addToCArt(product.id)
                  setBasketCount((prev) => prev + 1)
                }
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
