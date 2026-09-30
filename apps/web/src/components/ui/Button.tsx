import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'outline' | 'solid' | 'light';

const variants: Record<Variant, string> = {
  outline: 'border-ink bg-white text-ink hover:bg-yellow-50',
  solid: 'border-ink bg-blue text-white hover:bg-ink',
  light: 'border-white bg-white text-ink hover:bg-yellow-100',
};

const base =
  'inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-[0.8125rem] font-medium leading-none whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60';

type CommonProps = { variant?: Variant; className?: string; children: ReactNode };

type LinkProps = CommonProps & {
  href: string;
  /** Set for files; the value becomes the suggested file name. */
  download?: string;
  external?: boolean;
};

type NativeProps = CommonProps & Omit<ComponentProps<'button'>, 'className'> & { href?: undefined };

export function Button(props: LinkProps | NativeProps) {
  const classes = cn(base, variants[props.variant ?? 'outline'], props.className);

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
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { variant: _variant, className: _className, children, href: _href, ...rest } = props;
  return (
    <button type="button" {...rest} className={classes}>
      {children}
    </button>
  );
}
