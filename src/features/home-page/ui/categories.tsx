import clsx from 'clsx'
import { Category } from '../types/types'
import { useTranslation } from 'react-i18next'

interface CategoryProps {
  categoryLoading: boolean
  categories: Category[] | null
  setCategory_id: (id: number) => void
  category_id: number | null
}

export const Categories = ({
  categoryLoading,
  categories,
  setCategory_id,
  category_id,
}: CategoryProps) => {
  const { t } = useTranslation()

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800">{t('chooseCategory')}</h2>
      </div>

      <div className="overflow-x-auto scroll-m-4 no-scrollbar">
        <div className="inline-flex gap-3 select-none pb-2">
          {categoryLoading &&
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                className="bg-gray-200 animate-pulse w-24 h-10 rounded-xl"
              ></div>
            ))}
          {!categoryLoading &&
            categories?.map((category) => (
              <button
                key={category.id}
                type="button"
                className={clsx(
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 active:scale-95',
                  'border-2 shadow-soft hover:shadow-medium',
                  category.id === category_id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white border-transparent shadow-medium'
                    : 'bg-white/80 backdrop-blur-sm border-gray-200 text-gray-700 hover:border-primary-300 hover:text-primary-600'
                )}
                onClick={() => setCategory_id(category.id)}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}
