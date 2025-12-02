import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center font-sans font-semibold text-sm tracking-wide uppercase transition-all duration-300 rounded-sm disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gold text-white hover:bg-gold-dark shadow-md hover:shadow-lg',
        secondary: 'bg-charcoal text-white hover:bg-charcoal-700',
        outline: 'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-white',
        outlineWhite: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-charcoal',
        ghost: 'bg-transparent text-charcoal hover:bg-gray-100',
        link: 'bg-transparent text-gold hover:text-gold-dark underline-offset-4 hover:underline p-0',
      },
      size: {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3',
        lg: 'px-8 py-4 text-base',
        icon: 'w-10 h-10 p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Button.displayName = 'Button'
