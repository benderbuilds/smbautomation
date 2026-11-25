'use client';

import { useState } from 'react';
import { Signal, type Conversation } from './Conversation';
import p from '../app/(site)/page.module.css';

export default function HomeSample({ chat, phone }: { chat: Conversation; phone: Conversation }) {
  const [selected, setSelected] = useState(chat.channel);
  const sample = selected === chat.channel ? chat : phone;
  const isChat = sample.channel === 'Website chat';
  return (
    <div className={p.preview}>
      <div className={p.previewHead}><strong>Front Desk Assistant</strong><span>Example conversations</span></div>
      <div className={p.workspace}>
        <div className={p.inbox} role="group" aria-label="Select an example inquiry">
          {[chat, phone].map(item => <button type="button" key={item.channel} aria-pressed={selected === item.channel}
            onClick={() => setSelected(item.channel)}>
            <Signal chat={item.channel === 'Website chat'} />
            <span><strong>{item.channel}</strong><small>{item.business}</small></span>
          </button>)}
        </div>
        <div className={p.inquiry} aria-live="polite">
          <div className={p.receipt}><small>{isChat ? 'Inspection requested' : sample.result}</small>
            <strong>{isChat ? 'Roof inspection · Friday, 10:00 AM' : sample.detail}</strong>
            <span>{isChat ? 'Confirm the service address before dispatch.' : sample.next}</span></div>
          <dl>{sample.lines.map((line, i) => <div key={line}><dt>{i % 2 ? 'Assistant' : sample.who}</dt><dd>{line}</dd></div>)}</dl>
        </div>
      </div>
    </div>
  );
}
