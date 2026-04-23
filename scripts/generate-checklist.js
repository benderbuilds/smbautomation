// Run with: node scripts/generate-checklist.js
// Outputs: public/assets/smb-automation-audit-checklist.pdf

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '../public/assets/smb-automation-audit-checklist.pdf');

// Brand palette
const NAVY   = '#0A0E1A';
const ORANGE = '#E84E1A';
const SLATE  = '#5A6580';
const BORDER = '#D4DAE8';
const BG     = '#EDF1F7';
const WHITE  = '#FFFFFF';

const SECTIONS = [
  {
    title: 'Lead Capture',
    items: [
      'Website has a clear primary CTA above the fold — one thing visitors should do next.',
      'Contact form, booking link, or phone number works and is tested weekly.',
      'Google Business Profile is claimed, fully complete, and updated at least monthly.',
      'New leads receive a response within 2 business hours.',
      'There is a documented, shared process for where every lead goes when it arrives.',
    ],
  },
  {
    title: 'Follow-Up Workflow',
    items: [
      'Every new lead gets an automated acknowledgment within 5 minutes of submitting.',
      'Follow-up is multi-touch — not just one email or one call.',
      'Leads that don\'t respond are re-engaged at day 3, day 7, and day 14.',
      'You know your lead-to-appointment conversion rate and review it monthly.',
      'Follow-up templates exist in writing and your team uses the same ones.',
    ],
  },
  {
    title: 'CRM & Pipeline',
    items: [
      'Every lead and active client lives in a CRM — not a spreadsheet, inbox, or memory.',
      'Pipeline stages are defined and every team member uses them consistently.',
      'You can pull a full pipeline report in under 2 minutes.',
      'No deal has gone cold in the last 90 days because nobody followed up.',
    ],
  },
  {
    title: 'Google Business Profile',
    items: [
      'Profile is 100% complete: hours, services, photos, description, attributes.',
      'Every review receives a response within 48 hours.',
      'You have an active, repeatable system for requesting new reviews.',
      'Google Posts go out at least twice per month.',
    ],
  },
  {
    title: 'Content & SEO',
    items: [
      'You know the 3 to 5 search phrases your best clients use before finding you.',
      'Your homepage states clearly who you serve, what you do, and who it\'s not for.',
      'New content (blog, video, or social) goes out at least once a month.',
      'Google Search Console is set up and you or someone on your team reviews it.',
    ],
  },
  {
    title: 'Internal Handoffs',
    items: [
      'New client onboarding is documented, repeatable, and does not depend on you.',
      'Information does not get lost between the sales conversation and delivery.',
      'Your team rarely asks you questions that a documented process should answer.',
      'Invoicing and payment collection is automated or runs without manual follow-up.',
    ],
  },
  {
    title: 'Retention & Revenue',
    items: [
      'You have a system for staying in front of past clients — not just hoping they remember you.',
      'You know your client churn rate and review it quarterly.',
      'Referrals are requested systematically, not just when you happen to think of it.',
      'You have at least one recurring revenue stream, retainer, or maintenance plan.',
    ],
  },
];

const SCORING = [
  { range: '52 – 64', label: 'Tight operation.', desc: 'You\'re running well. Let\'s find the 20% that will compound.' },
  { range: '36 – 51', label: 'Solid foundation, real gaps.', desc: '2 to 3 areas need work. Fixable in 90 days with the right priority order.' },
  { range: '20 – 35', label: 'Multiple leaks.', desc: 'You\'re working harder than you need to. Automation pays back fast here.' },
  { range: '0 – 19',  label: 'Significant revenue on the table.', desc: 'The good news: the gap between where you are and where you could be is mostly systems.' },
];

const doc = new PDFDocument({
  size: 'LETTER',
  margins: { top: 48, bottom: 48, left: 54, right: 54 },
  info: {
    Title: 'SMB Automation Audit Checklist',
    Author: 'SMB Automation',
    Subject: 'Score your operation. Find the leaks. Fix them in order.',
  },
});

const stream = fs.createWriteStream(OUT);
doc.pipe(stream);

const PW = doc.page.width;
const PH = doc.page.height;
const ML = doc.page.margins.left;
const MR = doc.page.margins.right;
const MT = doc.page.margins.top;
const CONTENT_W = PW - ML - MR;

// ── Helpers ──────────────────────────────────────────────────────────────────

