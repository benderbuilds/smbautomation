'use client';

import { useId, useRef, useState } from 'react';
import Icon, { type IconName } from '@/components/Icon';
import s from './Industry.module.css';

/* Industry example conversations as accessible tabs. Every panel is rendered
   (hidden ones with the hidden attribute) so the copy is in the HTML for search
   engines and works before hydration shows the first one. */

export type Scenario = {
  id: string;
  tab: string;
  channel: 'Voice Agent' | 'Chat Agent';
  time: string;
  place: string;
  lines: { from: 'customer' | 'agent'; text: string }[];
  outcome: { icon: IconName; tone: 'urgent' | 'booked' | 'info'; label: string; title: string; text: string };
};

export default function ScenarioTabs({ scenarios, customerLabel }: { scenarios: Scenario[]; customerLabel: string }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const base = useId();

  const focusTab = (i: number) => {
    const next = (i + scenarios.length) % scenarios.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      focusTab(i + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      focusTab(i - 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusTab(scenarios.length - 1);
    }
  };

  return (
    <div className={s.scenarios}>
      <div role="tablist" aria-label="Example conversations" aria-orientation="vertical" className={s.tabList}>
        {scenarios.map((sc, i) => (
          <button
            key={sc.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${sc.id}`}
            aria-selected={active === i}
            aria-controls={`${base}-panel-${sc.id}`}
            tabIndex={active === i ? 0 : -1}
            className={s.tab}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <span className={s.tabIcon} aria-hidden="true">
              <Icon name={sc.channel === 'Voice Agent' ? 'phone' : 'chat'} size={18} />
            </span>
            <span className={s.tabText}>
              <span className={s.tabTitle}>{sc.tab}</span>
              <span className={s.tabMeta}>
                {sc.channel} · {sc.time}
              </span>
            </span>
          </button>
        ))}
      </div>

      {scenarios.map((sc, i) => (
        <div
          key={sc.id}
          role="tabpanel"
          id={`${base}-panel-${sc.id}`}
          aria-labelledby={`${base}-tab-${sc.id}`}
          hidden={active !== i}
          className={s.panel}
          tabIndex={0}
        >
          <div className={s.panelTop}>
            <span className={s.panelChannel}>
              <Icon name={sc.channel === 'Voice Agent' ? 'phone' : 'chat'} size={16} />
              {sc.channel}
            </span>
            <span className={s.panelPlace}>
              {sc.place} · {sc.time}
            </span>
            <span className={s.panelTag}>Example</span>
          </div>
          <ol className={s.lines}>
            {sc.lines.map((line) => (
              <li key={line.text} className={line.from === 'agent' ? s.lineAgent : s.lineCustomer}>
                <span className={s.lineWho}>{line.from === 'agent' ? sc.channel : customerLabel}</span>
                <span className={s.lineText}>{line.text}</span>
              </li>
            ))}
          </ol>
          <div className={`${s.outcome} ${s[`outcome_${sc.outcome.tone}`]}`}>
            <span className={s.outcomeIcon} aria-hidden="true">
              <Icon name={sc.outcome.icon} size={20} />
            </span>
            <span className={s.outcomeCopy}>
              <span className={s.outcomeLabel}>{sc.outcome.label}</span>
              <span className={s.outcomeTitle}>{sc.outcome.title}</span>
              <span className={s.outcomeText}>{sc.outcome.text}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
