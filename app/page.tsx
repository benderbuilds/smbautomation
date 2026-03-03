'use client';

import { useState, useEffect } from "react";
import WorkflowDiagram from "@/components/WorkflowDiagram";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: #060D1F; color: #F0EDE8; overflow-x: hidden; }
  .cormorant { font-family: 'Cormorant Garamond', serif; }

  :root {
    --bg: #060D1F;
    --surface: #0D1628;
    --surface-2: #141F38;
    --surface-3: #1C2A48;
    --gold: #C9A84C;
    --gold-light: #E8CF7A;
    --gold-pale: rgba(201, 168, 76, 0.1);
    --gold-border: rgba(201, 168, 76, 0.22);
    --white: #F0EDE8;
    --muted: #7E8FA8;
    --muted-2: #4D5E78;
    --border: rgba(255,255,255,0.07);
    --green: #2ECC71;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw; height: 70px;
    background: rgba(6,13,31,0.88); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border); transition: all 0.3s ease;
  }
  .nav.scrolled { border-bottom-color: var(--gold-border); box-shadow: 0 4px 40px rgba(0,0,0,0.5); }
  .nav-logo { font-family: 'Cormorant Garamond', serif; font-size: 1.35rem; font-weight: 500; color: var(--white); letter-spacing: 0.03em; }
  .nav-logo span { color: var(--gold); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
  .nav-links a { text-decoration: none; color: var(--muted); font-size: 0.875rem; font-weight: 400; letter-spacing: 0.01em; transition: color 0.2s; }
  .nav-links a:hover { color: var(--white); }

  /* BUTTONS */
  .btn-primary { background: var(--gold); color: #060D1F; padding: 0.65rem 1.65rem; border-radius: 6px; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.22s ease; text-decoration: none; display: inline-block; letter-spacing: 0.02em; font-family: 'DM Sans', sans-serif; }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(201,168,76,0.32); }
  .btn-secondary { background: transparent; color: var(--white); padding: 0.65rem 1.65rem; border-radius: 6px; font-size: 0.875rem; font-weight: 500; border: 1px solid rgba(255,255,255,0.18); cursor: pointer; transition: all 0.22s ease; text-decoration: none; display: inline-block; }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 110px 5vw 80px;
    max-width: 1280px;
    margin: 0 auto;
    align-items: center;
    position: relative;
  }
  .hero-bg {
    position: fixed; inset: 0; z-index: -1;
    background:
      radial-gradient(ellipse at 20% 60%, rgba(201,168,76,0.05) 0%, transparent 55%),
      radial-gradient(ellipse at 80% 15%, rgba(40,70,150,0.07) 0%, transparent 50%),
      #060D1F;
  }
  .hero-content { position: relative; z-index: 1; }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 0.5rem;
    border: 1px solid var(--gold-border); color: var(--gold);
    padding: 0.38rem 1rem; border-radius: 4px;
    font-size: 0.72rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    margin-bottom: 2rem;
  }
  .eyebrow-dot { width: 5px; height: 5px; background: var(--gold); border-radius: 50%; flex-shrink: 0; }
  .hero-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 4vw, 4.4rem);
    font-weight: 400; line-height: 1.07;
    letter-spacing: -0.01em; color: var(--white);
    margin-bottom: 1.5rem;
  }
  .hero-headline em { font-style: italic; color: var(--gold); }
  .hero-sub { font-size: 1rem; color: var(--muted); line-height: 1.8; max-width: 460px; margin-bottom: 2.5rem; font-weight: 400; }
  .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 3rem; }
  .hero-proof {
    display: flex; align-items: flex-start; gap: 0.9rem;
    padding-top: 2rem; border-top: 1px solid var(--border);
    color: var(--muted); font-size: 0.82rem; line-height: 1.55;
  }
  .avatars { display: flex; flex-shrink: 0; margin-top: 2px; }
  .avatar { width: 30px; height: 30px; border-radius: 50%; border: 2px solid var(--bg); margin-left: -7px; display: flex; align-items: center; justify-content: center; font-size: 0.64rem; font-weight: 700; color: var(--bg); }
  .avatar:first-child { margin-left: 0; }

  /* HERO FORM */
  .hero-form-wrap { position: relative; z-index: 1; }
  .hero-form-card {
    background: var(--surface);
    border: 1px solid var(--gold-border);
    border-radius: 18px;
    padding: 2.5rem;
    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.05) inset;
  }
  .hero-form-card h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem; font-weight: 500; color: var(--white);
    margin-bottom: 0.3rem; line-height: 1.2;
  }
  .hero-form-card > p { color: var(--muted); font-size: 0.85rem; margin-bottom: 1.75rem; }
  .frow { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
  .fg { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.75rem; }
  .fg label { font-size: 0.72rem; font-weight: 600; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }
  .fg input, .fg select, .fg textarea {
    padding: 0.7rem 0.9rem;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 8px;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem;
    color: var(--white); background: rgba(255,255,255,0.04);
    transition: border-color 0.2s, background 0.2s; outline: none; width: 100%;
  }
  .fg input:focus, .fg select:focus, .fg textarea:focus {
    border-color: var(--gold); background: rgba(201,168,76,0.05);
  }
  .fg input::placeholder, .fg textarea::placeholder { color: rgba(126,143,168,0.45); }
  .fg select option { background: #141F38; color: var(--white); }
  .fg textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
  .fsub {
    background: var(--gold); color: #060D1F;
    padding: 0.95rem; border-radius: 8px;
    font-size: 0.95rem; font-weight: 700; border: none; cursor: pointer;
    transition: all 0.22s ease; font-family: 'DM Sans', sans-serif;
    width: 100%; letter-spacing: 0.01em;
  }
  .fsub:hover { background: var(--gold-light); box-shadow: 0 8px 24px rgba(201,168,76,0.4); transform: translateY(-1px); }
  .fsub:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
  .form-trust { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.85rem; font-size: 0.78rem; color: var(--muted); justify-content: center; }
  .form-trust-icon { color: var(--green); font-size: 0.9rem; }

  /* STATS */
  .stats-bar {
    background: var(--surface);
    border-top: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
    padding: 1.75rem 5vw;
    display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap;
  }
  .stat { text-align: center; }
  .stat-n { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 400; color: var(--gold); line-height: 1; display: block; }
  .stat-l { font-size: 0.75rem; color: var(--muted); letter-spacing: 0.06em; margin-top: 0.3rem; display: block; text-transform: uppercase; }

  /* SECTIONS */
  .section { padding: 7rem 5vw; }
  .section-alt { background: var(--surface); }
  .section-dark { background: #040A18; }
  .inner { max-width: 1100px; margin: 0 auto; }
  .label {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1rem;
    display: flex; align-items: center; gap: 0.6rem;
  }
  .label::after { content: ''; height: 1px; width: 2rem; background: var(--gold); display: inline-block; opacity: 0.4; }
  .label.lt { color: var(--gold-light); }
  .label.lt::after { background: var(--gold-light); }
  .h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 400;
    line-height: 1.13; letter-spacing: -0.01em; color: var(--white);
    max-width: 600px; margin-bottom: 1rem;
  }
  .h2.lt { color: var(--white); }
  .sub { font-size: 0.98rem; color: var(--muted); line-height: 1.8; max-width: 540px; margin-bottom: 3.5rem; }
  .sub.lt { color: rgba(126,143,168,0.85); }

  /* HOW IT WORKS */
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; }
  .step-card {
    background: var(--surface-2); border: 1px solid var(--border); border-radius: 16px;
    padding: 2.5rem 2rem; transition: all 0.3s ease; position: relative; overflow: hidden;
  }
  .step-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, var(--gold) 50%, transparent 100%);
    opacity: 0; transition: opacity 0.3s;
  }
  .step-card:hover { border-color: var(--gold-border); transform: translateY(-3px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .step-card:hover::after { opacity: 1; }
  .step-n { font-family: 'Cormorant Garamond', serif; font-size: 5rem; font-weight: 300; color: rgba(201,168,76,0.12); line-height: 1; margin-bottom: 1rem; display: block; }
  .step-t { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 500; color: var(--white); margin-bottom: 0.75rem; line-height: 1.3; }
  .step-d { color: var(--muted); font-size: 0.9rem; line-height: 1.75; }

  /* WORKFLOW */
  .wf-section { padding: 7rem 5vw; background: #040A18; position: relative; overflow: hidden; }
  .wf-section::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 15% 65%, rgba(201,168,76,0.05) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 15%, rgba(40,70,150,0.05) 0%, transparent 50%);
    pointer-events: none;
  }
  .wf-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .wf-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1.5rem; }
  .wf-canvas { background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem 2rem; overflow-x: auto; }
  .wf-row { display: flex; align-items: flex-start; min-width: 720px; gap: 0; }
  .wf-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .wf-node { width: 88px; height: 88px; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.28rem; border: 1px solid var(--border); background: var(--surface-2); transition: all 0.25s ease; position: relative; cursor: default; }
  .wf-node:hover { transform: translateY(-5px); border-color: var(--gold-border); background: var(--gold-pale); box-shadow: 0 14px 36px rgba(201,168,76,0.15); }
  .wf-icon { font-size: 1.65rem; line-height: 1; }
  .wf-brand { font-size: 0.55rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); line-height: 1; }
  .wf-badge { position: absolute; top: -10px; right: -10px; background: var(--gold); border-radius: 100px; padding: 0.14rem 0.44rem; font-size: 0.54rem; font-weight: 700; color: var(--bg); letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; z-index: 2; }
  .wf-trigger { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--surface); border: 1px solid var(--gold-border); border-radius: 100px; padding: 0.14rem 0.58rem; font-size: 0.54rem; font-weight: 600; color: var(--gold); letter-spacing: 0.07em; text-transform: uppercase; white-space: nowrap; }
  .wf-lbl { margin-top: 1rem; text-align: center; max-width: 90px; }
  .wf-lt { font-size: 0.76rem; font-weight: 500; color: var(--white); line-height: 1.3; display: block; margin-bottom: 0.18rem; }
  .wf-ls { font-size: 0.65rem; color: var(--muted); line-height: 1.35; display: block; }
  .wf-connector { display: flex; align-items: center; padding-top: 44px; flex-shrink: 0; }
  .wf-line-wrap { position: relative; width: 32px; height: 2px; }
  .wf-line { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(201,168,76,0.2) 0%, rgba(201,168,76,0.6) 100%); }
  .wf-dot { position: absolute; top: 50%; transform: translateY(-50%); width: 5px; height: 5px; border-radius: 50%; background: var(--gold); animation: pulse-dot 1.8s ease-in-out infinite; }
  .wf-arrowhead { position: absolute; right: -5px; top: 50%; transform: translateY(-50%); color: rgba(201,168,76,0.6); font-size: 0.6rem; line-height: 1; }
  @keyframes pulse-dot { 0% { left: 2px; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: calc(100% - 7px); opacity: 0; } }
  .wf-outcomes { display: grid; grid-template-columns: repeat(auto-fit, minmax(195px, 1fr)); gap: 1rem; margin-top: 2rem; }
  .wf-outcome { background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 12px; padding: 1.2rem; display: flex; align-items: flex-start; gap: 0.65rem; }
  .oc-icon { font-size: 1.15rem; flex-shrink: 0; margin-top: 0.05rem; }
  .oc-t { font-size: 0.8rem; font-weight: 500; color: var(--white); display: block; margin-bottom: 0.15rem; line-height: 1.3; }
  .oc-s { font-size: 0.68rem; color: var(--muted); display: block; line-height: 1.4; }

  /* AUTOMATION TABS + CARDS */
  .tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .tab { padding: 0.55rem 1.25rem; border-radius: 6px; font-size: 0.85rem; font-weight: 400; border: 1px solid var(--border); background: transparent; cursor: pointer; transition: all 0.2s ease; color: var(--muted); font-family: 'DM Sans', sans-serif; }
  .tab:hover { border-color: var(--gold-border); color: var(--gold); }
  .tab.on { color: var(--bg); font-weight: 600; border-color: transparent; }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem; }
  .card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 14px; padding: 1.75rem; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 0.75rem; }
  .card:hover { border-color: var(--gold-border); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
  .card-t { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 500; color: var(--white); line-height: 1.3; }
  .card-d { color: var(--muted); font-size: 0.875rem; line-height: 1.7; flex: 1; }
  .card-cta { color: var(--gold); font-size: 0.85rem; font-weight: 500; display: flex; align-items: center; gap: 0.3rem; }

  /* MODAL */
  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.78); backdrop-filter: blur(8px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .modal { background: var(--surface); border: 1px solid var(--gold-border); border-radius: 22px; padding: 3rem; max-width: 560px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; }
  .modal-x { position: absolute; top: 1.5rem; right: 1.5rem; background: var(--surface-2); border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 0.2s; }
  .modal-x:hover { background: var(--surface-3); color: var(--white); }
  .modal-ey { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.75rem; }
  .modal-t { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 500; color: var(--white); line-height: 1.2; margin-bottom: 1rem; }
  .modal-d { color: var(--muted); line-height: 1.75; margin-bottom: 2rem; font-size: 1rem; }

  /* WHY US */
  .diff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
  .diff-c { padding: 2rem 1.75rem; border-radius: 16px; border: 1px solid var(--border); background: rgba(255,255,255,0.02); transition: border-color 0.3s; }
  .diff-c:hover { border-color: var(--gold-border); }
  .diff-i { font-size: 1.75rem; margin-bottom: 1rem; display: block; }
  .diff-t { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; color: var(--white); font-weight: 400; margin-bottom: 0.5rem; }
  .diff-d { color: var(--muted); font-size: 0.88rem; line-height: 1.7; }

  /* CONTACT (bottom) */
  .contact-section { background: var(--surface); padding: 7rem 5vw; border-top: 1px solid var(--border); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; max-width: 1100px; margin: 0 auto; align-items: start; }
  .cl h2 { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 3.5vw, 2.8rem); font-weight: 400; color: var(--white); line-height: 1.15; margin-bottom: 1.25rem; letter-spacing: -0.01em; }
  .cl p { color: var(--muted); line-height: 1.75; font-size: 1rem; margin-bottom: 2rem; }
  .promises { display: flex; flex-direction: column; gap: 0.9rem; }
  .promise { display: flex; align-items: flex-start; gap: 0.75rem; color: var(--muted); font-size: 0.9rem; line-height: 1.5; }
  .pdot { width: 20px; height: 20px; border-radius: 50%; background: var(--gold); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: var(--bg); font-weight: 700; }
  .cform { background: var(--surface-2); border: 1px solid var(--gold-border); border-radius: 20px; padding: 2.5rem; display: flex; flex-direction: column; gap: 0; }
  .cform h3 { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 500; color: var(--white); margin-bottom: 0.3rem; }
  .cform > p { color: var(--muted); font-size: 0.85rem; margin-bottom: 1.5rem; }

  /* BLOG */
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.75rem; }
  .blog-card { background: var(--surface-2); border: 1px solid var(--border); border-radius: 18px; overflow: hidden; transition: all 0.3s ease; text-decoration: none; display: block; }
  .blog-card:hover { transform: translateY(-4px); border-color: var(--gold-border); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
  .blog-img { height: 180px; display: flex; align-items: center; justify-content: center; }
  .blog-body { padding: 1.5rem; }
  .blog-tag { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--gold); margin-bottom: 0.5rem; display: block; }
  .blog-t { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 500; color: var(--white); line-height: 1.35; margin-bottom: 0.5rem; }
  .blog-ex { color: var(--muted); font-size: 0.875rem; line-height: 1.65; }

  /* FOOTER */
  .footer { background: #030810; padding: 3rem 5vw; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid var(--border); }
  .flogo { font-family: 'Cormorant Garamond', serif; font-size: 1.25rem; font-weight: 400; color: var(--white); }
  .flogo span { color: var(--gold); }
  .flinks { display: flex; gap: 2rem; list-style: none; flex-wrap: wrap; }
  .flinks a { color: var(--muted); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
  .flinks a:hover { color: var(--white); }
  .fcopy { color: var(--muted-2); font-size: 0.8rem; }

  /* TOAST */
  .toast { position: fixed; bottom: 2rem; right: 2rem; background: var(--surface); border: 1px solid var(--gold-border); color: var(--white); padding: 1rem 1.5rem; border-radius: 12px; font-size: 0.9rem; z-index: 999; box-shadow: 0 8px 40px rgba(0,0,0,0.5); display: flex; align-items: center; gap: 0.5rem; animation: up 0.3s ease; }
  @keyframes up { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fi { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fi { animation: fi 0.45s ease forwards; }

  @media (max-width: 1000px) {
    .hero { grid-template-columns: 1fr; gap: 2.5rem; padding-top: 100px; }
    .nav-links { display: none; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    .frow { grid-template-columns: 1fr; }
  }
`;

const NICHES = [
  {
    id: "real-estate", label: "Real Estate", color: "#C9A84C", emoji: "🏠",
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
    id: "ecommerce", label: "E-commerce", color: "#3D7A5C", emoji: "🛒",
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
    id: "agency", label: "Marketing Agency", color: "#5A4A8C", emoji: "📊",
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
    id: "local-services", label: "Local Services", color: "#C9A84C", emoji: "🔧",
    automations: [
      { title: "Missed Call Text-Back System", desc: "Instantly text missed callers with booking links and answers to common questions, capturing leads that would otherwise call a competitor." },
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
    id: "professional", label: "Professional Services", color: "#2A6B8C", emoji: "💼",
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
  { tag: "Local Services", title: "Why the First Business to Respond Wins 78% of the Time", excerpt: "Speed-to-lead is the single biggest lever most local businesses are not pulling. Here is what the data says and how to fix it.", bg: "rgba(201,168,76,0.08)", emoji: "⚡", slug: "speed-to-lead" },
  { tag: "Real Estate", title: "How Property Managers Are Reclaiming 15 Hours a Week with AI", excerpt: "From maintenance routing to lease renewals, the automations reshaping property management operations right now.", bg: "rgba(42,107,140,0.12)", emoji: "🏠", slug: "property-manager-automation" },
  { tag: "Strategy", title: "The Bottleneck Audit: Find What's Costing Your Business the Most", excerpt: "Before you automate anything, run this 20-minute exercise to identify your highest-leverage opportunity.", bg: "rgba(61,122,92,0.12)", emoji: "🔍", slug: "bottleneck-audit" },
];

interface AutoItem {
  title: string;
  desc: string;
  nicheLabel?: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  business: string;
  bottleneck: string;
}

interface ToastState {
  msg: string;
  icon: string;
}

function ContactForm({
  form,
  setForm,
  submitting,
  submitted,
  onSubmit,
}: {
  form: FormState;
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
  submitting: boolean;
  submitted: boolean;
  onSubmit: () => void;
}) {
  return (
    <>
      <div className="frow">
        <div className="fg"><label>First &amp; Last Name *</label><input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} /></div>
        <div className="fg"><label>Email Address *</label><input type="email" placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} /></div>
      </div>
      <div className="frow">
        <div className="fg"><label>Phone Number</label><input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} /></div>
        <div className="fg">
          <label>Business Type</label>
          <select value={form.business} onChange={e => setForm(f => ({...f, business: e.target.value}))}>
            <option value="">Select your industry</option>
            <option>Real Estate / Property Management</option>
            <option>E-commerce / Retail</option>
            <option>Marketing Agency</option>
            <option>Local Service / Contractor</option>
            <option>Professional Services</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="fg">
        <label>Your Biggest Bottleneck</label>
        <textarea placeholder="What's eating the most time in your business right now?" value={form.bottleneck} onChange={e => setForm(f => ({...f, bottleneck: e.target.value}))} />
      </div>
      <button className="fsub" onClick={onSubmit} disabled={submitting || submitted}>
        {submitting ? "Sending..." : submitted ? "✓ Request Sent!" : "Request My Free Consult →"}
      </button>
    </>
  );
}

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
      flash("Message received! We will be in touch within 24 hours.", "✅");
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
      <div className="hero-bg" />

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">smb<span>automation</span></div>
        <ul className="nav-links">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#workflow">See It In Action</a></li>
          <li><a href="#automations">Automations</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contact" className="btn-primary" style={{ padding: "0.5rem 1.2rem" }}>Book a Free Consult</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <div style={{ background: "var(--bg)" }}>
        <div className="hero" id="hero">
          {/* LEFT: Headline */}
          <div className="hero-content">
            <div className="hero-eyebrow"><span className="eyebrow-dot" />Custom AI Automation</div>
            <h1 className="hero-headline">Turn Your Bottlenecks Into <em>AI Automations.</em></h1>
            <p className="hero-sub">We help business owners and realtors integrate AI into everyday workflows — so they save time, respond faster, and grow without adding headcount.</p>
            <div className="hero-actions">
              <a href="#how-it-works" className="btn-secondary" style={{ padding: "0.75rem 2rem", fontSize: "0.9rem" }}>See How It Works</a>
              <a href="#automations" className="btn-secondary" style={{ padding: "0.75rem 2rem", fontSize: "0.9rem" }}>View Automations</a>
            </div>
            <div className="hero-proof">
              <div className="avatars">
                {["#C9A84C","#3D7A5C","#2A6B8C","#5A4A8C"].map((c, i) => (
                  <div key={i} className="avatar" style={{ background: c }}>{["JM","SR","KP","AL"][i]}</div>
                ))}
              </div>
              <span>Trusted by realtors, local services, medical practices, and hundreds of others across the country.</span>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="hero-form-wrap">
            <div className="hero-form-card">
              <h3>Book a Free Strategy Call</h3>
              <p>Tell us where you&apos;re losing time. We&apos;ll show you exactly how to get it back.</p>
              <ContactForm form={form} setForm={setForm} submitting={submitting} submitted={submitted} onSubmit={submit} />
              <div className="form-trust">
                <span className="form-trust-icon">✓</span>
                <span>No commitment · Response within 24 hours · 100% free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-bar">
        {[{n:"50+",l:"Automation Templates"},{n:"5",l:"Industries Served"},{n:"10-20 hrs",l:"Saved Per Week"},{n:"24/7",l:"Systems That Never Sleep"},{n:"ROI",l:"Measured, Not Guessed"}].map((s,i) => (
          <div key={i} className="stat"><span className="stat-n">{s.n}</span><span className="stat-l">{s.l}</span></div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works" style={{ background: "var(--bg)" }}>
        <div className="inner">
          <div className="label">The Process</div>
          <h2 className="h2">From bottleneck to automation in three steps</h2>
          <p className="sub">No technical knowledge required. We handle everything from discovery to deployment and make sure it actually sticks.</p>
          <div className="steps-grid">
            {[
              { n:"01", t:"Discover Your Bottlenecks", d:"We start with a free consultation to understand your business, where time is being lost, and where automation can have the highest impact." },
              { n:"02", t:"Build Your Custom Workflow", d:"We design and build your automation from scratch, tailored to your tools, your team, and the way you actually work." },
              { n:"03", t:"Deploy and Measure ROI", d:"We go live, train your team, and track results. You get a clear picture of time saved and revenue recovered from day one." },
            ].map((s,i) => (
              <div key={i} className="step-card">
                <span className="step-n">{s.n}</span>
                <div className="step-t">{s.t}</div>
                <p className="step-d">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkflowDiagram />

      {/* AUTOMATIONS */}
      <section className="section section-alt" id="automations">
        <div className="inner">
          <div className="label">Automation Library</div>
          <h2 className="h2">Built for your industry</h2>
          <p className="sub">Browse automations by niche. Every system is custom-built — no templates, no off-the-shelf tools that almost fit.</p>
          <div className="tabs">
            {NICHES.map((n, i) => (
              <button key={n.id} className={`tab ${activeNiche === i ? "on" : ""}`} onClick={() => setActiveNiche(i)}
                style={activeNiche === i ? { background: n.color, borderColor: "transparent" } : {}}>
                {n.emoji} {n.label}
              </button>
            ))}
          </div>
          <div className="cards">
            {niche.automations.map((a, i) => (
              <div key={i} className="card fi" style={{ animationDelay: `${i * 0.04}s` }} onClick={() => openAuto(a, niche.label)}>
                <div className="card-t">{a.title}</div>
                <p className="card-d">{a.desc}</p>
                <div className="card-cta">Learn more &amp; inquire <span>→</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section-dark">
        <div className="inner">
          <div className="label lt">Why SMB Automation</div>
          <h2 className="h2 lt">We speak business, not tech</h2>
          <p className="sub lt" style={{ marginBottom: "3rem" }}>Most automation consultants build workflows. We build systems that solve your business problem — and measure success in dollars and hours saved.</p>
          <div className="diff-grid">
            {[
              { i:"🎯", t:"Outcome-Focused", d:"Every project starts with a clear ROI target. We do not ship a workflow unless it demonstrably saves you time or money." },
              { i:"🏗️", t:"Custom Built", d:"No cookie-cutter solutions. Every automation is designed around your specific tools, processes, and team." },
              { i:"📐", t:"Industry Expertise", d:"Deep knowledge in real estate, local services, and professional services. We know your pain points before you describe them." },
              { i:"🔄", t:"Ongoing Support", d:"Automations break and businesses change. We stay available to adapt your systems as your needs evolve." },
            ].map((d,i) => (
              <div key={i} className="diff-c">
                <span className="diff-i">{d.i}</span>
                <div className="diff-t cormorant">{d.t}</div>
                <p className="diff-d">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section" id="blog" style={{ background: "var(--bg)" }}>
        <div className="inner">
          <div className="label">From the Blog</div>
          <h2 className="h2">Automation insights for business owners</h2>
          <p className="sub">No fluff, no jargon. Practical advice on where automation moves the needle.</p>
          <div className="blog-grid">
            {BLOG_POSTS.map((p,i) => (
              <a key={i} href={`/blog/${p.slug}`} className="blog-card">
                <div className="blog-img" style={{ background: p.bg }}><span style={{ fontSize: "3.5rem" }}>{p.emoji}</span></div>
                <div className="blog-body">
                  <span className="blog-tag">{p.tag}</span>
                  <div className="blog-t cormorant">{p.title}</div>
                  <p className="blog-ex">{p.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT (bottom) */}
      <section className="contact-section" id="contact">
        <div className="contact-grid">
          <div className="cl">
            <div className="label lt">Free Consultation</div>
            <h2>Let&apos;s find your biggest automation opportunity.</h2>
            <p>Tell us what&apos;s eating your time and we&apos;ll show you exactly how to automate it. No sales pitch — just a straight conversation about what&apos;s possible.</p>
            <div className="promises">
              {["Free 30-minute strategy call","Custom automation roadmap","No commitment required","Response within 24 hours"].map((item,i) => (
                <div key={i} className="promise"><div className="pdot">✓</div><span>{item}</span></div>
              ))}
            </div>
          </div>
          <div className="cform">
            <h3>Request a Free Consult</h3>
            <p>We&apos;ll respond within one business day.</p>
            <ContactForm form={form} setForm={setForm} submitting={submitting} submitted={submitted} onSubmit={submit} />
            <div className="form-trust" style={{ marginTop: "1rem" }}>
              <span className="form-trust-icon">✓</span>
              <span>No commitment · 100% free · Response within 24 hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="flogo">smb<span>automation</span></div>
        <ul className="flinks">
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#automations">Automations</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <span className="fcopy">© 2026 SMB Automation. All rights reserved.</span>
      </footer>

      {/* MODAL */}
      {activeAuto && (
        <div className="modal-bg" onClick={() => setActiveAuto(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-x" onClick={() => setActiveAuto(null)}>✕</button>
            <div className="modal-ey">{activeAuto.nicheLabel}</div>
            <div className="modal-t cormorant">{activeAuto.title}</div>
            <p className="modal-d">{activeAuto.desc}</p>
            <div style={{ background: "var(--surface-2)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem", border: "1px solid var(--border)" }}>
              <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>What this solves</div>
              <p style={{ fontSize: "0.9rem", color: "var(--white)", lineHeight: 1.7 }}>
                This automation removes manual, repetitive tasks from your team&apos;s plate, giving you back hours every week and ensuring nothing falls through the cracks. Every build is tailored to your existing tools and workflows.
              </p>
            </div>
            <button className="btn-primary" style={{ width: "100%", textAlign: "center", padding: "0.9rem" }} onClick={() => inquire(activeAuto)}>
              Inquire About This Automation →
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast"><span>{toast.icon}</span><span>{toast.msg}</span></div>}
    </>
  );
}
