'use client';

import { useState, useEffect, useCallback } from "react";
import WorkflowDiagram from "@/components/WorkflowDiagram";
import type { PostMeta } from "@/lib/posts";

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

  /* MOBILE NAV */
  .nav-burger { display: none; background: none; border: 1px solid var(--border); width: 40px; height: 40px; cursor: pointer; font-size: 1.25rem; color: var(--ink); align-items: center; justify-content: center; border-radius: 0; font-family: 'Barlow', sans-serif; transition: border-color 0.2s; }
  .nav-burger:hover { border-color: var(--blue); }
  .mobile-overlay { position: fixed; inset: 0; z-index: 150; background: rgba(237,241,247,0.98); backdrop-filter: blur(16px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; opacity: 0; pointer-events: none; transition: opacity 0.2s; }
  .mobile-overlay.open { opacity: 1; pointer-events: auto; }
  .mobile-overlay-x { position: absolute; top: 1rem; right: 5vw; background: none; border: 1px solid var(--border); width: 40px; height: 40px; cursor: pointer; font-size: 1rem; color: var(--ink-mid); display: flex; align-items: center; justify-content: center; border-radius: 0; transition: border-color 0.2s; }
  .mobile-overlay-x:hover { border-color: var(--blue); }
  .mobile-nav-list { list-style: none; display: flex; flex-direction: column; align-items: center; gap: 0; width: 100%; max-width: 320px; }
  .mobile-nav-list li { width: 100%; border-bottom: 1px solid var(--border); }
  .mobile-nav-list li:first-child { border-top: 1px solid var(--border); }
  .mobile-nav-list a { display: block; padding: 1.25rem 1rem; text-align: center; text-decoration: none; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-mid); transition: color 0.15s, background 0.15s; }
  .mobile-nav-list a:hover, .mobile-nav-list a:focus-visible { color: var(--blue); background: var(--blue-lt); }
  .mobile-nav-list .mobile-cta { background: var(--blue); color: #FFFFFF; font-weight: 600; letter-spacing: 0.1em; border-bottom: none; }
  .mobile-nav-list .mobile-cta:hover { background: var(--blue-deep); }

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
  .hero-proof { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 3rem; border: 1px solid var(--border); }
  .proof-item { padding: 1.5rem 1.25rem; border-right: 1px solid var(--border); display: flex; flex-direction: column; gap: 0.35rem; background: var(--bg-white); }
  .proof-item:last-child { border-right: none; }
  .proof-num { font-size: 2rem; font-weight: 300; color: var(--ink); line-height: 1; letter-spacing: -0.02em; }
  .proof-label { font-size: 0.72rem; color: var(--ink-mid); letter-spacing: 0.04em; line-height: 1.4; }
  .proof-accent { color: var(--orange); }

  /* HERO FORM */
  .hero-form-card { background: var(--bg-white); border: 1px solid var(--border); padding: 2.5rem; border-radius: 0; }
  .hero-form-title { font-size: 1.1rem; font-weight: 600; color: var(--ink); margin-bottom: 0.35rem; letter-spacing: -0.01em; }
  .hero-form-sub { font-size: 0.85rem; color: var(--ink-mid); margin-bottom: 2rem; line-height: 1.5; }

  /* TOOLS TICKER */
  .tools-ticker { background: var(--blue); overflow: hidden; position: relative; }
  .tools-ticker::before, .tools-ticker::after { content: ''; position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2; pointer-events: none; }
  .tools-ticker::before { left: 0; background: linear-gradient(to right, var(--blue), transparent); }
  .tools-ticker::after { right: 0; background: linear-gradient(to left, var(--blue), transparent); }
  .tools-track { display: flex; align-items: center; animation: ticker-scroll 50s linear infinite; width: max-content; padding: 1.1rem 0; }
  .tools-track:hover { animation-play-state: paused; }
  .tool-item { display: flex; align-items: center; white-space: nowrap; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.75); padding: 0 1.75rem; }
  .tool-sep { color: rgba(255,255,255,0.22); margin-left: 1.75rem; font-size: 0.45rem; }
  @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

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
  .step-n { font-size: 0.7rem; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: var(--blue); margin-bottom: 1.5rem; display: block; }
  .step-t { font-size: 1.2rem; font-weight: 500; color: var(--ink); margin-bottom: 0.4rem; line-height: 1.25; letter-spacing: -0.01em; }
  .step-sub { font-size: 0.85rem; color: var(--ink-mid); font-style: italic; margin-bottom: 1.25rem; line-height: 1.5; }
  .step-list { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .step-list li { color: var(--ink-mid); font-size: 0.875rem; line-height: 1.65; padding-left: 1rem; position: relative; }
  .step-list li::before { content: '—'; position: absolute; left: 0; color: var(--blue); font-weight: 600; }

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
  .form-success { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 3rem 2rem; text-align: center; min-height: 280px; }
  .form-success-icon { width: 48px; height: 48px; border: 2px solid var(--blue); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; color: var(--blue); }
  .form-success-t { font-size: 1.15rem; font-weight: 500; color: var(--ink); letter-spacing: -0.01em; }
  .form-success-d { font-size: 0.875rem; color: var(--ink-mid); line-height: 1.6; max-width: 320px; }
  .contact-form .form-success-t { color: #FFFFFF; }
  .contact-form .form-success-d { color: rgba(255,255,255,0.45); }
  .contact-form .form-success-icon { border-color: var(--blue); color: var(--blue); }
  .form-error { font-size: 0.78rem; color: var(--orange); padding: 0.75rem 1rem; border: 1px solid var(--orange); background: var(--orange-pale); }

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
    .wf-outcomes { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-burger { display: flex; }
  }
  @media (max-width: 640px) {
    .frow { grid-template-columns: 1fr; }
    .diff-grid { grid-template-columns: 1fr; }
    .hero-proof { grid-template-columns: repeat(3, 1fr); }
    .proof-item { padding: 1rem 0.75rem; }
    .proof-num { font-size: 1.5rem; }
    .proof-label { font-size: 0.65rem; }
  }
`;

// ─── Data ──────────────────────────────────────────────────────────────────────

const NICHES = [
  {
    id: "real-estate", label: "Real Estate", color: "#2540D9", emoji: "🏠",
    automations: [
      { title: "Instant Lead Response Bot", desc: "Capture and respond to prospective tenant inquiries 24/7, qualifying leads before they go cold and cutting vacancy periods by weeks.", solves: "Property managers lose 30-40% of leads because they can't respond fast enough. This bot replies within 60 seconds to every inquiry — nights, weekends, holidays — so you never lose a prospect to a competitor who answered first." },
      { title: "Automated Tenant Screening Pipeline", desc: "Collect applications, run background checks, and compile reports automatically. Screening time drops from hours to minutes per applicant.", solves: "Manual screening eats 3-5 hours per applicant when you factor in data entry, background check coordination, and report compilation. This pipeline handles the entire process end-to-end, giving you a decision-ready report in under 10 minutes." },
      { title: "Smart Maintenance Request Router", desc: "Instantly categorize tenant repair requests and dispatch to the appropriate vendor. No more phone-tag delays that frustrate residents.", solves: "Slow maintenance response is the number one driver of tenant turnover. This system categorizes requests by urgency and trade, dispatches the right vendor instantly, and keeps the tenant updated — cutting average resolution time by 60%." },
      { title: "Rent Payment Reminder and Collection", desc: "Send escalating payment reminders and late notices automatically, reducing delinquency rates without uncomfortable conversations.", solves: "Late rent creates cash flow problems and awkward conversations. Automated escalation sequences — friendly reminder, formal notice, late fee notification — reduce delinquency rates by 25-35% without your team making a single phone call." },
      { title: "Move-In / Move-Out Inspection Scheduler", desc: "Coordinate inspections between tenants, cleaners, and maintenance crews automatically to prevent scheduling conflicts and calendar gaps.", solves: "Turnover coordination involves 4-6 parties and dozens of messages. This automation handles scheduling, confirmations, and reminders for every step, compressing your turnover window and eliminating double-bookings." },
      { title: "Security Deposit Calculator and Return", desc: "Automatically calculate deductions, generate itemized statements, and process returns to eliminate disputes and legal exposure.", solves: "Deposit disputes are the most common source of landlord-tenant legal action. Automated itemized statements with photo documentation and calculation transparency protect you legally and cut dispute rates dramatically." },
      { title: "Vendor Performance Tracker", desc: "Log response times, completion rates, and tenant feedback to identify your best and worst contractors at a glance.", solves: "Without data, you're guessing which vendors deserve your business. This tracker logs every job — response time, completion rate, cost, tenant rating — so you can negotiate from a position of strength and fire underperformers with evidence." },
      { title: "Lease Renewal Automation", desc: "Trigger renewal offers 90 days before expiration with dynamic pricing suggestions, reducing tenant turnover and vacancy costs.", solves: "Every vacant unit costs you $1,500-3,000 in lost rent and turnover expenses. Starting renewal conversations 90 days out with market-adjusted pricing increases retention rates by 20-30% and eliminates last-minute scrambles." },
      { title: "Tenant Communication Hub", desc: "Centralize texts, emails, and calls into one auto-tagged thread so nothing falls through the cracks during busy periods.", solves: "When tenant messages are scattered across text, email, voicemail, and portal messages, things get missed. A single auto-tagged thread per tenant means anyone on your team can see the full history and respond in context." },
      { title: "Automated Financial Reporting", desc: "Generate owner statements, track expenses by property, and sync with accounting software to give investors real-time portfolio visibility.", solves: "Monthly owner reporting takes 4-8 hours for a mid-size portfolio. Automated statements pull from your actual transaction data, categorize expenses correctly, and deliver polished reports to owners without your team touching a spreadsheet." },
    ]
  },
  {
    id: "ecommerce", label: "E-commerce", color: "#2540D9", emoji: "🛒",
    automations: [
      { title: "Smart Inventory Reorder Alerts", desc: "Monitor stock levels across suppliers and auto-generate purchase orders before you hit zero, preventing lost sales from stockouts.", solves: "Stockouts cost the average e-commerce business 4-8% of annual revenue. Automated reorder points based on sales velocity, lead times, and seasonal patterns ensure you never miss a sale because a product page shows 'out of stock.'" },
      { title: "Abandoned Cart Recovery Sequences", desc: "Trigger multi-channel follow-ups via email and SMS within hours of abandonment, recovering 15 to 20 percent of otherwise lost revenue.", solves: "70% of carts are abandoned. A timed sequence — 1 hour email, 24 hour SMS, 72 hour final offer — recovers 15-20% of that revenue. The automation pays for itself within the first week for most stores." },
      { title: "Dynamic Pricing Optimizer", desc: "Adjust prices based on competitor monitoring, demand signals, and inventory age to maximize margins without manual spreadsheet updates.", solves: "Static pricing leaves money on the table. This system monitors competitor prices, tracks demand patterns, and adjusts your prices within rules you set — protecting margins on hot items and moving slow inventory faster." },
      { title: "Supplier Order Automation", desc: "Route orders to the right suppliers, transmit tracking numbers back to customers, and reconcile invoices. All hands-free.", solves: "Multi-supplier fulfillment means manual routing, copy-pasting tracking numbers, and reconciling invoices from 5+ vendors. This automation handles all of it, reducing fulfillment errors by 90% and saving 10-15 hours per week." },
      { title: "Review Generation Engine", desc: "Automatically request reviews from satisfied customers and escalate negative feedback to support before it becomes a public problem.", solves: "Products with 10+ reviews convert 2-3x better than those without. Timed review requests after delivery — with negative-experience interception — build social proof while protecting your public rating." },
      { title: "Return and Exchange Auto-Processor", desc: "Generate return labels, approve exchanges based on your rules, and update inventory. Turns refunds into exchanges 40 percent of the time.", solves: "Manual returns processing costs $10-15 per return in labor. Automated approval, label generation, and exchange suggestions reduce that cost to near zero and convert 40% of returns into exchanges — keeping the revenue." },
      { title: "Multi-Channel Inventory Sync", desc: "Keep stock levels accurate across Shopify, Amazon, eBay, and Etsy in real time, preventing overselling nightmares.", solves: "Overselling triggers platform penalties and angry customers. Real-time inventory sync across all your channels means stock levels update within seconds of a sale, preventing the cascading fulfillment failures that damage your seller ratings." },
      { title: "VIP Customer Recognition System", desc: "Tag and notify your team when high-value customers order, enabling personalized service that drives repeat purchases.", solves: "Your top 10% of customers typically generate 40% of revenue. Automated VIP detection flags their orders for priority handling, triggers personalized thank-you sequences, and ensures your best customers get the white-glove treatment." },
      { title: "Back-in-Stock Notification Bot", desc: "Automatically notify waiting customers when products return to inventory, capturing demand that would otherwise evaporate.", solves: "Customers who sign up for back-in-stock alerts convert at 3-5x the rate of normal traffic. Automated notifications the moment inventory arrives capture demand that otherwise evaporates within 48 hours." },
      { title: "Profit Analytics Dashboard", desc: "Calculate true profit per SKU after ads, fees, and shipping to reveal which products actually make money versus just generating revenue.", solves: "Most e-commerce operators know their revenue but not their true profit per product. This dashboard factors in ad spend, platform fees, shipping costs, and returns to show you which SKUs actually make money — and which ones are losing it." },
    ]
  },
  {
    id: "agency", label: "Marketing Agency", color: "#2540D9", emoji: "📊",
    automations: [
      { title: "Instant Proposal Generator", desc: "Create branded, customized proposals from intake form data in minutes, accelerating your sales cycle by up to 50 percent.", solves: "Proposal creation typically takes 3-5 hours of a senior team member's time. This generator pulls intake data, applies your pricing model, and produces a branded PDF in minutes — cutting your sales cycle and letting you respond while the lead is still warm." },
      { title: "Client Onboarding Orchestrator", desc: "Auto-create project folders, schedule kickoff calls, send contracts, and assign team tasks the moment a deal closes.", solves: "Onboarding involves 15-20 discrete tasks across 3-4 tools. Missing one step creates downstream problems that erode client confidence. This orchestrator triggers every task automatically at deal close — folder creation, contract send, kickoff scheduling, team briefing — so nothing gets missed." },
      { title: "Campaign Performance Auto-Reporter", desc: "Pull data from ad platforms daily and send clients visual dashboards, eliminating the monthly reporting week scramble.", solves: "Monthly reporting week costs agencies 40+ hours across the team. Automated daily data pulls from Google Ads, Meta, and analytics platforms generate client-ready dashboards that update in real time — turning a week-long scramble into a 10-minute review." },
      { title: "Content Approval Pipeline", desc: "Route drafts through stakeholders automatically, track revision rounds, and flag delays to keep projects on deadline.", solves: "Content bottlenecks happen when approvals sit in inboxes. Automated routing sends drafts to the right stakeholder, sends reminders on delays, tracks revision rounds, and escalates blockers — keeping your production calendar on track." },
      { title: "Lead Scoring and Distribution System", desc: "Qualify inbound leads by budget, timeline, and fit, then auto-assign to the right account executive for the fastest possible response.", solves: "Not all leads are equal, but they all expect fast responses. Automated scoring by budget, timeline, and fit routes high-value leads to senior AEs instantly and nurtures lower-fit leads — so your closers spend time on deals that will actually close." },
      { title: "Client Retention Alert System", desc: "Monitor engagement signals and flag at-risk accounts before they churn, triggering retention playbooks automatically.", solves: "Agencies lose 20-30% of clients annually, often without warning. This system monitors engagement signals — login frequency, response times, feedback sentiment — and flags at-risk accounts 30-60 days before they churn, giving you time to intervene." },
      { title: "Competitive Intelligence Monitor", desc: "Track competitor ads, content, and pricing changes, alerting your team to opportunities and threats in real time.", solves: "Competitive landscape shifts happen weekly. Automated monitoring of competitor ad spend, new content, and positioning changes gives your strategy team an edge — and gives clients proof that you're watching the market for them." },
      { title: "Timesheet and Billing Reconciliation", desc: "Log hours by project, generate invoices, and sync with accounting to ensure every billable minute gets captured.", solves: "Agencies lose 10-15% of billable revenue to untracked time. Automated time capture from calendar events, project tools, and document activity ensures every billable minute is logged and invoiced correctly." },
      { title: "Testimonial and Case Study Collector", desc: "Automatically request feedback when projects complete, then generate case study drafts from successful client outcomes.", solves: "Case studies are the highest-converting sales asset, but nobody has time to write them. Automated feedback requests at project close, combined with performance data, generate draft case studies that your team only needs to polish — not write from scratch." },
      { title: "Resource Allocation Optimizer", desc: "Track team capacity and project pipelines, suggesting optimal resource distribution to maximize utilization and margins.", solves: "Over-allocation burns out your team; under-allocation kills margins. This optimizer tracks capacity in real time and flags imbalances before they become problems, helping you maintain 75-85% utilization — the sweet spot for profitability and retention." },
    ]
  },
  {
    id: "local-services", label: "Local Services", color: "#2540D9", emoji: "🔧",
    automations: [
      { title: "Lead-to-Booking Pipeline", desc: "Capture every inbound lead, qualify them automatically, and book appointments without anyone on your team touching it. Works 24/7.", solves: "The business that responds first wins 78% of the time. This pipeline captures leads from every channel — phone, web form, Google — qualifies them with automated questions, and books them directly on your calendar. Zero manual steps, 24/7 availability." },
      { title: "Automated Quote Generator", desc: "Calculate estimates from customer inputs and send professional proposals within minutes. You beat slower competitors before they even respond.", solves: "Most service businesses take 24-48 hours to send a quote. This generator collects job details, applies your pricing rules, and delivers a professional estimate in minutes — before the customer has time to call your competitor." },
      { title: "Route Optimization Scheduler", desc: "Map jobs by location and technician availability, minimizing drive time and maximizing billable hours per day.", solves: "Inefficient routing costs the average field service business 2-3 hours per tech per day in unnecessary drive time. Optimized scheduling groups jobs by geography and skill, adding 1-2 extra billable appointments per technician per day." },
      { title: "Appointment Reminder Cascade", desc: "Send SMS and email reminders 24 hours and 1 hour before appointments, cutting no-shows by up to 70 percent and protecting your schedule.", solves: "No-shows cost you the appointment slot plus the revenue from the job you could have booked. A cascade of reminders — 24 hours, 2 hours, and 1 hour before — reduces no-shows by up to 70% and gives you time to fill cancellations." },
      { title: "Field Tech Job Packet Creator", desc: "Auto-compile customer info, photos, job history, and materials lists for each technician before they arrive on site.", solves: "Techs waste 15-20 minutes per job gathering context — customer history, past work, required materials. Auto-compiled job packets delivered to their phone before arrival mean they show up prepared, work faster, and close more same-day." },
      { title: "Instant Invoice and Payment Collector", desc: "Generate invoices from completed work orders and enable one-click payment, reducing days-to-pay from weeks to hours.", solves: "The longer you wait to invoice, the longer you wait to get paid. Invoices generated automatically from completed work orders with one-click payment links reduce average days-to-pay from 30+ days to under 48 hours." },
      { title: "Follow-Up Review Request Engine", desc: "Automatically ask satisfied customers for Google reviews, building your online reputation while you focus on the next job.", solves: "Google reviews directly impact your local search ranking and conversion rate. Timed review requests sent 2 hours after job completion — when satisfaction is highest — build your reputation automatically without awkward in-person asks." },
      { title: "Maintenance Contract Renewal Bot", desc: "Track service agreements, send renewal notices, and process payments to secure recurring revenue before contracts lapse.", solves: "Recurring maintenance contracts are your most predictable revenue. Automated renewal sequences starting 60 days before expiration, with easy one-click renewal, prevent lapses and lock in the recurring revenue that stabilizes your cash flow." },
      { title: "Supply Reorder Alerts", desc: "Monitor truck inventory and auto-reorder materials when running low, preventing job delays from missing parts.", solves: "Running out of parts mid-job means a return trip, lost time, and a frustrated customer. Automated inventory tracking with reorder alerts ensures your trucks are always stocked with the materials your techs use most." },
      { title: "Emergency After-Hours Dispatcher", desc: "Route urgent calls based on on-call schedules and job type, ensuring emergency clients reach help immediately.", solves: "After-hours emergencies are high-value jobs that go to whoever answers first. Automated routing by on-call schedule and job type ensures urgent calls reach the right technician in under 2 minutes — winning the job and earning premium rates." },
    ]
  },
  {
    id: "professional", label: "Professional Services", color: "#2540D9", emoji: "💼",
    automations: [
      { title: "Client Discovery Auto-Compiler", desc: "Pull company data, news, and financials before discovery calls, giving you instant credibility without hours of manual research.", solves: "Partners spend 1-2 hours researching before every discovery call. This compiler pulls company data, recent news, financial filings, and key contacts into a one-page brief automatically — so you walk in prepared without the prep time." },
      { title: "Engagement Letter Generator", desc: "Create custom SOWs and contracts from scope templates, cutting proposal time from days to under an hour.", solves: "Custom engagement letters take 2-4 hours when written from scratch. Template-driven generation pulls scope details from your intake form, applies your standard terms, and produces a client-ready document in under 15 minutes." },
      { title: "Expense Receipt Auto-Capture", desc: "Scan, categorize, and reconcile receipts automatically, eliminating the monthly shoebox shuffle for you and your clients.", solves: "Receipt management is universally hated and routinely neglected. Automated capture, categorization, and reconciliation eliminates the end-of-month scramble and ensures every deductible expense is captured accurately." },
      { title: "Recurring Billing and Collections", desc: "Invoice retainer clients, follow up on overdue accounts, and process payments without touching a spreadsheet.", solves: "Chasing retainer payments is uncomfortable and time-consuming. Automated invoicing on the 1st, gentle reminders on the 8th, and escalation notices on the 15th maintain cash flow without awkward conversations — and reduce late payments by 40%." },
      { title: "Document Assembly Engine", desc: "Generate contracts, reports, and filings from templates and client data, reducing errors and accelerating delivery.", solves: "Document preparation is where most professional services firms have the largest gap between time spent and value delivered. Template-driven assembly cuts production time by 70% and eliminates the manual errors that create liability." },
      { title: "Time Tracking and Billable Hours Optimizer", desc: "Capture billable time from calendar, email, and document activity to ensure no revenue slips through the cracks.", solves: "Professionals under-report billable time by 15-25% because manual tracking is tedious. Automated capture from calendar events, email threads, and document activity ensures every billable minute is logged — recovering thousands in monthly revenue." },
      { title: "Client Portal Auto-Updater", desc: "Push project updates, deliverables, and metrics to branded client dashboards, reducing status meeting requests by 50 percent.", solves: "Status update meetings consume 5-10 hours per week across your team. Auto-updated client portals with real-time project status, deliverable tracking, and next-step visibility reduce 'where are we?' requests by 50% or more." },
      { title: "Regulatory Deadline Monitor", desc: "Track filing dates, send compliance alerts, and auto-generate submission documents to prevent costly penalties.", solves: "A missed regulatory deadline can cost your client thousands in penalties — and cost you the relationship. Automated tracking with escalating alerts at 30, 14, and 7 days ensures deadlines are never missed." },
      { title: "Meeting Transcription and Action Items", desc: "Record calls, generate summaries, and create task lists automatically so nothing gets lost in conversation.", solves: "Important decisions and commitments made in meetings are routinely forgotten because nobody took good notes. Automated transcription, summary generation, and task extraction ensure every action item is captured and assigned within minutes of hanging up." },
      { title: "Referral Trigger System", desc: "Identify delighted clients and automatically request introductions to similar businesses, fueling growth without cold outreach.", solves: "Referrals close at 4x the rate of cold outreach, but most firms never ask systematically. This system identifies clients at peak satisfaction — after a successful deliverable or positive feedback — and triggers a personalized referral request at exactly the right moment." },
    ]
  },
];

const TAG_BG: Record<string, string> = {
  "Healthcare": "#D8E0FA",
  "Real Estate": "#D8E0FA",
  "Local Services": "#EBF0FF",
  "Property Management": "#EBF0FF",
  "Strategy": "#FDEEE8",
};

interface AutoItem { title: string; desc: string; solves: string; nicheLabel?: string; }
interface FormState { name: string; email: string; phone: string; business: string; bottleneck: string; }
interface ToastState { msg: string; icon: string; }

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function HomePageClient({ posts }: { posts: PostMeta[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [activeNiche, setActiveNiche] = useState(3);
  const [activeAuto, setActiveAuto] = useState<AutoItem | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", business: "", bottleneck: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);

  const closeMobileNav = useCallback(() => setMobileNav(false), []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!mobileNav) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeMobileNav(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [mobileNav, closeMobileNav]);

  const openAuto = (a: { title: string; desc: string; solves: string }, nicheLabel: string) =>
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
    setFormError("");
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
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to send. Please try again.";
      setFormError(msg);
      flash(msg, "⚠️");
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
          <li><a href="/blog">Blog</a></li>
          <li><a href="#contact" className="btn-primary" style={{ padding: "0.45rem 1.1rem" }}>Get an Audit</a></li>
        </ul>
        <button className="nav-burger" onClick={() => setMobileNav(true)} aria-label="Open menu">&#9776;</button>
      </nav>

      {/* MOBILE NAV OVERLAY */}
      <div className={`mobile-overlay${mobileNav ? " open" : ""}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button className="mobile-overlay-x" onClick={closeMobileNav} aria-label="Close menu">&#10005;</button>
        <ul className="mobile-nav-list">
          <li><a href="#how-it-works" onClick={closeMobileNav}>How It Works</a></li>
          <li><a href="#workflow" onClick={closeMobileNav}>See It Live</a></li>
          <li><a href="#automations" onClick={closeMobileNav}>Automations</a></li>
          <li><a href="/blog" onClick={closeMobileNav}>Blog</a></li>
          <li><a href="#contact" onClick={closeMobileNav} className="mobile-cta">Get an Audit</a></li>
        </ul>
      </div>

      {/* HERO */}
      <section className="hero">
        {/* Left */}
        <div>
          <div className="hero-eyebrow">Custom AI Automation for Local Businesses</div>
          <h1 className="hero-headline">
            Turn Your Bottlenecks<br />Into <em>AI Automations.</em>
          </h1>
          <p className="hero-sub">
            We find where your business is losing time and money, then build systems that fix it.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn-primary" style={{ padding: "0.85rem 2rem" }}>Get an Audit</a>
            <a href="#workflow" className="btn-secondary" style={{ padding: "0.85rem 2rem" }}>See How It Works</a>
          </div>
          <div className="hero-proof">
            {[
              { num: "100+", label: "Custom solutions built", accent: true },
              { num: "10–20 hrs", label: "Saved per client per week", accent: false },
              { num: "3x", label: "Lead engagement & bookings", accent: false },
            ].map((s, i) => (
              <div key={i} className="proof-item">
                <span className={`proof-num${s.accent ? " proof-accent" : ""}`}>{s.num}</span>
                <span className="proof-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — embedded form */}
        <div>
          <div className="hero-form-card">
            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">&#10003;</div>
                <div className="form-success-t">Audit request received</div>
                <p className="form-success-d">We&apos;ll review your business and get back to you within one business day with specific recommendations.</p>
                <a href="#workflow" className="btn-secondary" style={{ marginTop: "0.5rem" }}>See How It Works</a>
              </div>
            ) : (
              <>
                <div className="hero-form-title">Get an Automation Audit</div>
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
                  {formError && <div className="form-error">{formError}</div>}
                  <button className="fsub" onClick={submit} disabled={submitting}>
                    {submitting ? "Sending..." : "Show Me What to Automate →"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* TOOLS TICKER */}
      {(() => {
        const TOOLS = ["Claude","n8n","Make","Zapier","OpenAI","GoHighLevel","HubSpot","ActiveCampaign","Twilio","Vapi","Retell AI","ElevenLabs","Airtable","Notion","Slack","Supabase","Calendly","Typeform","Stripe","Voiceflow","Perplexity","LangChain","Pipedrive","Google Sheets","Intercom","Anthropic","Gemini","Cursor","Loom","Zapier Interfaces"];
        const items = [...TOOLS, ...TOOLS];
        return (
          <div className="tools-ticker">
            <div className="tools-track">
              {items.map((tool, i) => (
                <span key={i} className="tool-item">
                  {tool}
                  <span className="tool-sep">◆</span>
                </span>
              ))}
            </div>
          </div>
        );
      })()}

      {/* HOW IT WORKS */}
      <section className="section section-white" id="how-it-works">
        <div className="inner">
          <span className="label-tag">The Process</span>
          <h2 className="h2">Built around your ROI, not a feature checklist.</h2>
          <p className="sub">Every engagement starts with a conversation about where your business is losing time and money. We build from that.</p>
          <div className="steps-grid">
            {[
              { n: "01", t: "Find the Money", sub: "We don't guess where to start.", items: ["We spend the first call learning where your business leaks time and revenue — not pitching software.", "We document your workflows end to end: what's manual, what's repeated, what's falling through the cracks.", "We rank every opportunity by dollar impact and tell you exactly what to automate first — and what to leave alone."] },
              { n: "02", t: "Build It Right", sub: "No templates. No off-the-shelf shortcuts.", items: ["We build from scratch around your specific tools, your data, and the way your business actually runs.", "Every workflow gets tested on real inputs before it touches your live operation.", "We walk you through what we built and why. You own it completely — credentials, logic, documentation."] },
              { n: "03", t: "Run It, Improve It", sub: "The system earns its keep every month.", items: ["We go live with safeguards and clear metrics so you know from day one whether it's working.", "We watch for failures and edge cases, and fix them fast when they come up.", "Every month we review performance, tighten the logic, and push improvements. It gets better as your business grows."] },
            ].map((s, i) => (
              <div key={i} className="step-card">
                <span className="step-n">{s.n}</span>
                <div className="step-t">{s.t}</div>
                <p className="step-sub">{s.sub}</p>
                <ul className="step-list">
                  {s.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
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
            {posts.map((p, i) => (
              <a key={i} href={`/blog/${p.slug}`} className="blog-card">
                <div className="blog-img" style={{ background: TAG_BG[p.tag] ?? "#EDF1F7" }} />
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
              href="https://calendly.com/jesse-smbautomation/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange"
            >
              Book an Audit Call →
            </a>
            <div className="contact-trust">
              <span>✓ Free 30-minute call</span>
              <span>✓ No hard sell — ever</span>
              <span>✓ Response within 24 hours</span>
            </div>
          </div>

          {/* Right: form */}
          <div className="contact-form">
            {submitted ? (
              <div className="cform">
                <div className="form-success">
                  <div className="form-success-icon">&#10003;</div>
                  <div className="form-success-t">We&apos;ll be in touch</div>
                  <p className="form-success-d">Your audit request is in. Expect a response within one business day with a specific plan for your business.</p>
                  <a
                    href="https://calendly.com/jesse-smbautomation/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ marginTop: "0.5rem" }}
                  >
                    Or Book a Call Now →
                  </a>
                </div>
              </div>
            ) : (
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
                {formError && <div className="form-error">{formError}</div>}
                <button className="fsub" onClick={submit} disabled={submitting}>
                  {submitting ? "Sending..." : "Send Audit Request →"}
                </button>
              </div>
            )}
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
                {activeAuto.solves}
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
