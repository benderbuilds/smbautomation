import Image from 'next/image';
import s from './FounderSection.module.css';

export default function FounderSection() {
  return (
    <section className={s.founder}>
      <div className={s.inner}>
        <div className={s.photoBlock}>
          <Image
            src="/assets/jesse-bender.png"
            alt="Jesse Bender, Founder of SMB Automation"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 440px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
        <div className={s.copy}>
          <span className="eyebrow">WHY SMB AUTOMATION</span>
          <h2 className={s.headline}>Built by an operator, not a software salesperson.</h2>
          <p className={s.body}>I am Jesse Bender, founder of SMB Automation.</p>
          <p className={s.body}>
            I spent 13 years starting, scaling, and running businesses. I was an early employee at a health-tech company that went from roughly $24,000 in annual recurring revenue to more than $25 million before a Fortune 500 acquisition. I ran operations for a $200 million real estate portfolio covering more than 1,400 units, where leasing, maintenance, accounting, and resident support all had to work at once or the numbers fell apart.
          </p>
          <p className={s.body}>
            I have seen what happens when a growing company adds software without fixing the underlying process. I have also seen how much capacity gets unlocked when the right workflow is redesigned around the customer, the team, and a measurable outcome.
          </p>
          <p className={s.body}>
            SMB Automation starts with how your business actually works. Technology comes second.
          </p>
          <p className={s.signature}>JESSE BENDER, FOUNDER, SMB AUTOMATION</p>
        </div>
      </div>
    </section>
  );
}
