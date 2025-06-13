import { useTelegram } from '@/shared/hooks/useTelegram'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface SelectedProductsProps {
  locale: string | undefined
  basketCount: number | null
}

export const PageHead = ({ locale, basketCount }: SelectedProductsProps) => {
  const { t } = useTranslation()
  const { user } = useTelegram()

  const navigate = useNavigate()

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header with Logo and Cart */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-medium">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            SALTANAT OPTOM
          </div>
        </div>
        
        {/* Cart Button */}
        <div
          className="relative group cursor-pointer transition-all duration-300 transform hover:scale-105"
          onClick={() => navigate(`/${locale}/cart`)}
        >
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-3 rounded-xl shadow-medium hover:shadow-strong transition-all duration-300">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.7982 22.3958H16.4939C19.6879 22.3958 22.1383 21.2421 21.4424 16.5988L20.6319 10.3058C20.2028 7.98886 18.725 7.10213 17.4282 7.10213H6.82566C5.50986 7.10213 4.1178 8.05561 3.62199 10.3058L2.81154 16.5988C2.2204 20.7177 4.60407 22.3958 7.7982 22.3958Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.65527 6.87332C7.65527 4.38783 9.67016 2.37294 12.1556 2.37294C13.3525 2.36787 14.5021 2.83977 15.3502 3.68431C16.1983 4.52885 16.6751 5.67644 16.6751 6.87332"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.06641 11.5644H9.11408"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.1399 11.5644H15.1876"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Cart Badge */}
          {basketCount ? (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-medium animate-bounce-soft">
              {basketCount}
            </div>
          ) : null}
        </div>
      </div>

      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-xl border border-primary-100 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <div className="text-sm text-gray-600">{t('welcome')}</div>
            <div className="font-semibold text-gray-800">{user?.username}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
