import { Button } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../types/product-detail'
import { ProductDetailApi } from '../api/product-detail-api'
import { useParams } from 'react-router-dom'
import { HomePageApi } from '@/features/home-page/api/home-page-api'
import clsx from 'clsx'

export const ProductDetailList = () => {
  const { id, locale } = useParams()

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getProductOne = async () => {
      try {
        setIsFetching(true)
        await ProductDetailApi.getProductDetail({ locale, productId: id }).then(
          (data) => setProduct(data.data)
        )
      } catch (error) {
        console.log(error)
      } finally {
        setIsFetching(false)
      }
    }
    getProductOne()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addToCArt = async (productId: number | undefined) => {
    try {
      setIsLoading(true)
      await HomePageApi.addToBasket({
        body: {
          count: 1,
          product_id: productId,
        },
      }).then(() => {
        if (product) {
          setProduct({
            ...product,
            basket_count: 1,
          })
        }
      })
    } catch (error) {
      const err = error as Error

      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-45px)] animate-fade-in">
      <div className="flex-grow space-y-6">
        {/* Product Image */}
        <div className="relative">
          {isFetching && (
            <div className="bg-gray-200 animate-pulse rounded-2xl w-full h-80"></div>
          )}
          {!isFetching && (
            <div className="relative overflow-hidden rounded-2xl shadow-medium">
              <img
                src={product?.image}
                loading="lazy"
                alt="product-image"
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
              />
              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                {product?.is_active ? (
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-medium">
                    В наличии
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow-medium">
                    Нет в наличии
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          {/* Title */}
          {isFetching && (
            <div className="bg-gray-200 animate-pulse rounded-lg w-3/4 h-8"></div>
          )}
          {!isFetching && (
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">
              {product?.title}
            </h1>
          )}

          {/* Category */}
          {isFetching && (
            <div className="bg-gray-200 animate-pulse rounded-lg w-1/3 h-6"></div>
          )}
          {!isFetching && (
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                {product?.category.name}
              </span>
            </div>
          )}

          {/* Price */}
          {isFetching && (
            <div className="bg-gray-200 animate-pulse rounded-lg w-1/2 h-10"></div>
          )}
          {!isFetching && (
            <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {Number(product?.price).toLocaleString()}
            </div>  
          )}

          {/* Description */}
          {isFetching && (
            <div className="space-y-2">
              <div className="bg-gray-200 animate-pulse rounded-lg w-full h-4"></div>
              <div className="bg-gray-200 animate-pulse rounded-lg w-full h-4"></div>
              <div className="bg-gray-200 animate-pulse rounded-lg w-3/4 h-4"></div>
            </div>
          )}
          {!isFetching && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                Описание
              </h2>
              <div className="text-gray-600 leading-relaxed bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
                {product?.description}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div className="flex-grow-0 pt-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        {!!product?.basket_count && (
          <Button
            title="Добавлено в корзину"
            loading={isLoading}
            onClick={() => {}}
            variant="outline"
            size="lg"
            className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
          />
        )}
        {!product?.basket_count && (
          <Button
            title="Добавить в корзину"
            loading={isLoading}
            variant={product?.is_active ? "primary" : "outline"}
            size="lg"
            className={clsx({
              'opacity-50 cursor-not-allowed': !product?.is_active,
            })}
            onClick={() => {
              if (product?.is_active) {
                addToCArt(product?.id)
              }
            }}
          />
        )}
      </div>
    </div>
  )
}
