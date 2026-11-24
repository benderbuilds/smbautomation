import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'SMB Automation: AI phone answering and website chat. 30-day free trial.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
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
            SMB Automation
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 76, color: '#FFFFFF', lineHeight: 1.08 }}>
            Never miss a call.
          </div>
          <div style={{ display: 'flex', fontSize: 76, color: '#7B8CF5', lineHeight: 1.08 }}>
            Book more jobs.
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: 'rgba(255,255,255,0.72)', marginTop: 28 }}>
            AI phone answering and website chat. 30-day free trial.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: 1,
          }}
        >
          smbautomation.io
        </div>
      </div>
    ),
    { ...size }
  );
}
