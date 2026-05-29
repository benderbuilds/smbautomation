import Image from 'next/image';
import s from './FounderSection.module.css';

export default function FounderSection() {
  return (
    <section className={s.founder}>
      <div className={s.inner}>
        <div className={s.photoBlock}>
          <Image
            src="/assets/jesse-bender.png"
            alt="Jesse Bender, Founder of SMBautomation"
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1099px) 50vw, 440px"
            style={{ objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
        <div className={s.copy}>
          <span className="eyebrow">WHY ME</span>
          <p className={s.name}>Jesse Bender</p>
          <p className={s.body}>
            I have 13 years of experience starting and scaling companies, with an exit via Fortune 500 acquisition. My recent wins include scaling a health tech startup from $24K ARR to over $25M ARR. I&apos;ve scaled teams from 1 to 11, implemented CRMs and operations tools across multiple companies, owned a restaurant during the pandemic, and managed a $200M real estate portfolio. Through it all, my focus has stayed on efficiency and customer experience. I bring both into SMBautomation, where I help businesses scale without adding headcount.
          </p>
          <p className={s.body}>
            SMBautomation specializes in system building, implementing new technology, AI workflows, and custom application builds to scale operations. We primarily work in property management, healthcare, hospitality, home building, and local service businesses to grow without bloating overhead. AI just collapsed the cost of building real software. The owners who move now keep the gains.{' '}
            <a href="#apply" className={s.ctaLink}>Get in touch today</a> to see how we can streamline your business, help you make more money, and save you time.
          </p>
          <p className={s.signature}>JESSE BENDER, FOUNDER</p>
        </div>
      </div>
    </section>
  );
}
