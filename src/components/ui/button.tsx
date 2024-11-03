import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils/style'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap !text-body-big font-baskerville ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none',
    {
        variants: {
            variant: {
                default: 'bg-primary-dark-gray text-primary-white border border-primary-white hover:bg-primary-white hover:text-primary-dark-gray hover:border-primary-dark-gray disabled:bg-primary-medium-gray/70',
                destructive: 'bg-accent-red text-primary-white border border-primary-white hover:bg-primary-white hover:text-accent-red hover:border-accent-red',
                light: 'border border-primary-dark-gray bg-primary-white text-primary-dark-gray hover:bg-primary-dark-gray hover:border-primary-white hover:text-primary-white',
                secondary: 'bg-primary-dark-gray bg-clip-text hover:bg-gradient-gold text-transparent w-fit !h-fit !p-0',
                'sidebar-link': '!h-fit bg-primary-dark-gray !text-primary-white text-body-medium font-dm-sans capitalize rounded-lg opacity-50 !px-4 !py-2.5 lg:hover:bg-primary-white lg:hover:!text-primary-dark-gray disabled:bg-primary-medium-gray/70',
                'sidebar-link-active': '!h-fit bg-sidebar-link-active !text-primary-white text-body-medium font-dm-sans font-medium capitalize rounded-lg !px-4 !py-2.5 disabled:bg-primary-medium-gray/70',
                'sidebar-link-disabled': '!h-fit bg-primary-dark-gray !text-primary-white text-body-medium font-dm-sans capitalize rounded-lg opacity-25 pointer-events-none !px-4 !py-2.5',
                link: 'text-primary underline-offset-4 hover:underline',
                shadow: 'p-2 shadow-button bg-primary-white hover:bg-primary-light-gray',
                outline: 'border border-primary-dark-gray bg-transparent text-primary-dark-gray hover:bg-primary-dark-gray hover:text-primary-white'
            },
            size: {
                default: 'h-[45px] px-4 py-2',
                sm: 'h-9 px-3',
                lg: 'h-11 px-8',
                icon: 'h-10 w-10'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        const isChildrenString = typeof props.children === 'string'
        if (isChildrenString) {
            props.children = <span className=' leading-none'>{props.children}</span>
        }
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
