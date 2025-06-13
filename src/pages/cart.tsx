import { CartApi } from '@/features/cart/api/cart-api'
import { CartItem } from '@/features/cart/types/cart-types'
import { CartFooter } from '@/features/cart/ui/cart-footer'
import { CartPoduct } from '@/features/cart/ui/cart-product'
import useFirstRender from '@/shared/hooks/useFirstRender'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { Button } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'

const Cart = () => {
  const { t } = useTranslation()

  const isFirstRender = useFirstRender()
  const { tg } = useTelegram()
  const navigate = useNavigate()
  const { locale } = useParams()

  useEffect(() => {
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      navigate(`/${locale}`)
    })
  })

  const [cartItem, setCartItem] = useState<CartItem[] | null>(null)
  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)
  const [deliverPrice, setDeliverPrice] = useState<number | undefined>(
    undefined
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteLoading, setDeleteIsloading] = useState<number | null>(null)
  const [isPlusLoading, setPlusLoading] = useState<number | null>(null)
  const [isMinusLoading, setMinusLoading] = useState<number | null>(null)

  const getBasket = async () => {
    try {
      if (isFirstRender) setIsLoading(true)

      await CartApi.getAll(locale).then((data) => {
        setCartItem(data.data.baskets)
        setTotalPrice(data.data.total_price)
        setDeliverPrice(data.data.deleviry_price)
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isFirstRender) getBasket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstRender])

  const handleDelete = async (id: number) => {
    try {
      setDeleteIsloading(id)
      await CartApi.delete({ id, locale })
      getBasket()
    } catch (error) {
      console.log(error)
    } finally {
      setDeleteIsloading(null)
    }
  }

  const handleAddCount = async (id: number) => {
    try {
      setPlusLoading(id)
      await CartApi.changeCount({ id, body: { count: 1 }, locale })
      setCartItem((prev) =>
        prev
          ? prev.map((item) =>
              item.id === id
                ? { ...item, count: item.count + 1 }
                : item
            )
          : prev
      )
    } catch (error) {
      console.log(error)
    } finally {
      setPlusLoading(null)
    }
  }

  const handleMinusCount = async (id: number, count: number) => {
    try {
      if (count > 1) {
        setMinusLoading(id)
        await CartApi.changeCount({ id, body: { count: -1 }, locale })
        setCartItem((prev) =>
          prev
            ? prev.map((item) =>
                item.id === id
                  ? { ...item, count: item.count - 1 }
                  : item
              )
            : prev
        )
      }
    } catch (error) {
      console.log(error)
    } finally {
      setMinusLoading(null)
    }
  }

  useEffect(() => {
    if (cartItem?.length) {
      tg.MainButton.show()
      tg.MainButton.setText(t('goToOrder'))
      tg.MainButton.onClick(() => navigate(`/${locale}/order`))
    }
    if (!cartItem?.length) {
      tg.MainButton.hide()
    }

    return () => {
      tg.MainButton.offClick(() => navigate(`/${locale}/order`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItem?.length])

  return (
    <div className="flex flex-col h-[calc(100vh-45px)] animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('cart')}
          </h1>
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-grow space-y-4">
        {isLoading &&
          [1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 space-y-3 animate-pulse">
              <div className="flex gap-4">
                <div className="bg-gray-200 rounded-xl w-20 h-20"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          ))}

        {!isLoading &&
          cartItem?.map((item, index) => {
            return (
              <div 
                key={item.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CartPoduct
                  item={item}
                  isDeleteLoading={isDeleteLoading}
                  isPlusLoading={isPlusLoading}
                  isMinusLoading={isMinusLoading}
                  handleDelete={handleDelete}
                  handleAddCount={handleAddCount}
                  handleMinusCount={handleMinusCount}
                />
              </div>
            )
          })}

        {cartItem?.length === 0 && (
          <div className="text-center space-y-6 py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{t('emptyCart')}</h3>
              <p className="text-gray-600">Добавьте товары в корзину для оформления заказа</p>
            </div>
            <Button
              title={t('catalog')}
              loading={isLoading}
              onClick={() => navigate('/' + locale)}
              variant="primary"
              size="md"
              className="w-auto px-8"
            />
          </div>
        )}
      </div>

      <CartFooter deliverPrice={deliverPrice} totalPrice={totalPrice} />
    </div>
  )
}

export default Cart
