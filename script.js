<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Akash Workshop | Online Examination Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html, body { width: 100%; min-height: 100%; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #0f172a; }
    
    /* Top Global Navigation */
    .cbt-nav { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 12px 18px; color: #ffffff; flex-wrap: wrap; gap: 10px; }
    .cbt-logo-area { display: flex; align-items: center; gap: 8px; }
    .cbt-logo-badge { background: #2563eb; color: white; font-weight: 800; padding: 5px 8px; border-radius: 6px; font-size: 13px; }
    .cbt-brand-name { font-size: 16px; font-weight: 700; color: #f8fafc; }
    .cbt-nav-actions { display: flex; gap: 8px; align-items: center; }
    .cbt-btn-pay { background: #10b981; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; transition: background 0.2s; }
    .cbt-btn-pay:hover { background: #059669; }
    .cbt-btn-admin-nav { background: #475569; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; transition: background 0.2s; }
    .cbt-btn-admin-nav:hover { background: #334155; }
    
    /* Candidate Context Menu */
    .cbt-profile-menu-container { position: relative; display: none; }
    .cbt-candidate-badge-logo { background: #2563eb; color: #ffffff; font-weight: 800; font-size: 12px; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; border: 1px solid rgba(255,255,255,0.2); user-select: none; }
    .cbt-profile-dropdown { display: none; position: absolute; right: 0; top: calc(100% + 6px); width: 220px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); padding: 14px; color: #1e293b; z-index: 2000; }
    .cbt-profile-dropdown.open { display: block; }
    
    /* View Containers */
    .cbt-view { display: none; padding: 22px; max-width: 860px; margin: 18px auto; width: 94%; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; }
    .cbt-view.active { display: block; }
    
    /* Isolated Exam Terminal */
    #win-4.active { display: flex; flex-direction: column; width: 100% !important; height: 100vh !important; position: fixed; inset: 0; z-index: 99999; background: #ffffff; margin: 0; padding: 0; border: none; border-radius: 0; }
    .test-header-bar { display: flex; justify-content: space-between; align-items: center; background: #0f172a; color: #fff; padding: 10px 18px; }
    .test-fullscreen-body { display: flex; flex: 1; overflow: hidden; }
    .test-main-area { flex: 1; padding: 22px; overflow-y: auto; border-right: 2px solid #e2e8f0; display: flex; flex-direction: column; }
    .test-sidebar { width: 320px; background: #ffffff; padding: 16px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; }
    
    /* Typography & Input Controls */
    .cbt-h1 { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 6px; color: #0f172a; }
    .cbt-h2 { font-size: 14px; color: #64748b; text-align: center; margin-bottom: 18px; }
    .cbt-field { width: 100%; padding: 11px 12px; margin-bottom: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; }
    .cbt-field:focus { border-color: #2563eb; }
    .cbt-btn-primary { width: 100%; padding: 11px 14px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer; text-align: center; transition: background 0.2s; }
    .cbt-btn-primary:hover { background: #1d4ed8; }
    .cbt-btn-secondary { width: 100%; padding: 11px 14px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; text-align: center; transition: background 0.2s; }
    .cbt-btn-secondary:hover { background: #cbd5e1; }
    .cbt-btn-outline { padding: 8px 14px; background: #ffffff; color: #64748b; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer; }
    .cbt-btn-outline:hover { background: #f1f5f9; color: #0f172a; }
    
    /* Selection Cards & Grids */
    .cbt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }
    .cbt-selection-card { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 18px 12px; text-align: center; cursor: pointer; font-weight: 700; font-size: 15px; color: #1e293b; transition: all 0.2s ease; }
    .cbt-selection-card:hover { background: #eff6ff; border-color: #2563eb; color: #1d4ed8; transform: translateY(-2px); }
    
    /* Option Elements */
    .cbt-opt-label { display: flex; align-items: center; padding: 14px 16px; margin-bottom: 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 500; color: #0f172a; line-height: 1.5; background: #ffffff; transition: all 0.2s; }
    .cbt-opt-label:hover { background: #f8fafc; border-color: #94a3b8; }
    .cbt-opt-label input[type="radio"] { margin-right: 14px; width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer; }
    .cbt-opt-label.selected-opt { background: #eff6ff; border-color: #2563eb; font-weight: 600; }
    
    /* Question Palette */
    .palette-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
    .palette-btn { padding: 9px 0; border: 2px solid transparent; border-radius: 4px; font-weight: 700; color: white; cursor: pointer; font-size: 12px; text-align: center; }
    .palette-btn.current-q { border-color: #0f172a !important; box-shadow: 0 0 0 2px #38bdf8; }
    .bg-attempted { background-color: #10b981; }
    .bg-unattempted { background-color: #8b5cf6; }
    
    /* Tab Navigation and Administration Panes */
    .cbt-tabs { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px; overflow-x: auto; gap: 6px; }
    .cbt-tab-btn { padding: 9px 14px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; white-space: nowrap; font-size: 13px; border-bottom: 2px solid transparent; margin-bottom: -2px; }
    .cbt-tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; }
    .cbt-pane { display: none; }
    .cbt-pane.active { display: block; }
    .cbt-item-chip { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 6px 12px; border-radius: 20px; margin: 4px; font-size: 12px; font-weight: 600; border: 1px solid #e2e8f0; }
    .cbt-link-back { color: #2563eb; font-size: 13px; font-weight: 600; cursor: pointer; margin-bottom: 14px; display: inline-block; user-select: none; }
    .cbt-link-back:hover { text-decoration: underline; }
    .solution-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; background: #fff; }
    
    /* Palette Legend */
    .palette-legend { display: flex; gap: 12px; font-size: 11px; font-weight: 600; margin-bottom: 8px; }
    .legend-item { display: flex; align-items: center; gap: 4px; }
    .legend-box { width: 12px; height: 12px; border-radius: 2px; }
    
    /* Modal Notification */
    .cbt-modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); z-index: 999999; justify-content: center; align-items: center; padding: 16px; }
    .cbt-modal-backdrop.active { display: flex; }
    .cbt-modal-box { background: #ffffff; width: 100%; max-width: 420px; border-radius: 8px; padding: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
    
    @media(max-width: 768px) {
      .test-fullscreen-body { flex-direction: column; overflow-y: auto; }
      .test-main-area { border-right: none; border-bottom: 2px solid #e2e8f0; overflow-y: visible; }
      .test-sidebar { width: 100%; overflow-y: visible; }
      .cbt-view { width: 96%; padding: 16px; margin: 12px auto; }
    }
  </style>
</head>
<body>

  <!-- Top Navigation Bar -->
  <header class="cbt-nav" id="dom-main-navbar">
    <div class="cbt-logo-area">
      <span class="cbt-logo-badge" id="dom-brand-badge">AW</span>
      <span class="cbt-brand-name" id="dom-brand-name">Akash Workshop</span>
    </div>
    <div class="cbt-nav-actions">
      <button type="button" class="cbt-btn-pay" id="btn-open-payment">Payment &amp; Register</button>
      <button type="button" class="cbt-btn-admin-nav" id="btn-open-admin">Admin Portal</button>
      <div class="cbt-profile-menu-container" id="cbt-candidate-menu-wrapper">
        <div class="cbt-candidate-badge-logo" id="dom-candidate-logo-btn">
          <span id="dom-cand-logo-text">🎓 Candidate</span>
          <span style="font-size: 9px;">▼</span>
        </div>
        <div class="cbt-profile-dropdown" id="dom-candidate-dropdown">
          <div style="font-weight: 800; margin-bottom: 4px;" id="drop-display-username">Candidate</div>
          <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Active Session</div>
          <button type="button" class="cbt-btn-secondary" id="btn-drop-logout">Logout</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Window 1: Login Interface -->
  <main id="win-1" class="cbt-view active">
    <h1 class="cbt-h1">Candidate Examination Login</h1>
    <p class="cbt-h2">Registration is required to login (Default demo credentials available below)</p>
    <input type="text" id="login-username" class="cbt-field" placeholder="Candidate Username" value="demo" autocomplete="username" />
    <input type="password" id="login-password" class="cbt-field" placeholder="Candidate Password" value="1234" autocomplete="current-password" />
    <button type="button" class="cbt-btn-primary" id="btn-action-login">Login to Portal</button>
    <div style="text-align: center; margin-top: 14px; font-size: 13px; color: #64748b;">
      Click "Payment &amp; Register" in the top bar to create a new candidate account.
    </div>
  </main>

  <!-- Window 2: Multi-step Candidate Registration -->
  <section id="win-register" class="cbt-view">
    <span class="cbt-link-back" id="link-back-login">&larr; Back to Login</span>
    <div id="pay-step-1">
      <h1 class="cbt-h1">Portal Registration Fee</h1>
      <p class="cbt-h2">Standard Registration Fee: ₹ <span id="dom-checkout-price">99.00</span></p>
      <button type="button" class="cbt-btn-primary" id="btn-mock-pay">Pay &amp; Continue</button>
    </div>
    <div id="pay-step-2" style="display: none;">
      <h1 class="cbt-h1">Mobile Verification</h1>
      <p class="cbt-h2">Enter your 10-digit mobile number to receive authentication code</p>
      <input type="tel" id="reg-mobile" class="cbt-field" placeholder="10 Digit Mobile Number" maxlength="10" />
      <button type="button" class="cbt-btn-primary" id="btn-send-otp">Send Verification OTP</button>
    </div>
    <div id="pay-step-3" style="display: none;">
      <h1 class="cbt-h1">Account Setup</h1>
      <p class="cbt-h2">Complete candidate profile registration</p>
      <input type="text" id="reg-otp" class="cbt-field" placeholder="Enter Received OTP (Default: 1234)" />
      <input type="text" id="reg-username" class="cbt-field" placeholder="Choose Unique Username" autocomplete="off" />
      <input type="password" id="reg-password" class="cbt-field" placeholder="Create Secret Password" autocomplete="new-password" />
      <button type="button" class="cbt-btn-primary" id="btn-complete-reg">Create Account</button>
    </div>
  </section>

  <!-- Window 3: Dashboard Topic Selection -->
  <section id="win-2" class="cbt-view">
    <h1 class="cbt-h1">Welcome, Candidate</h1>
    <p class="cbt-h2">Select an examination topic from the curriculum</p>
    <div class="cbt-grid" id="dom-win2-topics"></div>
  </section>

  <!-- Window 4: Category and Practice Set Browser -->
  <section id="win-3" class="cbt-view">
    <span class="cbt-link-back" id="link-back-topics">&larr; Back to Topics</span>
    <h1 class="cbt-h1" id="win3-topic-heading">Topic Details</h1>
    <div style="font-weight: 700; margin: 14px 0 8px 0; color: #1e293b;">Question Classifications:</div>
    <div class="cbt-grid" id="dom-win3-paper-types"></div>
    <div style="font-weight: 700; margin: 14px 0 8px 0; color: #1e293b;">Standard Practice Sets:</div>
    <div class="cbt-grid" id="dom-win3-practice-sets"></div>
  </section>

  <!-- Window 5: Fullscreen Examination Terminal -->
  <section id="win-4" class="cbt-view">
    <div class="test-header-bar">
      <span style="font-weight: 700;" id="win4-banner">Exam Terminal</span>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 13px; color: #94a3b8;">Time Remaining:</span>
        <span style="font-size: 18px; font-weight: 800; color: #ef4444;" id="win4-clock">30:00</span>
      </div>
    </div>
    <div class="test-fullscreen-body">
      <div class="test-main-area">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-weight: 700; color: #64748b;" id="win4-counter">Question 1 of 1</span>
          <button type="button" class="cbt-btn-outline" id="btn-clear-choice">Clear Response</button>
        </div>
        <div id="dom-test-container" style="margin-top: 10px; flex: 1;"></div>
        <div style="display: flex; gap: 10px; margin-top: 16px; flex-wrap: wrap;">
          <button type="button" class="cbt-btn-secondary" id="btn-prev-q" style="width: auto; padding: 10px 20px;">&larr; Previous</button>
          <button type="button" class="cbt-btn-primary" id="btn-save-next" style="width: auto; padding: 10px 22px;">Save &amp; Next &rarr;</button>
          <button type="button" class="cbt-btn-primary" id="btn-submit-exam" style="width: auto; padding: 10px 22px; background: #dc2626; margin-left: auto;">Submit Exam</button>
        </div>
      </div>
      <aside class="test-sidebar">
        <div style="font-weight: 700; color: #0f172a;">Question Palette</div>
        <div class="palette-legend">
          <div class="legend-item"><span class="legend-box" style="background: #10b981;"></span> Attempted</div>
          <div class="legend-item"><span class="legend-box" style="background: #8b5cf6;"></span> Unattempted</div>
        </div>
        <div class="palette-grid" id="dom-palette-grid"></div>
      </aside>
    </div>
  </section>

  <!-- Window 6: Performance Evaluation -->
  <section id="win-result" class="cbt-view">
    <h1 class="cbt-h1">Examination Result</h1>
    <div id="dom-result-stats" style="text-align: center; margin: 24px 0;"></div>
    <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
      <button type="button" class="cbt-btn-primary" id="btn-view-solutions" style="max-width: 240px;">View Detailed Solutions</button>
      <button type="button" class="cbt-btn-secondary" id="btn-restart-flow" style="max-width: 240px;">Return to Topics</button>
    </div>
  </section>

  <!-- Window 7: Comprehensive Item Review -->
  <section id="win-solutions" class="cbt-view">
    <span class="cbt-link-back" id="link-back-result">&larr; Back to Result</span>
    <h1 class="cbt-h1">Review: Questions &amp; Solutions</h1>
    <div id="dom-solutions-container" style="margin-top: 14px;"></div>
  </section>

  <!-- Window 8: Administrator Authentication -->
  <section id="win-admin-auth" class="cbt-view">
    <span class="cbt-link-back" id="link-admin-back-login">&larr; Back</span>
    <h1 class="cbt-h1">Admin Verification</h1>
    <p class="cbt-h2">Enter Master PIN to access management dashboard</p>
    <input type="password" id="admin-pass-input" class="cbt-field" placeholder="Enter PIN (Default: 1234)" />
    <button type="button" class="cbt-btn-primary" id="btn-admin-verify">Unlock Dashboard</button>
  </section>

  <!-- Window 9: Administrator Command Center -->
  <section id="win-admin-dash" class="cbt-view">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
      <span style="font-weight: 800; font-size: 18px; color: #0f172a;">Admin Command Center</span>
      <button type="button" class="cbt-btn-secondary" id="btn-admin-exit" style="width: auto; padding: 6px 14px; background: #ef4444; color: #fff;">Exit Admin</button>
    </div>
    <div class="cbt-tabs">
      <button type="button" class="cbt-tab-btn active" data-pane="pane-w2">Topics Curriculum</button>
      <button type="button" class="cbt-tab-btn" data-pane="pane-w4-questions">Question Bank Pool</button>
    </div>
    <div id="pane-w2" class="cbt-pane active">
      <div style="display: flex; gap: 8px; margin-bottom: 12px;">
        <input type="text" id="adm-add-topic" class="cbt-field" placeholder="New Topic Title" style="margin-bottom: 0;" />
        <button type="button" class="cbt-btn-primary" id="btn-adm-add-topic" style="width: auto; white-space: nowrap;">Add Topic</button>
      </div>
      <div style="font-weight: 700; margin-bottom: 8px; font-size: 13px; color: #475569;">Active Modules:</div>
      <div id="dom-adm-topic-chips"></div>
    </div>
    <div id="pane-w4-questions" class="cbt-pane">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 700; font-size: 14px; color: #1e293b;">Registered Pool Entries:</span>
        <span id="dom-q-pool-count" style="font-size: 12px; color: #64748b; font-weight: 600;">0 Questions</span>
      </div>
      <div style="max-height: 380px; overflow-y: auto; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px;" id="dom-table-q-list"></div>
    </div>
  </section>

  <!-- Modal Notification Backdrop -->
  <div id="dom-cbt-modal" class="cbt-modal-backdrop">
    <div class="cbt-modal-box">
      <div style="font-weight: 800; font-size: 16px; margin-bottom: 8px;" id="cbt-modal-heading">Notice</div>
      <div style="font-size: 14px; margin-bottom: 16px; line-height: 1.5; color: #334155;" id="cbt-modal-body">Message content</div>
      <button type="button" class="cbt-btn-primary" id="cbt-modal-ok">Acknowledge</button>
    </div>
  </div>

  <!-- Operational Engine Script -->
  <script>
    (function() {
      "use strict";

      // 1. Initial State & Clean Repositories
      const defaultTopics = [
        "William Shakespeare",
        "William Wordsworth",
        "John Milton",
        "John Galsworthy",
        "Literary Terms"
      ];

      const defaultPaperTypes = ["PYQS", "Lines", "Most Probable", "NET JRF"];
      const defaultSets = ["Practice Set 01", "Practice Set 02", "Practice Set 03", "Practice Set 04"];

      const defaultQuestions = [
        { topic: "William Shakespeare", category: "PYQS", text: "In which year was the First Folio published?", options: ["1616", "1623", "1632", "1609"], correct: 1, solution: "Published in 1623." },
        { topic: "William Shakespeare", category: "Lines", text: "'Life's but a walking shadow...' occurs in:", options: ["Hamlet", "Othello", "Macbeth", "King Lear"], correct: 2, solution: "Spoken by Macbeth in Act 5." },
        { topic: "William Wordsworth", category: "PYQS", text: "The Prelude was published in:", options: ["1798", "1805", "1850", "1832"], correct: 2, solution: "Published posthumously in 1850." },
        
        // John Galsworthy: PYQS (Sanitized)
        { topic: "John Galsworthy", category: "PYQS", text: "In The Fugitive, how are the temperaments of Clare and George contrasted?", options: ["Clare is practical while George is romantic", "Clare is poetic while George is prosaic", "Clare is ambitious while George is indifferent", "Clare is uneducated while George is scholarly"], correct: 1, solution: "Clare is poetic and imaginative while George is unimaginative and prosaic." },
        { topic: "John Galsworthy", category: "PYQS", text: "What occupation does Clare briefly take up after leaving Malise in The Fugitive?", options: ["Selling gloves", "Governess", "Typist", "Factory worker"], correct: 0, solution: "Selling gloves." },
        { topic: "John Galsworthy", category: "PYQS", text: "What is Clare's tragic end in The Fugitive?", options: ["Dies of illness", "Murdered", "Commits suicide", "Returns to George"], correct: 2, solution: "She commits suicide." },
        { topic: "John Galsworthy", category: "PYQS", text: "Which character is a solicitor in The Fugitive?", options: ["Edward Fullarton", "Reginald Huntingdon", "Twisden", "Haywood"], correct: 2, solution: "Twisden." },
        { topic: "John Galsworthy", category: "PYQS", text: "Galsworthy met him in 1893 and formed a lifelong friendship. Identify him:", options: ["Conrad", "Hardy", "Shaw", "Ibsen"], correct: 0, solution: "Joseph Conrad." },
        { topic: "John Galsworthy", category: "PYQS", text: "From the Four Winds (1897) appeared under the pseudonym:", options: ["John Gals", "John Sinjohn", "Boz", "Elia"], correct: 1, solution: "John Sinjohn." },
        { topic: "John Galsworthy", category: "PYQS", text: "Galsworthy's first novel published in 1898 was:", options: ["Jocelyn", "Villa Rubein", "A Man of Devon", "The Science"], correct: 0, solution: "Jocelyn." },
        { topic: "John Galsworthy", category: "PYQS", text: "First work published under his own real name:", options: ["Fraternity", "Country Mouse", "The Island Pharisees", "Jocelyn"], correct: 2, solution: "The Island Pharisees (1904)." },
        { topic: "John Galsworthy", category: "PYQS", text: "First play that made Galsworthy famous as a playwright:", options: ["Justice", "Loyalties", "The Silver Box", "None of these"], correct: 2, solution: "The Silver Box (1906)." },
        { topic: "John Galsworthy", category: "PYQS", text: "Galsworthy's reputation as a novelist was established by:", options: ["The Forsyte Saga", "Justice", "Jocelyn", "The Silver Box"], correct: 0, solution: "The Forsyte Saga." },
        { topic: "John Galsworthy", category: "PYQS", text: "Find the Interlude in The Forsyte Saga:", options: ["Indian Winter", "Indian Autumn", "Indian Summer of a Forsyte", "None of these"], correct: 2, solution: "Indian Summer of a Forsyte and Awakening." },
        { topic: "John Galsworthy", category: "PYQS", text: "Which play deals with an escaped prisoner Matt Denant?", options: ["The Show", "Jocelyn", "Escape", "None of these"], correct: 2, solution: "Escape (1926)." },
        { topic: "John Galsworthy", category: "PYQS", text: "What did Galsworthy become in 1921?", options: ["President of Literary Club", "President of P.E.N. Club London", "Assistant in P.E.N.", "None of these"], correct: 1, solution: "First President of P.E.N. Club London." },
        { topic: "John Galsworthy", category: "PYQS", text: "What was conferred upon Galsworthy in 1929?", options: ["Order of Demerit", "Booker Prize", "Order of Merit", "None of these"], correct: 2, solution: "Order of Merit." },
        { topic: "John Galsworthy", category: "PYQS", text: "In Strife, the strike takes place at:", options: ["Trenartha Tin Plate Works", "Thirtana Plate Works", "Thirtankar Works", "None of these"], correct: 0, solution: "Trenartha Tin Plate Works." },
        { topic: "John Galsworthy", category: "PYQS", text: "Who is the leader of the labourers in Strife?", options: ["Jack Barthwick", "Falder", "David Roberts", "None of these"], correct: 2, solution: "David Roberts." },
        { topic: "John Galsworthy", category: "PYQS", text: "Falder appears in:", options: ["Silver Box", "Loyalties", "Justice", "None of these"], correct: 2, solution: "Justice." },
        { topic: "John Galsworthy", category: "PYQS", text: "Who suffers solitary confinement in Justice?", options: ["Falder", "Jack Barthwick", "Ruth", "None of these"], correct: 0, solution: "William Falder." },
        { topic: "John Galsworthy", category: "PYQS", text: "Premchand translated The Silver Box as:", options: ["Chandi Ki Dibiya", "Hartal", "Nyaya", "None of these"], correct: 0, solution: "Chandi Ki Dibiya." },

        // John Galsworthy: Lines (Sanitized)
        { topic: "John Galsworthy", category: "Lines", text: "The law is what it is—a majestic edifice, sheltering all of us... appears in:", options: ["The Roof", "The Skin Game", "Windows", "Justice"], correct: 3, solution: "Spoken by the Judge in Justice." },
        { topic: "John Galsworthy", category: "Lines", text: "We all cut each other's throats from the best of motives appears in:", options: ["Loyalties", "The Skin Game", "The Eldest Son", "None of these"], correct: 0, solution: "Spoken by Margaret Orme in Loyalties." },
        { topic: "John Galsworthy", category: "Lines", text: "Literature is its own reward. Who said?", options: ["Shaw", "Ibsen", "Wordsworth", "Galsworthy"], correct: 3, solution: "John Galsworthy." },
        { topic: "John Galsworthy", category: "Lines", text: "Justice is a machine that, when someone has once given it the starting push, rolls on of itself. Appears in:", options: ["The Skin Game", "The Mob", "Justice", "None of these"], correct: 2, solution: "Spoken by Cokeson in Justice." },
        { topic: "John Galsworthy", category: "Lines", text: "Masters are masters, men are men! Yield one demand and they will make it six... Who is the speaker?", options: ["Anthony in Strife", "Roberts in Strife", "Harness", "Falder"], correct: 0, solution: "John Anthony in Strife." },
        { topic: "John Galsworthy", category: "Lines", text: "No one will touch him now! Never again! He is safe with gentle Jesus! Who says?", options: ["Falder", "Cokeson about Falder", "Ruth", "None of these"], correct: 1, solution: "Cokeson in Justice." }
      ];

      // Sanitization Helper
      function sanitizeString(str) {
        if (!str || typeof str !== "string") return "";
        return str.replace(/\[span_\d+\]\(start_span\)\[span_\d+\]\(end_span\)/g, "").trim();
      }

      // 2. Storage Hydration & Migration Layer
      let storeTopics = [...defaultTopics];
      let storePaperTypes = [...defaultPaperTypes];
      let storeSets = [...defaultSets];
      let storeQuestions = [...defaultQuestions];
      let registeredUsers = [{ username: "demo", password: "1234" }];
      let activeUser = null;
      let isAdminAuthenticated = false;

      try {
        const storedT = JSON.parse(localStorage.getItem("tb_portal_topics"));
        if (Array.isArray(storedT) && storedT.length > 0) storeTopics = storedT;

        const storedQ = JSON.parse(localStorage.getItem("tb_portal_questions"));
        if (Array.isArray(storedQ) && storedQ.length > 0) {
          storeQuestions = storedQ.map(q => ({
            ...q,
            text: sanitizeString(q.text),
            solution: sanitizeString(q.solution)
          }));
        }

        const storedU = JSON.parse(localStorage.getItem("tb_registered_users"));
        if (Array.isArray(storedU) && storedU.length > 0) registeredUsers = storedU;

        const storedAU = JSON.parse(localStorage.getItem("tb_active_user"));
        if (storedAU && typeof storedAU === "object") activeUser = storedAU;

        isAdminAuthenticated = localStorage.getItem("tb_admin_active") === "true";
      } catch (e) {
        console.warn("Storage hydration bypassed due to runtime permissions.");
      }

      // Ensure foundational coverage
      if (!storeTopics.includes("John Galsworthy")) storeTopics.push("John Galsworthy");
      defaultQuestions.forEach(dq => {
        if (!storeQuestions.some(sq => sq.text === dq.text)) storeQuestions.push(dq);
      });

      function syncStorage() {
        try {
          localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
          localStorage.setItem("tb_portal_questions", JSON.stringify(storeQuestions));
          localStorage.setItem("tb_registered_users", JSON.stringify(registeredUsers));
          localStorage.setItem("tb_admin_active", isAdminAuthenticated ? "true" : "false");
          if (activeUser) localStorage.setItem("tb_active_user", JSON.stringify(activeUser));
          else localStorage.removeItem("tb_active_user");
        } catch (e) {}
      }
      syncStorage();

      // 3. Navigation & Presentation Router
      function showView(viewId) {
        document.querySelectorAll(".cbt-view").forEach(el => el.classList.remove("active"));
        const target = document.getElementById(viewId);
        if (target) target.classList.add("active");
        
        const nav = document.getElementById("dom-main-navbar");
        if (nav) nav.style.display = (viewId === "win-4") ? "none" : "flex";

        const drop = document.getElementById("dom-candidate-dropdown");
        if (drop) drop.classList.remove("open");
      }

      function showModal(title, msg, onConfirm) {
        const modal = document.getElementById("dom-cbt-modal");
        document.getElementById("cbt-modal-heading").innerText = title;
        document.getElementById("cbt-modal-body").innerText = msg;
        modal.classList.add("active");
        
        const okBtn = document.getElementById("cbt-modal-ok");
        okBtn.onclick = () => {
          modal.classList.remove("active");
          if (typeof onConfirm === "function") onConfirm();
        };
      }

      function updateNavState() {
        const btnPay = document.getElementById("btn-open-payment");
        const btnAdmin = document.getElementById("btn-open-admin");
        const userMenu = document.getElementById("cbt-candidate-menu-wrapper");
        
        if (activeUser) {
          btnPay.style.display = "none";
          btnAdmin.style.display = "none";
          userMenu.style.display = "block";
          document.getElementById("dom-cand-logo-text").innerText = "🎓 " + activeUser.username;
          document.getElementById("drop-display-username").innerText = activeUser.username;
        } else {
          btnPay.style.display = "block";
          btnAdmin.style.display = "block";
          userMenu.style.display = "none";
        }
      }

      // Candidate Profile Dropdown Toggle
      const candLogoBtn = document.getElementById("dom-candidate-logo-btn");
      const candDropdown = document.getElementById("dom-candidate-dropdown");
      candLogoBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        candDropdown.classList.toggle("open");
      });
      document.addEventListener("click", function(e) {
        if (!e.target.closest("#cbt-candidate-menu-wrapper")) {
          candDropdown.classList.remove("open");
        }
      });

      // 4. Topic & Classification Builders
      let currentTopic = "";
      let currentCategory = "";
      let examQuestions = [];
      let currentIdx = 0;
      let userAnswers = {};
      let timerRef = null;
      let timeLeft = 1800;

      function renderTopics() {
        const grid = document.getElementById("dom-win2-topics");
        grid.innerHTML = "";
        storeTopics.forEach(topic => {
          const card = document.createElement("div");
          card.className = "cbt-selection-card";
          card.innerText = topic;
          card.onclick = () => {
            currentTopic = topic;
            document.getElementById("win3-topic-heading").innerText = topic;
            renderCategories();
            showView("win-3");
          };
          grid.appendChild(card);
        });
      }

      function renderCategories() {
        const catGrid = document.getElementById("dom-win3-paper-types");
        const setGrid = document.getElementById("dom-win3-practice-sets");
        catGrid.innerHTML = "";
        setGrid.innerHTML = "";

        storePaperTypes.forEach(category => {
          const card = document.createElement("div");
          card.className = "cbt-selection-card";
          card.innerText = category;
          card.onclick = () => startExam(category);
          catGrid.appendChild(card);
        });

        storeSets.forEach(set => {
          const card = document.createElement("div");
          card.className = "cbt-selection-card";
          card.innerText = set;
          card.onclick = () => startExam(set);
          setGrid.appendChild(card);
        });
      }

      // 5. Examination Execution Engine
      function startExam(category) {
        currentCategory = category;
        examQuestions = storeQuestions.filter(q => 
          q.topic.trim().toLowerCase() === currentTopic.trim().toLowerCase() &&
          q.category.trim().toLowerCase() === currentCategory.trim().toLowerCase()
        );

        if (examQuestions.length === 0) {
          showModal("Module Empty", "No questions currently registered for " + currentTopic + " [" + currentCategory + "].");
          return;
        }

        currentIdx = 0;
        userAnswers = {};
        timeLeft = 1800;
        document.getElementById("win4-banner").innerText = currentTopic + " — " + currentCategory;

        showView("win-4");
        renderExamQuestion();
        renderPalette();
        startTimer();
      }

      function renderExamQuestion() {
        const q = examQuestions[currentIdx];
        document.getElementById("win4-counter").innerText = `Question ${currentIdx + 1} of ${examQuestions.length}`;
        const container = document.getElementById("dom-test-container");

        let html = `<div style="font-size: 17px; font-weight: 700; margin-bottom: 16px; line-height: 1.4;">Q${currentIdx + 1}. ${q.text}</div>`;
        
        for (let i = 0; i < q.options.length; i++) {
          const isSelected = userAnswers[currentIdx] === i;
          const checkedAttr = isSelected ? "checked" : "";
          const activeClass = isSelected ? "selected-opt" : "";
          html += `
            <label class="cbt-opt-label ${activeClass}">
              <input type="radio" name="cbt_option" value="${i}" ${checkedAttr} />
              <span><b>${String.fromCharCode(65 + i)}.</b> ${q.options[i]}</span>
            </label>
          `;
        }
        container.innerHTML = html;

        container.querySelectorAll('input[name="cbt_option"]').forEach(radio => {
          radio.onchange = function(e) {
            container.querySelectorAll('.cbt-opt-label').forEach(lbl => lbl.classList.remove('selected-opt'));
            e.target.closest('.cbt-opt-label').classList.add('selected-opt');
            userAnswers[currentIdx] = parseInt(e.target.value, 10);
            renderPalette();
          };
        });

        const prevBtn = document.getElementById("btn-prev-q");
        if (currentIdx === 0) {
          prevBtn.style.opacity = "0.5";
          prevBtn.style.cursor = "not-allowed";
        } else {
          prevBtn.style.opacity = "1";
          prevBtn.style.cursor = "pointer";
        }

        renderPalette();
      }

      function renderPalette() {
        const palette = document.getElementById("dom-palette-grid");
        palette.innerHTML = "";
        examQuestions.forEach((_, idx) => {
          const btn = document.createElement("button");
          const isAttempted = userAnswers.hasOwnProperty(idx);
          btn.className = "palette-btn " + (isAttempted ? "bg-attempted" : "bg-unattempted");
          if (idx === currentIdx) {
            btn.classList.add("current-q");
          }
          btn.innerText = idx + 1;
          btn.onclick = () => {
            currentIdx = idx;
            renderExamQuestion();
          };
          palette.appendChild(btn);
        });
      }

      function startTimer() {
        clearInterval(timerRef);
        updateTimerDisplay();
        timerRef = setInterval(() => {
          timeLeft--;
          updateTimerDisplay();
          if (timeLeft <= 0) {
            clearInterval(timerRef);
            finishExam();
          }
        }, 1000);
      }

      function updateTimerDisplay() {
        const m = Math.floor(Math.max(0, timeLeft) / 60);
        const s = Math.max(0, timeLeft) % 60;
        document.getElementById("win4-clock").innerText = 
          (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      }

      function finishExam() {
        clearInterval(timerRef);
        timerRef = null;
        let score = 0;
        examQuestions.forEach((q, idx) => {
          if (userAnswers[idx] === q.correct) score++;
        });

        const pct = Math.round((score / examQuestions.length) * 100);
        document.getElementById("dom-result-stats").innerHTML = `
          <div style="font-size: 42px; font-weight: 800; color: #2563eb; margin-bottom: 6px;">${score} / ${examQuestions.length}</div>
          <div style="font-size: 16px; font-weight: 700; color: #475569;">Performance Score: ${pct}%</div>
        `;
        showView("win-result");
      }

      // Terminal Actions
      document.getElementById("btn-clear-choice").onclick = () => {
        if (userAnswers.hasOwnProperty(currentIdx)) {
          delete userAnswers[currentIdx];
          renderExamQuestion();
        }
      };

      document.getElementById("btn-prev-q").onclick = () => {
        if (currentIdx > 0) {
          currentIdx--;
          renderExamQuestion();
        }
      };

      document.getElementById("btn-save-next").onclick = () => {
        if (currentIdx < examQuestions.length - 1) {
          currentIdx++;
          renderExamQuestion();
        } else {
          showModal("Final Question Reached", "You have reached the end of the test. Submit when ready.");
        }
      };

      document.getElementById("btn-submit-exam").onclick = () => {
        const answeredCount = Object.keys(userAnswers).length;
        const total = examQuestions.length;
        showModal(
          "Submit Examination", 
          `You have answered ${answeredCount} of ${total} questions. Finalize submission?`, 
          finishExam
        );
      };

      document.getElementById("btn-view-solutions").onclick = () => {
        const container = document.getElementById("dom-solutions-container");
        container.innerHTML = "";
        examQuestions.forEach((q, idx) => {
          const isUserCorrect = userAnswers[idx] === q.correct;
          const userSelectedText = userAnswers.hasOwnProperty(idx) ? q.options[userAnswers[idx]] : "Not Answered";
          const card = document.createElement("div");
          card.className = "solution-card";
          card.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 6px; font-size: 15px;">Q${idx + 1}. ${q.text}</div>
            <div style="font-size: 13px; margin-bottom: 4px; color: ${isUserCorrect ? '#10b981' : '#ef4444'}; font-weight: 600;">
              Your Answer: ${userSelectedText} (${isUserCorrect ? 'Correct' : 'Incorrect'})
            </div>
            <div style="color: #10b981; font-weight: 600; font-size: 13px; margin-bottom: 6px;">Correct Answer: ${q.options[q.correct]}</div>
            <div style="font-size: 13px; color: #475569; background: #f8fafc; padding: 8px 10px; border-radius: 4px;">
              <b>Explanation:</b> ${q.solution || "Standard reference item."}
            </div>
          `;
          container.appendChild(card);
        });
        showView("win-solutions");
      };

      document.getElementById("btn-restart-flow").onclick = () => {
        examQuestions = [];
        userAnswers = {};
        renderTopics();
        showView("win-2");
      };

      // 6. Authentication & Registration Controller
      document.getElementById("btn-action-login").onclick = () => {
        const u = document.getElementById("login-username").value.trim();
        const p = document.getElementById("login-password").value.trim();
        const found = registeredUsers.find(x => x.username.toLowerCase() === u.toLowerCase() && x.password === p);
        
        if (!found) {
          showModal("Authentication Failed", "Invalid credentials provided. Enter demo / 1234 or complete registration.");
          return;
        }

        activeUser = found;
        syncStorage();
        updateNavState();
        renderTopics();
        showView("win-2");
      };

      document.getElementById("btn-drop-logout").onclick = () => {
        activeUser = null;
        syncStorage();
        updateNavState();
        showView("win-1");
      };

      document.getElementById("btn-open-payment").onclick = () => {
        document.getElementById("pay-step-1").style.display = "block";
        document.getElementById("pay-step-2").style.display = "none";
        document.getElementById("pay-step-3").style.display = "none";
        showView("win-register");
      };

      document.getElementById("link-back-login").onclick = () => showView("win-1");
      document.getElementById("link-back-topics").onclick = () => showView("win-2");
      document.getElementById("link-back-result").onclick = () => showView("win-result");

      document.getElementById("btn-mock-pay").onclick = () => {
        document.getElementById("pay-step-1").style.display = "none";
        document.getElementById("pay-step-2").style.display = "block";
      };

      document.getElementById("btn-send-otp").onclick = () => {
        const mob = document.getElementById("reg-mobile").value.trim();
        if (!/^\d{10}$/.test(mob)) {
          showModal("Invalid Input", "Please enter a valid 10-digit mobile number.");
          return;
        }
        showModal("Verification Gateway", "Your authentication OTP is: 1234", () => {
          document.getElementById("pay-step-2").style.display = "none";
          document.getElementById("pay-step-3").style.display = "block";
        });
      };

      document.getElementById("btn-complete-reg").onclick = () => {
        const enteredOtp = document.getElementById("reg-otp").value.trim();
        const u = document.getElementById("reg-username").value.trim();
        const p = document.getElementById("reg-password").value.trim();

        if (enteredOtp !== "1234") {
          showModal("Validation Error", "Invalid verification code.");
          return;
        }
        if (!u || !p) {
          showModal("Validation Error", "All fields are required.");
          return;
        }
        if (registeredUsers.some(x => x.username.toLowerCase() === u.toLowerCase())) {
          showModal("Account Conflict", "This username is already registered. Choose another.");
          return;
        }

        registeredUsers.push({ username: u, password: p });
        syncStorage();
        showModal("Registration Complete", "Account generated successfully. Please log in.", () => {
          document.getElementById("login-username").value = u;
          document.getElementById("login-password").value = "";
          showView("win-1");
        });
      };

      // 7. Administrative Controller & Tab Engine
      document.getElementById("btn-open-admin").onclick = () => showView("win-admin-auth");
      document.getElementById("link-admin-back-login").onclick = () => showView("win-1");

      document.getElementById("btn-admin-verify").onclick = () => {
        const val = document.getElementById("admin-pass-input").value.trim();
        if (val === "1234") {
          isAdminAuthenticated = true;
          syncStorage();
          document.getElementById("admin-pass-input").value = "";
          renderAdminDash();
          showView("win-admin-dash");
        } else {
          showModal("Access Denied", "Incorrect Master PIN.");
        }
      };

      document.getElementById("btn-admin-exit").onclick = () => {
        isAdminAuthenticated = false;
        syncStorage();
        showView("win-1");
      };

      // Tab Delegation Engine
      document.querySelectorAll(".cbt-tab-btn").forEach(btn => {
        btn.onclick = function() {
          document.querySelectorAll(".cbt-tab-btn").forEach(b => b.classList.remove("active"));
          document.querySelectorAll(".cbt-pane").forEach(p => p.classList.remove("active"));
          
          this.classList.add("active");
          const targetPaneId = this.getAttribute("data-pane");
          const targetPane = document.getElementById(targetPaneId);
          if (targetPane) targetPane.classList.add("active");
        };
      });

      function renderAdminDash() {
        const chipsContainer = document.getElementById("dom-adm-topic-chips");
        chipsContainer.innerHTML = "";
        storeTopics.forEach(topic => {
          const chip = document.createElement("span");
          chip.className = "cbt-item-chip";
          chip.innerText = topic;
          chipsContainer.appendChild(chip);
        });

        const qListContainer = document.getElementById("dom-table-q-list");
        document.getElementById("dom-q-pool-count").innerText = `${storeQuestions.length} Questions`;
        qListContainer.innerHTML = "";
        
        storeQuestions.forEach((q, idx) => {
          const row = document.createElement("div");
          row.style.padding = "10px 0";
          row.style.borderBottom = "1px solid #e2e8f0";
          row.style.fontSize = "13px";
          row.style.lineHeight = "1.4";
          row.innerHTML = `
            <div style="font-weight: 700; color: #2563eb; margin-bottom: 2px;">
              #${idx + 1} [${q.topic}] <span style="color: #64748b;">(${q.category})</span>
            </div>
            <div style="color: #0f172a; margin-bottom: 2px;">${q.text}</div>
            <div style="color: #10b981; font-weight: 600;">Correct: ${q.options[q.correct]}</div>
          `;
          qListContainer.appendChild(row);
        });
      }

      document.getElementById("btn-adm-add-topic").onclick = () => {
        const input = document.getElementById("adm-add-topic");
        const newTopic = input.value.trim();
        if (!newTopic) return;
        
        if (storeTopics.some(t => t.toLowerCase() === newTopic.toLowerCase())) {
          showModal("Duplicate Module", "This topic is already configured in the system.");
          return;
        }

        storeTopics.push(newTopic);
        syncStorage();
        renderAdminDash();
        renderTopics();
        input.value = "";
      };

      // 8. Bootstrap Runtime Execution
      updateNavState();
      if (isAdminAuthenticated) {
        renderAdminDash();
        showView("win-admin-dash");
      } else if (activeUser) {
        renderTopics();
        showView("win-2");
      } else {
        showView("win-1");
      }
    })();
  </script>
</body>
</html>
