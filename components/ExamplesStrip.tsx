import s from './FrontDesk.module.css';

const EXAMPLES = [
  { name: 'Korn Ferry', use: 'Capturing sales leads in website chat', source: 'Qualified', url: 'https://www.qualified.com/customers/korn-ferry' },
  { name: 'Fogo de Chão', use: 'Answering incoming restaurant calls', source: 'Fogo de Chão', url: 'https://www.globenewswire.com/news-release/2026/02/03/3231173/0/en/Fogo-de-Ch%C3%A3o-Introduces-Selma-a-New-AI-Powered-Voice-Assistant-Inspired-by-Brand-Matriarch.html' },
  { name: 'Poly', use: 'Connecting website buyers with sales', source: 'Qualified', url: 'https://www.qualified.com/customers/poly' },
  { name: 'Golden Nugget', use: 'Taking hotel reservations by phone', source: 'PolyAI', url: 'https://poly.ai/customers/golden-nugget' },
];

export default function ExamplesStrip() {
  return (
    <section className={s.examples} aria-labelledby="examples-heading">
      <h2 id="examples-heading">How other companies use chat and voice AI</h2>
      <p>Examples from published case studies and company announcements.</p>
      <ul className={s.rail} aria-label="Published industry examples" tabIndex={0}>
        {EXAMPLES.map(item => <li key={item.name}><a href={item.url}>
          <strong>{item.name}</strong><span>{item.use}</span><small>Source: {item.source} ↗</small>
        </a></li>)}
      </ul>
    </section>
  );
}
