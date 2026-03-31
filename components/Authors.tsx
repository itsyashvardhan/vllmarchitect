import React from 'react';

const Authors: React.FC = () => {
  const authors = [
    {
      name: 'Yashvardhan Singh',
      roll: '2206065',
      initials: 'YS',
      contribution: 'Led full-pipeline design, PolyThrottle integration, and compound scaling analysis. Authored Chapters 1, 2.2, 6.',
    },
    {
      name: 'Ankit Kumar',
      roll: '2206009',
      initials: 'AK',
      contribution: 'Conducted benchmarking experiments across all platforms. Verified numerical accuracy. Authored Sections 4.1–4.3.',
    },
    {
      name: 'Ananya Singh',
      roll: '2206008',
      initials: 'AS',
      contribution: 'Led literature review of 37 references. Validated Hybridization Principle. Authored Chapter 3 and Section 2.1.',
    },
    {
      name: 'Shubhangi Kumari',
      roll: '2206128',
      initials: 'SK',
      contribution: 'Quality gatekeeper: multi-pass review across all chapters. Authored Chapter 5 (Standards Adopted). Final proofreading.',
    },
  ];

  return (
    <section className="section authors-section" id="team">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-badge" style={{ background: 'var(--kiit-light)', color: 'var(--kiit)', border: '1px solid var(--kiit-medium)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            Research Team
          </div>
          <h2 className="section-title">Project Team & Affiliation</h2>
          <p className="section-desc">
            Major Project II • Bachelor of Information Technology • 8th Semester • 2025-26
          </p>
        </div>

        {/* Institution Card */}
        <div className="institution-card">
          <div className="institution-info">
            <div className="institution-icon">🎓</div>
            <div className="institution-text">
              <h3>KIIT University</h3>
              <div className="dept">School of Computer Engineering</div>
              <div className="info">Bhubaneswar, Odisha - 751024</div>
            </div>
          </div>
          <a
            href="https://scholar.google.com/citations?user=m9kbIrsAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="advisor-link"
          >
            <span style={{ fontSize: '1.2rem' }}>🛡️</span>
            <div>
              <div className="label">Faculty Advisor</div>
              <div className="name">Dr. Sushruta Mishra</div>
            </div>
          </a>
        </div>

        {/* Authors Grid */}
        <div className="authors-grid">
          {authors.map(a => (
            <div className="author-card" key={a.roll}>
              <div className="author-avatar">{a.initials}</div>
              <h4>{a.name}</h4>
              <div className="role">Roll No: {a.roll}</div>
              <div className="contribution">{a.contribution}</div>
            </div>
          ))}
        </div>

        {/* Research status */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem', borderRadius: '9999px',
              background: 'var(--kiit-light)', border: '1px solid var(--kiit-medium)',
              fontSize: '0.75rem', fontWeight: 600, color: 'var(--kiit)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              March 2026 • Submitted to KIIT University
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1.25rem', borderRadius: '9999px',
              background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.3)',
              fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent-purple)',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Paper Accepted: ICCCNet 2026, Manchester UK
            </div>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.75rem', maxWidth: 500, margin: '0.75rem auto 0' }}>
            This interactive companion presents the research methodology and findings on vision encoder selection 
            for edge-deployed visual language models.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Authors;
