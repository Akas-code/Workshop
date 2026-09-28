<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Akash Workshop | Online Examination Portal</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html, body { width: 100%; min-height: 100vh; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #0f172a; }
    
    /* Top Navigation */
    .cbt-nav { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 12px 18px; color: #ffffff; flex-wrap: wrap; gap: 10px; }
    .cbt-logo-area { display: flex; align-items: center; gap: 8px; }
    .cbt-logo-badge { background: #2563eb; color: white; font-weight: 800; padding: 5px 8px; border-radius: 6px; font-size: 13px; }
    .cbt-brand-name { font-size: 16px; font-weight: 700; color: #f8fafc; }
    .cbt-nav-actions { display: flex; gap: 8px; align-items: center; }
    .cbt-btn-pay { background: #10b981; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; }
    .cbt-btn-admin-nav { background: #475569; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; }
    
    /* User Dropdown */
    .cbt-profile-menu-container { position: relative; display: none; }
    .cbt-candidate-badge-logo { background: #2563eb; color: #ffffff; font-weight: 800; font-size: 12px; padding: 6px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; border: 1px solid rgba(255,255,255,0.2); }
    .cbt-profile-dropdown { display: none; position: absolute; right: 0; top: 100%; width: 200px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); padding: 14px; color: #1e293b; z-index: 2000; }
    .cbt-profile-menu-container:hover .cbt-profile-dropdown { display: block; }
    
    /* Views */
    .cbt-view { display: none; padding: 22px; max-width: 860px; margin: 18px auto; width: 94%; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; }
    
    /* Full-Screen Exam Room */
    #win-4 { width: 100%; height: 100vh; position: fixed; inset: 0; z-index: 99999; background: #ffffff; margin: 0; padding: 0; border: none; border-radius: 0; }
    .test-fullscreen-body { display: flex; flex: 1; overflow: hidden; height: calc(100vh - 52px); }
    .test-main-area { flex: 1; padding: 22px; overflow-y: auto; border-right: 2px solid #e2e8f0; display: flex; flex-direction: column; }
    .test-sidebar { width: 300px; background: #ffffff; padding: 16px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; }
    
    /* Typography & Controls */
    .cbt-h1 { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 6px; color: #0f172a; }
    .cbt-h2 { font-size: 14px; color: #64748b; text-align: center; margin-bottom: 18px; }
    .cbt-field { width: 100%; padding: 11px 12px; margin-bottom: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; }
    .cbt-field:focus { border-color: #2563eb; }
    .cbt-btn-primary { width: 100%; padding: 11px 14px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer; text-align: center; }
    .cbt-btn-primary:hover { background: #1d4ed8; }
    .cbt-btn-secondary { width: 100%; padding: 11px 14px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; text-align: center; }
    
    /* Cards and Grids */
    .cbt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }
    .cbt-selection-card { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 18px 12px; text-align: center; cursor: pointer; font-weight: 700; font-size: 15px; color: #1e293b; transition: all 0.2s ease; }
    .cbt-selection-card:hover { background: #eff6ff; border-color: #2563eb; color: #1d4ed8; transform: translateY(-2px); }
    
    /* Option Selection */
    .cbt-opt-label { display: flex; align-items: center; padding: 14px 16px; margin-bottom: 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 500; color: #0f172a; line-height: 1.5; background: #ffffff; }
    .cbt-opt-label:hover { background: #f1f5f9; border-color: #94a3b8; }
    .cbt-opt-label input[type="radio"] { margin-right: 14px; width: 18px; height: 18px; accent-color: #2563eb; cursor: pointer; }
    .cbt-opt-label.selected-opt { background: #eff6ff; border-color: #2563eb; font-weight: 600; }
    
    /* Question Palette */
    .palette-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
    .palette-btn { padding: 9px 0; border: none; border-radius: 4px; font-weight: 700; color: white; cursor: pointer; font-size: 12px; text-align: center; }
    .bg-attempted { background-color: #10b981; }
    .bg-unattempted { background-color: #8b5cf6; }
    
    /* Tabs & Details */
    .cbt-tabs { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px; overflow-x: auto; gap: 6px; }
    .cbt-tab-btn { padding: 9px 12px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; white-space: nowrap; font-size: 13px; }
    .cbt-tab-btn.active { color: #2563eb; border-bottom: 2px solid #2563eb; }
    .cbt-pane { display: none; }
    .cbt-pane.active { display: block; }
    .cbt-item-chip { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 20px; margin: 3px; font-size: 12px; }
    .cbt-link-back { color: #2563eb; font-size: 13px; font-weight: 600; cursor: pointer; margin-bottom: 14px; display: inline-block; }
    .solution-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; background: #fff; }
    
    /* Modal Alerts */
    .cbt-modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); z-index: 999999; justify-content: center; align-items: center; padding: 16px; }
    .cbt-modal-box { background: #ffffff; width: 100%; max-width: 420px; border-radius: 8px; padding: 20px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1); }
    
    @media(max-width: 768px) {
      .test-fullscreen-body { flex-direction: column; overflow-y: auto; height: auto; }
      .test-sidebar { width: 100%; }
      .cbt-view { width: 96%; padding: 16px; }
    }
  </style>
</head>
<body>

  <!-- Top Global Navigation -->
  <div class="cbt-nav" id="dom-main-navbar">
    <div class="cbt-logo-area">
      <span class="cbt-logo-badge">AW</span>
      <span class="cbt-brand-name">Akash Workshop</span>
    </div>
    <div class="cbt-nav-actions">
      <button class="cbt-btn-pay" id="btn-open-payment">Payment &amp; Register</button>
      <button class="cbt-btn-admin-nav" id="btn-open-admin">Admin Portal</button>
      <div class="cbt-profile-menu-container" id="cbt-candidate-menu-wrapper">
        <div class="cbt-candidate-badge-logo" id="dom-candidate-logo-btn">
          <span id="dom-cand-logo-text">&#127891; Candidate</span>
        </div>
        <div class="cbt-profile-dropdown">
          <div style="font-weight:800; margin-bottom:8px;" id="drop-display-username">Candidate</div>
          <button class="cbt-btn-secondary" id="btn-drop-logout">Logout</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Window 1: Login (Guaranteed visible by default) -->
  <div id="win-1" class="cbt-view" style="display: block;">
    <div class="cbt-h1">Candidate Examination Login</div>
    <div class="cbt-h2">Registration is required to login (Default demo credentials available below)</div>
    <input type="text" id="login-username" class="cbt-field" placeholder="Candidate Username" value="demo" />
    <input type="password" id="login-password" class="cbt-field" placeholder="Candidate Password" value="1234" />
    <button class="cbt-btn-primary" id="btn-action-login">Login to Portal</button>
    <div style="text-align:center; margin-top:14px; font-size:13px; color:#64748b;">
      Click "Payment &amp; Register" top right to create a new student account.
    </div>
  </div>

  <!-- Window Register -->
  <div id="win-register" class="cbt-view">
    <span class="cbt-link-back" id="link-back-login">&larr; Back to Login</span>
    <div id="pay-step-1">
      <div class="cbt-h1">Registration Fee</div>
      <div class="cbt-h2">Standard Fee: ₹ <span>99.00</span></div>
      <button class="cbt-btn-primary" id="btn-mock-pay">Pay &amp; Continue</button>
    </div>
    <div id="pay-step-2" style="display:none;">
      <input type="text" id="reg-mobile" class="cbt-field" placeholder="10 Digit Mobile Number" />
      <button class="cbt-btn-primary" id="btn-send-otp">Send OTP</button>
    </div>
    <div id="pay-step-3" style="display:none;">
      <input type="text" id="reg-otp" class="cbt-field" placeholder="Enter Received OTP" />
      <input type="text" id="reg-username" class="cbt-field" placeholder="Choose Unique Username" />
      <input type="password" id="reg-password" class="cbt-field" placeholder="Create Secret Password" />
      <button class="cbt-btn-primary" id="btn-complete-reg">Create Account</button>
    </div>
  </div>

  <!-- Window 2: Topic Selection (Dashboard) -->
  <div id="win-2" class="cbt-view">
    <div class="cbt-h1">Welcome, start your practice</div>
    <div class="cbt-h2">Select Your Topic to Begin</div>
    <div class="cbt-grid" id="dom-win2-topics"></div>
  </div>

  <!-- Window 3: Categories & Sets -->
  <div id="win-3" class="cbt-view">
    <span class="cbt-link-back" id="link-back-topics">&larr; Back to Topics</span>
    <div class="cbt-h1" id="win3-topic-heading">Topic</div>
    <div style="font-weight:700; margin:14px 0 8px 0;">Categories:</div>
    <div class="cbt-grid" id="dom-win3-paper-types"></div>
    <div style="font-weight:700; margin:14px 0 8px 0;">Practice Sets:</div>
    <div class="cbt-grid" id="dom-win3-practice-sets"></div>
  </div>

  <!-- Window 4: Exam Terminal -->
  <div id="win-4" class="cbt-view">
    <div style="display:flex; justify-content:space-between; align-items:center; background:#0f172a; color:#fff; padding:10px 18px;">
      <span style="font-weight:700;" id="win4-banner">Exam Terminal</span>
      <span style="font-size:18px; font-weight:800; color:#ef4444;" id="win4-clock">30:00</span>
    </div>
    <div class="test-fullscreen-body">
      <div class="test-main-area">
        <span style="font-weight:700; color:#64748b;" id="win4-counter">Question 1</span>
        <div id="dom-test-container" style="margin-top:14px; flex:1;"></div>
        <div style="display:flex; gap:10px; margin-top:16px;">
          <button class="cbt-btn-primary" id="btn-save-next" style="width:auto; padding:10px 22px;">Save &amp; Next</button>
          <button class="cbt-btn-primary" id="btn-submit-exam" style="width:auto; padding:10px 22px; background:#dc2626; margin-left:auto;">Submit Exam</button>
        </div>
      </div>
      <div class="test-sidebar">
        <div style="font-weight:700;">Question Palette</div>
        <div class="palette-grid" id="dom-palette-grid"></div>
      </div>
    </div>
  </div>

  <!-- Window Result -->
  <div id="win-result" class="cbt-view">
    <div class="cbt-h1">Examination Result</div>
    <div id="dom-result-stats" style="text-align:center; margin:18px 0;"></div>
    <div style="display:flex; gap:10px; justify-content:center;">
      <button class="cbt-btn-primary" id="btn-view-solutions">View Detailed Solutions</button>
      <button class="cbt-btn-secondary" id="btn-restart-flow">Back to Topics</button>
    </div>
  </div>

  <!-- Window Solutions -->
  <div id="win-solutions" class="cbt-view">
    <span class="cbt-link-back" id="link-back-result">&larr; Back to Result</span>
    <div class="cbt-h1">Test Solutions &amp; Explanations</div>
    <div id="dom-solutions-container" style="margin-top:14px;"></div>
  </div>

  <!-- Admin Auth -->
  <div id="win-admin-auth" class="cbt-view">
    <span class="cbt-link-back" id="link-admin-back-login">&larr; Back</span>
    <div class="cbt-h1">Admin PIN</div>
    <input type="password" id="admin-pass-input" class="cbt-field" placeholder="Enter PIN (Default: 1234)" />
    <button class="cbt-btn-primary" id="btn-admin-verify">Unlock</button>
  </div>

  <!-- Admin Dashboard -->
  <div id="win-admin-dash" class="cbt-view">
    <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
      <span style="font-weight:700; font-size:16px;">Admin Center</span>
      <button class="cbt-btn-secondary" id="btn-admin-exit" style="width:auto; padding:6px 12px; background:#ef4444; color:#fff;">Logout Admin</button>
    </div>
    <div class="cbt-tabs">
      <button class="cbt-tab-btn active" data-pane="pane-w2">Topics</button>
      <button class="cbt-tab-btn" data-pane="pane-w4-questions">Questions Bank</button>
    </div>
    <div id="pane-w2" class="cbt-pane active">
      <input type="text" id="adm-add-topic" class="cbt-field" placeholder="New Topic Name" />
      <button class="cbt-btn-primary" id="btn-adm-add-topic">Add Topic</button>
      <div id="dom-adm-topic-chips" style="margin-top:14px;"></div>
    </div>
    <div id="pane-w4-questions" class="cbt-pane">
      <div style="font-weight:700; margin-bottom:8px;">Questions Pool:</div>
      <div style="max-height:360px; overflow-y:auto;" id="dom-table-q-list"></div>
    </div>
  </div>

  <!-- Modal Dialog -->
  <div id="dom-cbt-modal" class="cbt-modal-backdrop">
    <div class="cbt-modal-box">
      <div style="font-weight:800; font-size:16px; margin-bottom:8px;" id="cbt-modal-heading">Alert</div>
      <div style="font-size:14px; margin-bottom:16px; line-height:1.5;" id="cbt-modal-body">Message</div>
      <button class="cbt-btn-primary" id="cbt-modal-ok">OK</button>
    </div>
  </div>

  <!-- JavaScript Engine -->
  <script>
    (function () {
      // 1. CLEAR OLD CORRUPTED LOCAL STORAGE CACHE AUTOMATICALLY
      try {
        const cacheVersion = "v3_stable_clean";
        if (localStorage.getItem("app_ver") !== cacheVersion) {
          localStorage.clear();
          localStorage.setItem("app_ver", cacheVersion);
        }
      } catch (e) {
        console.warn("Storage restricted", e);
      }

      // 2. DATA REGISTRY
      const defaultTopics = ["William Shakespeare", "William Wordsworth", "John Milton", "John Galsworthy", "Literary Terms"];
      const defaultPaperTypes = ["PYQS", "Lines", "Most Probable", "NET JRF"];
      const defaultSets = ["Practice Set 01", "Practice Set 02", "Practice Set 03", "Practice Set 04"];

      const defaultQuestions = [
        { topic: "William Shakespeare", category: "PYQS", text: "In which year was the First Folio published?", options: ["1616", "1623", "1632", "1609"], correct: 1, solution: "Published in 1623." },
        { topic: "William Shakespeare", category: "Lines", text: "'Life is but a walking shadow...' occurs in:", options: ["Hamlet", "Othello", "Macbeth", "King Lear"], correct: 2, solution: "Spoken by Macbeth in Act 5." },
        { topic: "William Wordsworth", category: "PYQS", text: "The Prelude was published in:", options: ["1798", "1805", "1850", "1832"], correct: 2, solution: "Published posthumously in 1850." },
        { topic: "John Galsworthy", category: "PYQS", text: "In The Fugitive, how are the temperaments of Clare and George contrasted?", options: ["Clare is practical while George is romantic", "Clare is poetic while George is prosaic", "Clare is ambitious while George is indifferent", "Clare is uneducated while George is scholarly"], correct: 1, solution: "Clare is poetic while George is prosaic." },
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
        { topic: "John Galsworthy", category: "Lines", text: "The law is what it is—a majestic edifice, sheltering all of us... appears in:", options: ["The Roof", "The Skin Game", "Windows", "Justice"], correct: 3, solution: "Spoken by the Judge in Justice." },
        { topic: "John Galsworthy", category: "Lines", text: "We all cut each other's throats from the best of motives appears in:", options: ["Loyalties", "The Skin Game", "The Eldest Son", "None of these"], correct: 0, solution: "Spoken by Margaret Orme in Loyalties." },
        { topic: "John Galsworthy", category: "Lines", text: "Literature is its own reward. Who said?", options: ["Shaw", "Ibsen", "Wordsworth", "Galsworthy"], correct: 3, solution: "John Galsworthy." },
        { topic: "John Galsworthy", category: "Lines", text: "Justice is a machine that, when someone has once given it the starting push, rolls on of itself. Appears in:", options: ["The Skin Game", "The Mob", "Justice", "None of these"], correct: 2, solution: "Spoken by Cokeson in Justice." },
        { topic: "John Galsworthy", category: "Lines", text: "Masters are masters, men are men! Yield one demand and they will make it six... Who is the speaker?", options: ["Anthony in Strife", "Roberts in Strife", "Harness", "Falder"], correct: 0, solution: "John Anthony in Strife." },
        { topic: "John Galsworthy", category: "Lines", text: "No one will touch him now! Never again! He is safe with gentle Jesus! Who says?", options: ["Falder", "Cokeson about Falder", "Ruth", "None of these"], correct: 1, solution: "Cokeson in Justice." }
      ];

      let storeTopics = defaultTopics;
      let storePaperTypes = defaultPaperTypes;
      let storeSets = defaultSets;
      let storeQuestions = defaultQuestions;
      let registeredUsers = [{ username: "demo", password: "1234" }];
      let activeUser = null;

      function showView(viewId) {
        const views = document.querySelectorAll(".cbt-view");
        views.forEach(v => {
          v.style.display = "none";
        });
        const target = document.getElementById(viewId);
        if (target) {
          target.style.display = (viewId === "win-4") ? "flex" : "block";
        }
        const nav = document.getElementById("dom-main-navbar");
        if (nav) nav.style.display = (viewId === "win-4") ? "none" : "flex";
      }

      function showModal(title, msg, callback) {
        document.getElementById("cbt-modal-heading").innerText = title;
        document.getElementById("cbt-modal-body").innerText = msg;
        const modal = document.getElementById("dom-cbt-modal");
        modal.style.display = "flex";
        document.getElementById("cbt-modal-ok").onclick = function() {
          modal.style.display = "none";
          if (callback) callback();
        };
      }

      function updateNav() {
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
          btnPay.style.display = "inline-block";
          btnAdmin.style.display = "inline-block";
          userMenu.style.display = "none";
        }
      }

      function renderTopics() {
        const grid = document.getElementById("dom-win2-topics");
        grid.innerHTML = "";
        storeTopics.forEach(t => {
          const card = document.createElement("div");
          card.className = "cbt-selection-card";
          card.innerText = t;
          card.onclick = () => {
            currentTopic = t;
            document.getElementById("win3-topic-heading").innerText = t;
            renderCategories();
            showView("win-3");
          };
          grid.appendChild(card);
        });
      }

      let currentTopic = "";
      let currentCategory = "";
      let examQuestions = [];
      let currentIdx = 0;
      let userAnswers = {};
      let timerRef = null;
      let timeLeft = 1800;

      function renderCategories() {
        const catGrid = document.getElementById("dom-win3-paper-types");
        const setGrid = document.getElementById("dom-win3-practice-sets");
        catGrid.innerHTML = "";
        setGrid.innerHTML = "";

        storePaperTypes.forEach(c => {
          const card = document.createElement("div");
          card.className = "cbt-selection-card";
          card.innerText = c;
          card.onclick = () => startExam(c);
          catGrid.appendChild(card);
        });

        storeSets.forEach(s => {
          const card = document.createElement("div");
          card.className = "cbt-selection-card";
          card.innerText = s;
          card.onclick = () => startExam(s);
          setGrid.appendChild(card);
        });
      }

      function startExam(cat) {
        currentCategory = cat;
        examQuestions = storeQuestions.filter(q => 
          q.topic.trim().toLowerCase() === currentTopic.trim().toLowerCase() &&
          q.category.trim().toLowerCase() === currentCategory.trim().toLowerCase()
        );

        if (examQuestions.length === 0) {
          showModal("No Questions", "No questions available in " + currentTopic + " (" + currentCategory + ").");
          return;
        }

        currentIdx = 0;
        userAnswers = {};
        timeLeft = 1800;
        document.getElementById("win4-banner").innerText = currentTopic + " - " + currentCategory;

        showView("win-4");
        renderExamQ();
        renderPalette();
        startTimer();
      }

      function renderExamQ() {
        const q = examQuestions[currentIdx];
        document.getElementById("win4-counter").innerText = "Question " + (currentIdx + 1) + " of " + examQuestions.length;
        const box = document.getElementById("dom-test-container");
        let html = '<div style="font-size:17px; font-weight:700; margin-bottom:14px;">Q' + (currentIdx + 1) + '. ' + q.text + '</div>';
        for (let i = 0; i < q.options.length; i++) {
          const checked = userAnswers[currentIdx] === i ? "checked" : "";
          const selClass = userAnswers[currentIdx] === i ? "selected-opt" : "";
          html += '<label class="cbt-opt-label ' + selClass + '">' +
            '<input type="radio" name="opt" value="' + i + '" ' + checked + ' />' +
            '<span><b>' + String.fromCharCode(65 + i) + '.</b> ' + q.options[i] + '</span>' +
          '</label>';
        }
        box.innerHTML = html;

        box.querySelectorAll('input[name="opt"]').forEach(r => {
          r.onchange = function(e) {
            box.querySelectorAll('.cbt-opt-label').forEach(l => l.classList.remove('selected-opt'));
            e.target.closest('.cbt-opt-label').classList.add('selected-opt');
            userAnswers[currentIdx] = parseInt(e.target.value, 10);
            renderPalette();
          };
        });
      }

      function renderPalette() {
        const p = document.getElementById("dom-palette-grid");
        p.innerHTML = "";
        examQuestions.forEach((_, idx) => {
          const btn = document.createElement("button");
          btn.className = "palette-btn " + (userAnswers.hasOwnProperty(idx) ? "bg-attempted" : "bg-unattempted");
          btn.innerText = idx + 1;
          btn.onclick = () => {
            currentIdx = idx;
            renderExamQ();
          };
          p.appendChild(btn);
        });
      }

      function startTimer() {
        clearInterval(timerRef);
        timerRef = setInterval(() => {
          const m = Math.floor(timeLeft / 60);
          const s = timeLeft % 60;
          document.getElementById("win4-clock").innerText = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
          if (timeLeft <= 0) {
            clearInterval(timerRef);
            finishExam();
          }
          timeLeft--;
        }, 1000);
      }

      function finishExam() {
        clearInterval(timerRef);
        let score = 0;
        examQuestions.forEach((q, idx) => {
          if (userAnswers[idx] === q.correct) score++;
        });
        document.getElementById("dom-result-stats").innerHTML =
          '<div style="font-size:36px; font-weight:800; color:#2563eb; margin-bottom:8px;">' + score + ' / ' + examQuestions.length + '</div>' +
          '<div style="font-size:16px; font-weight:700;">Score: ' + Math.round((score / examQuestions.length) * 100) + '%</div>';
        showView("win-result");
      }

      // UI Click Handlers
      document.getElementById("btn-action-login").onclick = function() {
        const u = document.getElementById("login-username").value.trim();
        const p = document.getElementById("login-password").value.trim();
        const found = registeredUsers.find(x => x.username.toLowerCase() === u.toLowerCase() && x.password === p);
        if (!found) {
          showModal("Login Failed", "Invalid credentials. Use demo / 1234");
          return;
        }
        activeUser = found;
        updateNav();
        renderTopics();
        showView("win-2");
      };

      document.getElementById("btn-open-payment").onclick = () => showView("win-register");
      document.getElementById("link-back-login").onclick = () => showView("win-1");
      document.getElementById("link-back-topics").onclick = () => showView("win-2");
      document.getElementById("btn-restart-flow").onclick = () => showView("win-2");
      document.getElementById("link-back-result").onclick = () => showView("win-result");

      document.getElementById("btn-mock-pay").onclick = function() {
        document.getElementById("pay-step-1").style.display = "none";
        document.getElementById("pay-step-2").style.display = "block";
      };

      document.getElementById("btn-send-otp").onclick = function() {
        const mob = document.getElementById("reg-mobile").value.trim();
        if (mob.length !== 10) {
          showModal("Error", "Enter valid 10-digit number.");
          return;
        }
        showModal("OTP Sent", "Your Registration OTP is: 1234", () => {
          document.getElementById("pay-step-2").style.display = "none";
          document.getElementById("pay-step-3").style.display = "block";
        });
      };

      document.getElementById("btn-complete-reg").onclick = function() {
        const entered = document.getElementById("reg-otp").value.trim();
        const u = document.getElementById("reg-username").value.trim();
        const p = document.getElementById("reg-password").value.trim();
        if (entered !== "1234" || !u || !p) {
          showModal("Error", "Invalid OTP or missing fields.");
          return;
        }
        registeredUsers.push({ username: u, password: p });
        showModal("Success", "Account created successfully! Please login.", () => {
          showView("win-1");
        });
      };

      document.getElementById("btn-save-next").onclick = function() {
        if (currentIdx < examQuestions.length - 1) {
          currentIdx++;
          renderExamQ();
        } else {
          showModal("End of Test", "You are at the final question. Click Submit Exam.");
        }
      };

      document.getElementById("btn-submit-exam").onclick = function() {
        showModal("Submit Exam", "Are you sure you want to finalize your exam?", finishExam);
      };

      document.getElementById("btn-view-solutions").onclick = function() {
        const c = document.getElementById("dom-solutions-container");
        c.innerHTML = "";
        examQuestions.forEach((q, idx) => {
          const div = document.createElement("div");
          div.className = "solution-card";
          div.innerHTML =
            '<div style="font-weight:700; margin-bottom:6px;">Q' + (idx + 1) + '. ' + q.text + '</div>' +
            '<div style="color:#10b981; font-weight:600; margin-bottom:4px;">Correct Answer: ' + q.options[q.correct] + '</div>' +
            '<div style="font-size:13px; color:#475569;">Explanation: ' + (q.solution || "None") + '</div>';
          c.appendChild(div);
        });
        showView("win-solutions");
      };

      document.getElementById("btn-drop-logout").onclick = function() {
        activeUser = null;
        updateNav();
        showView("win-1");
      };

      document.getElementById("btn-open-admin").onclick = () => showView("win-admin-auth");
      document.getElementById("link-admin-back-login").onclick = () => showView("win-1");

      document.getElementById("btn-admin-verify").onclick = function() {
        const val = document.getElementById("admin-pass-input").value.trim();
        if (val === "1234") {
          renderAdminDash();
          showView("win-admin-dash");
        } else {
          showModal("Admin Error", "Incorrect PIN (Default: 1234).");
        }
      };

      document.getElementById("btn-admin-exit").onclick = () => showView("win-1");

      document.querySelectorAll(".cbt-tab-btn").forEach(btn => {
        btn.onclick = function() {
          document.querySelectorAll(".cbt-tab-btn").forEach(b => b.classList.remove("active"));
          document.querySelectorAll(".cbt-pane").forEach(p => p.classList.remove("active"));
          btn.classList.add("active");
          const paneId = btn.getAttribute("data-pane");
          const targetPane = document.getElementById(paneId);
          if (targetPane) targetPane.classList.add("active");
        };
      });

      function renderAdminDash() {
        const chips = document.getElementById("dom-adm-topic-chips");
        chips.innerHTML = "";
        storeTopics.forEach(t => {
          const chip = document.createElement("span");
          chip.className = "cbt-item-chip";
          chip.innerText = t;
          chips.appendChild(chip);
        });

        const list = document.getElementById("dom-table-q-list");
        list.innerHTML = "";
        storeQuestions.forEach(q => {
          const d = document.createElement("div");
          d.style.padding = "8px 0";
          d.style.borderBottom = "1px solid #f1f5f9";
          d.innerHTML = "<b>[" + q.topic + " - " + q.category + "]</b> " + q.text;
          list.appendChild(d);
        });
      }

      document.getElementById("btn-adm-add-topic").onclick = function() {
        const t = document.getElementById("adm-add-topic").value.trim();
        if (t && !storeTopics.includes(t)) {
          storeTopics.push(t);
          renderAdminDash();
          document.getElementById("adm-add-topic").value = "";
        }
      };

      // Bootstrap app view safely
      updateNav();
      showView("win-1");
    })();
  </script>
</body>
</html>
