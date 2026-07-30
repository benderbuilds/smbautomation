// Run with: node scripts/generate-sample-audit.js
// Outputs: public/assets/smb-automation-sample-audit.pdf
//
// A realistic, fully anonymized sample Business Efficiency Audit deliverable
// for a fictional property management company. Marked SAMPLE throughout.

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/assets/smb-automation-sample-audit.pdf');

// Brand palette (spec tokens)
const NAVY    = '#0A0E1A';
const BLUE    = '#2540D9';
const BLUE_LT = '#EBF0FF';
const ORANGE  = '#E84E1A';
const SLATE   = '#5A6580';
const FAINT   = '#9AA0B2';
const BORDER  = '#D4DAE8';
const BG      = '#EDF1F7';
const WHITE   = '#FFFFFF';

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 64, bottom: 56, left: 54, right: 54 },
  info: {
    Title: 'Business Efficiency Audit, Sample Deliverable',
    Author: 'SMB Automation',
    Subject: 'Sample Business Efficiency Audit for a fictional property management company',
  },
  bufferPages: true,
});

const stream = fs.createWriteStream(OUT);
doc.pipe(stream);

const PW = doc.page.width;
const PH = doc.page.height;
const ML = doc.page.margins.left;
const MR = doc.page.margins.right;
const CONTENT_W = PW - ML - MR;
const BOTTOM = () => PH - doc.page.margins.bottom;

