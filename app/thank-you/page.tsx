export default function ThankYouPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Barlow', sans-serif; background: #EDF1F7; color: #0A0E1A; }
        .page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }
        .card {
          background: #FFFFFF;
          border: 1px solid #D4DAE8;
          padding: 3rem 2.5rem;
          max-width: 480px;
          width: 100%;
        }
        .headline {
          font-size: 2rem;
          font-weight: 600;
          color: #0A0E1A;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .body {
          font-size: 1rem;
          color: #5A6580;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .body a {
          color: #2540D9;
          text-decoration: underline;
        }
        .body a:hover {
          color: #1A2EA8;
        }
        .back {
          font-size: 0.875rem;
          color: #5A6580;
          text-decoration: none;
        }
        .back:hover { color: #0A0E1A; }
      `}</style>
      <div className="page">
        <div className="card">
          <h1 className="headline">Audit request received.</h1>
          <p className="body">
            We will be in touch soon, or you can{' '}
            <a href="https://calendly.com/jesse-smbautomation/30min" target="_blank" rel="noopener noreferrer">
              book a call here
            </a>
            .
          </p>
          <a href="/" className="back">← Back to home</a>
        </div>
      </div>
    </>
  );
}
