import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import Loader from './loader';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'secondary-ghost':
          'text-secondary-foreground hover:bg-primary/10 hover:text-primary',
      },
      size: {
        default: 'px-7 py-2 h-input',
        sm: 'px-2 py-1.5 h-9',
        lg: 'px-10 py-4 h-14',
        icon: 'size-input',
        'icon-sm': 'size-10',
      },
      rounded: {
        default: '',
        full: 'rounded-full',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      children,
      asChild = false,
      loading = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const content = (
      <>
        {loading && <Loader />}
        {children}
      </>
    );
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {asChild ? children : content}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

const NavButton = ({
  path,
  children,
  active = false,
  className,
  title,
}: {
  path: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  title?: string;
}) => {
  return (
    <Button
      asChild
      variant="secondary-ghost"
      data-active={active || undefined}
      title={title}
      className="w-full justify-start gap-3 border-y-0 border-l-2 border-r-0 border-transparent px-4 py-3.5 data-[active]:border-primary data-[active]:bg-secondary data-[active]:text-primary"
    >
      <Link href={path} className={className}>
        {children}
      </Link>
    </Button>
  );
};

export { Button, buttonVariants, NavButton };
