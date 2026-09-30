import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';
import { parseEmphasis, RichText } from './RichText';
import { ScallopFrame } from './ScallopFrame';

describe('parseEmphasis', () => {
  it('splits **bold** markers into emphasized segments', () => {
    expect(parseEmphasis('More **leads** and **customers**.')).toEqual([
      { text: 'More ', strong: false },
      { text: 'leads', strong: true },
      { text: ' and ', strong: false },
      { text: 'customers', strong: true },
      { text: '.', strong: false },
    ]);
  });

  it('leaves text without markers untouched', () => {
    expect(parseEmphasis('Plain text')).toEqual([{ text: 'Plain text', strong: false }]);
  });
});

describe('RichText', () => {
  it('renders emphasized segments as strong elements', () => {
    render(<RichText text="Built on **real data**." />);
    expect(screen.getByText('real data').tagName).toBe('STRONG');
  });
});

describe('Button', () => {
  it('renders a link when given an href', () => {
    render(<Button href="#contact">Let&apos;s Talk</Button>);
    expect(screen.getByRole('link', { name: "Let's Talk" })).toHaveAttribute('href', '#contact');
  });

  it('renders a button element otherwise', () => {
    render(<Button type="submit">Send</Button>);
    expect(screen.getByRole('button', { name: 'Send' })).toHaveAttribute('type', 'submit');
  });
});

describe('ScallopFrame', () => {
  it('shows the initial as a fallback when there is no image', () => {
    render(<ScallopFrame image={null} fallbackLabel="Aarij" />);
    expect(screen.getByRole('img', { name: 'Aarij — portrait coming soon' })).toHaveTextContent(
      'A',
    );
  });

  it('renders the image with its alt text', () => {
    render(
      <ScallopFrame
        image={{ src: '/media/portrait.webp', width: 800, height: 1000, alt: 'Aarij smiling' }}
        fallbackLabel="Aarij"
      />,
    );
    expect(screen.getByRole('img', { name: 'Aarij smiling' })).toBeInTheDocument();
  });
});
