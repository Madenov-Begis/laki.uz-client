import { HomePageApi } from '@/features/home-page/api/home-page-api'
import { useProductList } from '@/features/home-page/context/products-list'
import { Category } from '@/features/home-page/types/types'
import { Categories } from '@/features/home-page/ui/categories'
import { PageHead } from '@/features/home-page/ui/page-head'
import { ProductsList } from '@/features/home-page/ui/products-list'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { HTTPError } from '@/shared/types/Errors'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { Input } from '@/shared/ui/input/input'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const HomePage = () => {
  const { locale } = useParams()
  const { tg } = useTelegram()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const {
    isLoading,
    isPageLoading,
    products,
    setCategory_id,
    setKeyWord,
    setPage,
    totalPage,
    category_id,
    page,
  } = useProductList()

  const [categories, setCategories] = useState<Category[] | null>(null)
  const [categoryLoading, setCategoryLoading] = useState(false)
  const [basketCount, setBasketCount] = useState<number>(0)
  const [error, setError] = useState('')

  const getBasketCount = async () => {
    try {
      await HomePageApi.basketCount().then((data) =>
        setBasketCount(data.data.count)
      )
    } catch (error) {
      const err = error as HTTPError

      setError(err.message)
    }
  }

  const getCategories = async () => {
    try {
      setCategoryLoading(true)
      const res = await HomePageApi.getCategories(locale)

      setCategories(res.data)
    } catch (error) {
      const err = error as HTTPError

      setError(err.message)
    } finally {
      setCategoryLoading(false)
    }
  }

  useEffect(() => {
    tg.ready()
    tg.isClosingConfirmationEnabled = true
    tg.BackButton.hide()
    getCategories()
    getBasketCount()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (basketCount > 0) {
      tg.MainButton.show()
      tg.MainButton.setText(`${t('goToCart')} (${basketCount})`)
      tg.MainButton.onClick(() => navigate(`/${locale}/cart`))
    }
    if (!basketCount) {
      tg.MainButton.hide()
    }

    return () => {
      tg.MainButton.offClick(() => navigate(`/${locale}/cart`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basketCount])

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHead locale={locale} basketCount={basketCount} />

      <div className="space-y-4">
        <Input
          label={t('search')}
          placeholder={t('search')}
          icon={true}
          type="search"
          setKeyWord={setKeyWord}
        />

        {error && <ErrorAlert errorText={error} />}
      </div>

      <Categories
        categoryLoading={categoryLoading}
        categories={categories}
        setCategory_id={setCategory_id}
        category_id={category_id}
      />

      {/* Decorative Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-gradient-to-r from-blue-50 via-white to-purple-50 text-gray-500 font-medium">
            Товары
          </span>
        </div>
      </div>

      <ProductsList
        isLoading={isLoading}
        products={products}
        locale={locale}
        setBasketCount={setBasketCount}
      />

      {page < totalPage && totalPage > 1 && (
        <div className="text-center pt-4">
          <button
            className="bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white font-medium px-8 py-3 rounded-xl shadow-medium hover:shadow-strong transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={isPageLoading}
          >
            <div className="flex items-center justify-center gap-2">
              {isPageLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              <span>{t('show10')}</span>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}

export default HomePage
