import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'SMB Automation';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const title = post?.title ?? 'SMB Automation';
  const tag = post?.tag ?? 'Playbook';

  /* Long trade-playbook titles need a smaller set to stay on four lines. */
  const fontSize = title.length > 95 ? 52 : title.length > 60 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0A0E1A',
          padding: '72px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 40, height: 3, background: '#E84E1A', display: 'flex' }} />
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              letterSpacing: 4,
              color: 'rgba(255,255,255,0.72)',
              textTransform: 'uppercase',
            }}
          >
            {tag}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize,
            color: '#FFFFFF',
            lineHeight: 1.14,
            letterSpacing: -1,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 26,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: 1,
          }}
        >
          <div style={{ display: 'flex' }}>SMB Automation</div>
          <div style={{ display: 'flex' }}>smbautomation.io</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
