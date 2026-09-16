import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';
import s from './page.module.css';

export const metadata: Metadata = {
  title: { absolute: 'Marketing and Automation for Small Businesses | SMB Automation' },
  description:
    'SMB Automation helps small businesses grow with better websites, SEO, paid advertising, and automated follow-up systems that keep leads, customers, invoices, and reviews from falling through the cracks.',
  alternates: { canonical: 'https://smbautomation.io' },
  openGraph: {
    title: 'Get More Customers. Automate the Busywork. | SMB Automation',
    description:
      'Websites, SEO, Google Ads, Meta Ads, and automated follow-up for lead, invoice, AR, and review workflows. More leads. Faster follow-up. Less manual work.',
    url: 'https://smbautomation.io',
    siteName: 'SMB Automation',
    type: 'website',
  },
};

const SERVICES = [
  {
    tag: 'Search',
    name: 'SEO',
    promise: 'Show up when customers search for the services you provide.',
    body: 'We help improve your visibility on Google through local SEO, website optimization, content, and search strategies designed to generate actual leads, not just traffic.',
  },
  {
    tag: 'Website',
    name: 'Web Design',
    promise: 'Your website should do more than look good.',
    body: 'We build fast, simple, conversion-focused websites that clearly explain what you do and make it easy for potential customers to take the next step.',
  },
  {
    tag: 'Paid search',
    name: 'Google Ads',
    promise: 'Reach people already searching for what you sell.',
    body: 'We build and manage Google Ads campaigns focused on high-intent searches, qualified leads, and measurable ROI.',
  },
  {
    tag: 'Paid social',
    name: 'Meta Ads',
    promise: 'Create demand and stay in front of the right customers.',
    body: 'We use Facebook and Instagram ads to generate leads, promote offers, retarget website visitors, and help local businesses reach more of their market.',
  },
];

/* Ordered by where each one sits in the customer lifecycle, which is why the
   timeline treatment is earned here and nowhere else on the page. */
const STAGES = [
  {
    trigger: 'When a new lead comes in',
    name: 'Automated Lead Follow-Up',
    body: 'A new lead comes in and automatically receives the right text messages, emails, reminders, and follow-ups until your team takes over.',
  },
  {
    trigger: 'When an invoice goes out',
    name: 'Automated Invoice Follow-Up',
    body: 'Automatically remind customers about upcoming, due, and overdue invoices without someone on your team chasing them manually.',
  },
  {
    trigger: 'When a balance starts aging',
    name: 'Automated AR Follow-Up',
    body: 'Create consistent accounts receivable workflows that reduce outstanding balances and help your business get paid faster.',
  },
  {
    trigger: 'When the job is done',
    name: 'Automated Review Requests',
    body: 'Automatically ask happy customers for Google reviews at the right moment so you can build your reputation without remembering to ask every time.',
  },
];

const OUTCOMES = [
  'Generate more qualified leads',
  'Respond to new leads faster',
  'Convert more inquiries into customers',
  'Reduce repetitive administrative work',
  'Collect invoices faster',
  'Generate more customer reviews',
  'Improve visibility on Google',
  'Understand where your marketing dollars are actually working',
];

