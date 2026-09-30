import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'outline' | 'solid' | 'light';

/** Buttons lift onto a hard shadow on hover and press flat when clicked. */
const variants: Record<Variant, string> = {
  outline:
    'border-ink bg-white text-ink hover:bg-yellow-50 hover:shadow-[3px_3px_0_0_var(--color-ink)]',
  solid:
    'border-ink bg-blue text-white shadow-[2px_2px_0_0_var(--color-ink)] hover:shadow-[4px_4px_0_0_var(--color-ink)]',
  light:
    'border-white bg-white text-ink hover:bg-yellow-100 hover:shadow-[3px_3px_0_0_var(--color-yellow)]',
};

const base =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-[0.8125rem] font-medium leading-none whitespace-nowrap transition-[background-color,box-shadow,translate] duration-200 hover:-translate-x-px hover:-translate-y-px active:translate-0 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60';

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
  /** Follows the pointer slightly on hover (motion layer, fine pointers only). */
  magnetic?: boolean;
};

type LinkProps = CommonProps & {
  href: string;
  /** Set for files; the value becomes the suggested file name. */
  download?: string;
  external?: boolean;
};

type NativeProps = CommonProps & Omit<ComponentProps<'button'>, 'className'> & { href?: undefined };

export function Button(props: LinkProps | NativeProps) {
  const classes = cn(base, variants[props.variant ?? 'outline'], props.className);
  const magnetic = props.magnetic ? { 'data-magnetic': true } : {};

  if (props.href !== undefined) {
    const { href, download, external, children } = props;
    if (download !== undefined || external || /^https?:/.test(href)) {
      return (
        <a
          href={href}
          className={classes}
          download={download}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...magnetic}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...magnetic}>
        {children}
      </Link>
    );
  }

  const {
    variant: _variant,
    className: _className,
    children,
    href: _href,
    magnetic: _magnetic,
    ...rest
  } = props;
  return (
    <button type="button" {...rest} className={classes} {...magnetic}>
      {children}
    </button>
  );
}
