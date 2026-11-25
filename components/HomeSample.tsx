'use client';

import { useState } from 'react';
import ConversationSample, { type Conversation } from './Conversation';
import s from './FrontDesk.module.css';

export default function HomeSample({ chat, phone }: { chat: Conversation; phone: Conversation }) {
  const [voice, setVoice] = useState(false);
  return <div className={s.stage}>
    <div className={s.switcher} role="group" aria-label="Choose a sample conversation">
      <button type="button" aria-pressed={!voice} onClick={() => setVoice(false)}>Website chat</button>
      <button type="button" aria-pressed={voice} onClick={() => setVoice(true)}>Phone call</button>
    </div>
    <ConversationSample sample={voice ? phone : chat} />
  </div>;
}
