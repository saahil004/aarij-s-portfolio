import { Fragment } from 'react';
import { cn } from '@/lib/cn';

export type Segment = { text: string; strong: boolean };

/** Splits `**bold**` markers used in admin-editable intros. */
export function parseEmphasis(input: string): Segment[] {
  return input
    .split(/\*\*(.+?)\*\*/g)
    .map((text, index) => ({ text, strong: index % 2 === 1 }))
    .filter((segment) => segment.text.length > 0);
}

export function RichText({ text, strongClassName }: { text: string; strongClassName?: string }) {
  return (
    <>
      {parseEmphasis(text).map((segment, index) =>
        segment.strong ? (
          // biome-ignore lint/suspicious/noArrayIndexKey: segments are static and never reorder
          <strong key={index} className={cn('font-semibold text-ink', strongClassName)}>
            {segment.text}
          </strong>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: segments are static and never reorder
          <Fragment key={index}>{segment.text}</Fragment>
        ),
      )}
    </>
  );
}
