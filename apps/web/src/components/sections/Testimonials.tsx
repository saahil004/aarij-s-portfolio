import type { SectionContent, Testimonial } from '@aarij/shared';
import { Star } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

const STARS = [1, 2, 3, 4, 5];

/** Hidden until genuine testimonials exist. */
export function Testimonials({
  content,
  testimonials,
}: {
  content: SectionContent<'testimonials'>;
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) return null;
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="border-y border-ink bg-grid py-20 md:py-28"
    >
      <div className="container-page">
        <SectionHeading
          id="testimonials-title"
          title={content.title}
          intro={content.intro}
          align="center"
        />
        <ul
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a horizontally scrollable region must be keyboard-focusable
          tabIndex={0}
          aria-label="Testimonials"
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
        >
          {testimonials.map((testimonial) => (
            <li
              key={testimonial.id}
              className="w-[min(85vw,22rem)] shrink-0 snap-start rounded-2xl border border-ink bg-white p-6"
            >
              <figure className="flex h-full flex-col">
                <div
                  role="img"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                  className="flex gap-1"
                >
                  {STARS.map((star) => (
                    <Star
                      key={star}
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className={cn(
                        'size-4',
                        star <= testimonial.rating ? 'fill-yellow text-ink' : 'text-ink/30',
                      )}
                    />
                  ))}
                </div>
                <blockquote className="mt-5 text-sm leading-relaxed">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-auto pt-6">
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-grey-600">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
