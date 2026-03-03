'use client';

import { useState, useEffect } from "react";
import WorkflowDiagram from "@/components/WorkflowDiagram";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Barlow', sans-serif; background: #EDF1F7; color: #0A0E1A; overflow-x: hidden; }

  :root {
    --ink:          #0A0E1A;
    --ink-mid:      #5A6580;
    --ink-faint:    #9AA0B2;
    --bg:           #EDF1F7;
    --bg-white:     #FFFFFF;
    --border:       #D4DAE8;
    --border-strong:#B0BAD0;
    --blue:         #2540D9;
    --blue-deep:    #1A2EA8;
    --blue-pale:    #D8E0FA;
    --blue-lt:      #EBF0FF;
    --orange:       #E84E1A;
    --orange-pale:  #FDEEE8;
    --dark:         #0A0E1A;
    --dark-surface: #12172A;
    --dark-border:  rgba(255,255,255,0.08);
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw; height: 64px;
    background: rgba(237,241,247,0.95); backdrop-filter: blur(12px);
    border-bottom: 1px solid transparent; transition: border-color 0.3s;
  }
  .nav.scrolled { border-bottom-color: var(--border); }
  .nav-logo {
    font-family: 'Barlow', sans-serif; font-size: 1rem; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
  }
  .nav-logo .logo-smb { color: var(--blue); }
  .nav-logo .logo-auto { color: var(--ink); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
  .nav-links a { text-decoration: none; color: var(--ink-mid); font-size: 0.78rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.2s; }
  .nav-links a:hover { color: var(--ink); }

  /* BUTTONS */
  .btn-primary {
    background: var(--blue); color: #FFFFFF; padding: 0.65rem 1.75rem;
    font-family: 'Barlow', sans-serif; font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--blue);
    cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; border-radius: 0;
  }
  .btn-primary:hover { background: var(--blue-deep); border-color: var(--blue-deep); }
  .btn-secondary {
    background: transparent; color: var(--ink); padding: 0.65rem 1.75rem;
    font-family: 'Barlow', sans-serif; font-size: 0.75rem; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; border: 1px solid var(--border-strong);
    cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; border-radius: 0;
  }
  .btn-secondary:hover { border-color: var(--blue); color: var(--blue); }
  .btn-orange {
    background: var(--orange); color: #FFFFFF; padding: 1rem 2.5rem;
    font-family: 'Barlow', sans-serif; font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase; border: none;
    cursor: pointer; transition: background 0.2s; text-decoration: none; display: inline-block; border-radius: 0;
  }
  .btn-orange:hover { background: #C43D12; }

  /* HERO */
  .hero {
    min-height: 100vh; display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; padding: 100px 5vw 80px; gap: 6vw;
  }
  .hero-eyebrow {
    display: inline-block; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--ink-mid); margin-bottom: 2rem;
    border-bottom: 1px solid var(--border-strong); padding-bottom: 0.5rem;
  }
  .hero-headline {
    font-size: clamp(2.8rem, 4.5vw, 4.4rem); font-weight: 400; line-height: 1.05;
    letter-spacing: -0.02em; color: var(--ink); margin-bottom: 1.75rem;
  }
  .hero-headline em { font-style: italic; font-weight: 300; color: var(--blue); }
  .hero-sub {
    font-size: 1.05rem; color: var(--ink-mid); line-height: 1.7;
    max-width: 480px; margin-bottom: 2.5rem; font-weight: 400;
  }
  .hero-actions { display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap; }
  .hero-proof { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 3rem; padding-top: 2.5rem; border-top: 1px solid var(--border); }
  .proof-item { display: flex; align-items: center; gap: 0.75rem; font-size: 0.875rem; color: var(--ink-mid); }
  .proof-dot { width: 6px; height: 6px; background: var(--orange); flex-shrink: 0; }

  /* HERO FORM */
  .hero-form-card { background: var(--bg-white); border: 1px solid var(--border); padding: 2.5rem; border-radius: 0; }
  .hero-form-title { font-size: 1.1rem; font-weight: 600; color: var(--ink); margin-bottom: 0.35rem; letter-spacing: -0.01em; }
  .hero-form-sub { font-size: 0.85rem; color: var(--ink-mid); margin-bottom: 2rem; line-height: 1.5; }

  /* STATS */
  .stats-bar {
    background: var(--blue); display: grid; grid-template-columns: repeat(4, 1fr);
  }
  .stat { padding: 2.25rem 2rem; border-right: 1px solid rgba(255,255,255,0.15); display: flex; flex-direction: column; gap: 0.4rem; }
  .stat:last-child { border-right: none; }
  .stat-n { font-size: 2.2rem; font-weight: 300; color: #FFFFFF; line-height: 1; letter-spacing: -0.02em; }
  .stat-l { font-size: 0.68rem; color: rgba(255,255,255,0.55); letter-spacing: 0.1em; text-transform: uppercase; }

  /* SECTIONS */
  .section { padding: 7rem 5vw; }
  .section-white { background: var(--bg-white); }
  .section-blue-lt { background: var(--blue-lt); }
  .section-dark { background: var(--dark); }
  .inner { max-width: 1100px; margin: 0 auto; }
  .label-tag { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-mid); margin-bottom: 1.25rem; display: block; }
  .label-tag.lt { color: rgba(255,255,255,0.35); }
  .label-tag.blue { color: var(--blue); }
  .h2 { font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; color: var(--ink); max-width: 640px; margin-bottom: 1rem; }
  .h2.lt { color: #FFFFFF; }
  .sub { font-size: 1rem; color: var(--ink-mid); line-height: 1.7; max-width: 540px; margin-bottom: 3.5rem; }
  .sub.lt { color: rgba(255,255,255,0.45); }

  /* HOW IT WORKS */
  .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-left: 1px solid var(--border); }
  .step-card { padding: 3rem 2.5rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); transition: background 0.2s; }
  .step-card:hover { background: var(--bg-white); }
  .step-n { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--blue); margin-bottom: 2rem; display: block; }
  .step-t { font-size: 1.2rem; font-weight: 500; color: var(--ink); margin-bottom: 0.875rem; line-height: 1.25; letter-spacing: -0.01em; }
  .step-d { color: var(--ink-mid); font-size: 0.9rem; line-height: 1.7; }

  /* WORKFLOW */
  .wf-section { padding: 7rem 5vw; background: var(--dark); }
  .wf-inner { max-width: 1100px; margin: 0 auto; }
  .wf-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 2rem; }
  .wf-canvas { border: 1px solid rgba(255,255,255,0.08); padding: 2.5rem 2rem; overflow-x: auto; }
  .wf-row { display: flex; align-items: flex-start; min-width: 720px; }
  .wf-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .wf-node { width: 84px; height: 84px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.3rem; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.04); transition: all 0.2s; position: relative; cursor: default; border-radius: 0; }
  .wf-node:hover { border-color: var(--blue); background: rgba(37,64,217,0.15); }
  .wf-icon { font-size: 1.5rem; line-height: 1; }
  .wf-brand { font-size: 0.5rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.28); }
  .wf-badge { position: absolute; top: -10px; right: -10px; background: var(--orange); color: #FFFFFF; padding: 0.12rem 0.4rem; font-size: 0.5rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; white-space: nowrap; }
  .wf-trigger { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: rgba(37,64,217,0.25); border: 1px solid rgba(37,64,217,0.5); padding: 0.12rem 0.5rem; font-size: 0.5rem; font-weight: 600; color: #7C9BFF; letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
  .wf-lbl { margin-top: 1rem; text-align: center; max-width: 88px; }
  .wf-lt { font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.75); line-height: 1.3; display: block; margin-bottom: 0.2rem; }
  .wf-ls { font-size: 0.62rem; color: rgba(255,255,255,0.28); line-height: 1.4; display: block; }
  .wf-connector { display: flex; align-items: center; padding-top: 42px; flex-shrink: 0; }
  .wf-line-wrap { position: relative; width: 32px; height: 1px; }
  .wf-line { position: absolute; inset: 0; background: rgba(37,64,217,0.4); }
  .wf-dot { position: absolute; top: 50%; transform: translateY(-50%); width: 4px; height: 4px; background: var(--blue); animation: pulse-dot 2s ease-in-out infinite; }
  .wf-arrowhead { position: absolute; right: -4px; top: 50%; transform: translateY(-50%); color: rgba(37,64,217,0.6); font-size: 0.5rem; }
  @keyframes pulse-dot { 0% { left: 2px; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: calc(100% - 6px); opacity: 0; } }
  .wf-outcomes { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 1.5rem; border: 1px solid rgba(255,255,255,0.08); border-bottom: none; }
  .wf-outcome { padding: 1.5rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.08); border-right: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 0.4rem; }
  .wf-outcome:last-child { border-right: none; }
  .oc-icon { font-size: 1rem; }
  .oc-t { font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.75); display: block; line-height: 1.3; }
  .oc-s { font-size: 0.65rem; color: rgba(255,255,255,0.28); display: block; line-height: 1.4; margin-top: 0.15rem; }

  /* AUTOMATIONS */
  .tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 2.5rem; overflow-x: auto; }
  .tab { padding: 0.85rem 1.5rem; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; border: none; border-bottom: 2px solid transparent; background: none; cursor: pointer; transition: all 0.2s; color: var(--ink-faint); white-space: nowrap; margin-bottom: -1px; font-family: 'Barlow', sans-serif; }
  .tab:hover { color: var(--ink); }
  .tab.on { color: var(--blue); border-bottom-color: var(--blue); }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0; border: 1px solid var(--border); }
  .card { padding: 1.75rem; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); cursor: pointer; transition: background 0.15s; display: flex; flex-direction: column; gap: 0.6rem; background: var(--bg-white); }
  .card:hover { background: var(--blue-lt); }
  .card-t { font-size: 1rem; font-weight: 500; color: var(--ink); line-height: 1.3; letter-spacing: -0.01em; }
  .card-d { color: var(--ink-mid); font-size: 0.85rem; line-height: 1.65; flex: 1; }
  .card-cta { color: var(--blue); font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; display: flex; align-items: center; gap: 0.3rem; margin-top: 0.25rem; }

  /* MODAL */
  .modal-bg { position: fixed; inset: 0; background: rgba(10,14,26,0.75); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .modal { background: var(--bg); border: 1px solid var(--border-strong); padding: 3rem; max-width: 520px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; border-radius: 0; }
  .modal-x { position: absolute; top: 1.5rem; right: 1.5rem; background: none; border: 1px solid var(--border); width: 36px; height: 36px; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; color: var(--ink-mid); transition: all 0.2s; border-radius: 0; }
  .modal-x:hover { background: var(--border); }
  .modal-ey { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 0.75rem; }
  .modal-t { font-size: 1.6rem; font-weight: 500; color: var(--ink); line-height: 1.2; margin-bottom: 1rem; letter-spacing: -0.02em; }
  .modal-d { color: var(--ink-mid); line-height: 1.7; margin-bottom: 2rem; font-size: 0.95rem; }

  /* DIFF */
  .diff-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-left: 1px solid rgba(255,255,255,0.08); }
  .diff-c { padding: 2.5rem 2rem; border-right: 1px solid rgba(255,255,255,0.08); }
  .diff-i { font-size: 1.4rem; margin-bottom: 1.25rem; display: block; }
  .diff-t { font-size: 1.05rem; font-weight: 500; color: #FFFFFF; margin-bottom: 0.5rem; letter-spacing: -0.01em; }
  .diff-d { color: rgba(255,255,255,0.38); font-size: 0.85rem; line-height: 1.65; }

  /* CONTACT */
  .contact-section { background: var(--dark); padding: 7rem 5vw; }
  .contact-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 6vw; align-items: start; }
  .contact-copy h2 { font-size: clamp(2rem, 3.5vw, 2.75rem); font-weight: 400; color: #FFFFFF; line-height: 1.1; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
  .contact-copy p { color: rgba(255,255,255,0.4); line-height: 1.7; margin-bottom: 2.5rem; }
  .contact-divider { display: flex; align-items: center; gap: 1rem; margin: 2rem 0; }
  .contact-divider::before, .contact-divider::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
  .contact-divider span { font-size: 0.7rem; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; text-transform: uppercase; white-space: nowrap; }
  .contact-trust { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.75rem; }
  .contact-trust span { font-size: 0.75rem; color: rgba(255,255,255,0.28); letter-spacing: 0.06em; }
  .contact-form .cform { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.1); }
  .contact-form .fg label { color: rgba(255,255,255,0.45); }
  .contact-form .fg input,
  .contact-form .fg select,
  .contact-form .fg textarea { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.12); color: #FFFFFF; }
  .contact-form .fg input::placeholder,
  .contact-form .fg textarea::placeholder { color: rgba(255,255,255,0.25); }
  .contact-form .fg select option { background: #1A2040; color: #FFFFFF; }
  .contact-form .fg input:focus,
  .contact-form .fg select:focus,
  .contact-form .fg textarea:focus { border-color: var(--blue); background: rgba(37,64,217,0.1); }
  @media (max-width: 960px) {
    .contact-inner { grid-template-columns: 1fr; }
    .contact-trust { flex-direction: row; flex-wrap: wrap; gap: 1.25rem; }
  }

  /* FORM */
  .cform { background: var(--bg-white); border: 1px solid var(--border); padding: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem; border-radius: 0; }
  .frow { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .fg { display: flex; flex-direction: column; gap: 0.4rem; }
  .fg label { font-size: 0.72rem; font-weight: 600; color: var(--ink-mid); letter-spacing: 0.08em; text-transform: uppercase; }
  .fg input, .fg select, .fg textarea { padding: 0.75rem 1rem; border: 1px solid var(--border); background: var(--bg); font-family: 'Barlow', sans-serif; font-size: 0.9rem; color: var(--ink); transition: border-color 0.2s; outline: none; width: 100%; border-radius: 0; }
  .fg input:focus, .fg select:focus, .fg textarea:focus { border-color: var(--blue); background: var(--bg-white); }
  .fg textarea { resize: vertical; min-height: 100px; line-height: 1.6; }
  .fsub { background: var(--blue); color: #FFFFFF; padding: 1rem 2rem; width: 100%; font-family: 'Barlow', sans-serif; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; border: 1px solid var(--blue); cursor: pointer; transition: background 0.2s; margin-top: 0.5rem; border-radius: 0; }
  .fsub:hover { background: var(--blue-deep); }
  .fsub:disabled { opacity: 0.5; cursor: not-allowed; }

  /* BLOG */
  .blog-grid { display: grid; grid-template-columns: repeat(3, 1fr); border: 1px solid var(--border); }
  .blog-card { background: var(--bg-white); cursor: pointer; transition: background 0.15s; border-right: 1px solid var(--border); text-decoration: none; display: block; }
  .blog-card:last-child { border-right: none; }
  .blog-card:hover { background: var(--blue-lt); }
  .blog-img { height: 160px; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border); }
  .blog-body { padding: 1.75rem; }
  .blog-tag { font-size: 0.65rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--blue); margin-bottom: 0.6rem; display: block; }
  .blog-t { font-size: 1rem; font-weight: 500; color: var(--ink); line-height: 1.35; margin-bottom: 0.6rem; letter-spacing: -0.01em; }
  .blog-ex { color: var(--ink-mid); font-size: 0.85rem; line-height: 1.65; }

  /* FOOTER */
  .footer { background: #060810; padding: 2.5rem 5vw; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.06); }
  .flogo { font-size: 0.85rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
  .flogo .logo-smb { color: var(--blue); }
  .flogo .logo-auto { color: rgba(255,255,255,0.4); }
  .flinks { display: flex; gap: 2rem; list-style: none; flex-wrap: wrap; }
  .flinks a { color: rgba(255,255,255,0.22); text-decoration: none; font-size: 0.72rem; letter-spacing: 0.06em; text-transform: uppercase; transition: color 0.2s; }
  .flinks a:hover { color: rgba(255,255,255,0.7); }
  .fcopy { color: rgba(255,255,255,0.16); font-size: 0.72rem; letter-spacing: 0.04em; }

  /* TOAST */
  .toast { position: fixed; bottom: 2rem; right: 2rem; background: var(--dark); color: #F5F4F0; padding: 1rem 1.5rem; font-size: 0.875rem; z-index: 999; border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; gap: 0.5rem; animation: up 0.3s ease; border-radius: 0; }
  @keyframes up { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fi { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
  .fi { animation: fi 0.4s ease forwards; }

  @media (max-width: 960px) {
    .hero { grid-template-columns: 1fr; padding-top: 120px; }
    .steps-grid { grid-template-columns: 1fr; }
    .diff-grid { grid-template-columns: 1fr 1fr; }
    .blog-grid { grid-template-columns: 1fr; }
    .stats-bar { grid-template-columns: repeat(2, 1fr); }
    .wf-outcomes { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .nav-links { display: none; }
    .frow { grid-template-columns: 1fr; }
    .diff-grid { grid-template-columns: 1fr; }
    .stats-bar { grid-template-columns: 1fr 1fr; }
  }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────

const NICHES = [
  {
    id: "real-estate", label: "Real Estate", color: "#2540D9", emoji: "🏠",
    automations: [
      { title: "Instant Lead Response Bot", desc: "Capture and respond to prospective tenant inquiries 24/7, qualifying leads before they go cold and cutting vacancy periods by weeks." },
      { title: "Automated Tenant Screening Pipeline", desc: "Collect applications, run background checks, and compile reports automatically. Screening time drops from hours to minutes per applicant." },
      { title: "Smart Maintenance Request Router", desc: "Instantly categorize tenant repair requests and dispatch to the appropriate vendor. No more phone-tag delays that frustrate residents." },
      { title: "Rent Payment Reminder and Collection", desc: "Send escalating payment reminders and late notices automatically, reducing delinquency rates without uncomfortable conversations." },
      { title: "Move-In / Move-Out Inspection Scheduler", desc: "Coordinate inspections between tenants, cleaners, and maintenance crews automatically to prevent scheduling conflicts and calendar gaps." },
      { title: "Security Deposit Calculator and Return", desc: "Automatically calculate deductions, generate itemized statements, and process returns to eliminate disputes and legal exposure." },
      { title: "Vendor Performance Tracker", desc: "Log response times, completion rates, and tenant feedback to identify your best and worst contractors at a glance." },
      { title: "Lease Renewal Automation", desc: "Trigger renewal offers 90 days before expiration with dynamic pricing suggestions, reducing tenant turnover and vacancy costs." },
      { title: "Tenant Communication Hub", desc: "Centralize texts, emails, and calls into one auto-tagged thread so nothing falls through the cracks during busy periods." },
      { title: "Automated Financial Reporting", desc: "Generate owner statements, track expenses by property, and sync with accounting software to give investors real-time portfolio visibility." },
    ]
  },
  {
    id: "ecommerce", label: "E-commerce", color: "#2540D9", emoji: "🛒",
    automations: [
      { title: "Smart Inventory Reorder Alerts", desc: "Monitor stock levels across suppliers and auto-generate purchase orders before you hit zero, preventing lost sales from stockouts." },
      { title: "Abandoned Cart Recovery Sequences", desc: "Trigger multi-channel follow-ups via email and SMS within hours of abandonment, recovering 15 to 20 percent of otherwise lost revenue." },
      { title: "Dynamic Pricing Optimizer", desc: "Adjust prices based on competitor monitoring, demand signals, and inventory age to maximize margins without manual spreadsheet updates." },
      { title: "Supplier Order Automation", desc: "Route orders to the right suppliers, transmit tracking numbers back to customers, and reconcile invoices. All hands-free." },
      { title: "Review Generation Engine", desc: "Automatically request reviews from satisfied customers and escalate negative feedback to support before it becomes a public problem." },
      { title: "Return and Exchange Auto-Processor", desc: "Generate return labels, approve exchanges based on your rules, and update inventory. Turns refunds into exchanges 40 percent of the time." },
      { title: "Multi-Channel Inventory Sync", desc: "Keep stock levels accurate across Shopify, Amazon, eBay, and Etsy in real time, preventing overselling nightmares." },
      { title: "VIP Customer Recognition System", desc: "Tag and notify your team when high-value customers order, enabling personalized service that drives repeat purchases." },
      { title: "Back-in-Stock Notification Bot", desc: "Automatically notify waiting customers when products return to inventory, capturing demand that would otherwise evaporate." },
      { title: "Profit Analytics Dashboard", desc: "Calculate true profit per SKU after ads, fees, and shipping to reveal which products actually make money versus just generating revenue." },
    ]
  },
  {
    id: "agency", label: "Marketing Agency", color: "#2540D9", emoji: "📊",
    automations: [
      { title: "Instant Proposal Generator", desc: "Create branded, customized proposals from intake form data in minutes, accelerating your sales cycle by up to 50 percent." },
      { title: "Client Onboarding Orchestrator", desc: "Auto-create project folders, schedule kickoff calls, send contracts, and assign team tasks the moment a deal closes." },
      { title: "Campaign Performance Auto-Reporter", desc: "Pull data from ad platforms daily and send clients visual dashboards, eliminating the monthly reporting week scramble." },
      { title: "Content Approval Pipeline", desc: "Route drafts through stakeholders automatically, track revision rounds, and flag delays to keep projects on deadline." },
      { title: "Lead Scoring and Distribution System", desc: "Qualify inbound leads by budget, timeline, and fit, then auto-assign to the right account executive for the fastest possible response." },
      { title: "Client Retention Alert System", desc: "Monitor engagement signals and flag at-risk accounts before they churn, triggering retention playbooks automatically." },
      { title: "Competitive Intelligence Monitor", desc: "Track competitor ads, content, and pricing changes, alerting your team to opportunities and threats in real time." },
      { title: "Timesheet and Billing Reconciliation", desc: "Log hours by project, generate invoices, and sync with accounting to ensure every billable minute gets captured." },
      { title: "Testimonial and Case Study Collector", desc: "Automatically request feedback when projects complete, then generate case study drafts from successful client outcomes." },
      { title: "Resource Allocation Optimizer", desc: "Track team capacity and project pipelines, suggesting optimal resource distribution to maximize utilization and margins." },
    ]
  },
  {
    id: "local-services", label: "Local Services", color: "#2540D9", emoji: "🔧",
    automations: [
      { title: "Lead-to-Booking Pipeline", desc: "Capture every inbound lead, qualify them automatically, and book appointments without anyone on your team touching it. Works 24/7." },
      { title: "Automated Quote Generator", desc: "Calculate estimates from customer inputs and send professional proposals within minutes. You beat slower competitors before they even respond." },
      { title: "Route Optimization Scheduler", desc: "Map jobs by location and technician availability, minimizing drive time and maximizing billable hours per day." },
      { title: "Appointment Reminder Cascade", desc: "Send SMS and email reminders 24 hours and 1 hour before appointments, cutting no-shows by up to 70 percent and protecting your schedule." },
      { title: "Field Tech Job Packet Creator", desc: "Auto-compile customer info, photos, job history, and materials lists for each technician before they arrive on site." },
      { title: "Instant Invoice and Payment Collector", desc: "Generate invoices from completed work orders and enable one-click payment, reducing days-to-pay from weeks to hours." },
      { title: "Follow-Up Review Request Engine", desc: "Automatically ask satisfied customers for Google reviews, building your online reputation while you focus on the next job." },
      { title: "Maintenance Contract Renewal Bot", desc: "Track service agreements, send renewal notices, and process payments to secure recurring revenue before contracts lapse." },
      { title: "Supply Reorder Alerts", desc: "Monitor truck inventory and auto-reorder materials when running low, preventing job delays from missing parts." },
      { title: "Emergency After-Hours Dispatcher", desc: "Route urgent calls based on on-call schedules and job type, ensuring emergency clients reach help immediately." },
    ]
  },
  {
    id: "professional", label: "Professional Services", color: "#2540D9", emoji: "💼",
    automations: [
      { title: "Client Discovery Auto-Compiler", desc: "Pull company data, news, and financials before discovery calls, giving you instant credibility without hours of manual research." },
      { title: "Engagement Letter Generator", desc: "Create custom SOWs and contracts from scope templates, cutting proposal time from days to under an hour." },
      { title: "Expense Receipt Auto-Capture", desc: "Scan, categorize, and reconcile receipts automatically, eliminating the monthly shoebox shuffle for you and your clients." },
      { title: "Recurring Billing and Collections", desc: "Invoice retainer clients, follow up on overdue accounts, and process payments without touching a spreadsheet." },
      { title: "Document Assembly Engine", desc: "Generate contracts, reports, and filings from templates and client data, reducing errors and accelerating delivery." },
      { title: "Time Tracking and Billable Hours Optimizer", desc: "Capture billable time from calendar, email, and document activity to ensure no revenue slips through the cracks." },
      { title: "Client Portal Auto-Updater", desc: "Push project updates, deliverables, and metrics to branded client dashboards, reducing status meeting requests by 50 percent." },
      { title: "Regulatory Deadline Monitor", desc: "Track filing dates, send compliance alerts, and auto-generate submission documents to prevent costly penalties." },
      { title: "Meeting Transcription and Action Items", desc: "Record calls, generate summaries, and create task lists automatically so nothing gets lost in conversation." },
      { title: "Referral Trigger System", desc: "Identify delighted clients and automatically request introductions to similar businesses, fueling growth without cold outreach." },
    ]
  },
];

const BLOG_POSTS = [
  { tag: "Local Services", title: "Why the First Business to Respond Wins 78% of the Time", excerpt: "Speed-to-lead is the single biggest lever most local businesses are not pulling. Here is what the data says and how to fix it.", bg: "#D8E0FA", emoji: "⚡", slug: "speed-to-lead" },
  { tag: "Real Estate", title: "How Property Managers Are Reclaiming 15 Hours a Week with AI", excerpt: "From maintenance routing to lease renewals, the automations reshaping property management operations right now.", bg: "#EBF0FF", emoji: "🏠", slug: "property-manager-automation" },
  { tag: "Strategy", title: "The Bottleneck Audit: Find What's Costing Your Business the Most", excerpt: "Before you automate anything, run this 20-minute exercise to identify your highest-leverage opportunity.", bg: "#FDEEE8", emoji: "🔍", slug: "bottleneck-audit" },
];

interface AutoItem { title: string; desc: string; nicheLabel?: string; }
interface FormState { name: string; email: string; phone: string; business: string; bottleneck: string; }
interface ToastState { msg: string; icon: string; }

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeNiche, setActiveNiche] = useState(3);
  const [activeAuto, setActiveAuto] = useState<AutoItem | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", business: "", bottleneck: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openAuto = (a: { title: string; desc: string }, nicheLabel: string) =>
    setActiveAuto({ ...a, nicheLabel });

  const inquire = (a: AutoItem) => {
    setActiveAuto(null);
    setForm(f => ({ ...f, bottleneck: `I'm interested in the "${a.title}" automation.` }));
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 80);
  };

  const flash = (msg: string, icon: string) => {
    setToast({ msg, icon });
    setTimeout(() => setToast(null), 4500);
  };

  const submit = async () => {
    if (!form.name || !form.email) { flash("Please fill in your name and email.", "⚠️"); return; }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSubmitted(true);
      flash("Message received. We will be in touch within 24 hours.", "✓");
      setForm({ name: "", email: "", phone: "", business: "", bottleneck: "" });
    } catch (err) {
      flash(err instanceof Error ? err.message : "Failed to send. Please try again.", "⚠️");
    } finally {
      setSubmitting(false);
    }
  };

  const niche = NICHES[activeNiche];

  return (
    <>
      <style>{STYLE}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          <span className="logo-smb">SMB</span>
          <span className="logo-auto"> Automation</span>
        </div>
        <ul className="nav-links">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#workflow">See It Live</a></li>
          <li><a href="#automations">Automations</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact" className="btn-primary" style={{ padding: "0.45rem 1.1rem" }}>Free Audit</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        {/* Left */}
        <div>
          <div className="hero-eyebrow">Custom AI Automation for Local Businesses</div>
          <h1 className="hero-headline">
            Turn Your Bottlenecks<br />Into <em>AI Automations.</em>
          </h1>
          <p className="hero-sub">
            We find where your business is losing time and money, then build systems that fix it automatically. Most clients recover the cost in the first 30 days.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary" style={{ padding: "0.85rem 2rem" }}>Get a Free Audit</a>
            <a href="#workflow" className="btn-secondary" style={{ padding: "0.85rem 2rem" }}>See How It Works</a>
          </div>
          <div className="hero-proof">
            {[
              "Leads followed up within 60 seconds — automatically",
              "Appointments booked without anyone touching a calendar",
              "Clients recover setup cost within 30 days on average",
            ].map((t, i) => (
              <div key={i} className="proof-item">
                <div className="proof-dot" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — embedded form */}
        <div>
          <div className="hero-form-card">
            <div className="hero-form-title">Get a Free Automation Audit</div>
            <p className="hero-form-sub">Tell us your biggest bottleneck. We will tell you exactly what to automate first.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              <div className="frow">
                <div className="fg">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="fg">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="fg">
                <label>Business Type</label>
                <select value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}>
                  <option value="">Select your industry</option>
                  <option>Real Estate / Property Management</option>
                  <option>E-commerce / Retail</option>
                  <option>Marketing Agency</option>
                  <option>Local Service / Contractor</option>
                  <option>Professional Services</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="fg">
                <label>Biggest Time Drain</label>
                <textarea
                  rows={3}
                  placeholder="What task eats the most time in your business right now?"
                  value={form.bottleneck}
                  onChange={e => setForm(f => ({ ...f, bottleneck: e.target.value }))}
                />
              </div>
              <button className="fsub" onClick={submit} disabled={submitting || submitted}>
                {submitting ? "Sending..." : submitted ? "✓ Request Sent" : "Show Me What to Automate →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-bar">
        {[
          { n: "< 60s",     l: "Lead response time" },
          { n: "30 days",   l: "Average payback period" },
          { n: "10–20 hrs", l: "Saved per client per week" },
          { n: "100%",      l: "Custom — no templates" },
        ].map((s, i) => (
          <div key={i} className="stat">
            <span className="stat-n">{s.n}</span>
            <span className="stat-l">{s.l}</span>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section className="section section-white" id="how-it-works">
        <div className="inner">
          <span className="label-tag">The Process</span>
          <h2 className="h2">Built around your ROI, not a feature checklist.</h2>
          <p className="sub">Every engagement starts with a conversation about where your business is losing time and money. We build from that.</p>
          <div className="steps-grid">
            {[
              { n: "01", t: "We find where you're losing money", d: "In a free 30-minute call, we identify the 2 to 3 places in your business where manual processes are costing you the most. We put a dollar figure on it before we propose anything." },
              { n: "02", t: "We build around your existing tools", d: "No new software to learn. We connect your calendar, phone, and email and build a workflow that runs automatically in the background." },
              { n: "03", t: "You get time back and results you can measure", d: "Most clients see the system live within 10 business days. Every month you get a simple report: leads captured, hours saved, revenue recovered." },
            ].map((s, i) => (
              <div key={i} className="step-card">
                <span className="step-n">{s.n}</span>
                <div className="step-t">{s.t}</div>
                <p className="step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <WorkflowDiagram />

      {/* AUTOMATIONS */}
      <section className="section" id="automations">
        <div className="inner">
          <span className="label-tag blue">Automation Library</span>
          <h2 className="h2">What we build, by industry.</h2>
          <p className="sub">Every automation is custom-built for your specific tools and process. Click any to learn more.</p>
          <div className="tabs">
            {NICHES.map((n, i) => (
              <button key={i} className={`tab ${activeNiche === i ? "on" : ""}`} onClick={() => setActiveNiche(i)}>
                {n.emoji} {n.label}
              </button>
            ))}
          </div>
          <div className="cards fi" key={niche.id}>
            {niche.automations.map((a, i) => (
              <div key={i} className="card" onClick={() => openAuto(a, niche.label)}>
                <div className="card-t">{a.title}</div>
                <p className="card-d">{a.desc}</p>
                <div className="card-cta">Learn More →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="section section-dark">
        <div className="inner">
          <span className="label-tag lt">Why SMB Automation</span>
          <h2 className="h2 lt" style={{ marginBottom: "3.5rem" }}>We start with your P&amp;L, not our tools.</h2>
          <div className="diff-grid">
            {[
              { i: "💰", t: "ROI before anything else", d: "Every engagement starts by calculating what your current process is costing you. If the automation does not pay for itself in 30 days, we redesign the scope." },
              { i: "🔧", t: "Built on tools you already own", d: "We do not resell software. We build on your CRM, your phone system, your calendar. You own everything we build, credentials, workflows, documentation." },
              { i: "📐", t: "Multi-system, not single triggers", d: "Real automation connects 4 to 6 tools in a single workflow. A form submission that qualifies, routes, books, briefs, and logs without anyone touching it." },
              { i: "📊", t: "Monthly reporting tied to outcomes", d: "Every retainer includes a monthly summary: leads captured, hours saved, revenue influenced. If it is not performing, you will know before we do." },
            ].map((d, i) => (
              <div key={i} className="diff-c">
                <span className="diff-i">{d.i}</span>
                <div className="diff-t">{d.t}</div>
                <p className="diff-d">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section section-white" id="blog">
        <div className="inner">
          <span className="label-tag">From the Blog</span>
          <h2 className="h2" style={{ marginBottom: "3rem" }}>What we&apos;re thinking about.</h2>
          <div className="blog-grid">
            {BLOG_POSTS.map((p, i) => (
              <a key={i} href={`/blog/${p.slug}`} className="blog-card">
                <div className="blog-img" style={{ background: p.bg }}>
                  <span style={{ fontSize: "2.5rem" }}>{p.emoji}</span>
                </div>
                <div className="blog-body">
                  <span className="blog-tag">{p.tag}</span>
                  <div className="blog-t">{p.title}</div>
                  <p className="blog-ex">{p.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-inner">
          {/* Left: copy + Calendly */}
          <div className="contact-copy">
            <span className="label-tag lt">Free Consultation</span>
            <h2>Not sure what to automate? Start here.</h2>
            <p>We will do a free 30-minute audit of your business and tell you exactly where automation will have the biggest impact. No pitch. No commitment.</p>
            <a
              href="https://calendly.com/jesse-curvebase/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              Book a Free Audit Call →
            </a>
            <div className="contact-trust">
              <span>✓ Free 30-minute call</span>
              <span>✓ No hard sell — ever</span>
              <span>✓ Response within 24 hours</span>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form">
            <div className="cform">
              <div className="frow">
                <div className="fg">
                  <label>Name</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="fg">
                  <label>Email</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                </div>
              </div>
              <div className="fg">
                <label>Phone (optional)</label>
                <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              </div>
              <div className="fg">
                <label>Business Type</label>
                <select value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}>
                  <option value="">Select your industry</option>
                  <option>Real Estate / Property Management</option>
                  <option>E-commerce / Retail</option>
                  <option>Marketing Agency</option>
                  <option>Local Service / Contractor</option>
                  <option>Professional Services</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="fg">
                <label>Biggest Time Drain</label>
                <textarea
                  rows={3}
                  placeholder="What task eats the most time in your business right now?"
                  value={form.bottleneck}
                  onChange={e => setForm(f => ({ ...f, bottleneck: e.target.value }))}
                />
              </div>
              <button className="fsub" onClick={submit} disabled={submitting || submitted}>
                {submitting ? "Sending..." : submitted ? "✓ Request Sent" : "Send Audit Request →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="flogo">
          <span className="logo-smb">SMB</span>
          <span className="logo-auto"> Automation</span>
        </div>
        <ul className="flinks">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#automations">Automations</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <span className="fcopy">© 2026 SMB Automation</span>
      </footer>

      {/* MODAL */}
      {activeAuto && (
        <div className="modal-bg" onClick={() => setActiveAuto(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setActiveAuto(null)}>✕</button>
            <div className="modal-ey">{activeAuto.nicheLabel}</div>
            <div className="modal-t">{activeAuto.title}</div>
            <p className="modal-d">{activeAuto.desc}</p>
            <div style={{ background: "var(--blue-lt)", border: "1px solid var(--border)", padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--blue)", marginBottom: "0.5rem" }}>What this solves</div>
              <p style={{ fontSize: "0.875rem", color: "var(--ink)", lineHeight: 1.65 }}>
                This automation removes manual, repetitive tasks from your team&apos;s plate, giving you back hours every week and ensuring nothing falls through the cracks. Every build is tailored to your existing tools and workflows.
              </p>
            </div>
            <button className="btn-primary" style={{ width: "100%", textAlign: "center", padding: "0.85rem" }} onClick={() => inquire(activeAuto)}>
              Inquire About This Automation →
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast"><span>{toast.icon}</span><span>{toast.msg}</span></div>}
    </>
  );
}
