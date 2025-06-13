import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
  icon: boolean
  type: string
  error?: boolean
  errorMessage?: string | undefined
}

export const InputRef = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { label, placeholder, type, error, errorMessage, ...otherProps } =
      props

    return (
      <div className="w-full space-y-2 animate-fade-in">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          className={clsx(
            'w-full px-4 py-3 text-base transition-all duration-300',
            'border border-gray-300 rounded-xl',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'hover:border-gray-400',
            'bg-white/80 backdrop-blur-sm',
            'shadow-soft hover:shadow-medium',
            'placeholder-gray-400',
            error && 'border-red-500 focus:ring-red-500'
          )}
          ref={ref}
          {...otherProps}
        />
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm animate-slide-up">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    )
  }
)

InputRef.displayName = 'Input'
