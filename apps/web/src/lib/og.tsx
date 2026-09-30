import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

/** Branded social card: text on white, the monogram on the blue grid (Meeko hero layout). */
export function renderOgImage({
  eyebrow,
  title,
  footer,
  initial,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  initial: string;
}) {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#ffffff' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '64%',
          padding: '64px 60px',
          borderRight: '2px solid #111111',
          color: '#111111',
        }}
      >
        <div
          style={{ display: 'flex', fontSize: 22, letterSpacing: 3, textTransform: 'uppercase' }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 70 ? 48 : title.length > 45 ? 56 : 66,
            lineHeight: 1.06,
            letterSpacing: -2,
            fontWeight: 600,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#5b6170' }}>{footer}</div>
      </div>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#eaf2ff',
          backgroundImage:
            'linear-gradient(to right, rgba(30,94,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,94,255,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 250,
            height: 250,
            borderRadius: 999,
            background: '#ffc83d',
            border: '2px solid #111111',
            fontSize: 150,
            fontWeight: 600,
            color: '#111111',
          }}
        >
          {initial}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
