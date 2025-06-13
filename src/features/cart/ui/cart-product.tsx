import { CartItem } from '../types/cart-types'
interface CartItemProps {
  item: CartItem
  handleMinusCount: (id: number, count: number) => void
  handleAddCount: (id: number) => void
  handleDelete: (id: number) => void
  isMinusLoading: number | null
  isPlusLoading: number | null
  isDeleteLoading: number | null
}

export const CartPoduct = (props: CartItemProps) => {
  const {
    item,
    handleMinusCount,
    handleAddCount,
    handleDelete,
    isMinusLoading,
    isPlusLoading,
    isDeleteLoading,
  } = props

  return (
    <div
      className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-soft hover:shadow-medium transition-all duration-300 group"
      key={item.id}
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative">
          <img
            src={item.product.image}
            alt="product-image"
            className="w-20 h-20 rounded-xl object-cover shadow-soft"
          />
          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-medium">
            {item.count}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-primary-600 transition-colors duration-200">
              {item.product.name}
            </h3>
            <div className="text-lg font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {Number(item.product.price).toLocaleString()}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-between items-center">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
              <button
                onClick={() => handleMinusCount(item.id, item.count)}
                disabled={isMinusLoading === item.id || item.count === 1}
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isMinusLoading === item.id ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              <span className="px-3 text-lg font-semibold text-gray-800 min-w-[2rem] text-center">
                {item.count}
              </span>

              <button
                onClick={() => handleAddCount(item.id)}
                disabled={isPlusLoading === item.id}
                className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 hover:text-primary-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlusLoading === item.id ? (
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item.id)}
              disabled={isDeleteLoading === item.id}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white flex items-center justify-center shadow-medium hover:shadow-strong transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isDeleteLoading === item.id ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
