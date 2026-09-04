(function () {
  // 1. SET FAVICON & TITLE
  document.title = "Akash Workshop | Online Test Portal";
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>";

  // 2. INJECT RESPONSIVE & FULLSCREEN CSS
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    #cbt-portal {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .cbt-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #0f172a;
      padding: 12px 24px;
      color: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .cbt-logo-area { display: flex; align-items: center; gap: 12px; }
    .cbt-logo-badge {
      background: #2563eb;
      color: white;
      font-weight: 800;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 14px;
      letter-spacing: 0.5px;
    }
    .cbt-brand-name { font-size: 18px; font-weight: 700; color: #f8fafc; }
    .cbt-nav-actions { display: flex; gap: 10px; align-items: center; }
    .cbt-btn-pay {
      background: #10b981;
      color: #fff;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
    }
    .cbt-btn-admin-direct {
      background: #475569;
      color: #fff;
      border: none;
      padding: 6px 14px;
      border-radius: 4px;
      font-size: 13px;
      cursor: pointer;
    }
    .cbt-candidate-tag {
      background: #2563eb;
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 99px;
      color: #fff;
      display: none;
    }
    .cbt-view { display: none; padding: 24px; max-width: 860px; margin: 20px auto; width: 100%; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; }
    .cbt-view.active { display: block; }
    
    /* FULL SCREEN TEST LAYOUT */
    #win-4.active {
      display: flex;
      flex-direction: column;
      max-width: 100% !important;
      width: 100% !important;
      height: calc(100vh - 60px) !important;
      margin: 0 !important;
      padding: 0 !important;
      border-radius: 0 !important;
      border: none !important;
    }
    .test-fullscreen-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }
    .test-main-area {
      flex: 1;
      padding: 24px 32px;
      overflow-y: auto;
      border-right: 2px solid #e2e8f0;
      display: flex;
      flex-direction: column;
    }
    .test-sidebar {
      width: 320px;
      background: #ffffff;
      padding: 18px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      overflow-y: auto;
    }
    .cbt-h1 { font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 6px; }
    .cbt-h2 { font-size: 14px; color: #64748b; text-align: center; margin-bottom: 20px; }
    .cbt-field {
      width: 100%;
      padding: 11px 13px;
      margin-bottom: 12px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      font-size: 14px;
      outline: none;
    }
    .cbt-field:focus { border-color: #2563eb; }
    .cbt-btn-primary {
      width: 100%;
      padding: 12px;
      background: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
    }
    .cbt-btn-primary:hover { background: #1d4ed8; }
    .cbt-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
      margin-bottom: 20px;
    }
    .cbt-selection-card {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 16px 12px;
      text-align: center;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
    }
    .cbt-selection-card:hover {
      background: #eff6ff;
      border-color: #3b82f6;
      color: #1d4ed8;
      transform: translateY(-2px);
    }
    .palette-legend {
      display: flex;
      gap: 14px;
      font-size: 13px;
      font-weight: 600;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 10px;
    }
    .legend-item { display: flex; align-items: center; gap: 6px; }
    .circle-icon { width: 14px; height: 14px; border-radius: 50%; display: inline-block; }
    .bg-attempted { background-color: #10b981; }
    .bg-unattempted { background-color: #8b5cf6; }
    .palette-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 8px;
    }
    .palette-btn {
      padding: 10px 0;
      border: none;
      border-radius: 4px;
      font-weight: 700;
      color: white;
      cursor: pointer;
      font-size: 13px;
      text-align: center;
    }
    .cbt-opt-label {
      display: flex;
      align-items: center;
      padding: 14px 16px;
      margin-bottom: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      cursor: pointer;
      font-size: 15px;
    }
    .cbt-opt-label:hover { background: #f8fafc; }
    .cbt-opt-label input { margin-right: 12px; transform: scale(1.2); }
    .cbt-tabs { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px; overflow-x: auto; gap: 8px; }
    .cbt-tab-btn { padding: 8px 12px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; border-bottom: 2px solid transparent; }
    .cbt-tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; }
    .cbt-pane { display: none; }
    .cbt-pane.active { display: block; }
    .cbt-item-chip { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 10px; border-radius: 20px; margin: 4px; font-size: 13px; }
    .cbt-item-chip span { color: #dc2626; cursor: pointer; font-weight: bold; }
    .cbt-btn-del { background: #ef4444; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .cbt-link-back { color: #64748b; font-size: 13px; text-decoration: underline; cursor: pointer; margin-bottom: 12px; display: inline-block; }
  `;
  document.head.appendChild(styleEl);

  // 3. INJECT APPLICATION DOM STRUCTURE
  const portalDiv = document.createElement("div");
  portalDiv.id = "cbt-portal";
  portalDiv.innerHTML = `
    <!-- Top Navigation Bar -->
    <div class="cbt-nav">
      <div class="cbt-logo-area">
        <span class="cbt-logo-badge">AW</span>
        <span class="cbt-brand-name">Akash Workshop</span>
      </div>
      <div class="cbt-nav-actions">
        <button class="cbt-btn-pay" id="btn-open-payment">Payment Gateway</button>
        <button class="cbt-btn-admin-direct" id="btn-admin-direct">Admin Login (Direct)</button>
        <span id="cbt-user-badge" class="cbt-candidate-tag"></span>
      </div>
    </div>

    <!-- WINDOW 1: LOGIN -->
    <div id="win-1" class="cbt-view active">
      <div class="cbt-h1">Candidate Login</div>
      <div class="cbt-h2">Login with your registered account to start the examination</div>
      <input type="text" id="login-username" class="cbt-field" placeholder="Enter Username" />
      <input type="password" id="login-password" class="cbt-field" placeholder="Enter Password" />
      <button class="cbt-btn-primary" id="btn-action-login">Login to Exam Portal</button>
      <div style="text-align:center; margin-top:14px; font-size:13px;">
        New student? Click "Payment Gateway" in the header to register via OTP.
      </div>
    </div>

    <!-- REGISTRATION / PAYMENT / OTP MODAL VIEW -->
    <div id="win-register" class="cbt-view">
      <span class="cbt-link-back" id="link-back-login">&larr; Back to Login</span>
      <div id="pay-step-1">
        <div class="cbt-h1">Complete Registration Payment</div>
        <div class="cbt-h2">Pay application fee to unlock mock series registration</div>
        <div style="text-align:center; margin: 20px 0; font-size:24px; font-weight:800; color:#10b981;">₹ 99.00</div>
        <button class="cbt-btn-primary" id="btn-mock-pay">Simulate Payment Success</button>
      </div>
      <div id="pay-step-2" style="display:none;">
        <div class="cbt-h1">OTP Mobile Verification</div>
        <div class="cbt-h2">Enter candidate mobile number to verify details</div>
        <input type="text" id="reg-mobile" class="cbt-field" placeholder="10 Digit Mobile Number" />
        <button class="cbt-btn-primary" id="btn-send-otp">Send OTP Code</button>
      </div>
      <div id="pay-step-3" style="display:none;">
        <div class="cbt-h1">Set Login Credentials</div>
        <div class="cbt-h2">Enter OTP & Choose Username/Password</div>
        <input type="text" id="reg-otp" class="cbt-field" placeholder="Enter 4-Digit OTP" />
        <input type="text" id="reg-username" class="cbt-field" placeholder="Choose Username" />
        <input type="password" id="reg-password" class="cbt-field" placeholder="Create Password" />
        <button class="cbt-btn-primary" id="btn-complete-reg">Confirm & Create Account</button>
      </div>
    </div>

    <!-- WINDOW 2: TOPIC SELECTION -->
    <div id="win-2" class="cbt-view">
      <div class="cbt-h1">Welcome, start your practice</div>
      <div class="cbt-h2">selection your topic</div>
      <div class="cbt-grid" id="dom-win2-topics"></div>
    </div>

    <!-- WINDOW 3: PAPER & SET SELECTION -->
    <div id="win-3" class="cbt-view">
      <span class="cbt-link-back" id="link-back-topics">&larr; Change Topic</span>
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #f1f5f9; padding-bottom:8px; margin-bottom:14px;">
        <span id="win3-topic-heading" style="font-weight:700; font-size:18px;"></span>
        <span style="color:#dc2626; font-weight:700;" id="win3-time-preview">Time : 30:00 min</span>
      </div>
      <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:8px;">Paper Categories / Test Types:</div>
      <div class="cbt-grid" id="dom-win3-paper-types"></div>
      <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:8px;">Available Practice Sets:</div>
      <div class="cbt-grid" id="dom-win3-practice-sets"></div>
    </div>

    <!-- WINDOW 4: FULL SCREEN TEST WINDOW WITH LIVE QUESTION PALETTE -->
    <div id="win-4" class="cbt-view">
      <div style="display:flex; justify-content:space-between; align-items:center; background:#0f172a; color:#fff; padding:10px 24px;">
        <div style="font-weight:700;" id="win4-banner">Akash Workshop - Exam Window</div>
        <div style="font-size:18px; font-weight:800; color:#ef4444;" id="win4-clock">30:00</div>
      </div>
      <div class="test-fullscreen-body">
        <!-- Question Test Area (Left / Center) -->
        <div class="test-main-area">
          <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
            <span style="font-size:14px; font-weight:700; color:#64748b;" id="win4-counter">Question 1</span>
          </div>
          <div id="dom-test-container" style="flex:1;"></div>
          <div style="display:flex; gap:12px; margin-top:20px;">
            <button class="cbt-btn-primary" id="btn-save-next" style="width:auto; padding:12px 28px;">Save & Next</button>
            <button class="cbt-btn-primary" id="btn-submit-exam" style="width:auto; padding:12px 28px; background:#dc2626; margin-left:auto;">Submit Final Exam</button>
          </div>
        </div>
        <!-- Question Palette Side Panel (Right) -->
        <div class="test-sidebar">
          <div style="font-weight:700; font-size:16px;">Candidate Palette</div>
          <div class="palette-legend">
            <div class="legend-item">
              <span class="circle-icon bg-attempted"></span>
              Attempted: <span id="stat-attempted" style="color:#10b981;">0</span>
            </div>
            <div class="legend-item">
              <span class="circle-icon bg-unattempted"></span>
              Unattempted: <span id="stat-unattempted" style="color:#8b5cf6;">0</span>
            </div>
          </div>
          <div style="font-size:12px; font-weight:600; color:#64748b;">Click number to jump to question:</div>
          <div class="palette-grid" id="dom-palette-grid"></div>
        </div>
      </div>
    </div>

    <!-- RESULT WINDOW -->
    <div id="win-result" class="cbt-view">
      <div class="cbt-h1">Examination Result</div>
      <div class="cbt-h2">Review your test score</div>
      <div id="dom-result-stats" style="text-align:center; margin: 24px 0;"></div>
      <button class="cbt-btn-primary" id="btn-restart-flow">Practice Another Topic</button>
    </div>

    <!-- ADMINISTRATIVE DASHBOARD -->
    <div id="win-admin-dash" class="cbt-view">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #f1f5f9; padding-bottom:10px; margin-bottom:16px;">
        <span style="font-weight:700; font-size:18px;">Admin Dashboard (Akash Workshop)</span>
        <button class="cbt-btn-del" id="btn-admin-exit">Exit to Topics</button>
      </div>
      <div class="cbt-tabs">
        <button class="cbt-tab-btn active" data-pane="pane-w2">Window 2: Topics</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-papers">Window 3: Categories</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-sets">Window 3: Sets</button>
        <button class="cbt-tab-btn" data-pane="pane-w4-questions">Window 4: Questions</button>
        <button class="cbt-tab-btn" data-pane="pane-time">Timer Settings</button>
      </div>

      <div id="pane-w2" class="cbt-pane active">
        <div style="font-weight:600; margin-bottom:6px;">Add New Topic:</div>
        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <input type="text" id="adm-add-topic" class="cbt-field" style="margin:0;" placeholder="Topic Name" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-add-topic">Add</button>
        </div>
        <div id="dom-adm-topic-chips"></div>
      </div>

      <div id="pane-w3-papers" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:6px;">Add Paper Type:</div>
        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <input type="text" id="adm-add-category" class="cbt-field" style="margin:0;" placeholder="e.g. PYQS" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-add-cat">Add</button>
        </div>
        <div id="dom-adm-category-chips"></div>
      </div>

      <div id="pane-w3-sets" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:6px;">Add Set Label:</div>
        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <input type="text" id="adm-add-set" class="cbt-field" style="margin:0;" placeholder="e.g. Set 01" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-add-set">Add</button>
        </div>
        <div id="dom-adm-set-chips"></div>
      </div>

      <div id="pane-w4-questions" class="cbt-pane">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px; margin-bottom:14px;">
          <select id="adm-sel-topic" class="cbt-field"></select>
          <select id="adm-sel-cat" class="cbt-field"></select>
          <input type="text" id="adm-q-title" class="cbt-field" placeholder="Question Text" />
          <input type="text" id="adm-q-op0" class="cbt-field" placeholder="Option A" />
          <input type="text" id="adm-q-op1" class="cbt-field" placeholder="Option B" />
          <input type="text" id="adm-q-op2" class="cbt-field" placeholder="Option C" />
          <input type="text" id="adm-q-op3" class="cbt-field" placeholder="Option D" />
          <select id="adm-q-ans" class="cbt-field">
            <option value="0">Correct: Option A</option>
            <option value="1">Correct: Option B</option>
            <option value="2">Correct: Option C</option>
            <option value="3">Correct: Option D</option>
          </select>
          <button class="cbt-btn-primary" id="btn-adm-save-q">Save Question</button>
        </div>
        <div style="max-height:220px; overflow-y:auto;">
          <table style="width:100%; border-collapse:collapse; font-size:13px;" id="dom-table-q-list"></table>
        </div>
      </div>

      <div id="pane-time" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:8px;">Exam Duration (Minutes):</div>
        <input type="number" id="adm-exam-min" class="cbt-field" min="1" max="180" />
        <button class="cbt-btn-primary" id="btn-adm-save-time">Save Duration</button>
      </div>
    </div>
  `;
  document.body.appendChild(portalDiv);

  // 4. STORAGE & DEFAULT DATA
  const defaultTopics = ["William Shakespeare", "William Wordsworth", "John Milton", "Literary Terms"];
  const defaultPaperTypes = ["PYQS", "Most Probable", "NET JRF"];
  const defaultSets = ["Practice Set 01", "Practice Set 02", "Practice Set 03", "Practice Set 04"];
  const defaultQuestions = [
    {
      topic: "William Shakespeare",
      category: "PYQS",
      text: "In which year was the First Folio of Shakespeare's plays published?",
      options: ["1616", "1623", "1632", "1609"],
      correct: 1
    },
    {
      topic: "William Shakespeare",
      category: "Most Probable",
      text: "Who referred to Shakespeare as the 'Sweet Swan of Avon'?",
      options: ["Ben Jonson", "John Dryden", "Alexander Pope", "Samuel Johnson"],
      correct: 0
    },
    {
      topic: "William Wordsworth",
      category: "PYQS",
      text: "Wordsworth's 'The Prelude' was published posthumously in which year?",
      options: ["1798", "1805", "1850", "1832"],
      correct: 2
    },
    {
      topic: "William Shakespeare",
      category: "PYQS",
      text: "Which of the following is considered one of Shakespeare's problem plays?",
      options: ["The Tempest", "Measure for Measure", "Macbeth", "A Midsummer Night's Dream"],
      correct: 1
    }
  ];

  let storeTopics = JSON.parse(localStorage.getItem("tb_portal_topics")) || defaultTopics;
  let storePaperTypes = JSON.parse(localStorage.getItem("tb_portal_categories")) || defaultPaperTypes;
  let storeSets = JSON.parse(localStorage.getItem("tb_portal_sets")) || defaultSets;
  let storeQuestions = JSON.parse(localStorage.getItem("tb_portal_questions")) || defaultQuestions;
  let storeDuration = parseInt(localStorage.getItem("tb_portal_duration"), 10) || 30;
  let registeredUsers = JSON.parse(localStorage.getItem("tb_registered_users")) || [];

  // Runtime State
  let activeTopic = "";
  let activeCategory = "";
  let activeExamQuestions = [];
  let currentQuestionIndex = 0;
  let candidateAnswers = {}; // { qIdx: selectedOptionIndex }
  let countdownRef = null;
  let remainingSeconds = 1800;
  let generatedOTP = "";

  function cbtSyncLocalStorage() {
    localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
    localStorage.setItem("tb_portal_categories", JSON.stringify(storePaperTypes));
    localStorage.setItem("tb_portal_sets", JSON.stringify(storeSets));
    localStorage.setItem("tb_portal_questions", JSON.stringify(storeQuestions));
    localStorage.setItem("tb_portal_duration", storeDuration.toString());
    localStorage.setItem("tb_registered_users", JSON.stringify(registeredUsers));
  }

  function cbtNavigate(targetId) {
    document.querySelectorAll(".cbt-view").forEach((win) => win.classList.remove("active"));
    const el = document.getElementById(targetId);
    if (el) el.classList.add("active");
  }

  // 5. REGISTRATION, PAYMENT & OTP LOGIC
  document.getElementById("btn-open-payment").addEventListener("click", () => {
    cbtNavigate("win-register");
    document.getElementById("pay-step-1").style.display = "block";
    document.getElementById("pay-step-2").style.display = "none";
    document.getElementById("pay-step-3").style.display = "none";
  });

  document.getElementById("link-back-login").addEventListener("click", () => cbtNavigate("win-1"));

  document.getElementById("btn-mock-pay").addEventListener("click", () => {
    alert("Payment of ₹99.00 Successful!");
    document.getElementById("pay-step-1").style.display = "none";
    document.getElementById("pay-step-2").style.display = "block";
  });

  document.getElementById("btn-send-otp").addEventListener("click", () => {
    const mobile = document.getElementById("reg-mobile").value.trim();
    if (mobile.length !== 10 || isNaN(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    alert("OTP sent to " + mobile + ": [ " + generatedOTP + " ]");
    document.getElementById("pay-step-2").style.display = "none";
    document.getElementById("pay-step-3").style.display = "block";
  });

  document.getElementById("btn-complete-reg").addEventListener("click", () => {
    const enteredOTP = document.getElementById("reg-otp").value.trim();
    const user = document.getElementById("reg-username").value.trim();
    const pass = document.getElementById("reg-password").value.trim();

    if (enteredOTP !== generatedOTP) {
      alert("Invalid OTP code.");
      return;
    }
    if (!user || !pass) {
      alert("Please provide username and password.");
      return;
    }

    registeredUsers.push({ username: user, password: pass });
    cbtSyncLocalStorage();
    alert("Registration Complete! Please login with your credentials.");
    cbtNavigate("win-1");
  });

  // 6. LOGIN (STUDENT & DIRECT ADMIN)
  document.getElementById("btn-action-login").addEventListener("click", () => {
    const u = document.getElementById("login-username").value.trim();
    const p = document.getElementById("login-password").value.trim();

    const matched = registeredUsers.find((item) => item.username === u && item.password === p);
    if (!matched && u !== "admin" && registeredUsers.length > 0) {
      alert("Invalid username or password. Please register via payment first.");
      return;
    }

    const badge = document.getElementById("cbt-user-badge");
    badge.innerText = u || "Candidate";
    badge.style.display = "inline-block";
    cbtRenderWindow2();
    cbtNavigate("win-2");
  });

  // Point 4: Admin Direct Login (No Password required)
  document.getElementById("btn-admin-direct").addEventListener("click", () => {
    cbtNavigate("win-admin-dash");
    cbtRefreshAdmin();
  });

  // 7. WINDOW 2 & 3 SELECTION
  function cbtRenderWindow2() {
    const container = document.getElementById("dom-win2-topics");
    container.innerHTML = "";
    storeTopics.forEach((t) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = t;
      card.onclick = () => {
        activeTopic = t;
        document.getElementById("win3-topic-heading").innerText = t;
        document.getElementById("win3-time-preview").innerText = "Time : " + storeDuration + ":00 min";
        cbtRenderWindow3();
        cbtNavigate("win-3");
      };
      container.appendChild(card);
    });
  }

  function cbtRenderWindow3() {
    const catBox = document.getElementById("dom-win3-paper-types");
    const setBox = document.getElementById("dom-win3-practice-sets");
    catBox.innerHTML = "";
    setBox.innerHTML = "";

    storePaperTypes.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = cat;
      card.onclick = () => cbtLaunchTest(cat);
      catBox.appendChild(card);
    });

    storeSets.forEach((setLabel) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = setLabel;
      card.onclick = () => cbtLaunchTest(setLabel);
      setBox.appendChild(card);
    });
  }

  document.getElementById("link-back-topics").addEventListener("click", () => cbtNavigate("win-2"));

  // 8. FULL-SCREEN EXAM ENGINE WITH PALETTE
  function cbtLaunchTest(selectedCategory) {
    activeCategory = selectedCategory;
    activeExamQuestions = storeQuestions.filter(
      (q) => q.topic === activeTopic && q.category === activeCategory
    );
    if (activeExamQuestions.length === 0) {
      activeExamQuestions = storeQuestions.filter((q) => q.topic === activeTopic);
    }
    if (activeExamQuestions.length === 0) {
      activeExamQuestions = [...storeQuestions];
    }

    currentQuestionIndex = 0;
    candidateAnswers = {};
    remainingSeconds = storeDuration * 60;

    document.getElementById("win4-banner").innerText = `Akash Workshop | ${activeTopic} (${activeCategory})`;
    cbtNavigate("win-4");
    cbtRenderQuestion();
    cbtUpdatePalette();
    cbtStartTimer();
  }

  function cbtRenderQuestion() {
    const cur = activeExamQuestions[currentQuestionIndex];
    document.getElementById("win4-counter").innerText =
      `Question ${currentQuestionIndex + 1} of ${activeExamQuestions.length}`;

    const container = document.getElementById("dom-test-container");
    let html = `<div style="font-size:18px; font-weight:700; margin-bottom:18px;">Q${currentQuestionIndex + 1}. ${cur.text}</div>`;

    for (let i = 0; i < cur.options.length; i++) {
      const checked = candidateAnswers[currentQuestionIndex] === i ? "checked" : "";
      html += `
        <label class="cbt-opt-label">
          <input type="radio" name="cbt-choice" value="${i}" ${checked} />
          ${String.fromCharCode(65 + i)}) ${cur.options[i]}
        </label>`;
    }
    container.innerHTML = html;
  }

  function cbtUpdatePalette() {
    const paletteGrid = document.getElementById("dom-palette-grid");
    paletteGrid.innerHTML = "";
    let attempted = 0;

    activeExamQuestions.forEach((_, idx) => {
      const btn = document.createElement("button");
      btn.className = "palette-btn";
      btn.innerText = idx + 1;

      if (candidateAnswers.hasOwnProperty(idx)) {
        btn.classList.add("bg-attempted"); // Green
        attempted++;
      } else {
        btn.classList.add("bg-unattempted"); // Purple
      }

      btn.onclick = () => {
        // Save active radio selection if available before jumping
        const checked = document.querySelector('input[name="cbt-choice"]:checked');
        if (checked) {
          candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
        }
        currentQuestionIndex = idx;
        cbtRenderQuestion();
        cbtUpdatePalette();
      };
      paletteGrid.appendChild(btn);
    });

    document.getElementById("stat-attempted").innerText = attempted;
    document.getElementById("stat-unattempted").innerText = activeExamQuestions.length - attempted;
  }

  document.getElementById("btn-save-next").addEventListener("click", () => {
    const checked = document.querySelector('input[name="cbt-choice"]:checked');
    if (checked) {
      candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
    }
    if (currentQuestionIndex < activeExamQuestions.length - 1) {
      currentQuestionIndex++;
      cbtRenderQuestion();
      cbtUpdatePalette();
    } else {
      cbtUpdatePalette();
      alert("You have reached the last question. Click 'Submit Final Exam' to finish.");
    }
  });

  document.getElementById("btn-submit-exam").addEventListener("click", () => {
    const checked = document.querySelector('input[name="cbt-choice"]:checked');
    if (checked) {
      candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
    }
    if (confirm("Are you sure you want to submit your test?")) {
      cbtFinishTest();
    }
  });

  function cbtStartTimer() {
    clearInterval(countdownRef);
    countdownRef = setInterval(() => {
      const m = Math.floor(remainingSeconds / 60);
      const s = remainingSeconds % 60;
      document.getElementById("win4-clock").innerText =
        (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      if (remainingSeconds <= 0) {
        clearInterval(countdownRef);
        alert("Time is up!");
        cbtFinishTest();
      }
      remainingSeconds--;
    }, 1000);
  }

  function cbtFinishTest() {
    clearInterval(countdownRef);
    cbtNavigate("win-result");

    let correctCount = 0;
    activeExamQuestions.forEach((q, idx) => {
      if (candidateAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const total = activeExamQuestions.length || 1;
    const attemptedCount = Object.keys(candidateAnswers).length;
    const pct = Math.round((correctCount / total) * 100);

    document.getElementById("dom-result-stats").innerHTML = `
      <div style="font-size:42px; font-weight:800; color:#2563eb; margin-bottom:10px;">${pct}%</div>
      <div style="font-size:16px; margin-bottom:8px;">Total Questions: <b>${total}</b></div>
      <div style="font-size:16px; margin-bottom:8px; color:#10b981;">Attempted: <b>${attemptedCount}</b></div>
      <div style="font-size:16px; margin-bottom:8px; color:#8b5cf6;">Unattempted: <b>${total - attemptedCount}</b></div>
      <div style="font-size:16px; font-weight:700;">Correct Answers: <b>${correctCount}</b></div>
    `;
  }

  document.getElementById("btn-restart-flow").addEventListener("click", () => cbtNavigate("win-2"));

  // 9. ADMIN PANEL REFRESH & TAB LOGIC
  document.querySelectorAll(".cbt-tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".cbt-tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".cbt-pane").forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      const targetPane = document.getElementById(this.dataset.pane);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  document.getElementById("btn-admin-exit").addEventListener("click", () => {
    cbtRenderWindow2();
    cbtNavigate("win-2");
  });

  function cbtRefreshAdmin() {
    // Topic Chips
    const tChips = document.getElementById("dom-adm-topic-chips");
    const selTopic = document.getElementById("adm-sel-topic");
    tChips.innerHTML = "";
    selTopic.innerHTML = "";
    storeTopics.forEach((t, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${t} <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        storeTopics.splice(idx, 1);
        cbtSyncLocalStorage();
        cbtRefreshAdmin();
      };
      tChips.appendChild(chip);

      const o = document.createElement("option");
      o.value = t; o.innerText = t;
      selTopic.appendChild(o);
    });

    // Categories
    const cChips = document.getElementById("dom-adm-category-chips");
    const selCat = document.getElementById("adm-sel-cat");
    cChips.innerHTML = "";
    selCat.innerHTML = "";
    storePaperTypes.forEach((c, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${c} <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        storePaperTypes.splice(idx, 1);
        cbtSyncLocalStorage();
        cbtRefreshAdmin();
      };
      cChips.appendChild(chip);

      const o = document.createElement("option");
      o.value = c; o.innerText = c;
      selCat.appendChild(o);
    });

    // Sets
    const sChips = document.getElementById("dom-adm-set-chips");
    sChips.innerHTML = "";
    storeSets.forEach((s, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${s} <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        storeSets.splice(idx, 1);
        cbtSyncLocalStorage();
        cbtRefreshAdmin();
      };
      sChips.appendChild(chip);
    });

    // Questions Table
    const qTable = document.getElementById("dom-table-q-list");
    qTable.innerHTML = "";
    storeQuestions.forEach((q, idx) => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid #e2e8f0";
      tr.innerHTML = `
        <td style="padding:8px;"><b>[${q.topic} &bull; ${q.category}]</b> ${q.text}</td>
        <td style="padding:8px; text-align:right;"><button class="cbt-btn-del">Del</button></td>
      `;
      tr.querySelector("button").onclick = () => {
        storeQuestions.splice(idx, 1);
        cbtSyncLocalStorage();
        cbtRefreshAdmin();
      };
      qTable.appendChild(tr);
    });

    document.getElementById("adm-exam-min").value = storeDuration;
  }

  // Admin Add Handlers
  document.getElementById("btn-adm-add-topic").addEventListener("click", () => {
    const input = document.getElementById("adm-add-topic");
    const val = input.value.trim();
    if (val && !storeTopics.includes(val)) {
      storeTopics.push(val);
      cbtSyncLocalStorage();
      cbtRefreshAdmin();
      input.value = "";
    }
  });

  document.getElementById("btn-adm-add-cat").addEventListener("click", () => {
    const input = document.getElementById("adm-add-category");
    const val = input.value.trim();
    if (val && !storePaperTypes.includes(val)) {
      storePaperTypes.push(val);
      cbtSyncLocalStorage();
      cbtRefreshAdmin();
      input.value = "";
    }
  });

  document.getElementById("btn-adm-add-set").addEventListener("click", () => {
    const input = document.getElementById("adm-add-set");
    const val = input.value.trim();
    if (val && !storeSets.includes(val)) {
      storeSets.push(val);
      cbtSyncLocalStorage();
      cbtRefreshAdmin();
      input.value = "";
    }
  });

  document.getElementById("btn-adm-save-q").addEventListener("click", () => {
    const topic = document.getElementById("adm-sel-topic").value;
    const cat = document.getElementById("adm-sel-cat").value;
    const title = document.getElementById("adm-q-title").value.trim();
    const o0 = document.getElementById("adm-q-op0").value.trim();
    const o1 = document.getElementById("adm-q-op1").value.trim();
    const o2 = document.getElementById("adm-q-op2").value.trim();
    const o3 = document.getElementById("adm-q-op3").value.trim();
    const correct = parseInt(document.getElementById("adm-q-ans").value, 10);

    if (!title || !o0 || !o1 || !o2 || !o3) {
      alert("Fill all question fields.");
      return;
    }

    storeQuestions.push({ topic, category: cat, text: title, options: [o0, o1, o2, o3], correct });
    cbtSyncLocalStorage();
    cbtRefreshAdmin();

    document.getElementById("adm-q-title").value = "";
    document.getElementById("adm-q-op0").value = "";
    document.getElementById("adm-q-op1").value = "";
    document.getElementById("adm-q-op2").value = "";
    document.getElementById("adm-q-op3").value = "";
    alert("Question added to database.");
  });

  document.getElementById("btn-adm-save-time").addEventListener("click", () => {
    const val = parseInt(document.getElementById("adm-exam-min").value, 10);
    if (val > 0) {
      storeDuration = val;
      cbtSyncLocalStorage();
      alert("Exam duration saved to " + val + " minutes.");
    }
  });
})();
    }
    .cbt-field:focus { border-color: #2563eb; }
    .cbt-btn-primary {
      width: 100%; padding: 12px; background: #2563eb; color: #ffffff;
      border: none; border-radius: 6px; font-size: 15px; font-weight: 600; cursor: pointer;
    }
    .cbt-btn-primary:hover { background: #1d4ed8; }
    .cbt-link-back {
      color: #64748b; font-size: 13px; text-decoration: underline;
      cursor: pointer; display: inline-block; margin-bottom: 12px;
    }
    .cbt-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px; margin-bottom: 20px;
    }
    .cbt-selection-card {
      background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px;
      padding: 16px 12px; text-align: center; cursor: pointer; font-weight: 600;
      font-size: 14px; transition: all 0.15s ease-in-out;
    }
    .cbt-selection-card:hover {
      background: #eff6ff; border-color: #3b82f6; color: #1d4ed8; transform: translateY(-2px);
    }
    .cbt-exam-header {
      display: flex; justify-content: space-between; align-items: center;
      border-bottom: 2px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 18px;
    }
    .cbt-timer-label { font-size: 16px; font-weight: 700; color: #dc2626; }
    .cbt-q-text { font-size: 16px; font-weight: 600; margin-bottom: 14px; line-height: 1.5; }
    .cbt-opt-label {
      display: flex; align-items: center; padding: 12px 14px; margin-bottom: 10px;
      border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer;
    }
    .cbt-opt-label:hover { background: #f8fafc; }
    .cbt-opt-label input { margin-right: 12px; }
    .cbt-tabs {
      display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px;
      overflow-x: auto; gap: 10px;
    }
    .cbt-tab-btn {
      padding: 8px 12px; border: none; background: transparent; cursor: pointer;
      font-weight: 600; color: #64748b; border-bottom: 2px solid transparent;
      margin-bottom: -2px; white-space: nowrap;
    }
    .cbt-tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; }
    .cbt-pane { display: none; }
    .cbt-pane.active { display: block; }
    .cbt-item-chip {
      display: inline-flex; align-items: center; gap: 8px; background: #f1f5f9;
      padding: 6px 12px; border-radius: 20px; margin: 4px; font-size: 13px;
      border: 1px solid #e2e8f0;
    }
    .cbt-item-chip span { color: #dc2626; font-weight: 700; cursor: pointer; }
    .cbt-btn-del {
      background: #ef4444; color: white; border: none; padding: 5px 8px;
      border-radius: 4px; cursor: pointer; font-size: 12px;
    }
  `;
  document.head.appendChild(styleEl);

  // 2. DOM APP STRUCTURE INJECTION
  const appContainer = document.createElement("div");
  appContainer.id = "cbt-portal";
  appContainer.innerHTML = `
    <div class="cbt-nav">
      <div class="cbt-nav-title">Online Examination Portal</div>
      <div>
        <span id="cbt-user-badge" class="cbt-candidate-tag"></span>
        <button class="cbt-btn-admin-nav" id="btn-admin-nav">Admin Panel</button>
      </div>
    </div>

    <!-- WINDOW 1: LOGIN -->
    <div id="win-1" class="cbt-view active">
      <div class="cbt-h1">Login Page</div>
      <div class="cbt-h2">Enter your examination credentials to begin</div>
      <input type="text" id="cand-reg" class="cbt-field" placeholder="Candidate Registration / Name" />
      <input type="password" id="cand-pwd" class="cbt-field" placeholder="Password (Optional)" />
      <button class="cbt-btn-primary" id="btn-user-login">Login</button>
    </div>

    <!-- WINDOW 2: TOPIC SELECTION -->
    <div id="win-2" class="cbt-view">
      <div class="cbt-h1">Welcome, start your practice</div>
      <div class="cbt-h2">Selection Your Topic</div>
      <div class="cbt-grid" id="dom-win2-topics"></div>
    </div>

    <!-- WINDOW 3: PAPER & SET SELECTION -->
    <div id="win-3" class="cbt-view">
      <span class="cbt-link-back" id="link-back-w2">&larr; Change Topic</span>
      <div class="cbt-exam-header">
        <span id="win3-topic-heading" style="font-weight: 700; font-size: 18px;"></span>
        <span class="cbt-timer-label" id="win3-time-preview">Time : 30:00 min</span>
      </div>
      <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px;">Paper Categories / Test Types:</div>
      <div class="cbt-grid" id="dom-win3-paper-types"></div>
      <div style="font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px;">Practice Sets:</div>
      <div class="cbt-grid" id="dom-win3-practice-sets"></div>
    </div>

    <!-- WINDOW 4: TEST PAGE -->
    <div id="win-4" class="cbt-view">
      <div class="cbt-exam-header">
        <div>
          <span style="font-weight: 700; font-size: 16px;" id="win4-banner">Test Page</span>
          <div style="font-size: 12px; color: #64748b;" id="win4-counter">Question 1</div>
        </div>
        <span class="cbt-timer-label" id="win4-clock">30:00</span>
      </div>
      <div id="dom-test-container"></div>
      <button class="cbt-btn-primary" id="btn-next-action" style="margin-top: 14px;">Next Question</button>
    </div>

    <!-- RESULT WINDOW -->
    <div id="win-result" class="cbt-view">
      <div class="cbt-h1">Exam Submitted Successfully</div>
      <div class="cbt-h2">Review your overall performance below</div>
      <div id="dom-result-stats" style="text-align:center; margin: 24px 0;"></div>
      <button class="cbt-btn-primary" id="btn-restart-flow">Practice Another Topic</button>
    </div>

    <!-- ADMIN AUTHENTICATION -->
    <div id="win-admin-auth" class="cbt-view">
      <span class="cbt-link-back" id="link-back-login">&larr; Back to Candidate Login</span>
      <div class="cbt-h1">Admin Authorization</div>
      <div class="cbt-h2">Enter PIN to configure modules, topics, and question bank</div>
      <input type="password" id="admin-passkey" class="cbt-field" placeholder="Enter Admin PIN (Default: 1234)" />
      <button class="cbt-btn-primary" id="btn-admin-auth-submit">Unlock Admin Dashboard</button>
    </div>

    <!-- ADMINISTRATIVE DASHBOARD -->
    <div id="win-admin-dash" class="cbt-view">
      <div class="cbt-exam-header">
        <span style="font-weight: 700; font-size: 18px;">Administrative Control Center</span>
        <button class="cbt-btn-del" id="btn-admin-exit">Exit to Portal</button>
      </div>

      <div class="cbt-tabs">
        <button class="cbt-tab-btn active" data-pane="pane-w2">Window 2: Topics</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-papers">Window 3: Categories</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-sets">Window 3: Sets</button>
        <button class="cbt-tab-btn" data-pane="pane-w4-questions">Window 4: Questions</button>
        <button class="cbt-tab-btn" data-pane="pane-time">Exam Timer</button>
      </div>

      <!-- Tab 1: Window 2 Topics -->
      <div id="pane-w2" class="cbt-pane active">
        <div style="font-weight: 600; margin-bottom: 6px;">Add New Topic (Window 2):</div>
        <div style="display:flex; gap:8px; margin-bottom: 16px;">
          <input type="text" id="adm-add-topic" class="cbt-field" style="margin:0;" placeholder="e.g., William Shakespeare" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-add-topic">Add</button>
        </div>
        <div style="font-weight: 600; margin-bottom: 8px;">Active Window 2 Topics:</div>
        <div id="dom-adm-topic-chips"></div>
      </div>

      <!-- Tab 2: Window 3 Categories -->
      <div id="pane-w3-papers" class="cbt-pane">
        <div style="font-weight: 600; margin-bottom: 6px;">Add Paper Type (e.g., PYQs, NET JRF):</div>
        <div style="display:flex; gap:8px; margin-bottom: 16px;">
          <input type="text" id="adm-add-category" class="cbt-field" style="margin:0;" placeholder="e.g., PYQS, Most Probable" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-add-cat">Add</button>
        </div>
        <div style="font-weight: 600; margin-bottom: 8px;">Active Categories:</div>
        <div id="dom-adm-category-chips"></div>
      </div>

      <!-- Tab 3: Window 3 Sets -->
      <div id="pane-w3-sets" class="cbt-pane">
        <div style="font-weight: 600; margin-bottom: 6px;">Add Practice Set Label:</div>
        <div style="display:flex; gap:8px; margin-bottom: 16px;">
          <input type="text" id="adm-add-set" class="cbt-field" style="margin:0;" placeholder="e.g., Practice Set 01" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-add-set">Add</button>
        </div>
        <div style="font-weight: 600; margin-bottom: 8px;">Active Practice Sets:</div>
        <div id="dom-adm-set-chips"></div>
      </div>

      <!-- Tab 4: Window 4 Questions -->
      <div id="pane-w4-questions" class="cbt-pane">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px; margin-bottom:16px;">
          <div style="font-weight: 600; margin-bottom: 8px;">Add Single Question:</div>
          <select id="adm-sel-topic" class="cbt-field"></select>
          <select id="adm-sel-cat" class="cbt-field"></select>
          <input type="text" id="adm-q-title" class="cbt-field" placeholder="Question Text" />
          <input type="text" id="adm-q-op0" class="cbt-field" placeholder="Option A" />
          <input type="text" id="adm-q-op1" class="cbt-field" placeholder="Option B" />
          <input type="text" id="adm-q-op2" class="cbt-field" placeholder="Option C" />
          <input type="text" id="adm-q-op3" class="cbt-field" placeholder="Option D" />
          <select id="adm-q-ans" class="cbt-field">
            <option value="0">Correct Choice: Option A</option>
            <option value="1">Correct Choice: Option B</option>
            <option value="2">Correct Choice: Option C</option>
            <option value="3">Correct Choice: Option D</option>
          </select>
          <button class="cbt-btn-primary" id="btn-adm-save-q">Append to Bank</button>
        </div>
        <div style="font-weight: 600; margin-bottom: 8px;">Saved Questions (<span id="dom-total-q-num">0</span>):</div>
        <div style="max-height:220px; overflow-y:auto; border:1px solid #e2e8f0; border-radius:6px;">
          <table style="width:100%; border-collapse:collapse; font-size:13px;" id="dom-table-q-list"></table>
        </div>
      </div>

      <!-- Tab 5: Timer Duration -->
      <div id="pane-time" class="cbt-pane">
        <div style="font-weight: 600; margin-bottom: 8px;">Window 3 & 4 Exam Duration (Minutes):</div>
        <input type="number" id="adm-exam-min" class="cbt-field" min="1" max="180" />
        <button class="cbt-btn-primary" id="btn-adm-save-time">Save Timer Duration</button>
      </div>
    </div>
  `;

  document.body.appendChild(appContainer);

  // 3. APPLICATION STATE & PERSISTENCE
  const defaultTopics = ["William Shakespeare", "William Wordsworth", "John Milton", "Literary Terms"];
  const defaultPaperTypes = ["PYQS", "Most Probable", "NET JRF"];
  const defaultSets = ["Practice Set 01", "Practice Set 02", "Practice Set 03", "Practice Set 04"];
  const defaultQuestions = [
    {
      topic: "William Shakespeare",
      category: "PYQS",
      text: "In which year was the First Folio of Shakespeare's plays published?",
      options: ["1616", "1623", "1632", "1609"],
      correct: 1
    },
    {
      topic: "William Shakespeare",
      category: "Most Probable",
      text: "Who referred to Shakespeare as the 'Sweet Swan of Avon'?",
      options: ["Ben Jonson", "John Dryden", "Alexander Pope", "Samuel Johnson"],
      correct: 0
    },
    {
      topic: "William Wordsworth",
      category: "PYQS",
      text: "Wordsworth's 'The Prelude' was published posthumously in which year?",
      options: ["1798", "1805", "1850", "1832"],
      correct: 2
    }
  ];

  let storeTopics = JSON.parse(localStorage.getItem("tb_portal_topics")) || defaultTopics;
  let storePaperTypes = JSON.parse(localStorage.getItem("tb_portal_categories")) || defaultPaperTypes;
  let storeSets = JSON.parse(localStorage.getItem("tb_portal_sets")) || defaultSets;
  let storeQuestions = JSON.parse(localStorage.getItem("tb_portal_questions")) || defaultQuestions;
  let storeDuration = parseInt(localStorage.getItem("tb_portal_duration"), 10) || 30;

  let activeTopic = "";
  let activeCategory = "";
  let activeExamQuestions = [];
  let currentQuestionIndex = 0;
  let finalCorrectCount = 0;
  let countdownRef = null;
  let remainingSeconds = 1800;

  function cbtSyncLocalStorage() {
    localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
    localStorage.setItem("tb_portal_categories", JSON.stringify(storePaperTypes));
    localStorage.setItem("tb_portal_sets", JSON.stringify(storeSets));
    localStorage.setItem("tb_portal_questions", JSON.stringify(storeQuestions));
    localStorage.setItem("tb_portal_duration", storeDuration.toString());
  }

  function cbtNavigate(targetId) {
    document.querySelectorAll(".cbt-view").forEach((win) => win.classList.remove("active"));
    const el = document.getElementById(targetId);
    if (el) el.classList.add("active");
  }

  // 4. STUDENT WORKFLOW
  function cbtLoginUser() {
    const name = document.getElementById("cand-reg").value.trim();
    if (!name) { alert("Please provide candidate identifier."); return; }
    const badge = document.getElementById("cbt-user-badge");
    badge.innerText = name;
    badge.style.display = "inline-block";
    cbtRenderWindow2();
    cbtNavigate("win-2");
  }

  function cbtRenderWindow2() {
    const container = document.getElementById("dom-win2-topics");
    container.innerHTML = "";
    storeTopics.forEach((topic) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = topic;
      card.onclick = () => {
        activeTopic = topic;
        document.getElementById("win3-topic-heading").innerText = topic;
        document.getElementById("win3-time-preview").innerText = "Time : " + storeDuration + ":00 min";
        cbtRenderWindow3();
        cbtNavigate("win-3");
      };
      container.appendChild(card);
    });
  }

  function cbtRenderWindow3() {
    const catBox = document.getElementById("dom-win3-paper-types");
    const setBox = document.getElementById("dom-win3-practice-sets");
    catBox.innerHTML = "";
    setBox.innerHTML = "";

    storePaperTypes.forEach((cat) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = cat;
      card.onclick = () => cbtLaunchTest(cat);
      catBox.appendChild(card);
    });

    storeSets.forEach((setLabel) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = setLabel;
      card.onclick = () => cbtLaunchTest(setLabel);
      setBox.appendChild(card);
    });
  }

  function cbtLaunchTest(selectedCategory) {
    activeCategory = selectedCategory;
    activeExamQuestions = storeQuestions.filter(
      (q) => q.topic === activeTopic && q.category === activeCategory
    );
    if (activeExamQuestions.length === 0) {
      activeExamQuestions = storeQuestions.filter((q) => q.topic === activeTopic);
    }
    if (activeExamQuestions.length === 0) {
      activeExamQuestions = [...storeQuestions];
    }

    currentQuestionIndex = 0;
    finalCorrectCount = 0;
    remainingSeconds = storeDuration * 60;
    cbtNavigate("win-4");
    document.getElementById("win4-banner").innerText = activeTopic + " (" + activeCategory + ")";
    cbtRenderQuestion();
    cbtStartTimer();
  }

  function cbtRenderQuestion() {
    const cur = activeExamQuestions[currentQuestionIndex];
    document.getElementById("win4-counter").innerText =
      "Question " + (currentQuestionIndex + 1) + " of " + activeExamQuestions.length;

    const container = document.getElementById("dom-test-container");
    let html = '<div class="cbt-q-text">Q' + (currentQuestionIndex + 1) + ". " + cur.text + "</div>";
    for (let i = 0; i < cur.options.length; i++) {
      html += '<label class="cbt-opt-label">' +
        '<input type="radio" name="cbt-choice" value="' + i + '"> ' +
        String.fromCharCode(65 + i) + ") " + cur.options[i] +
      "</label>";
    }
    container.innerHTML = html;
    document.getElementById("btn-next-action").innerText =
      currentQuestionIndex === activeExamQuestions.length - 1 ? "Submit Exam" : "Next Question";
  }

  function cbtNextQuestion() {
    const check = document.querySelector('input[name="cbt-choice"]:checked');
    if (!check) { alert("Please choose an answer."); return; }

    if (parseInt(check.value, 10) === activeExamQuestions[currentQuestionIndex].correct) {
      finalCorrectCount++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < activeExamQuestions.length) {
      cbtRenderQuestion();
    } else {
      cbtFinishTest();
    }
  }

  function cbtStartTimer() {
    clearInterval(countdownRef);
    countdownRef = setInterval(() => {
      const m = Math.floor(remainingSeconds / 60);
      const s = remainingSeconds % 60;
      document.getElementById("win4-clock").innerText =
        (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
      if (remainingSeconds <= 0) {
        clearInterval(countdownRef);
        cbtFinishTest();
      }
      remainingSeconds--;
    }, 1000);
  }

  function cbtFinishTest() {
    clearInterval(countdownRef);
    cbtNavigate("win-result");
    const pct = Math.round((finalCorrectCount / (activeExamQuestions.length || 1)) * 100);
    document.getElementById("dom-result-stats").innerHTML =
      '<div style="font-size:36px; font-weight:800; color:#2563eb; margin-bottom:8px;">' + pct + "%</div>" +
      "<div>Score: <b>" + finalCorrectCount + "</b> / " + activeExamQuestions.length + " Correct</div>";
  }

  // 5. ADMINISTRATIVE DASHBOARD LOGIC
  function cbtAuthAdmin() {
    if (document.getElementById("admin-passkey").value === "1234") {
      cbtNavigate("win-admin-dash");
      cbtRefreshAdmin();
    } else {
      alert("Invalid Admin PIN");
    }
  }

  function cbtRefreshAdmin() {
    // Window 2 Chips & Dropdowns
    const tChips = document.getElementById("dom-adm-topic-chips");
    const selTopic = document.getElementById("adm-sel-topic");
    tChips.innerHTML = "";
    selTopic.innerHTML = "";
    storeTopics.forEach((t, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${t} <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        if (confirm(`Remove topic: ${t}?`)) {
          storeTopics.splice(idx, 1);
          cbtSyncLocalStorage();
          cbtRefreshAdmin();
          cbtRenderWindow2();
        }
      };
      tChips.appendChild(chip);

      const o = document.createElement("option");
      o.value = t; o.innerText = t;
      selTopic.appendChild(o);
    });

    // Window 3 Paper Categories Chips & Dropdowns
    const cChips = document.getElementById("dom-adm-category-chips");
    const selCat = document.getElementById("adm-sel-cat");
    cChips.innerHTML = "";
    selCat.innerHTML = "";
    storePaperTypes.forEach((c, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${c} <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        if (confirm(`Remove category: ${c}?`)) {
          storePaperTypes.splice(idx, 1);
          cbtSyncLocalStorage();
          cbtRefreshAdmin();
        }
      };
      cChips.appendChild(chip);

      const o = document.createElement("option");
      o.value = c; o.innerText = c;
      selCat.appendChild(o);
    });

    // Window 3 Practice Sets Chips
    const sChips = document.getElementById("dom-adm-set-chips");
    sChips.innerHTML = "";
    storeSets.forEach((s, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${s} <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        if (confirm(`Remove set: ${s}?`)) {
          storeSets.splice(idx, 1);
          cbtSyncLocalStorage();
          cbtRefreshAdmin();
        }
      };
      sChips.appendChild(chip);
    });

    // Window 4 Question Catalog Table
    document.getElementById("dom-total-q-num").innerText = storeQuestions.length;
    const qTable = document.getElementById("dom-table-q-list");
    qTable.innerHTML = "";
    storeQuestions.forEach((q, idx) => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid #e2e8f0";
      tr.innerHTML = `
        <td style="padding:8px;"><b>[${q.topic} &bull; ${q.category}]</b> ${q.text}</td>
        <td style="padding:8px; text-align:right;"><button class="cbt-btn-del">Del</button></td>
      `;
      tr.querySelector("button").onclick = () => {
        if (confirm("Permanently delete this question?")) {
          storeQuestions.splice(idx, 1);
          cbtSyncLocalStorage();
          cbtRefreshAdmin();
        }
      };
      qTable.appendChild(tr);
    });

    document.getElementById("adm-exam-min").value = storeDuration;
  }

  // 6. EVENT LISTENER BINDINGS
  document.getElementById("btn-user-login").addEventListener("click", cbtLoginUser);
  document.getElementById("link-back-w2").addEventListener("click", () => cbtNavigate("win-2"));
  document.getElementById("btn-next-action").addEventListener("click", cbtNextQuestion);
  document.getElementById("btn-restart-flow").addEventListener("click", () => cbtNavigate("win-2"));
  document.getElementById("btn-admin-nav").addEventListener("click", () => cbtNavigate("win-admin-auth"));
  document.getElementById("link-back-login").addEventListener("click", () => cbtNavigate("win-1"));
  document.getElementById("btn-admin-auth-submit").addEventListener("click", cbtAuthAdmin);
  document.getElementById("btn-admin-exit").addEventListener("click", () => cbtNavigate("win-2"));

  // Admin Tab Navigation
  document.querySelectorAll(".cbt-tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".cbt-tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".cbt-pane").forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      const targetPane = document.getElementById(this.dataset.pane);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Admin Window 2: Add Topic
  document.getElementById("btn-adm-add-topic").addEventListener("click", () => {
    const input = document.getElementById("adm-add-topic");
    const val = input.value.trim();
    if (val && !storeTopics.includes(val)) {
      storeTopics.push(val);
      cbtSyncLocalStorage();
      cbtRefreshAdmin();
      cbtRenderWindow2();
      input.value = "";
    }
  });

  // Admin Window 3: Add Category
  document.getElementById("btn-adm-add-cat").addEventListener("click", () => {
    const input = document.getElementById("adm-add-category");
    const val = input.value.trim();
    if (val && !storePaperTypes.includes(val)) {
      storePaperTypes.push(val);
      cbtSyncLocalStorage();
      cbtRefreshAdmin();
      input.value = "";
    }
  });

  // Admin Window 3: Add Set
  document.getElementById("btn-adm-add-set").addEventListener("click", () => {
    const input = document.getElementById("adm-add-set");
    const val = input.value.trim();
    if (val && !storeSets.includes(val)) {
      storeSets.push(val);
      cbtSyncLocalStorage();
      cbtRefreshAdmin();
      input.value = "";
    }
  });

  // Admin Window 4: Save Question
  document.getElementById("btn-adm-save-q").addEventListener("click", () => {
    const topic = document.getElementById("adm-sel-topic").value;
    const cat = document.getElementById("adm-sel-cat").value;
    const title = document.getElementById("adm-q-title").value.trim();
    const o0 = document.getElementById("adm-q-op0").value.trim();
    const o1 = document.getElementById("adm-q-op1").value.trim();
    const o2 = document.getElementById("adm-q-op2").value.trim();
    const o3 = document.getElementById("adm-q-op3").value.trim();
    const correct = parseInt(document.getElementById("adm-q-ans").value, 10);

    if (!title || !o0 || !o1 || !o2 || !o3) {
      alert("Please fill in question prompt and all four option choices.");
      return;
    }

    storeQuestions.push({ topic, category: cat, text: title, options: [o0, o1, o2, o3], correct });
    cbtSyncLocalStorage();
    cbtRefreshAdmin();

    document.getElementById("adm-q-title").value = "";
    document.getElementById("adm-q-op0").value = "";
    document.getElementById("adm-q-op1").value = "";
    document.getElementById("adm-q-op2").value = "";
    document.getElementById("adm-q-op3").value = "";
    alert("Question saved to database.");
  });

  // Admin: Save Exam Duration
  document.getElementById("btn-adm-save-time").addEventListener("click", () => {
    const val = parseInt(document.getElementById("adm-exam-min").value, 10);
    if (val > 0) {
      storeDuration = val;
      cbtSyncLocalStorage();
      alert("Exam duration updated to " + val + " minutes.");
    }
  });
})();