function hex(color) {
  const h = color.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function pageChrome() {
  // Header band with SAMPLE tag, applied to every page after the fact
  doc.rect(0, 0, PW, 40).fill(hex(NAVY));
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(hex(WHITE))
    .text('SMB AUTOMATION', ML, 12, { characterSpacing: 2, lineBreak: false });
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(hex(ORANGE))
    .text('SAMPLE DELIVERABLE', ML, 12, {
      width: CONTENT_W, align: 'right', characterSpacing: 2, lineBreak: false,
    });
}

function checkRemaining(needed) {
  if (doc.y + needed > BOTTOM()) doc.addPage();
}

function sectionTitle(eyebrow, title) {
  checkRemaining(90);
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(hex(BLUE))
    .text(eyebrow.toUpperCase(), ML, doc.y, { characterSpacing: 1.6 });
  doc.moveDown(0.35);
  doc.font('Helvetica-Bold').fontSize(16).fillColor(hex(NAVY))
    .text(title, ML, doc.y, { width: CONTENT_W });
  doc.moveDown(0.6);
}

function body(text, opts = {}) {
  doc.font('Helvetica').fontSize(9.5).fillColor(hex(SLATE))
    .text(text, ML, doc.y, { width: CONTENT_W, lineGap: 2.5, ...opts });
  doc.moveDown(0.6);
}

function bullet(text) {
  checkRemaining(24);
  const y = doc.y + 3.5;
  doc.rect(ML, y, 4.5, 4.5).fill(hex(ORANGE));
  doc.font('Helvetica').fontSize(9.5).fillColor(hex(SLATE))
    .text(text, ML + 14, doc.y, { width: CONTENT_W - 14, lineGap: 2 });
  doc.moveDown(0.35);
}

function callout(title, text) {
  const boxPad = 12;
  const textW = CONTENT_W - boxPad * 2;
  doc.font('Helvetica').fontSize(9.5);
  const h = doc.heightOfString(text, { width: textW, lineGap: 2.5 }) + boxPad * 2 + 14;
  checkRemaining(h + 10);
  const y = doc.y;
  doc.rect(ML, y, CONTENT_W, h).fill(hex(BLUE_LT));
  doc.rect(ML, y, 3, h).fill(hex(BLUE));
  doc.font('Helvetica-Bold').fontSize(8).fillColor(hex(NAVY))
    .text(title.toUpperCase(), ML + boxPad, y + boxPad, { characterSpacing: 1.2 });
  doc.font('Helvetica').fontSize(9.5).fillColor(hex(SLATE))
    .text(text, ML + boxPad, y + boxPad + 14, { width: textW, lineGap: 2.5 });
  doc.y = y + h;
  doc.moveDown(0.8);
}

// Simple table renderer: cols = [{label, width, align?}], rows = string[][]
function table(cols, rows, opts = {}) {
  const headH = 22;
  const cellPad = 6;
  const fontSize = opts.fontSize || 8;

  function rowHeight(row) {
    doc.font('Helvetica').fontSize(fontSize);
    let max = 0;
    row.forEach((cell, i) => {
      const h = doc.heightOfString(String(cell), { width: cols[i].width - cellPad * 2, lineGap: 1 });
      if (h > max) max = h;
    });
    return Math.max(max + cellPad * 2, 20);
  }

  function drawHead() {
    const y = doc.y;
    doc.rect(ML, y, CONTENT_W, headH).fill(hex(NAVY));
    let x = ML;
    doc.font('Helvetica-Bold').fontSize(6.5).fillColor(hex(WHITE));
    cols.forEach((c) => {
      doc.text(c.label.toUpperCase(), x + cellPad, y + 8, {
        width: c.width - cellPad * 2, align: c.align || 'left', characterSpacing: 0.4,
        lineBreak: false, height: headH, ellipsis: false,
      });
      x += c.width;
    });
    doc.y = y + headH;
  }

  drawHead();
  rows.forEach((row, r) => {
    const h = rowHeight(row);
    if (doc.y + h > BOTTOM()) {
      doc.addPage();
      drawHead();
    }
    const y = doc.y;
    if (r % 2 === 1) doc.rect(ML, y, CONTENT_W, h).fill(hex(BG));
    let x = ML;
    row.forEach((cell, i) => {
      const bold = opts.boldCol === i;
      doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(fontSize)
        .fillColor(hex(bold ? NAVY : SLATE))
        .text(String(cell), x + cellPad, y + cellPad, {
          width: cols[i].width - cellPad * 2, align: cols[i].align || 'left', lineGap: 1,
        });
      x += cols[i].width;
    });
    doc.rect(ML, y + h - 0.5, CONTENT_W, 0.5).fill(hex(BORDER));
    doc.y = y + h;
  });
  doc.moveDown(0.8);
}

// ── Cover ────────────────────────────────────────────────────────────────────

doc.rect(0, 0, PW, PH).fill(hex(NAVY));
doc.rect(0, 0, PW, 6).fill(hex(BLUE));

doc.font('Helvetica-Bold').fontSize(9).fillColor(hex(WHITE))
  .text('SMB AUTOMATION', ML, 96, { characterSpacing: 3 });

doc.font('Helvetica-Bold').fontSize(10).fillColor(hex(ORANGE))
  .text('SAMPLE DELIVERABLE', ML, 150, { characterSpacing: 2.5 });

doc.font('Helvetica-Bold').fontSize(30).fillColor(hex(WHITE))
  .text('Business Efficiency Audit', ML, 172, { width: CONTENT_W });

doc.font('Helvetica').fontSize(13).fillColor([200, 206, 222])
  .text('Prepared for Meridian Property Group', ML, 218);

doc.font('Helvetica').fontSize(9.5).fillColor([154, 160, 178])
  .text('Residential property management  |  22 employees  |  1,150 units under management', ML, 242);

const noteY = 300;
doc.rect(ML, noteY, CONTENT_W, 84).fill([18, 23, 42]);
doc.rect(ML, noteY, 3, 84).fill(hex(ORANGE));
doc.font('Helvetica-Bold').fontSize(8).fillColor(hex(WHITE))
  .text('ABOUT THIS SAMPLE', ML + 14, noteY + 14, { characterSpacing: 1.5 });
doc.font('Helvetica').fontSize(9).fillColor([170, 176, 194])
  .text(
    'Meridian Property Group is a fictional company. Every number, workflow, and finding in this document is representative of a real audit but has been created for illustration. Your audit follows this exact structure, built from your workflows and your numbers.',
    ML + 14, noteY + 30, { width: CONTENT_W - 28, lineGap: 2.5 }
  );

doc.font('Helvetica').fontSize(9).fillColor([120, 128, 150])
  .text('Fixed fee: $1,500  |  Delivered seven business days after discovery', ML, 640);
doc.font('Helvetica').fontSize(9).fillColor(hex(ORANGE))
  .text('smbautomation.io', ML, 656);

// ── Executive summary ────────────────────────────────────────────────────────

doc.addPage();
doc.y = 64;

sectionTitle('Section 01', 'Executive Summary');
body(
  'Meridian Property Group manages 1,150 residential units across 38 properties with a team of 22. Revenue is healthy and occupancy is strong. The operational picture is different: the team absorbs growth by working harder, not by improving the process. Three full-time equivalents of capacity are currently consumed by work that software the company already owns could do.'
);
body(
  'Discovery covered leasing, maintenance, accounting, and resident services. We documented 14 recurring workflows, interviewed 6 employees, and reviewed the existing software stack. Ten improvement opportunities emerged. They are ranked in the scorecard in Section 03.'
);
callout(
  'Headline finding',
  'We identified an estimated $187,000 in annualized time and revenue opportunity across ten workflows. The top three opportunities account for $104,000 of that total and can be implemented within 60 days for a combined budget of $14,000 to $19,000.'
);
body('Three patterns drive most of the loss:');
bullet('Response gaps. Leasing leads wait an average of 4.7 hours for a first response. After-hours leads wait until the next business day. Industry data puts lead-to-lease conversion at roughly double for responses under five minutes.');
bullet('Re-keyed data. Employees enter the same information into the property management system, spreadsheets, and email an average of three times per transaction. Move-ins, work orders, and owner reports all repeat this pattern.');
bullet('Memory-driven follow-up. Renewals, delinquency outreach, and vendor follow-up run on individual reminders and inbox discipline. When a coordinator is out, the process stops.');

// ── Workflow inventory ───────────────────────────────────────────────────────

doc.addPage();
doc.y = 64;
sectionTitle('Section 02', 'Workflow Inventory');
body(
  'The recurring processes that consume the most team time, with the friction we observed. Hours are weekly totals across the team, from discovery interviews and system data.'
);

table(
  [
    { label: 'Workflow', width: 122 },
    { label: 'Owner', width: 88 },
    { label: 'Hrs', width: 36, align: 'right' },
    { label: 'Friction observed', width: CONTENT_W - 122 - 88 - 36 },
  ],
  [
    ['Leasing lead response', 'Leasing (3)', '31', 'Leads from 4 sources land in 2 inboxes and a phone line. First response averages 4.7 hours. No after-hours coverage.'],
    ['Tour scheduling', 'Leasing (3)', '14', 'Back-and-forth email and phone tag. Roughly 1 in 5 scheduled tours no-shows with no reminder sequence.'],
    ['Maintenance intake and routing', 'Maintenance coord. (2)', '26', 'Residents call or email. Coordinator retypes into the PM system, calls vendors, then updates residents manually.'],
    ['Work order follow-up', 'Maintenance coord. (2)', '11', 'Vendor status lives in text messages. Residents call to ask for updates, which interrupts intake.'],
    ['Renewals', 'Property managers (4)', '9', 'Spreadsheet tracked. Outreach starts when someone notices a date, often inside 45 days, weakening negotiating position.'],
    ['Delinquency communication', 'Accounting (2)', '8', 'Manual notice generation and individual emails. Timing varies by workload, which slows collections.'],
    ['Resident onboarding', 'Property managers (4)', '10', 'A 23-step checklist executed by hand: utilities, insurance proof, keys, portal setup. Steps get missed during busy weeks.'],
    ['Owner reporting', 'Accounting + PMs', '18', 'Monthly packets assembled from three systems into PDFs by hand. Two to three days of combined effort each month.'],
    ['Review requests', 'Nobody (ad hoc)', '1', 'Requests happen when someone remembers. 11 Google reviews in the last 12 months across 38 properties.'],
    ['Invoice processing', 'Accounting (2)', '12', 'Vendor invoices arrive by email and paper. Manual entry, manual matching to work orders, manual approval chasing.'],
  ]
);
body(
  'Four additional workflows were documented and scored below the opportunity threshold: marketing content, HOA correspondence, inspection scheduling, and payroll administration. They appear in the appendix of a full audit.'
);

// ── Opportunity scorecard ────────────────────────────────────────────────────

doc.addPage();
doc.y = 64;
sectionTitle('Section 03', 'Opportunity Scorecard');
body(
  'Every opportunity scored on impact, implementation cost, effort, risk, and payback. Ranked by expected annualized value. Scores run 1 (low) to 5 (high).'
);

table(
  [
    { label: '#', width: 26 },
    { label: 'Opportunity', width: 142 },
    { label: 'Impact', width: 40, align: 'center' },
    { label: 'Cost', width: 34, align: 'center' },
    { label: 'Effort', width: 44, align: 'center' },
    { label: 'Risk', width: 32, align: 'center' },
    { label: 'Annual value', width: 70, align: 'right' },
    { label: 'Payback', width: CONTENT_W - 26 - 142 - 40 - 34 - 44 - 32 - 70, align: 'right' },
  ],
  [
    ['1', 'Automated leasing lead response and routing', '5', '2', '2', '1', '$46,000', '< 1 month'],
    ['2', 'Maintenance intake, triage, and resident updates', '5', '3', '3', '2', '$34,000', '2 months'],
    ['3', 'Owner report generation', '4', '2', '3', '1', '$24,000', '2 months'],
    ['4', 'Self-serve tour scheduling with reminders', '4', '1', '2', '1', '$19,000', '< 1 month'],
    ['5', 'Renewal pipeline with 90-day triggers', '4', '1', '2', '1', '$17,000', '< 1 month'],
    ['6', 'Delinquency communication sequence', '3', '1', '2', '2', '$14,000', '1 month'],
    ['7', 'Invoice capture and matching', '3', '2', '3', '2', '$12,000', '3 months'],
    ['8', 'Resident onboarding automation', '3', '1', '2', '1', '$10,000', '2 months'],
    ['9', 'Automated review requests', '3', '1', '1', '1', '$7,000', '< 1 month'],
    ['10', 'Vendor status portal and notifications', '2', '2', '3', '2', '$4,000', '4 months'],
  ],
  { boldCol: 1 }
);

callout(
  'Total identified opportunity',
  '$187,000 in estimated annualized time and revenue value. The findings guarantee threshold for this audit is $15,000. Items 1 through 5 are recommended for the first 90 days.'
);

// ── Time and financial estimates ─────────────────────────────────────────────

doc.addPage();
doc.y = 64;
sectionTitle('Section 04', 'Time and Financial Estimates');
body(
  'How the top five opportunities convert into hours and dollars. Labor valued at a $31 per hour loaded average for coordinator and leasing roles. Revenue estimates use current portfolio rents and observed conversion rates, held conservative.'
);

table(
  [
    { label: 'Opportunity', width: 130 },
    { label: 'Hrs/wk saved', width: 62, align: 'right' },
    { label: 'Annual labor', width: 62, align: 'right' },
    { label: 'Revenue impact', width: 76, align: 'right' },
    { label: 'Software cost/yr', width: 74, align: 'right' },
    { label: 'Net annual', width: CONTENT_W - 130 - 62 - 62 - 76 - 74, align: 'right' },
  ],
  [
    ['Leasing lead response', '19', '$30,600', '$18,000', '$2,400', '$46,000'],
    ['Maintenance intake', '22', '$35,500', 'Included', '$1,800', '$34,000'],
    ['Owner reporting', '16/mo x 12', '$24,700', 'None', '$900', '$24,000'],
    ['Tour scheduling', '9', '$14,500', '$5,400', '$600', '$19,000'],
    ['Renewal pipeline', '6', '$9,700', '$8,100', '$600', '$17,000'],
  ]
);

body(
  'Revenue impact notes. Leasing: cutting first response from hours to minutes is modeled to recover 3 additional leases per year at $6,000 average annual rent margin. Tours: reminder sequences are modeled to cut no-shows by half. Renewals: earlier outreach is modeled to lift renewal rate two points, avoiding turn costs.'
);
callout(
  'Capacity, not layoffs',
  'These numbers assume no headcount reduction. The recovered hours convert into portfolio growth: the current team can absorb roughly 300 additional units at current service levels once the top five items are live.'
);

// ── Recommended tools ────────────────────────────────────────────────────────

doc.addPage();
doc.y = 64;
sectionTitle('Section 05', 'Recommended Tools');
body(
  'Selected around the systems Meridian already owns. The property management platform stays. Nothing below requires a data migration. Named products are representative of the category recommended in a real audit; final selection happens with your team.'
);

table(
  [
    { label: 'Category', width: 150 },
    { label: 'Approach', width: CONTENT_W - 150 - 90 },
    { label: 'Est. cost/mo', width: 90, align: 'right' },
  ],
  [
    ['Lead response and routing', 'AI-assisted responder connected to listing sources and the PM system. Answers, qualifies, and books within two minutes, around the clock.', '$200'],
    ['Scheduling', 'Self-serve tour booking embedded on listings, synced to leasing calendars, with SMS reminder sequences.', '$50'],
    ['Maintenance triage', 'Structured intake form plus AI triage that classifies urgency, routes to the right vendor, and sends automatic resident status updates.', '$150'],
    ['Reporting', 'Automated monthly owner packets assembled from the PM system and accounting exports, delivered on a fixed schedule.', '$75'],
    ['Workflow glue', 'An automation platform connecting the PM system, email, SMS, and spreadsheets for renewals, delinquency, onboarding, and reviews.', '$100'],
  ]
);

body(
  'Total new software cost at full rollout: roughly $575 per month, or $6,900 per year, against $187,000 in identified value. Every tool above was chosen because it connects to the existing stack through supported integrations, not custom code.'
);

// ── 90-day roadmap ───────────────────────────────────────────────────────────

doc.addPage();
doc.y = 64;
sectionTitle('Section 06', '90-Day Roadmap');
body('The order of operations. Each phase ships something the team uses before the next phase begins.');

table(
  [
    { label: 'Phase', width: 92 },
    { label: 'Items', width: 190 },
    { label: 'Outcome', width: CONTENT_W - 92 - 190 },
  ],
  [
    ['Days 1 to 30', 'Leasing lead response (1), tour scheduling (4), review requests (9)', 'Every lead answered in under two minutes. Tours self-booked with reminders. Review flow running after every move-in and completed work order.'],
    ['Days 31 to 60', 'Maintenance intake and triage (2), renewal pipeline (5)', 'Residents submit structured requests and receive automatic updates. Renewals surface 90 days out with a tracked outreach sequence.'],
    ['Days 61 to 90', 'Owner reporting (3), delinquency sequence (6)', 'Monthly packets generate themselves for review. Notices and reminders send on a fixed cadence.'],
    ['Quarter two', 'Invoice capture (7), onboarding automation (8), vendor portal (10)', 'Accounting and onboarding move from manual to monitored. Evaluated after the first 90 days prove out.'],
  ]
);

callout(
  'Why this order',
  'Phase one items are low-effort, low-risk, and produce visible wins that fund team buy-in. The maintenance rebuild lands second because it touches residents and vendors and benefits from the momentum. Reporting and collections land third: valuable, but internal, and safe to sequence behind the resident-facing work.'
);

// ── Budget ranges ────────────────────────────────────────────────────────────

sectionTitle('Section 07', 'Implementation Budget Ranges');
body(
  'What it costs to execute this roadmap, whether SMB Automation builds it, your team does, or another provider does. Ranges reflect scope uncertainty that discovery narrows.'
);

table(
  [
    { label: 'Scope', width: 210 },
    { label: 'Range', width: 110, align: 'right' },
    { label: 'Includes', width: CONTENT_W - 210 - 110 },
  ],
  [
    ['Phase one (items 1, 4, 9)', '$5,000 to $7,500', 'Configuration, integrations, testing, training, documentation'],
    ['Phase two (items 2, 5)', '$6,500 to $9,500', 'Intake build, triage rules, vendor routing, renewal pipeline'],
    ['Phase three (items 3, 6)', '$4,000 to $6,000', 'Report templates, data connections, communication sequences'],
    ['Full roadmap', '$15,500 to $23,000', 'All ten opportunities, phased over two quarters'],
  ]
);

body(
  'The $1,500 audit fee is credited toward any implementation project of $7,500 or more started within 30 days. There is no obligation: this roadmap is complete enough to execute with your internal team or another provider.'
);

// ── Closing ──────────────────────────────────────────────────────────────────

doc.addPage();
doc.y = 64;
sectionTitle('Section 08', 'What Happens Next');
body('A real audit closes with a 60-minute findings presentation where we walk through every section of this document, answer questions, and agree on the order of operations. After that, three paths:');
bullet('Implement internally. The roadmap, tool list, and budget ranges are written so your team can execute without us.');
bullet('Use another provider. Hand this document to any capable integrator. The scoping work is done.');
bullet('Have SMB Automation build it. We implement the roadmap in the phases above, with testing, documentation, training, and a results review at each phase.');
doc.moveDown(0.5);
callout(
  'The findings guarantee',
  'If a Business Efficiency Audit does not identify at least $15,000 in annualized time or revenue opportunity for your business, we refund the full fee and you keep the roadmap.'
);
doc.moveDown(1);

doc.font('Helvetica-Bold').fontSize(12).fillColor(hex(NAVY))
  .text('Ready to see this for your business?', ML, doc.y);
doc.moveDown(0.4);
doc.font('Helvetica').fontSize(9.5).fillColor(hex(SLATE))
  .text('Apply for the audit at smbautomation.io/apply. Applications take about three minutes, and qualified businesses book a fit call immediately.', ML, doc.y, { width: CONTENT_W, lineGap: 2.5 });
doc.moveDown(1.2);
doc.font('Helvetica').fontSize(9).fillColor(hex(FAINT))
  .text('Jesse Bender, Founder  |  jesse@smbautomation.io  |  smbautomation.io', ML, doc.y);

// ── Apply header chrome + footer to every page except the cover ──────────────

const range = doc.bufferedPageRange();
for (let i = 1; i < range.count; i++) {
  doc.switchToPage(i);
  // Zero the bottom margin while stamping so footer text cannot trigger a new page
  const savedBottom = doc.page.margins.bottom;
  doc.page.margins.bottom = 0;
  pageChrome();
  doc.font('Helvetica').fontSize(7).fillColor(hex(FAINT))
    .text(
      `Business Efficiency Audit, sample deliverable  |  Page ${i + 1} of ${range.count}`,
      ML, PH - 40,
      { width: CONTENT_W, align: 'right', lineBreak: false }
    );
  doc.page.margins.bottom = savedBottom;
}

doc.end();

stream.on('finish', () => {
  const kb = Math.round(fs.statSync(OUT).size / 1024);
  console.log(`Wrote ${OUT} (${kb} KB)`);
});
