'use client';

import { useState, useEffect } from "react";
import WorkflowDiagram from "@/components/WorkflowDiagram";

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Plus Jakarta Sans', sans-serif; background: #FAF7F2; color: #1E1A16; overflow-x: hidden; }
  .fraunces { font-family: 'Fraunces', serif; }

  :root {
    --cream: #FAF7F2; --warm-white: #FFFDF9; --copper: #B5622A;
    --copper-light: #D4844A; --copper-pale: #F5E8DC; --charcoal: #1E1A16;
    --warm-gray: #6B6358; --clay: #E8DDD0; --clay-dark: #D4C5B0;
  }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5vw; height: 72px;
    background: rgba(250,247,242,0.94); backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(180,160,130,0.15); transition: all 0.3s ease;
  }
  .nav.scrolled { box-shadow: 0 2px 24px rgba(30,26,22,0.08); }
  .nav-logo { font-family: 'Fraunces', serif; font-size: 1.3rem; font-weight: 500; color: var(--charcoal); letter-spacing: -0.01em; }
  .nav-logo span { color: var(--copper); }
  .nav-links { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
  .nav-links a { text-decoration: none; color: var(--warm-gray); font-size: 0.9rem; font-weight: 500; letter-spacing: 0.01em; transition: color 0.2s; }
  .nav-links a:hover { color: var(--charcoal); }
  .btn-primary { background: var(--copper); color: white; padding: 0.6rem 1.5rem; border-radius: 100px; font-size: 0.875rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s ease; text-decoration: none; display: inline-block; letter-spacing: 0.01em; }
  .btn-primary:hover { background: var(--copper-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(181,98,42,0.3); }
  .btn-secondary { background: transparent; color: var(--charcoal); padding: 0.6rem 1.5rem; border-radius: 100px; font-size: 0.875rem; font-weight: 600; border: 2px solid var(--clay-dark); cursor: pointer; transition: all 0.2s ease; text-decoration: none; display: inline-block; }
  .btn-secondary:hover { border-color: var(--copper); color: var(--copper); }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    padding: 120px 5vw 80px;
    max-width: 1280px;
    margin: 0 auto;
    align-items: center;
    position: relative;
  }
  .hero-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; pointer-events: none; }
  .blob1 { width: 600px; height: 600px; background: radial-gradient(circle, #E8C9A8 0%, transparent 70%); top: -100px; right: -100px; }
  .blob2 { width: 400px; height: 400px; background: radial-gradient(circle, #C5D8B8 0%, transparent 70%); bottom: 0; left: -50px; }
  .hero-content { position: relative; z-index: 1; }
  .hero-eyebrow { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--copper-pale); color: var(--copper); padding: 0.4rem 1rem; border-radius: 100px; font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 1.75rem; }
  .hero-eyebrow::before { content: ''; width: 6px; height: 6px; background: var(--copper); border-radius: 50%; }
  .hero-headline { font-family: 'Fraunces', serif; font-size: clamp(2.6rem, 4.5vw, 4rem); font-weight: 400; line-height: 1.1; letter-spacing: -0.02em; color: var(--charcoal); margin-bottom: 1.5rem; }
  .hero-headline em { font-style: italic; color: var(--copper); }
  .hero-sub { font-size: 1.05rem; color: var(--warm-gray); line-height: 1.75; max-width: 500px; margin-bottom: 2.5rem; font-weight: 400; }
  .hero-actions { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; margin-bottom: 2.75rem; }
  .hero-mini-stats { display: flex; gap: 2rem; flex-wrap: wrap; padding-top: 2rem; border-top: 1px solid var(--clay); }
  .hero-mini-stat { display: flex; flex-direction: column; gap: 0.2rem; }
  .hero-mini-n { font-family: 'Fraunces', serif; font-size: 1.4rem; font-weight: 400; color: var(--copper); line-height: 1; }
  .hero-mini-l { font-size: 0.75rem; color: var(--warm-gray); line-height: 1.4; max-width: 120px; }

  /* HERO DIAGRAM */
  .hero-diagram-wrap { position: relative; z-index: 1; display: flex; align-items: center; justify-content: center; }
  .hero-diagram-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 24px 80px rgba(30,26,22,0.12), 0 4px 16px rgba(30,26,22,0.06);
    padding: 28px;
    transform: rotate(-2.5deg);
    width: 100%;
    max-width: 420px;
  }
  .diagram-label { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--warm-gray); margin-bottom: 12px; }
  @keyframes draw-path { to { stroke-dashoffset: 0; } }

  /* STATS BAR */
  .stats-bar { background: var(--charcoal); padding: 1.5rem 5vw; display: flex; gap: 3rem; justify-content: center; flex-wrap: wrap; }
  .stat { text-align: center; }
  .stat-n { font-family: 'Fraunces', serif; font-size: 2rem; font-weight: 400; color: var(--copper-light); line-height: 1; display: block; }
  .stat-l { font-size: 0.78rem; color: rgba(255,255,255,0.5); letter-spacing: 0.04em; margin-top: 0.25rem; display: block; }

  /* SECTIONS */
  .section { padding: 7rem 5vw; }
  .section-alt { background: var(--warm-white); }
  .section-dark { background: var(--charcoal); }
  .inner { max-width: 1100px; margin: 0 auto; }
  .label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--copper); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem; }
  .label::after { content: ''; height: 1px; width: 2rem; background: var(--copper); display: inline-block; }
  .label.lt { color: var(--copper-light); }
  .label.lt::after { background: var(--copper-light); }
  .h2 { font-family: 'Fraunces', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; line-height: 1.15; letter-spacing: -0.02em; color: var(--charcoal); max-width: 680px; margin-bottom: 1rem; }
  .h2.lt { color: white; }
  .sub { font-size: 1.05rem; color: var(--warm-gray); line-height: 1.7; max-width: 620px; margin-bottom: 3.5rem; }
  .sub.lt { color: rgba(255,255,255,0.6); }

  /* HOW IT WORKS */
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; }
  .step-card { background: white; border: 1px solid var(--clay); border-radius: 20px; padding: 2.5rem 2rem; transition: all 0.3s ease; position: relative; overflow: hidden; }
  .step-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: var(--copper); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
  .step-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(30,26,22,0.1); border-color: var(--copper-pale); }
  .step-card:hover::after { transform: scaleX(1); }
  .step-n { font-family: 'Fraunces', serif; font-size: 4rem; font-weight: 300; color: var(--clay-dark); line-height: 1; margin-bottom: 1rem; display: block; }
  .step-t { font-family: 'Fraunces', serif; font-size: 1.25rem; font-weight: 500; color: var(--charcoal); margin-bottom: 0.75rem; line-height: 1.3; }
  .step-d { color: var(--warm-gray); font-size: 0.92rem; line-height: 1.75; }

  /* WORKFLOW */
  .wf-section { padding: 7rem 5vw; background: var(--charcoal); position: relative; overflow: hidden; }
  .wf-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 15% 65%, rgba(181,98,42,0.14) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(107,126,96,0.07) 0%, transparent 50%); pointer-events: none; }
  .wf-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .wf-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 1.5rem; }
  .wf-canvas { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 2.5rem 2rem; overflow-x: auto; }
  .wf-row-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.28); margin-bottom: 1rem; min-width: 720px; }
  .wf-row { display: flex; align-items: flex-start; min-width: 720px; gap: 0; margin-bottom: 0; }
  .wf-step { display: flex; flex-direction: column; align-items: center; flex: 1; }
  .wf-node { width: 88px; height: 88px; border-radius: 18px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.28rem; border: 1.5px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); transition: all 0.25s ease; position: relative; cursor: default; }
  .wf-node:hover { transform: translateY(-5px); border-color: rgba(181,98,42,0.5); background: rgba(181,98,42,0.1); box-shadow: 0 14px 36px rgba(181,98,42,0.2); }
  .wf-icon { font-size: 1.65rem; line-height: 1; }
  .wf-brand { font-size: 0.56rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: rgba(255,255,255,0.35); line-height: 1; }
  .wf-badge { position: absolute; top: -10px; right: -10px; background: var(--copper); border-radius: 100px; padding: 0.14rem 0.44rem; font-size: 0.54rem; font-weight: 700; color: white; letter-spacing: 0.04em; text-transform: uppercase; white-space: nowrap; z-index: 2; }
  .wf-trigger { position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14); border-radius: 100px; padding: 0.14rem 0.58rem; font-size: 0.54rem; font-weight: 700; color: rgba(255,255,255,0.5); letter-spacing: 0.07em; text-transform: uppercase; white-space: nowrap; }
  .wf-lbl { margin-top: 1rem; text-align: center; max-width: 90px; }
  .wf-lt { font-size: 0.76rem; font-weight: 600; color: rgba(255,255,255,0.82); line-height: 1.3; display: block; margin-bottom: 0.18rem; }
  .wf-ls { font-size: 0.65rem; color: rgba(255,255,255,0.34); line-height: 1.35; display: block; }
  .wf-connector { display: flex; align-items: center; padding-top: 44px; flex-shrink: 0; }
  .wf-line-wrap { position: relative; width: 32px; height: 2px; }
  .wf-line { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(181,98,42,0.28) 0%, rgba(181,98,42,0.7) 100%); }
  .wf-dot { position: absolute; top: 50%; transform: translateY(-50%); width: 5px; height: 5px; border-radius: 50%; background: var(--copper); animation: pulse-dot 1.8s ease-in-out infinite; }
  .wf-arrowhead { position: absolute; right: -5px; top: 50%; transform: translateY(-50%); color: rgba(181,98,42,0.7); font-size: 0.6rem; line-height: 1; }
  @keyframes pulse-dot { 0% { left: 2px; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { left: calc(100% - 7px); opacity: 0; } }

  /* WORKFLOW BRANCH CONNECTOR */
  .wf-branch-wrap { display: flex; align-items: center; justify-content: center; gap: 2rem; min-width: 720px; padding: 1.5rem 0; }
  .wf-branch-center { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
  .wf-branch-line { width: 2px; height: 44px; background: linear-gradient(180deg, rgba(181,98,42,0.4) 0%, rgba(181,98,42,0.85) 100%); position: relative; }
  .wf-branch-dot-v { position: absolute; left: 50%; transform: translateX(-50%); width: 5px; height: 5px; border-radius: 50%; background: var(--copper); animation: pulse-dot-v 1.8s ease-in-out infinite; }
  .wf-hot-badge-v { background: var(--copper); border-radius: 100px; padding: 0.2rem 0.65rem; font-size: 0.6rem; font-weight: 700; color: white; letter-spacing: 0.05em; text-transform: uppercase; white-space: nowrap; }
  .wf-nurture-label { font-size: 0.7rem; color: rgba(255,255,255,0.28); font-weight: 500; letter-spacing: 0.04em; white-space: nowrap; display: flex; align-items: center; gap: 0.4rem; }
  @keyframes pulse-dot-v { 0% { top: 2px; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { top: calc(100% - 7px); opacity: 0; } }

  .wf-outcomes { display: grid; grid-template-columns: repeat(auto-fit, minmax(195px, 1fr)); gap: 1rem; margin-top: 2rem; }
  .wf-outcome { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 14px; padding: 1.2rem; display: flex; align-items: flex-start; gap: 0.65rem; }
  .oc-icon { font-size: 1.15rem; flex-shrink: 0; margin-top: 0.05rem; }
  .oc-t { font-size: 0.8rem; font-weight: 600; color: rgba(255,255,255,0.82); display: block; margin-bottom: 0.15rem; line-height: 1.3; }
  .oc-s { font-size: 0.68rem; color: rgba(255,255,255,0.36); display: block; line-height: 1.4; }

  /* AUTOMATION TABS + CARDS */
  .tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
  .tab { padding: 0.6rem 1.4rem; border-radius: 100px; font-size: 0.875rem; font-weight: 500; border: 2px solid var(--clay); background: white; cursor: pointer; transition: all 0.2s ease; color: var(--warm-gray); }
  .tab:hover { border-color: var(--copper); color: var(--copper); }
  .tab.on { color: white; }
  .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.25rem; }
  .card { background: white; border: 1px solid var(--clay); border-radius: 16px; padding: 1.75rem; cursor: pointer; transition: all 0.25s ease; display: flex; flex-direction: column; gap: 0.75rem; }
  .card:hover { border-color: var(--copper); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(181,98,42,0.12); }
  .card-t { font-family: 'Fraunces', serif; font-size: 1.1rem; font-weight: 500; color: var(--charcoal); line-height: 1.3; }
  .card-d { color: var(--warm-gray); font-size: 0.875rem; line-height: 1.65; flex: 1; }
  .card-cta { color: var(--copper); font-size: 0.85rem; font-weight: 600; display: flex; align-items: center; gap: 0.3rem; }

  /* MODAL */
  .modal-bg { position: fixed; inset: 0; background: rgba(30,26,22,0.6); backdrop-filter: blur(4px); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  .modal { background: var(--cream); border-radius: 24px; padding: 3rem; max-width: 560px; width: 100%; position: relative; max-height: 90vh; overflow-y: auto; }
  .modal-x { position: absolute; top: 1.5rem; right: 1.5rem; background: var(--clay); border: none; width: 36px; height: 36px; border-radius: 50%; cursor: pointer; font-size: 1rem; display: flex; align-items: center; justify-content: center; color: var(--charcoal); transition: background 0.2s; }
  .modal-x:hover { background: var(--clay-dark); }
  .modal-ey { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 0.75rem; }
  .modal-t { font-family: 'Fraunces', serif; font-size: 1.75rem; font-weight: 500; color: var(--charcoal); line-height: 1.2; margin-bottom: 1rem; }
  .modal-d { color: var(--warm-gray); line-height: 1.7; margin-bottom: 2rem; font-size: 1rem; }

  /* WHY US */
  .diff-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
  .diff-c { padding: 2rem 1.75rem; border-radius: 20px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); transition: border-color 0.3s; }
  .diff-c:hover { border-color: rgba(181,98,42,0.3); }
  .diff-i { font-size: 1.75rem; margin-bottom: 1rem; display: block; }
  .diff-t { font-family: 'Fraunces', serif; font-size: 1.2rem; color: white; font-weight: 400; margin-bottom: 0.5rem; }
  .diff-d { color: rgba(255,255,255,0.52); font-size: 0.9rem; line-height: 1.65; }

  /* CONTACT */
  .contact-section { background: var(--charcoal); padding: 7rem 5vw; }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; max-width: 1100px; margin: 0 auto; align-items: start; }
  .cl h2 { font-family: 'Fraunces', serif; font-size: clamp(2rem, 4vw, 3rem); font-weight: 400; color: white; line-height: 1.15; margin-bottom: 1.25rem; letter-spacing: -0.02em; }
  .cl p { color: rgba(255,255,255,0.58); line-height: 1.7; font-size: 1rem; margin-bottom: 2rem; }
  .promises { display: flex; flex-direction: column; gap: 1rem; }
  .promise { display: flex; align-items: flex-start; gap: 0.75rem; color: rgba(255,255,255,0.68); font-size: 0.9rem; line-height: 1.5; }
  .pdot { width: 20px; height: 20px; border-radius: 50%; background: var(--copper); flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; color: white; }
  .cform { background: white; border-radius: 24px; padding: 2.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
  .frow { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .fg { display: flex; flex-direction: column; gap: 0.4rem; }
  .fg label { font-size: 0.8rem; font-weight: 600; color: var(--charcoal); letter-spacing: 0.02em; }
  .fg input, .fg select, .fg textarea { padding: 0.75rem 1rem; border: 1.5px solid var(--clay); border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 0.925rem; color: var(--charcoal); background: var(--cream); transition: border-color 0.2s; outline: none; width: 100%; }
  .fg input:focus, .fg select:focus, .fg textarea:focus { border-color: var(--copper); background: white; }
  .fg textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
  .fsub { background: var(--copper); color: white; padding: 1rem; border-radius: 12px; font-size: 1rem; font-weight: 600; border: none; cursor: pointer; transition: all 0.2s ease; font-family: 'Plus Jakarta Sans', sans-serif; }
  .fsub:hover { background: var(--copper-light); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(181,98,42,0.35); }
  .fsub:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* BLOG */
  .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.75rem; }
  .blog-card { background: white; border: 1px solid var(--clay); border-radius: 20px; overflow: hidden; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: block; }
  .blog-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(30,26,22,0.1); }
  .blog-img { height: 190px; display: flex; align-items: center; justify-content: center; }
  .blog-body { padding: 1.5rem; }
  .blog-tag { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--copper); margin-bottom: 0.5rem; display: block; }
  .blog-t { font-family: 'Fraunces', serif; font-size: 1.15rem; font-weight: 500; color: var(--charcoal); line-height: 1.35; margin-bottom: 0.5rem; }
  .blog-ex { color: var(--warm-gray); font-size: 0.875rem; line-height: 1.65; }

  /* FOOTER */
  .footer { background: #141210; padding: 3rem 5vw; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid rgba(255,255,255,0.06); }
  .flogo { font-family: 'Fraunces', serif; font-size: 1.2rem; font-weight: 400; color: white; }
  .flogo span { color: var(--copper-light); }
  .flinks { display: flex; gap: 2rem; list-style: none; flex-wrap: wrap; }
  .flinks a { color: rgba(255,255,255,0.38); text-decoration: none; font-size: 0.85rem; transition: color 0.2s; }
  .flinks a:hover { color: white; }
  .fcopy { color: rgba(255,255,255,0.28); font-size: 0.8rem; }

  /* TOAST */
  .toast { position: fixed; bottom: 2rem; right: 2rem; background: var(--charcoal); color: white; padding: 1rem 1.5rem; border-radius: 12px; font-size: 0.9rem; z-index: 999; box-shadow: 0 8px 32px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 0.5rem; animation: up 0.3s ease; }
  @keyframes up { from { transform: translateY(16px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  @keyframes fi { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .fi { animation: fi 0.45s ease forwards; }

  @media (max-width: 960px) {
    .nav-links { display: none; }
    .hero { grid-template-columns: 1fr; gap: 3rem; padding-top: 100px; }
    .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    .frow { grid-template-columns: 1fr; }
    .hero-diagram-card { transform: none; margin: 0 auto; }
  }
`;

// ─── Inline SVG: Automation Diagram ───────────────────────────────────────────
function AutomationDiagram() {
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 200);
    return () => clearTimeout(t);
  }, []);

  const inputs = [
    { label: "Web Form", icon: "🌐", y: 32 },
    { label: "Phone Call", icon: "📞", y: 112 },
    { label: "Social DM",  icon: "💬", y: 192 },
  ];
  const outputs = [
    { label: "SMS Sent",     icon: "📱", y: 32 },
    { label: "Appt Booked", icon: "📅", y: 112 },
    { label: "CRM Updated", icon: "📊", y: 192 },
  ];

  const cy = { center: 130 };
  const connStyle = (delay: number): React.CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: drawn ? 0 : 1,
    transition: `stroke-dashoffset 0.75s ease ${delay}s`,
  });

  return (
    <div className="hero-diagram-wrap">
      <div className="hero-diagram-card">
        <div className="diagram-label">Your automation at work</div>
        <svg viewBox="0 0 360 250" width="100%" style={{ display: "block" }}>
          <defs>
            <marker id="arr" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <path d="M 0,0 L 7,2.5 L 0,5 z" fill="#B5622A" fillOpacity="0.45" />
            </marker>
          </defs>

          {/* Connectors — inputs to AI Router */}
          {inputs.map((inp, i) => (
            <path
              key={`in${i}`}
              d={`M 98,${inp.y + 18} C 130,${inp.y + 18} 130,${cy.center} 154,${cy.center}`}
              fill="none" stroke="#B5622A" strokeWidth="1.5" strokeOpacity="0.42"
              markerEnd="url(#arr)" pathLength="1"
              style={connStyle(i * 0.12)}
            />
          ))}

          {/* Connectors — AI Router to outputs */}
          {outputs.map((out, i) => (
            <path
              key={`out${i}`}
              d={`M 206,${cy.center} C 232,${cy.center} 232,${out.y + 18} 260,${out.y + 18}`}
              fill="none" stroke="#B5622A" strokeWidth="1.5" strokeOpacity="0.42"
              markerEnd="url(#arr)" pathLength="1"
              style={connStyle(0.36 + i * 0.12)}
            />
          ))}

          {/* Input nodes */}
          {inputs.map((inp, i) => (
            <g key={`in-node${i}`}>
              <rect x="8" y={inp.y} width="90" height="36" rx="8" fill="#FAF7F2" stroke="#D4C5B0" strokeWidth="1.5" />
              <text x="53" y={inp.y + 14} textAnchor="middle" fontSize="13">{inp.icon}</text>
              <text x="53" y={inp.y + 28} textAnchor="middle" fontSize="9" fill="#6B6358" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">{inp.label}</text>
            </g>
          ))}

          {/* Central AI Router node */}
          <rect x="154" y="109" width="52" height="42" rx="9" fill="#F5E8DC" stroke="#B5622A" strokeWidth="1.5" />
          <text x="180" y="126" textAnchor="middle" fontSize="15">⚡</text>
          <text x="180" y="141" textAnchor="middle" fontSize="7.5" fill="#B5622A" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="700" letterSpacing="0.05em">AI ROUTER</text>

          {/* Output nodes */}
          {outputs.map((out, i) => (
            <g key={`out-node${i}`}>
              <rect x="260" y={out.y} width="90" height="36" rx="8" fill="#FAF7F2" stroke="#D4C5B0" strokeWidth="1.5" />
              <text x="305" y={out.y + 14} textAnchor="middle" fontSize="13">{out.icon}</text>
              <text x="305" y={out.y + 28} textAnchor="middle" fontSize="9" fill="#6B6358" fontFamily="Plus Jakarta Sans, sans-serif" fontWeight="600">{out.label}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const NICHES = [
  {
    id: "real-estate", label: "Real Estate", color: "#8B5E3C", emoji: "🏠",
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
    id: "ecommerce", label: "E-commerce", color: "#5C7A4E", emoji: "🛒",
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
    id: "agency", label: "Marketing Agency", color: "#6B4E8C", emoji: "📊",
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
    id: "local-services", label: "Local Services", color: "#B5622A", emoji: "🔧",
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
    id: "professional", label: "Professional Services", color: "#2A6B7C", emoji: "💼",
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
  { tag: "Local Services", title: "Why the First Business to Respond Wins 78% of the Time", excerpt: "Speed-to-lead is the single biggest lever most local businesses are not pulling. Here is what the data says and how to fix it.", bg: "#F8EEE4", emoji: "⚡", slug: "speed-to-lead" },
  { tag: "Real Estate", title: "How Property Managers Are Reclaiming 15 Hours a Week with AI", excerpt: "From maintenance routing to lease renewals, the automations reshaping property management operations right now.", bg: "#F5EDE4", emoji: "🏠", slug: "property-manager-automation" },
  { tag: "Strategy", title: "The Bottleneck Audit: Find What's Costing Your Business the Most", excerpt: "Before you automate anything, run this 20-minute exercise to identify your highest-leverage opportunity.", bg: "#EDF3EA", emoji: "🔍", slug: "bottleneck-audit" },
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
      <div style={{ background: "var(--cream)", overflow: "hidden" }}>
        <div className="hero" id="hero">
          <div className="hero-blob blob1" /><div className="hero-blob blob2" />

          {/* Left: copy */}
          <div className="hero-content">
            <div className="hero-eyebrow">Custom AI Automation for Local Businesses</div>
            <h1 className="hero-headline">
              Stop losing revenue<br />
              to processes that<br />
              <em>should run themselves.</em>
            </h1>
            <p className="hero-sub">We build custom automation systems that connect your existing tools, qualify your leads, and follow up with every prospect — while you focus on the work that actually requires you.</p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary" style={{ padding: "0.8rem 2rem", fontSize: "0.95rem" }}>Book a Free Consult</a>
              <a href="#workflow" className="btn-secondary" style={{ padding: "0.8rem 2rem", fontSize: "0.95rem" }}>See How It Works</a>
            </div>
            <div className="hero-mini-stats">
              {[
                { n: "78%", l: "of buyers work with the first business to respond" },
                { n: "12 hrs", l: "average time saved per client per week" },
                { n: "< 10 days", l: "from discovery call to live system" },
              ].map((s, i) => (
                <div key={i} className="hero-mini-stat">
                  <span className="hero-mini-n">{s.n}</span>
                  <span className="hero-mini-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: diagram */}
          <AutomationDiagram />
        </div>
      </div>

      {/* STATS BAR */}
      <div className="stats-bar">
        {[
          { n: "< 60s", l: "Lead response time" },
          { n: "5-10 days", l: "Average build time" },
          { n: "3-10x", l: "Typical ROI in month one" },
          { n: "0", l: "Templates. Every build is custom" },
        ].map((s, i) => (
          <div key={i} className="stat">
            <span className="stat-n">{s.n}</span>
            <span className="stat-l">{s.l}</span>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <section className="section section-alt" id="how-it-works">
        <div className="inner">
          <div className="label">The Process</div>
          <h2 className="h2">Built Around Your ROI, Not a Feature Checklist</h2>
          <p className="sub">Every engagement starts with a 30-minute conversation about where your business is losing time and money. We build from that. Nothing gets built that we cannot tie to a measurable outcome.</p>
          <div className="steps-grid">
            {[
              { n: "01", t: "Find the Leak", d: "In a 30-minute discovery call, we identify the two or three places in your business where manual processes are costing you the most. We calculate the dollar value before we touch any tools." },
              { n: "02", t: "Design the System", d: "No templates. We map the exact sequence of tools, triggers, and AI decision points your business needs. You approve the design before we write a single line of automation." },
              { n: "03", t: "Build and Test Live", d: "Most builds take 5 to 10 business days. Before go-live, we run a live test on a call together. You watch real data move through the system in real time before it touches a customer." },
              { n: "04", t: "Measure What Moved", d: "Monthly reporting shows leads captured, hours saved, and revenue influenced. If the system is not performing, we fix it. The retainer pays for continuous improvement, not just uptime." },
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
          <div className="label">Automation Library</div>
          <h2 className="h2">Built for your industry</h2>
          <p className="sub">Browse automations by niche. Every system is custom-built — no templates and no off-the-shelf tools that almost fit.</p>
          <div className="tabs">
            {NICHES.map((n, i) => (
              <button key={n.id} className={`tab ${activeNiche === i ? "on" : ""}`} onClick={() => setActiveNiche(i)}
                style={activeNiche === i ? { background: n.color, borderColor: n.color } : {}}>
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
              { i: "🎯", t: "We start with your P&L, not our product", d: "Before we propose anything, we calculate what your current process is costing you. If the automation does not pay for itself in 60 days, we redesign it." },
              { i: "🔧", t: "Custom-built on tools you already own", d: "We do not resell software. We build on your CRM, your phone system, your calendar. You own everything we build — credentials, workflows, documentation." },
              { i: "📐", t: "Multi-system workflows, not single triggers", d: "Real automation connects 4 to 6 tools in a single workflow. A form submission that qualifies, routes, books, briefs, and logs — without a human touching it." },
              { i: "📊", t: "Monthly reporting tied to business outcomes", d: "Every retainer includes a monthly summary: leads captured, hours saved, revenue influenced. If it is not performing, you will know before we do." },
            ].map((d, i) => (
              <div key={i} className="diff-c">
                <span className="diff-i">{d.i}</span>
                <div className="diff-t fraunces">{d.t}</div>
                <p className="diff-d">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="section section-alt" id="blog">
        <div className="inner">
          <div className="label">From the Blog</div>
          <h2 className="h2">Automation insights for business owners</h2>
          <p className="sub">No fluff, no jargon. Just practical advice on where automation can move the needle for your business.</p>
          <div className="blog-grid">
            {BLOG_POSTS.map((p, i) => (
              <a key={i} href={`/blog/${p.slug}`} className="blog-card">
                <div className="blog-img" style={{ background: p.bg }}><span style={{ fontSize: "3.5rem" }}>{p.emoji}</span></div>
                <div className="blog-body">
                  <span className="blog-tag">{p.tag}</span>
                  <div className="blog-t fraunces">{p.title}</div>
                  <p className="blog-ex">{p.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <div className="contact-grid">
          <div className="cl">
            <div className="label lt">Free Consultation</div>
            <h2>Let&apos;s find your biggest automation opportunity.</h2>
            <p>Tell us what&apos;s eating your time and we&apos;ll show you exactly how to automate it. No sales pitch. Just a straight conversation about what&apos;s possible.</p>
            <div className="promises">
              {["Free 30-minute strategy call", "Custom automation roadmap", "No commitment required", "Response within 24 hours"].map((item, i) => (
                <div key={i} className="promise"><div className="pdot">✓</div><span>{item}</span></div>
              ))}
            </div>
          </div>
          <div className="cform">
            <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.35rem", fontWeight: 500, marginBottom: "0.25rem", color: "var(--charcoal)" }}>Request a Free Consult</h3>
            <p style={{ color: "var(--warm-gray)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>We&apos;ll respond within one business day.</p>
            <div className="frow">
              <div className="fg"><label>First &amp; Last Name *</label><input type="text" placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div className="fg"><label>Email Address *</label><input type="email" placeholder="jane@business.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
            </div>
            <div className="frow">
              <div className="fg"><label>Phone Number</label><input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
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
            </div>
            <div className="fg">
              <label>Describe Your Biggest Bottleneck</label>
              <textarea placeholder="What's the one thing eating the most time in your business right now?" value={form.bottleneck} onChange={e => setForm(f => ({ ...f, bottleneck: e.target.value }))} />
            </div>
            <button className="fsub" onClick={submit} disabled={submitting || submitted}>
              {submitting ? "Sending..." : submitted ? "✓ Request Sent!" : "Request My Free Consult →"}
            </button>
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
            <div className="modal-t fraunces">{activeAuto.title}</div>
            <p className="modal-d">{activeAuto.desc}</p>
            <div style={{ background: "var(--clay)", borderRadius: 12, padding: "1.25rem", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--warm-gray)", marginBottom: "0.5rem" }}>What this solves</div>
              <p style={{ fontSize: "0.9rem", color: "var(--charcoal)", lineHeight: 1.65 }}>
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
