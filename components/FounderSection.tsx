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
          <span className="eyebrow">THE FOUNDER</span>
          <p className={s.name}>Jesse Bender</p>
          <h2 className={s.hook}>
            I&apos;ve been on both sides of the machine. <em>I build for the side that needs it.</em>
          </h2>
          <p className={s.body}>
            On one side: VP-level operations at a 1,400-unit property management company. Years inside enterprise health tech at TelePharm, where we used machine learning to build an AI pill-counting system for enterprise pharmacies, back when &ldquo;AI&rdquo; still meant a grant application. I know how big systems get built, sold, and measured.
          </p>
          <p className={s.body}>
            On the other side: I grew up on a farm. Four years as a painting contractor. Five years in construction. I opened a restaurant in 2020 and watched the pandemic close it eighteen months later. I know what it costs when a $400 vendor invoice hits in a week you only did $2,800 in revenue.
          </p>
          <p className={s.body}>
            I left corporate health tech because I was tired of lining the pockets of executives who didn&apos;t put the customer first. PE-backed companies treat employees as a number and use questionable tactics to retain customers who are trying to leave. I built SMB Automation to do the opposite: help owners grow, keep their team employed, and give their customers a reason to come back.
          </p>
          <p className={s.pullQuote}>
            The through-line from the farm to the restaurant to this agency is the same. Customer experience is everything. You have to stand behind the product. The people who win are the ones who learn fast and stretch every dollar. That&apos;s who I build for.
          </p>
          <p className={s.signature}>Jesse Bender, Founder</p>
        </div>
      </div>
    </section>
  );
}
