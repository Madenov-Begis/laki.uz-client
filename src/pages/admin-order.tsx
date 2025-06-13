import { AdminOrderApi } from '@/features/admin-order/api/admin-order-api'
import { AdminOrderType } from '@/features/admin-order/types/type'
import { HTTPError } from '@/shared/types/Errors'
import { ErrorAlert } from '@/shared/ui/error-alert/error-alert'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import clsx from 'clsx'

const AdminOrder = () => {
  const { uuid } = useParams()

  const [newOrder, setNewOrder] = useState<AdminOrderType | null>(null)
  const [isLoading, setIsloading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const getAdminOrder = async () => {
      try {
        setIsloading(true)
        await AdminOrderApi.getOrder(uuid).then((data) =>
          setNewOrder(data.data)
        )
      } catch (error) {
        const err = error as HTTPError

        setError(err.message)
      } finally {
        setIsloading(false)
      }
    }

    getAdminOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          text: 'В обработке',
          className: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          )
        }
      case 'rejected':
        return {
          text: 'Отказано',
          className: 'bg-gradient-to-r from-red-500 to-red-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          )
        }
      case 'approved':
        return {
          text: 'Принято',
          className: 'bg-gradient-to-r from-green-500 to-green-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )
        }
      default:
        return {
          text: status || 'Неизвестно',
          className: 'bg-gradient-to-r from-gray-500 to-gray-600 text-white',
          icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          )
        }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {!!error && (
        <div className="w-full">
          <ErrorAlert errorText={error} />
        </div>
      )}

      {isLoading && (
        <div className="w-full h-96 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {!isLoading && newOrder && (
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Новый заказ
              </h1>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              Информация о заказе
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">ФИО:</span>
                  <span className="font-semibold text-gray-800">{newOrder.full_name}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Регистрационный номер:</span>
                  <span className="font-semibold text-gray-800">{newOrder.order_id}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Номер телефона:</span>
                  <span className="font-semibold text-gray-800">{newOrder.phone}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Адрес:</span>
                  <span className="font-semibold text-gray-800 text-right">{newOrder.address}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Статус:</span>
                  <span className={clsx('px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1', getStatusInfo(newOrder.status).className)}>
                    {getStatusInfo(newOrder.status).icon}
                    {getStatusInfo(newOrder.status).text}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
              Товары в заказе
            </h2>
            
            <div className="space-y-4">
              {newOrder.items.map((item, index) => {
                return (
                  <div
                    className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-soft animate-fade-in"
                    key={item.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
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
                          {item.product.price.toLocaleString()} ₽
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
  )
}

export default AdminOrder
