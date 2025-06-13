import { MyOrdersApi } from '@/features/my-orders/api/my-orders'
import { MyOrdersType } from '@/features/my-orders/types/my-orders-type'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { HTTPError } from '@/shared/types/Errors'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useParams } from 'react-router-dom'

const MyOrders = () => {
  const { locale } = useParams()
  const [myOrders, setMyOrders] = useState<MyOrdersType[] | null>(null)
  const [activeOrder, setActiveOrder] = useState<number | null>(null)
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getMyOrders = async () => {
      setIsloading(true)
      try {
        await MyOrdersApi.getAll(locale).then((data) =>
          setMyOrders(data.data.data)
        )
      } catch (error) {
        const err = error as HTTPError

        setError(err.message)
      } finally {
        setIsloading(false)
      }
    }
    getMyOrders()
  }, [locale])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: 'В обработке',
          className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
          ),
        }
      case 'rejected':
        return {
          text: 'Отказано',
          className: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          ),
        }
      case 'approved':
        return {
          text: 'Принято',
          className: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ),
        }
      default:
        return {
          text: 'Неизвестно',
          className: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          ),
        }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Мои заказы
          </h1>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 space-y-3 animate-pulse"
              >
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {!isLoading &&
          myOrders?.map((order, index) => {
            const statusInfo = getStatusInfo(order.status)
            return (
              <div
                key={order.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={clsx(
                    'bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 overflow-hidden',
                    {
                      'ring-2 ring-primary-500': activeOrder === order.id,
                    }
                  )}
                >
                  {/* Order Header */}
                  <div
                    className="p-6 cursor-pointer"
                    onClick={() =>
                      setActiveOrder((prev) =>
                        prev === order.id ? null : order.id
                      )
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            #{order.id}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">
                            Номер заказа
                          </div>
                          <div className="font-bold text-lg text-gray-800">
                            {order.id}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            Дата заказа
                          </div>
                          <div className="font-semibold text-gray-800">
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1',
                              statusInfo.className
                            )}
                          >
                            {statusInfo.icon}
                            {statusInfo.text}
                          </span>
                        </div>

                        <svg
                          className={clsx(
                            'w-5 h-5 text-gray-400 transition-transform duration-300',
                            {
                              'rotate-180': activeOrder === order.id,
                            }
                          )}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  {activeOrder === order.id && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                      <div className="p-6 space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
                          Товары в заказе
                        </h3>

                        <div className="space-y-3">
                          {order.items?.length &&
                            order.items.map((item) => {
                              return (
                                <div
                                  className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 shadow-soft"
                                  key={item.id}
                                >
                                  <div className="flex gap-4">
                                    <img
                                      src={item.product.image}
                                      alt="product-image"
                                      className="w-20 h-20 rounded-xl object-cover shadow-soft"
                                    />
                                    <div className="flex-1 space-y-2">
                                      <h4 className="font-bold text-gray-800 leading-tight">
                                        {item.product.title}
                                      </h4>
                                      <div className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                                        Цена: {item.price.toLocaleString()}
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="bg-gradient-to-r from-accent-100 to-accent-200 text-accent-700 text-sm font-medium px-2 py-1 rounded-full">
                                          Количество: {item.count} шт
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}

        {myOrders?.length === 0 && (
          <div className="text-center space-y-6 py-12">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                Нет заказов
              </h3>
              <p className="text-gray-600">
                У вас пока нет оформленных заказов
              </p>
            </div>
          </div>
        )}

        {!!error && (
          <div className="w-full">
            <ErrorAlert errorText={error} />
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