function hex(color) {
  const h = color.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function fillHex(color) { doc.fillColor(hex(color)); }
function strokeHex(color) { doc.strokeColor(hex(color)); }

function checkRemaining(needed) {
  const bottom = PH - doc.page.margins.bottom;
  if (doc.y + needed > bottom) {
    doc.addPage();
  }
}

// ── Header bar ───────────────────────────────────────────────────────────────

doc.rect(0, 0, PW, 56).fill(hex(NAVY));

doc.font('Helvetica-Bold')
   .fontSize(8)
   .fillColor(hex(WHITE))
   .text('SMB AUTOMATION', ML, 16, { characterSpacing: 2 });

doc.font('Helvetica')
   .fontSize(7.5)
   .fillColor(hex(ORANGE))
   .text('smbautomation.io', ML, 28, { characterSpacing: 0.5 });

// ── Title block ───────────────────────────────────────────────────────────────

doc.y = 72;

doc.font('Helvetica-Bold')
   .fontSize(20)
   .fillColor(hex(NAVY))
   .text('SMB Automation Audit Checklist', ML, doc.y, { width: CONTENT_W });

doc.moveDown(0.4);

doc.font('Helvetica')
   .fontSize(10)
   .fillColor(hex(SLATE))
   .text('Score your operation. Find the leaks. Fix them in order.', ML, doc.y, { width: CONTENT_W });

doc.moveDown(0.6);

// Instructions box
const instrY = doc.y;
doc.rect(ML, instrY, CONTENT_W, 44)
   .fill(hex(BG));
doc.rect(ML, instrY, 3, 44)
   .fill(hex(ORANGE));

doc.font('Helvetica-Bold')
   .fontSize(7.5)
   .fillColor(hex(NAVY))
   .text('HOW TO SCORE', ML + 12, instrY + 8, { characterSpacing: 1 });

doc.font('Helvetica')
   .fontSize(8.5)
   .fillColor(hex(SLATE))
   .text(
     'For each item: circle  0  (not doing it),  1  (doing it inconsistently),  or  2  (doing it well).',
     ML + 12, instrY + 20,
     { width: CONTENT_W - 20 }
   );

doc.y = instrY + 52;

// Column header for score boxes
const SCORE_X = ML + CONTENT_W - 72;
const BOX_SIZE = 18;
const BOX_GAP = 4;

const headerY = doc.y;
['0', '1', '2'].forEach((lbl, i) => {
  const bx = SCORE_X + i * (BOX_SIZE + BOX_GAP);
  doc.font('Helvetica-Bold')
     .fontSize(8)
     .fillColor(hex(SLATE))
     .text(lbl, bx, headerY, { width: BOX_SIZE, align: 'center' });
});

doc.y = headerY + 14;

// ── Sections ─────────────────────────────────────────────────────────────────

SECTIONS.forEach((section, si) => {
  const itemH     = 22;  // height per item row
  const sectionH  = 24 + section.items.length * itemH + 28; // header + items + total row
  checkRemaining(sectionH);

  const secStartY = doc.y;

  // Section header
  doc.rect(ML, secStartY, CONTENT_W, 22)
     .fill(hex(NAVY));

  doc.font('Helvetica-Bold')
     .fontSize(8)
     .fillColor(hex(WHITE))
     .text(
       `${String(si + 1).padStart(2, '0')}  ${section.title.toUpperCase()}`,
       ML + 10, secStartY + 7,
       { characterSpacing: 0.8 }
     );

  const maxPts = section.items.length * 2;
  doc.font('Helvetica')
     .fontSize(7.5)
     .fillColor(hex(ORANGE))
     .text(`MAX ${maxPts} PTS`, 0, secStartY + 8, { width: PW - MR - 6, align: 'right' });

  let rowY = secStartY + 24;

  // Items
  section.items.forEach((item, ii) => {
    const rowBg = ii % 2 === 0 ? WHITE : BG;
    doc.rect(ML, rowY, CONTENT_W, itemH).fill(hex(rowBg));

    // Checkbox square
    const cbX = ML + 8;
    const cbY = rowY + (itemH - 9) / 2;
    doc.rect(cbX, cbY, 9, 9)
       .strokeColor(hex(BORDER))
       .lineWidth(0.75)
       .stroke();

    // Item text
    doc.font('Helvetica')
       .fontSize(8)
       .fillColor(hex(NAVY))
       .text(item, ML + 24, rowY + 4, { width: CONTENT_W - 24 - 80, lineGap: 1 });

    // Score boxes
    ['0', '1', '2'].forEach((_, bi) => {
      const bx = SCORE_X + bi * (BOX_SIZE + BOX_GAP);
      doc.rect(bx, rowY + (itemH - BOX_SIZE) / 2, BOX_SIZE, BOX_SIZE)
         .strokeColor(hex(BORDER))
         .lineWidth(0.5)
         .stroke();
    });

    rowY += itemH;
  });

  // Section total row
  doc.rect(ML, rowY, CONTENT_W, 22)
     .fill(hex('#F4F6FA'));
  doc.rect(ML, rowY, CONTENT_W, 22)
     .strokeColor(hex(BORDER))
     .lineWidth(0.5)
     .stroke();

  doc.font('Helvetica-Bold')
     .fontSize(7.5)
     .fillColor(hex(SLATE))
     .text('SECTION TOTAL', ML + 10, rowY + 7, { characterSpacing: 0.5 });

  // Total box
  doc.rect(SCORE_X - 4, rowY + 3, BOX_SIZE + 8, 16)
     .strokeColor(hex(NAVY))
     .lineWidth(1)
     .stroke();

  doc.font('Helvetica')
     .fontSize(7)
     .fillColor(hex(SLATE))
     .text(`/ ${maxPts}`, SCORE_X + BOX_SIZE + 8, rowY + 8);

  doc.y = rowY + 28;
});

// ── Grand total + scoring guide ───────────────────────────────────────────────

const totalItems = SECTIONS.reduce((a, s) => a + s.items.length, 0);
const maxTotal = totalItems * 2;

checkRemaining(180);

const gtY = doc.y;
doc.rect(ML, gtY, CONTENT_W, 32)
   .fill(hex(NAVY));

doc.font('Helvetica-Bold')
   .fontSize(10)
   .fillColor(hex(WHITE))
   .text('GRAND TOTAL', ML + 12, gtY + 10);

doc.font('Helvetica-Bold')
   .fontSize(10)
   .fillColor(hex(ORANGE))
   .text(`/ ${maxTotal}`, 0, gtY + 10, { width: PW - MR - 12, align: 'right' });

// Score guide
doc.y = gtY + 40;

doc.font('Helvetica-Bold')
   .fontSize(8)
   .fillColor(hex(SLATE))
   .text('WHAT YOUR SCORE MEANS', ML, doc.y, { characterSpacing: 1 });

doc.moveDown(0.5);

SCORING.forEach((s) => {
  checkRemaining(36);
  const bandY = doc.y;

  doc.rect(ML, bandY, 3, 30).fill(hex(ORANGE));

  doc.font('Helvetica-Bold')
     .fontSize(8.5)
     .fillColor(hex(NAVY))
     .text(`${s.range}  —  ${s.label}`, ML + 10, bandY + 4, { width: CONTENT_W - 10 });

  doc.font('Helvetica')
     .fontSize(8)
     .fillColor(hex(SLATE))
     .text(s.desc, ML + 10, bandY + 16, { width: CONTENT_W - 20 });

  doc.y = bandY + 36;
});

// ── CTA footer ────────────────────────────────────────────────────────────────

checkRemaining(60);

doc.moveDown(0.5);
const ctaY = doc.y;

doc.rect(ML, ctaY, CONTENT_W, 52)
   .fill(hex(BG));
doc.rect(ML, ctaY, CONTENT_W, 52)
   .strokeColor(hex(BORDER))
   .lineWidth(0.5)
   .stroke();

doc.font('Helvetica-Bold')
   .fontSize(9)
   .fillColor(hex(NAVY))
   .text('Score below 40? Let\'s find out exactly where you\'re leaking revenue.', ML + 16, ctaY + 10, { width: CONTENT_W - 100 });

doc.font('Helvetica')
   .fontSize(8.5)
   .fillColor(hex(SLATE))
   .text('Book a free 30-minute strategy call at smbautomation.io', ML + 16, ctaY + 26, { width: CONTENT_W - 100 });

// Orange CTA block
doc.rect(PW - MR - 110, ctaY + 8, 104, 36)
   .fill(hex(ORANGE));

doc.font('Helvetica-Bold')
   .fontSize(7.5)
   .fillColor(hex(WHITE))
   .text('BOOK A FREE CALL', PW - MR - 110, ctaY + 15, { width: 104, align: 'center', characterSpacing: 0.5 });

doc.font('Helvetica')
   .fontSize(7)
   .fillColor(hex(WHITE))
   .text('smbautomation.io', PW - MR - 110, ctaY + 27, { width: 104, align: 'center' });

// ── Page numbers ──────────────────────────────────────────────────────────────

const pages = doc.bufferedPageRange();
for (let i = 0; i < pages.count; i++) {
  doc.switchToPage(pages.start + i);
  doc.font('Helvetica')
     .fontSize(7)
     .fillColor(hex(SLATE))
     .text(
       `${i + 1} / ${pages.count}`,
       0, PH - 30,
       { width: PW, align: 'center' }
     );
}

doc.end();

stream.on('finish', () => {
  console.log(`PDF written to ${OUT}`);
  const size = fs.statSync(OUT).size;
  console.log(`Size: ${(size / 1024).toFixed(1)} KB`);
});