const FIT = [
  'Growing primarily through referrals and ready for a more predictable source of leads.',
  'Getting leads but struggling to follow up consistently.',
  'Spending money on marketing without knowing what is actually working.',
  'Manually sending the same emails, texts, reminders, and invoices every week.',
  'Trying to get more Google reviews but rarely remembering to ask.',
  'Wondering where AI and automation could actually save your team time.',
];

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SMB Automation',
  url: 'https://smbautomation.io',
  description:
    'SMB Automation helps small businesses grow with better websites, SEO, paid advertising, and automated follow-up systems that keep leads, customers, invoices, and reviews from falling through the cracks.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'jesse@smbautomation.io',
    contactType: 'customer support',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Small business marketing and automation',
  serviceType: 'Marketing, advertising, and workflow automation for small and midsize businesses',
  description:
    'SEO, web design, Google Ads, and Meta Ads to generate leads, plus automated lead, invoice, accounts receivable, and review follow-up so nothing falls through the cracks.',
  provider: {
    '@type': 'Organization',
    name: 'SMB Automation',
    url: 'https://smbautomation.io',
  },
  areaServed: 'US',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [...SERVICES, ...STAGES].map((item) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: item.name },
    })),
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ---------------- Hero ---------------- */}
      <section className={s.hero}>
        <div className={s.heroInner}>
          <div className={s.heroCopy}>
            <span className="eyebrow">MARKETING AND AUTOMATION FOR SMALL BUSINESSES</span>
            <h1 className={s.heroHeadline}>
              Get more customers.{' '}
              <span>Automate the busywork.</span>
            </h1>
            <p className={s.heroSub}>
              SMB Automation helps small businesses grow with better websites, SEO, paid advertising,
              and automated follow-up systems that keep leads, customers, invoices, and reviews from
              falling through the cracks.
            </p>
            <div className={s.heroCtas}>
              <Link href="#contact" className="btn-primary">Talk to Us →</Link>
              <span className={s.heroNote}>No hard sell. We start by understanding your business.</span>
            </div>
          </div>

          <div className={s.beats}>
            <div className={s.beat}>
              <p className={s.beatText}>More leads.</p>
              <p className={s.beatMeta}>SEO, ads, and a site that converts</p>
            </div>
            <div className={s.beat}>
              <p className={s.beatText}>Faster follow-up.</p>
              <p className={s.beatMeta}>Every lead answered automatically</p>
            </div>
            <div className={s.beat}>
              <p className={s.beatText}>Less manual work.</p>
              <p className={s.beatMeta}>Invoices, AR, and reviews handled</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Problem ---------------- */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.inner}>
          <div className={s.problemGrid}>
            <div>
              <span className="eyebrow">THE REAL CONSTRAINT</span>
              <h2 className={s.sectionTitle}>
                Your business shouldn&rsquo;t depend on you remembering everything.
              </h2>
              <p className={s.problemStatement}>
                Most businesses aren&rsquo;t short on things to do.
                <br />
                <strong>They&rsquo;re short on time.</strong>
              </p>
            </div>

            <ul className={s.todo}>
              {[
                'Leads need to be followed up with.',
                'Invoices need reminders.',
                'Customers need to be asked for reviews.',
                'Your website needs to generate business.',
                'Google needs to know you exist.',
                'Ads need to actually produce a return.',
              ].map((item) => (
                <li key={item} className={s.todoItem}>
                  <span className={s.todoBox} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className={s.problemClose}>
            We help you put the right marketing and automation systems in place so more of this
            happens automatically.
          </p>
        </div>
      </section>

      {/* ---------------- Services ---------------- */}
      <section className={`${s.section} ${s.sectionWhite}`} id="services">
        <div className={s.inner}>
          <div className={s.sectionHead}>
            <span className="eyebrow">DEMAND</span>
            <h2 className={s.sectionTitle}>We help you find more customers.</h2>
            <p className={s.sectionLede}>
              Four channels that put your business in front of people who are already looking for
              what you sell, or who should be.
            </p>
          </div>

          <div className={s.serviceGrid}>
            {SERVICES.map((service) => (
              <article key={service.name} className={s.service}>
                <span className={s.serviceTag}>{service.tag}</span>
                <h3 className={s.serviceName}>{service.name}</h3>
                <p className={s.servicePromise}>{service.promise}</p>
                <p className={s.serviceBody}>{service.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Automation ---------------- */}
      <section className={`${s.section} ${s.sectionDark}`} id="automation">
        <div className={s.inner}>
          <div className={s.sectionHead}>
            <span className="eyebrow-light">FOLLOW-UP</span>
            <h2 className={s.sectionTitle}>
              Then we make sure nothing falls through the cracks.
            </h2>
            <p className={s.sectionLede}>
              Getting the lead is only half the battle. We automate the repetitive follow-up that
              most businesses know they should be doing but rarely have enough time to do
              consistently.
            </p>
          </div>

          <div className={s.timeline}>
            {STAGES.map((stage) => (
              <article key={stage.name} className={s.stage}>
                <p className={s.stageTrigger}>{stage.trigger}</p>
                <div>
                  <h3 className={s.stageName}>{stage.name}</h3>
                  <p className={s.stageBody}>{stage.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Outcomes ---------------- */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.inner}>
          <div className={s.outcomeGrid}>
            <div>
              <span className="eyebrow">THE POINT OF ALL OF IT</span>
              <h2 className={s.sectionTitle}>More growth without more admin.</h2>
              <div className={s.outcomeIntro}>
                <p>The goal isn&rsquo;t to automate your entire business.</p>
                <p>
                  <strong>
                    It&rsquo;s to automate the repetitive work that wastes time, slows down sales,
                    and costs you money.
                  </strong>
                </p>
              </div>

              <div className={s.outcomeClose}>
                <p className={s.outcomeCloseItem}>
                  <strong>No massive software overhaul.</strong>
                  Your team keeps the tools it already knows.
                </p>
                <p className={s.outcomeCloseItem}>
                  <strong>No complicated AI strategy deck.</strong>
                  Just useful systems that make your business run better.
                </p>
              </div>
            </div>

            <div>
              <span className={s.outcomeLabel}>We look for practical opportunities to help you</span>
              <ul className={s.outcomeList}>
                {OUTCOMES.map((item) => (
                  <li key={item} className={s.outcomeItem}>
                    <span className="proof-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Fit ---------------- */}
      <section className={`${s.section} ${s.sectionWhite}`} id="fit">
        <div className={s.inner}>
          <div className={s.sectionHead}>
            <span className="eyebrow">WHO THIS IS FOR</span>
            <h2 className={s.sectionTitle}>Built for small and midsize businesses.</h2>
            <p className={s.sectionLede}>
              SMB Automation works best with established businesses that already have customers,
              employees, and a proven service, but know their marketing and internal systems could be
              working harder. That might mean you are:
            </p>
          </div>

          <div className={s.fitGrid}>
            {FIT.map((item) => (
              <p key={item} className={s.fitItem}>
                <span className={s.fitMarker} aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>

          <p className={s.fitClose}>That&rsquo;s where we come in.</p>
        </div>
      </section>

      {/* ---------------- Philosophy ---------------- */}
      <section className={s.philosophy}>
        <div className={s.philosophyInner}>
          <h2 className={s.philosophyTitle}>
            You don&rsquo;t need more software.
            <br />
            You need <em>better systems.</em>
          </h2>
          <div className={s.philosophyBody}>
            <p>
              There are thousands of marketing, CRM, AI, and automation tools available. The hard
              part isn&rsquo;t finding another tool.
            </p>
            <p>
              <strong>
                It&rsquo;s knowing what to use, what to automate, and how to connect everything
                together.
              </strong>
            </p>
            <p>We help you figure that out and build it for you.</p>
          </div>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section className={s.contact} id="contact">
        <div className={s.inner}>
          <div className={s.contactGrid}>
            <div className={s.contactAside}>
              <span className="eyebrow">CONTACT</span>
              <h2 className={s.contactTitle}>
                Let&rsquo;s find the biggest opportunities in your business.
              </h2>
              <div className={s.contactBody}>
                <p>Tell us a little about your business and what you&rsquo;d like to improve.</p>
                <p>
                  We&rsquo;ll take a look and let you know where we think marketing, automation, or
                  both could make the biggest difference.
                </p>
              </div>
              <p className={s.contactDirect}>
                Prefer email? Write to{' '}
                <a href="mailto:jesse@smbautomation.io">jesse@smbautomation.io</a>.
                <br />
                We reply within one business day.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
