import s from './FrontDesk.module.css';

export interface Conversation {
  channel: 'Phone call' | 'Website chat';
  time: string;
  business: string;
  who: string;
  lines: string[];
  result: string;
  detail: string;
  next: string;
}

export function Signal({ chat = false }: { chat?: boolean }) {
  return chat ? (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M3 4h20v14H11l-6 5v-5H3z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 9h12M7 13h8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  ) : (
    <svg width="28" height="26" viewBox="0 0 28 26" aria-hidden="true" fill="none">
      <path d="M2 10v6m5-11v16m5-20v24m5-18v12m5-15v18m5-12v6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function ConversationSample({ sample }: { sample: Conversation }) {
  return (
    <figure className={s.sample} aria-label={`Example ${sample.channel.toLowerCase()} for ${sample.business}`}>
      <div className={s.sampleCap}>
        <span><Signal chat={sample.channel === 'Website chat'} />Example {sample.channel.toLowerCase()}</span>
        <span>{sample.time}</span>
      </div>
      <div className={s.transcript}>
        <p className={s.business}>{sample.business}</p>
        <dl>{sample.lines.map((line, i) => (
          <div key={line} className={s.line}>
            <dt>{i % 2 ? 'Assistant' : sample.who}</dt><dd>{line}</dd>
          </div>
        ))}</dl>
      </div>
      <figcaption className={s.handoff}>
        <span className={s.resultLabel}><span aria-hidden="true">✓</span> {sample.result}</span>
        <strong>{sample.detail}</strong><span>{sample.next}</span>
      </figcaption>
    </figure>
  );
}
