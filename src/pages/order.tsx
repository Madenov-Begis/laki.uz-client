import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { PatternFormat } from 'react-number-format'

import { CartApi } from '@/features/cart/api/cart-api'
import { OrderApi } from '@/features/order/api/order-api'
import { useTelegram } from '@/shared/hooks/useTelegram'
import { HTTPError } from '@/shared/types/Errors'
import { Button, InputRef } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

interface IFormInput {
  full_name: string
  phone: string
  address: string
  order_id: string
  basket_ids: number[]
}

const Order = () => {
  const { t } = useTranslation()

  const { tg } = useTelegram()
  const navigate = useNavigate()
  const { locale } = useParams()

  const [totalPrice, setTotalPrice] = useState<number | undefined>(undefined)
  const [deliverPrice, setDeliverPrice] = useState<number | undefined>(
    undefined
  )
  const [basketIds, setBasketIds] = useState<number[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      full_name: '',
      phone: '',
      address: '',
      order_id: '',
      basket_ids: [],
    },
  })

  const getBasket = async () => {
    try {
      await CartApi.getAll(locale).then((data) => {
        setBasketIds(data.data.baskets?.map((basket) => basket.id))
        setTotalPrice(data.data.total_price)
        setDeliverPrice(data.data.deleviry_price)
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBasket()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    tg.MainButton.hide()
    tg.BackButton.show()

    tg.BackButton.onClick(() => {
      navigate(`/${locale}/cart`)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true)
      await OrderApi.orderCreate({
        body: {
          ...data,
          basket_ids: basketIds,
          phone: data.phone.slice(1),
          order_id: data.order_id,
        },
        locale,
      }).then(() => {
        setErrorText('')
        navigate(`/${locale}`)
        tg.showAlert(t('successOrder'))
        reset()
      })
    } catch (error) {
      const err = error as HTTPError

      setErrorText(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex flex-col h-[calc(100vh-45px)] animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {t('orderProduct')}
          </h1>
        </div>
      </div>

      {/* Error Alert */}
      {errorText && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 animate-slide-up">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{errorText}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <form className="flex-grow space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <InputRef
            placeholder={t('register_number')}
            label={t('register_number')}
            icon={false}
            type="tel"
            error={!!errors.order_id}
            errorMessage={errors.order_id?.message}
            {...register('order_id', { required: t('required') })}
          />

          <InputRef
            placeholder="ФИО"
            label="ФИО"
            icon={false}
            type="text"
            error={!!errors.full_name}
            errorMessage={errors.full_name?.message}
            {...register('full_name', { required: t('required') })}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {t('phone')}
            </label>
            <Controller
              name={'phone'}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, name, value } }) => (
                <PatternFormat
                  type="tel"
                  placeholder="+998 00 000 00 00"
                  format="+998 ## ### ## ##"
                  allowEmptyFormatting
                  mask=" "
                  className="w-full px-4 py-3 text-base transition-all duration-300 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent hover:border-gray-400 bg-white/80 backdrop-blur-sm shadow-soft hover:shadow-medium placeholder-gray-400"
                  name={name}
                  onChange={onChange}
                  value={value}
                  required={true}
                />
              )}
            />
            {errors.phone && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{t('required')}</span>
              </div>
            )}
          </div>

          <InputRef
            placeholder={t('address')}
            label={t('address')}
            icon={false}
            type="text"
            error={!!errors.address}
            errorMessage={errors.address?.message}
            {...register('address', { required: t('required') })}
          />
        </div>

        <Button
          title={t('order')}
          onClick={handleSubmit(onSubmit)}
          variant="primary"
          size="lg"
          className="w-full"
          loading={isLoading}
          disabled={isLoading}
        />
      </form>

      {/* Order Summary */}
      <div className="bg-white/90 backdrop-blur-sm border-t border-gray-200 rounded-t-2xl shadow-strong p-6 mt-6 animate-fade-in">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
            Итого к оплате
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('allPrice')}:</span>
              <span className="text-lg font-semibold text-gray-800">
                {totalPrice?.toLocaleString()} ₽
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">{t('deliver')}:</span>
              <span className="text-lg font-semibold text-gray-800">
                {deliverPrice?.toLocaleString()} ₽
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-800">{t('itogo')}:</span>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {totalPrice?.toLocaleString()} ₽
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
