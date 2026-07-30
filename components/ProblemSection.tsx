import s from './ProblemSection.module.css';

const PROBLEMS = [
  'Leads that are not contacted quickly',
  'Employees entering the same information into multiple systems',
  'Estimates and proposals that are never followed up',
  'Scheduling that requires constant calls and emails',
  'Customer questions your team answers repeatedly',
  'Reports that take hours to prepare',
  'Invoices and payments that require manual follow-up',
  'Customers who disappear because no one checks in',
  'Important processes that depend entirely on one employee',
  'Software your team is paying for but not fully using',
];

const RECOGNIZED = [
  'The team is growing but the processes are not keeping up',
  'One employee is the only thing keeping an important process moving',
  'Reporting still requires spreadsheets and manual exports',
  'Follow-up happens when someone remembers, not when it should',
];

export default function ProblemSection() {
  return (
    <section className={s.section}>
      <div className={s.inner}>
        <span className="eyebrow">THE REAL PROBLEM</span>
        <h2 className={s.headline}>Your business probably does not need more AI tools.</h2>
        <p className={s.body}>
          It needs a clear view of where work is getting stuck, what those problems are costing you, and which improvements are actually worth pursuing.
        </p>
        <p className={s.lead}>We look for problems such as:</p>
        <ul className={s.list}>
          {PROBLEMS.map((p) => (
            <li key={p} className={s.item}>
              <span className="proof-dot" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
        <p className={s.lead}>Most of the businesses we work with recognize a few of these immediately:</p>
        <ul className={s.recognized}>
          {RECOGNIZED.map((r) => (
            <li key={r} className={s.recognizedItem}>{r}</li>
          ))}
        </ul>
        <p className={s.closing}>
          The goal is not to automate everything. The goal is to find the few improvements that will create the greatest return.
        </p>
      </div>
    </section>
  );
}
