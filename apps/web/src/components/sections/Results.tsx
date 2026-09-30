import type { Metric, SectionContent } from '@aarij/shared';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';
import { formatMetric } from '@/lib/format';
import { Section } from './Section';

export function Results({
  content,
  metrics,
}: {
  content: SectionContent<'results'>;
  metrics: Metric[];
}) {
  if (metrics.length === 0) return null;
  return (
    <Section id="results">
      <SectionHeading
        id="results-title"
        title={content.title}
        intro={content.intro}
        align="center"
      />
      <ul className="mx-auto mt-12 flex max-w-6xl flex-wrap justify-center gap-3 md:gap-4">
        {metrics.map((metric, index) => (
          <li
            key={metric.id}
            data-metric
            className="flex items-center gap-4 rounded-full border border-ink bg-white py-3 pr-6 pl-5"
          >
            <span
              data-metric-value={metric.value}
              data-metric-decimals={metric.decimals}
              data-metric-prefix={metric.prefix}
              data-metric-suffix={metric.suffix}
              className={cn(
                'text-outline text-[2.5rem] leading-none font-medium tracking-[-0.04em] tabular-nums md:text-[2.75rem]',
                index % 2 === 0
                  ? '[--outline-color:var(--color-blue)]'
                  : '[--outline-color:var(--color-ink)]',
              )}
            >
              {formatMetric(metric)}
            </span>
            <span className="flex max-w-[11rem] flex-col text-left">
              <span className="text-sm leading-tight font-medium">{metric.label}</span>
              <span className="mt-0.5 text-xs leading-snug text-grey-600">{metric.context}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
