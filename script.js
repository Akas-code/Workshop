(function () {
  // 1. DEFAULT DATA & STORAGE INITIALIZATION
  const defaultTopics = ["William Shakespeare", "William Wordsworth", "John Milton", "Literary Terms"];
  const defaultPaperTypes = ["PYQS", "Lines", "Most Probable", "NET JRF"];
  const defaultSets = ["Practice Set 01", "Practice Set 02", "Practice Set 03", "Practice Set 04"];
  const defaultQuestions = [
    {
      topic: "William Shakespeare",
      category: "PYQS",
      text: "In which year was the First Folio of Shakespeare's plays published?",
      options: ["1616", "1623", "1632", "1609"],
      correct: 1,
      solution: "The First Folio of Shakespeare's plays was published in 1623 by his fellow actors John Heminges and Henry Condell."
    },
    {
      topic: "William Shakespeare",
      category: "Lines",
      text: "'Life's but a walking shadow, a poor player...' occurs in which play?",
      options: ["Hamlet", "Othello", "Macbeth", "King Lear"],
      correct: 2,
      solution: "This line is spoken by Macbeth in Act 5, Scene 5 after hearing of Lady Macbeth's death."
    },
    {
      topic: "William Wordsworth",
      category: "PYQS",
      text: "Wordsworth's 'The Prelude' was published posthumously in which year?",
      options: ["1798", "1805", "1850", "1832"],
      correct: 2,
      solution: "The Prelude was published in 1850 by Wordsworth's widow, Mary Wordsworth, shortly after his death."
    }
  ];
  const defaultNotes = [
    { title: "English Literature Hand-Written Summary", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ];
  const defaultCoupons = [
    { code: "AKASH50", discount: 50 },
    { code: "FREE100", discount: 100 }
  ];

  let storeTopics = JSON.parse(localStorage.getItem("tb_portal_topics")) || defaultTopics;
  let storePaperTypes = JSON.parse(localStorage.getItem("tb_portal_categories")) || defaultPaperTypes;
  let storeSets = JSON.parse(localStorage.getItem("tb_portal_sets")) || defaultSets;
  let storeQuestions = JSON.parse(localStorage.getItem("tb_portal_questions")) || defaultQuestions;
  let storeNotes = JSON.parse(localStorage.getItem("tb_portal_notes")) || defaultNotes;
  let storeCoupons = JSON.parse(localStorage.getItem("tb_portal_coupons")) || defaultCoupons;
  let storeDuration = parseInt(localStorage.getItem("tb_portal_duration"), 10) || 30;
  let storePrice = parseFloat(localStorage.getItem("tb_portal_price")) || 99.00;
  let registeredUsers = JSON.parse(localStorage.getItem("tb_registered_users")) || [];
  let userPerformance = JSON.parse(localStorage.getItem("tb_user_performance")) || {};
  let adminPin = localStorage.getItem("tb_admin_pin") || "1234";

  let brandConfig = JSON.parse(localStorage.getItem("tb_brand_config")) || {
    name: "Akash Workshop",
    badge: "AW",
    favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>"
  };

  // Persistent Session Runtime
  let activeUser = JSON.parse(localStorage.getItem("tb_active_user")) || null;

  // Runtime State
  let activeTopic = "";
  let activeCategory = "";
  let activeExamQuestions = [];
  let currentQuestionIndex = 0;
  let candidateAnswers = {};
  let countdownRef = null;
  let remainingSeconds = 1800;
  let generatedOTP = "";
  let resetOTP = "";
  let resetMobileTarget = "";
  let appliedDiscountPercent = 0;
  let lastTransactionInfo = { amount: "0.00", coupon: "None" };
  let editingQuestionIndex = null;

  function syncAllData() {
    localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
    localStorage.setItem("tb_portal_categories", JSON.stringify(storePaperTypes));
    localStorage.setItem("tb_portal_sets", JSON.stringify(storeSets));
    localStorage.setItem("tb_portal_questions", JSON.stringify(storeQuestions));
    localStorage.setItem("tb_portal_notes", JSON.stringify(storeNotes));
    localStorage.setItem("tb_portal_coupons", JSON.stringify(storeCoupons));
    localStorage.setItem("tb_portal_duration", storeDuration.toString());
    localStorage.setItem("tb_portal_price", storePrice.toString());
    localStorage.setItem("tb_registered_users", JSON.stringify(registeredUsers));
    localStorage.setItem("tb_user_performance", JSON.stringify(userPerformance));
    localStorage.setItem("tb_admin_pin", adminPin);
    localStorage.setItem("tb_brand_config", JSON.stringify(brandConfig));
    if (activeUser) {
      localStorage.setItem("tb_active_user", JSON.stringify(activeUser));
    } else {
      localStorage.removeItem("tb_active_user");
    }
  }

  function applyBrandIdentity() {
    document.title = brandConfig.name + " | Online Examination Portal";
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = brandConfig.favicon;

    const brandNameEl = document.getElementById("dom-brand-name");
    const brandBadgeEl = document.getElementById("dom-brand-badge");
    if (brandNameEl) brandNameEl.innerText = brandConfig.name;
    if (brandBadgeEl) brandBadgeEl.innerText = brandConfig.badge;
  }

  // 2. INJECT CSS
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    #cbt-portal {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #1e293b; background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column;
    }
    .cbt-nav {
      display: flex; justify-content: space-between; align-items: center;
      background: #0f172a; padding: 12px 24px; color: #ffffff; position: relative; z-index: 1000;
    }
    .cbt-logo-area { display: flex; align-items: center; gap: 10px; }
    .cbt-logo-badge {
      background: #2563eb; color: white; font-weight: 800; padding: 5px 10px; border-radius: 6px; font-size: 14px;
    }
    .cbt-brand-name { font-size: 18px; font-weight: 700; color: #f8fafc; }
    .cbt-nav-actions { display: flex; gap: 10px; align-items: center; }
    .cbt-btn-pay {
      background: #10b981; color: #fff; border: none; padding: 7px 14px; border-radius: 4px; font-size: 13px; font-weight: 600; cursor: pointer;
    }
    .cbt-btn-admin-nav {
      background: #475569; color: #fff; border: none; padding: 7px 14px; border-radius: 4px; font-size: 13px; cursor: pointer;
    }
    
    /* Candidate Hover Menu */
    .cbt-profile-menu-container {
      position: relative; display: none; padding: 4px 0;
    }
    .cbt-candidate-badge-logo {
      background: #2563eb; color: #ffffff; font-weight: 800; font-size: 13px;
      padding: 6px 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;
      border: 1px solid rgba(255,255,255,0.2); transition: background 0.2s ease;
    }
    .cbt-candidate-badge-logo:hover {
      background: #1d4ed8;
    }
    .cbt-profile-dropdown {
      display: none; position: absolute; right: 0; top: 100%; width: 330px;
      background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1);
      padding: 16px; color: #1e293b; z-index: 2000;
    }
    .cbt-profile-menu-container:hover .cbt-profile-dropdown {
      display: block;
    }
    .drop-divider {
      height: 1px; background: #e2e8f0; margin: 10px 0;
    }
    .drop-info-title {
      font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px;
    }
    .drop-detail-row {
      display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px;
    }

    .cbt-view {
      display: none; padding: 24px; max-width: 860px; margin: 20px auto; width: 100%; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;
    }
    .cbt-view.active { display: block; }
    
    /* Full-Screen Test Mode */
    #win-4.active {
      display: flex; flex-direction: column; max-width: 100% !important; width: 100% !important;
      height: calc(100vh - 60px) !important; margin: 0 !important; padding: 0 !important; border-radius: 0 !important; border: none !important;
    }
    .test-fullscreen-body { display: flex; flex: 1; overflow: hidden; }
    .test-main-area {
      flex: 1; padding: 24px 32px; overflow-y: auto; border-right: 2px solid #e2e8f0; display: flex; flex-direction: column;
    }
    .test-sidebar {
      width: 300px; background: #ffffff; padding: 18px; display: flex; flex-direction: column; gap: 16px; overflow-y: auto;
    }
    .cbt-h1 { font-size: 22px; font-weight: 700; text-align: center; margin-bottom: 6px; }
    .cbt-h2 { font-size: 14px; color: #64748b; text-align: center; margin-bottom: 20px; }
    .cbt-field {
      width: 100%; padding: 10px 12px; margin-bottom: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 13px; outline: none;
    }
    .cbt-field:focus { border-color: #2563eb; }
    .cbt-btn-primary {
      width: 100%; padding: 10px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .cbt-btn-primary:hover { background: #1d4ed8; }
    .cbt-btn-secondary {
      width: 100%; padding: 10px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer;
    }
    .cbt-btn-secondary:hover { background: #cbd5e1; }
    .cbt-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px;
    }
    .cbt-selection-card {
      background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px 12px; text-align: center; cursor: pointer; font-weight: 600; font-size: 14px;
    }
    .cbt-selection-card:hover {
      background: #eff6ff; border-color: #3b82f6; color: #1d4ed8; transform: translateY(-2px);
    }
    .palette-legend {
      display: flex; gap: 12px; font-size: 12px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;
    }
    .legend-item { display: flex; align-items: center; gap: 6px; }
    .circle-icon { width: 14px; height: 14px; border-radius: 50%; display: inline-block; }
    .bg-attempted { background-color: #10b981; }
    .bg-unattempted { background-color: #8b5cf6; }
    .palette-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
    .palette-btn {
      padding: 9px 0; border: none; border-radius: 4px; font-weight: 700; color: white; cursor: pointer; font-size: 13px; text-align: center;
    }
    .cbt-opt-label {
      display: flex; align-items: center; padding: 13px 16px; margin-bottom: 10px; border: 1px solid #e2e8f0; border-radius: 6px; cursor: pointer; font-size: 15px;
    }
    .cbt-opt-label:hover { background: #f8fafc; }
    .cbt-opt-label input { margin-right: 12px; }
    .cbt-tabs { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px; overflow-x: auto; gap: 8px; }
    .cbt-tab-btn { padding: 8px 12px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; border-bottom: 2px solid transparent; white-space: nowrap; }
    .cbt-tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; }
    .cbt-pane { display: none; }
    .cbt-pane.active { display: block; }
    .cbt-item-chip {
      display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 5px 10px; border-radius: 20px; margin: 4px; font-size: 13px;
    }
    .cbt-item-chip span { color: #dc2626; cursor: pointer; font-weight: bold; }
    .cbt-btn-del { background: #ef4444; color: white; border: none; padding: 5px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; }
    .cbt-btn-edit { background: #3b82f6; color: white; border: none; padding: 5px 8px; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 4px; }
    .cbt-link-back { color: #2563eb; font-size: 13px; font-weight: 600; text-decoration: none; cursor: pointer; margin-bottom: 14px; display: inline-flex; align-items: center; gap: 4px; }
    .cbt-link-back:hover { text-decoration: underline; }
    .pdf-card {
      display: flex; justify-content: space-between; align-items: center; padding: 14px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 10px; background: #fff;
    }

    /* Live Preview Panel Layout */
    .preview-editor-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 14px;
    }
    @media (max-width: 768px) {
      .preview-editor-grid { grid-template-columns: 1fr; }
    }
    .preview-box-container {
      background: #f8fafc; border: 1px dashed #3b82f6; border-radius: 6px; padding: 14px;
    }
    .preview-correct-badge {
      display: inline-block; background: #10b981; color: #fff; font-size: 11px; padding: 2px 6px; border-radius: 4px; margin-left: auto;
    }

    /* Solution Box Styles */
    .solution-card {
      border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 16px; background: #fff;
    }
    .solution-card.correct-ans { border-left: 5px solid #10b981; }
    .solution-card.wrong-ans { border-left: 5px solid #ef4444; }
    .solution-card.skipped-ans { border-left: 5px solid #8b5cf6; }
    .sol-explanation-box {
      background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 6px; margin-top: 10px; font-size: 13px; color: #334155;
    }

    /* Modals */
    .cbt-modal-backdrop {
      display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.65);
      z-index: 9999; justify-content: center; align-items: center; padding: 20px;
    }
    .cbt-modal-backdrop.active { display: flex; }
    .cbt-modal-box {
      background: #ffffff; width: 100%; max-width: 440px; border-radius: 10px;
      padding: 24px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      animation: modalFadeIn 0.2s ease-out;
    }
    @keyframes modalFadeIn {
      from { transform: translateY(-15px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .cbt-modal-title { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
    .cbt-modal-text { font-size: 14px; color: #475569; line-height: 1.5; margin-bottom: 20px; }
    .cbt-modal-actions { display: flex; justify-content: flex-end; gap: 10px; }
  `;
  document.head.appendChild(styleEl);

  // 3. INJECT APPLICATION DOM STRUCTURE
  const portalDiv = document.createElement("div");
  portalDiv.id = "cbt-portal";
  portalDiv.innerHTML = `
    <div class="cbt-nav">
      <div class="cbt-logo-area">
        <span class="cbt-logo-badge" id="dom-brand-badge"></span>
        <span class="cbt-brand-name" id="dom-brand-name"></span>
      </div>
      <div class="cbt-nav-actions">
        <!-- Guest Buttons -->
        <button class="cbt-btn-pay" id="btn-open-payment">Payment & Register</button>
        <button class="cbt-btn-admin-nav" id="btn-open-admin">Admin Portal</button>
        
        <!-- Candidate Hover Menu -->
        <div class="cbt-profile-menu-container" id="cbt-candidate-menu-wrapper">
          <div class="cbt-candidate-badge-logo" id="dom-candidate-logo-btn">
            <span id="dom-cand-logo-text">🎓 AW</span>
            <span style="font-size:10px;">▼</span>
          </div>

          <div class="cbt-profile-dropdown">
            <div style="font-size:15px; font-weight:800; color:#0f172a; margin-bottom:2px;" id="drop-display-username">Candidate</div>
            <div style="font-size:12px; color:#64748b; margin-bottom:10px;">Status: <span style="color:#10b981; font-weight:700;">Verified Active</span></div>

            <div class="drop-info-title">Contact & Subscription</div>
            <div class="drop-detail-row">
              <span style="color:#64748b;">Phone:</span>
              <span style="font-weight:600;" id="drop-display-phone">+91 ----------</span>
            </div>
            <div class="drop-detail-row">
              <span style="color:#64748b;">Fee Paid:</span>
              <span style="font-weight:700; color:#10b981;" id="drop-display-price">₹ 0.00</span>
            </div>
            <div class="drop-detail-row">
              <span style="color:#64748b;">Coupon Used:</span>
              <span style="font-weight:600;" id="drop-display-coupon">None</span>
            </div>

            <div class="drop-divider"></div>

            <div class="drop-info-title">Performance Summary</div>
            <div id="drop-perf-summary" style="font-size:12px; color:#475569; margin-bottom:10px;">No tests taken yet.</div>

            <div class="drop-divider"></div>

            <div class="drop-info-title">Update Candidate Credentials</div>
            <input type="text" id="drop-edit-name" class="cbt-field" placeholder="Change Display Name" />
            <input type="password" id="drop-edit-pass" class="cbt-field" placeholder="Set New Password" />
            <button class="cbt-btn-primary" id="btn-drop-save-credentials" style="margin-bottom:8px;">Update Credentials</button>
            <button class="cbt-btn-secondary" id="btn-drop-logout" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca;">Logout Session</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Login Window -->
    <div id="win-1" class="cbt-view">
      <div class="cbt-h1">Candidate Examination Login</div>
      <div class="cbt-h2">Registration is strictly required to login (Except Admin)</div>
      <input type="text" id="login-username" class="cbt-field" placeholder="Candidate Username" />
      <input type="password" id="login-password" class="cbt-field" placeholder="Candidate Password" />
      <button class="cbt-btn-primary" id="btn-action-login">Login to Portal</button>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; font-size:13px;">
        <span class="cbt-link-back" id="link-open-forgot" style="margin:0;">Forgot Password?</span>
        <span style="color:#64748b;">New student? Click "Payment & Register"</span>
      </div>
    </div>

    <!-- Forgot Password Window -->
    <div id="win-forgot" class="cbt-view">
      <span class="cbt-link-back" id="link-back-login-from-forgot">&larr; Back to Login</span>
      <div id="forgot-step-1">
        <div class="cbt-h1">Reset Candidate Password</div>
        <div class="cbt-h2">Enter your registered 10-digit mobile number</div>
        <input type="text" id="forgot-mobile" class="cbt-field" placeholder="10 Digit Mobile Number" />
        <button class="cbt-btn-primary" id="btn-forgot-send-otp">Send Password Reset OTP</button>
      </div>
      <div id="forgot-step-2" style="display:none;">
        <div class="cbt-h1">Enter OTP & New Password</div>
        <div class="cbt-h2">Verify identity and choose a secure password</div>
        <input type="text" id="forgot-otp-input" class="cbt-field" placeholder="Enter Received 4-Digit OTP" />
        <input type="password" id="forgot-new-password" class="cbt-field" placeholder="Enter New Password" />
        <button class="cbt-btn-primary" id="btn-forgot-confirm">Update & Reset Password</button>
      </div>
    </div>

    <!-- Registration Window -->
    <div id="win-register" class="cbt-view">
      <span class="cbt-link-back" id="link-back-login">&larr; Back to Login</span>
      <div id="pay-step-1">
        <div class="cbt-h1">Registration Fee Payment</div>
        <div class="cbt-h2">Pay application fee to unlock candidate credentials</div>
        
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:6px; margin: 16px 0; text-align:center;">
          <div style="font-size:14px; color:#64748b;">Standard Enrollment Fee:</div>
          <div style="font-size:28px; font-weight:800; color:#10b981;" id="dom-checkout-price">₹ 0.00</div>
          <div style="font-size:12px; color:#059669; font-weight:600; display:none;" id="dom-discount-info"></div>
        </div>

        <div style="display:flex; gap:8px; margin-bottom:14px;">
          <input type="text" id="coupon-code-input" class="cbt-field" style="margin:0;" placeholder="Have a Coupon Code?" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-apply-coupon">Apply</button>
        </div>

        <button class="cbt-btn-primary" id="btn-mock-pay">Pay & Continue to Verification</button>
      </div>

      <div id="pay-step-2" style="display:none;">
        <div class="cbt-h1">OTP Mobile Verification</div>
        <div class="cbt-h2">Enter your 10-digit mobile number</div>
        <input type="text" id="reg-mobile" class="cbt-field" placeholder="10 Digit Mobile Number" />
        <button class="cbt-btn-primary" id="btn-send-otp">Send Verification OTP</button>
      </div>

      <div id="pay-step-3" style="display:none;">
        <div class="cbt-h1">Create Candidate Account</div>
        <div class="cbt-h2">Verify OTP & set your login username/password</div>
        <input type="text" id="reg-otp" class="cbt-field" placeholder="Enter Received OTP" />
        <input type="text" id="reg-username" class="cbt-field" placeholder="Choose Unique Username" />
        <input type="password" id="reg-password" class="cbt-field" placeholder="Create Secret Password" />
        <button class="cbt-btn-primary" id="btn-complete-reg">Confirm & Create Account</button>
      </div>
    </div>

    <!-- Window 2: Topic Selection (Candidate Main Dashboard) -->
    <div id="win-2" class="cbt-view">
      <div class="cbt-h1">Welcome, start your practice</div>
      <div class="cbt-h2">Selection Your Topic</div>
      <div class="cbt-grid" id="dom-win2-topics"></div>

      <div style="border-top:2px solid #f1f5f9; padding-top:16px; margin-top:20px;">
        <div style="font-size:16px; font-weight:700; margin-bottom:10px;">Study Material & PDF Notes</div>
        <div id="dom-notes-container"></div>
      </div>
    </div>

    <!-- Window 3: Category & Set Selection -->
    <div id="win-3" class="cbt-view">
      <span class="cbt-link-back" id="link-back-topics">&larr; Back to Topics</span>
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #f1f5f9; padding-bottom:8px; margin-bottom:14px;">
        <span id="win3-topic-heading" style="font-weight:700; font-size:18px;"></span>
        <span style="color:#dc2626; font-weight:700;" id="win3-time-preview">Time : 30:00 min</span>
      </div>
      <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:8px;">Paper Categories / Test Types:</div>
      <div class="cbt-grid" id="dom-win3-paper-types"></div>
      <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:8px;">Practice Sets:</div>
      <div class="cbt-grid" id="dom-win3-practice-sets"></div>
    </div>

    <!-- Window 4: Exam Terminal -->
    <div id="win-4" class="cbt-view">
      <div style="display:flex; justify-content:space-between; align-items:center; background:#0f172a; color:#fff; padding:10px 24px;">
        <div style="display:flex; align-items:center; gap:16px;">
          <button id="btn-back-from-exam" style="background:#334155; color:#fff; border:none; padding:5px 10px; border-radius:4px; font-size:12px; cursor:pointer; font-weight:600;">&larr; Exit Test</button>
          <div style="font-weight:700;" id="win4-banner">Exam Terminal</div>
        </div>
        <div style="font-size:18px; font-weight:800; color:#ef4444;" id="win4-clock">30:00</div>
      </div>
      <div class="test-fullscreen-body">
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
        <div class="test-sidebar">
          <div style="font-weight:700; font-size:15px;">Question Palette</div>
          <div class="palette-legend">
            <div class="legend-item">
              <span class="circle-icon bg-attempted"></span> Attempted: <span id="stat-attempted" style="color:#10b981;">0</span>
            </div>
            <div class="legend-item">
              <span class="circle-icon bg-unattempted"></span> Unattempted: <span id="stat-unattempted" style="color:#8b5cf6;">0</span>
            </div>
          </div>
          <div style="font-size:11px; font-weight:600; color:#64748b;">Click number to jump to question:</div>
          <div class="palette-grid" id="dom-palette-grid"></div>
        </div>
      </div>
    </div>

    <!-- Result Window -->
    <div id="win-result" class="cbt-view">
      <div class="cbt-h1">Examination Result</div>
      <div class="cbt-h2">Review your test score and performance analysis</div>
      <div id="dom-result-stats" style="text-align:center; margin: 24px 0;"></div>
      <div style="display:flex; gap:10px; justify-content:center;">
        <button class="cbt-btn-primary" id="btn-view-solutions" style="background:#10b981; max-width:240px;">View Detailed Solutions</button>
        <button class="cbt-btn-secondary" id="btn-restart-flow" style="max-width:240px;">Back to Topics</button>
      </div>
    </div>

    <!-- Detailed Solutions Review Window -->
    <div id="win-solutions" class="cbt-view">
      <span class="cbt-link-back" id="link-back-result">&larr; Back to Result</span>
      <div class="cbt-h1" style="text-align:left; margin-bottom:4px;">Test Questions & Solutions</div>
      <div class="cbt-h2" style="text-align:left; margin-bottom:16px;" id="dom-solutions-header">Detailed breakdown of answers:</div>
      <div id="dom-solutions-container"></div>
      <button class="cbt-btn-primary" id="btn-sol-back-topics" style="margin-top:16px;">Finish & Back to Topics</button>
    </div>

    <!-- Admin Authentication -->
    <div id="win-admin-auth" class="cbt-view">
      <span class="cbt-link-back" id="link-admin-back-login">&larr; Back to Login</span>
      <div class="cbt-h1">Admin Authentication</div>
      <div class="cbt-h2">Enter admin access PIN to manage portal</div>
      <input type="password" id="admin-pass-input" class="cbt-field" placeholder="Enter Admin Password / PIN" />
      <button class="cbt-btn-primary" id="btn-admin-verify">Unlock Control Dashboard</button>
    </div>

    <!-- Admin Dashboard -->
    <div id="win-admin-dash" class="cbt-view">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #f1f5f9; padding-bottom:10px; margin-bottom:16px;">
        <span style="font-weight:700; font-size:18px;">Administrative Control Center</span>
        <button class="cbt-btn-del" id="btn-admin-exit">Exit to Topics</button>
      </div>
      <div class="cbt-tabs">
        <button class="cbt-tab-btn active" data-pane="pane-pricing">Pricing & Coupons</button>
        <button class="cbt-tab-btn" data-pane="pane-branding">Branding Identity</button>
        <button class="cbt-tab-btn" data-pane="pane-w2">Window 2: Topics</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-papers">Window 3: Categories</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-sets">Window 3: Sets</button>
        <button class="cbt-tab-btn" data-pane="pane-w4-questions">Window 4: Questions</button>
        <button class="cbt-tab-btn" data-pane="pane-notes">PDF & Notes</button>
        <button class="cbt-tab-btn" data-pane="pane-security">Admin PIN & Time</button>
      </div>

      <div id="pane-pricing" class="cbt-pane active">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px; margin-bottom:16px;">
          <div style="font-weight:600; margin-bottom:8px;">Base Enrollment Fee (₹):</div>
          <div style="display:flex; gap:8px;">
            <input type="number" id="adm-base-price" class="cbt-field" style="margin:0;" min="0" step="1" />
            <button class="cbt-btn-primary" style="width:140px;" id="btn-adm-save-price">Save Price</button>
          </div>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px; margin-bottom:16px;">
          <div style="font-weight:600; margin-bottom:8px;">Create Discount Coupon:</div>
          <div style="display:grid; grid-template-columns: 2fr 1fr 120px; gap:8px;">
            <input type="text" id="adm-coupon-code" class="cbt-field" style="margin:0;" placeholder="Coupon Code (e.g. SAVE20)" />
            <input type="number" id="adm-coupon-pct" class="cbt-field" style="margin:0;" placeholder="Discount %" min="1" max="100" />
            <button class="cbt-btn-primary" id="btn-adm-add-coupon">Add Coupon</button>
          </div>
        </div>

        <div style="font-weight:600; margin-bottom:8px;">Active Coupon Codes:</div>
        <div id="dom-adm-coupons-list"></div>
      </div>

      <div id="pane-branding" class="cbt-pane">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px;">
          <div style="font-weight:600; margin-bottom:6px;">Website / Brand Name:</div>
          <input type="text" id="adm-brand-name" class="cbt-field" placeholder="e.g. Akash Workshop" />

          <div style="font-weight:600; margin-bottom:6px;">Logo Badge Text:</div>
          <input type="text" id="adm-brand-badge" class="cbt-field" placeholder="e.g. AW" />

          <div style="font-weight:600; margin-bottom:6px;">Favicon Icon URL / SVG Data:</div>
          <input type="text" id="adm-brand-favicon" class="cbt-field" placeholder="Image URL or SVG data URI" />

          <button class="cbt-btn-primary" id="btn-adm-save-branding">Update Branding & Identity</button>
        </div>
      </div>

      <div id="pane-w2" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:6px;">Add New Topic:</div>
        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <input type="text" id="adm-add-topic" class="cbt-field" style="margin:0;" placeholder="Topic Name" />
          <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-add-topic">Add</button>
        </div>
        <div id="dom-adm-topic-chips"></div>
      </div>

      <div id="pane-w3-papers" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:6px;">Add Paper Type / Category:</div>
        <div style="display:flex; gap:8px; margin-bottom:16px;">
          <input type="text" id="adm-add-category" class="cbt-field" style="margin:0;" placeholder="e.g. Lines" />
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
        <div class="preview-editor-grid">
          <!-- Editor Controls -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span id="adm-form-mode" style="font-weight:700; color:#2563eb; font-size:13px;">CREATE NEW QUESTION</span>
              <button id="btn-adm-cancel-edit" style="display:none; background:#94a3b8; color:#fff; border:none; border-radius:4px; padding:3px 8px; font-size:11px; cursor:pointer;">Cancel Edit</button>
            </div>
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
            <textarea id="adm-q-solution" class="cbt-field" style="resize:vertical; height:70px;" placeholder="Detailed Solution / Explanation"></textarea>
            <button class="cbt-btn-primary" id="btn-adm-save-q">Save Question</button>
          </div>

          <!-- Live Interactive Preview Panel -->
          <div class="preview-box-container">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #cbd5e1; padding-bottom:6px; margin-bottom:12px;">
              <span style="font-weight:700; font-size:13px; color:#1e293b;">LIVE CANDIDATE PREVIEW</span>
              <span id="preview-meta-tag" style="font-size:11px; color:#64748b; font-weight:600;">[Topic • Category]</span>
            </div>
            <div id="preview-live-text" style="font-weight:700; font-size:15px; margin-bottom:12px; color:#0f172a; min-height:40px;">
              Question preview will render here as you type...
            </div>
            <div id="preview-live-options"></div>
            <div id="preview-live-solution" style="margin-top:10px; font-size:12px; color:#475569; background:#e2e8f0; padding:8px; border-radius:4px; display:none;"></div>
          </div>
        </div>

        <div style="font-weight:600; margin:12px 0 8px 0; font-size:14px;">Existing Question Pool:</div>
        <div style="max-height:220px; overflow-y:auto; border:1px solid #e2e8f0; border-radius:6px;">
          <table style="width:100%; border-collapse:collapse; font-size:13px;" id="dom-table-q-list"></table>
        </div>
      </div>

      <div id="pane-notes" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:6px;">Add PDF / Study Notes Link:</div>
        <input type="text" id="adm-pdf-title" class="cbt-field" placeholder="Document Title (e.g. Master Notes)" />
        <input type="text" id="adm-pdf-url" class="cbt-field" placeholder="Direct PDF or Google Drive URL" />
        <button class="cbt-btn-primary" id="btn-adm-save-pdf" style="margin-bottom:16px;">Add Study Document</button>
        <div style="font-weight:600; margin-bottom:8px;">Current Study Materials:</div>
        <div id="dom-adm-pdf-list"></div>
      </div>

      <div id="pane-security" class="cbt-pane">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px; margin-bottom:16px;">
          <div style="font-weight:600; margin-bottom:8px;">Reset Admin PIN / Password:</div>
          <input type="password" id="adm-new-pin" class="cbt-field" placeholder="Enter New Secret PIN" />
          <button class="cbt-btn-primary" id="btn-adm-reset-pin">Update Admin PIN</button>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px;">
          <div style="font-weight:600; margin-bottom:8px;">Exam Duration (Minutes):</div>
          <input type="number" id="adm-exam-min" class="cbt-field" min="1" max="180" />
          <button class="cbt-btn-primary" id="btn-adm-save-time">Save Duration</button>
        </div>
      </div>
    </div>

    <!-- In-App Notification Modal Window -->
    <div id="dom-cbt-modal" class="cbt-modal-backdrop">
      <div class="cbt-modal-box">
        <div class="cbt-modal-title" id="cbt-modal-heading">Notification</div>
        <div class="cbt-modal-text" id="cbt-modal-body">Message content goes here.</div>
        <div class="cbt-modal-actions" id="cbt-modal-btns"></div>
      </div>
    </div>
  `;
  document.body.appendChild(portalDiv);
  applyBrandIdentity();

  // Dialog & Notification Modal
  function showInAppMessage(title, message, callback) {
    const modal = document.getElementById("dom-cbt-modal");
    const h = document.getElementById("cbt-modal-heading");
    const b = document.getElementById("cbt-modal-body");
    const btns = document.getElementById("cbt-modal-btns");

    h.innerText = title;
    b.innerText = message;
    btns.innerHTML = `<button class="cbt-btn-primary" style="width:auto; padding:8px 20px;" id="cbt-modal-ok">OK</button>`;
    modal.classList.add("active");

    document.getElementById("cbt-modal-ok").onclick = () => {
      modal.classList.remove("active");
      if (callback) callback();
    };
  }

  function showInAppConfirm(title, message, onConfirm, onCancel) {
    const modal = document.getElementById("dom-cbt-modal");
    const h = document.getElementById("cbt-modal-heading");
    const b = document.getElementById("cbt-modal-body");
    const btns = document.getElementById("cbt-modal-btns");

    h.innerText = title;
    b.innerText = message;
    btns.innerHTML = `
      <button class="cbt-btn-secondary" style="width:auto; padding:8px 18px;" id="cbt-modal-cancel">Cancel</button>
      <button class="cbt-btn-primary" style="width:auto; padding:8px 18px; background:#dc2626;" id="cbt-modal-yes">Confirm</button>
    `;
    modal.classList.add("active");

    document.getElementById("cbt-modal-yes").onclick = () => {
      modal.classList.remove("active");
      if (onConfirm) onConfirm();
    };
    document.getElementById("cbt-modal-cancel").onclick = () => {
      modal.classList.remove("active");
      if (onCancel) onCancel();
    };
  }

  function cbtNavigate(targetId) {
    document.querySelectorAll(".cbt-view").forEach((win) => win.classList.remove("active"));
    const el = document.getElementById(targetId);
    if (el) el.classList.add("active");
  }

  // Dynamic Navbar Logic: Handles Candidate Logo & Hides Admin/Pay
  function updateNavbarAuthState() {
    const btnPay = document.getElementById("btn-open-payment");
    const btnAdmin = document.getElementById("btn-open-admin");
    const menuContainer = document.getElementById("cbt-candidate-menu-wrapper");

    if (activeUser) {
      btnPay.style.display = "none";
      btnAdmin.style.display = "none";
      menuContainer.style.display = "block";
      document.getElementById("dom-cand-logo-text").innerText = `🎓 ${brandConfig.badge} • ${activeUser.username}`;

      document.getElementById("drop-display-username").innerText = activeUser.username;
      document.getElementById("drop-display-phone").innerText = activeUser.mobile ? `+91 ${activeUser.mobile}` : "Not Available";
      document.getElementById("drop-display-price").innerText = activeUser.purchaseAmount ? `₹ ${activeUser.purchaseAmount}` : `₹ ${storePrice.toFixed(2)}`;
      document.getElementById("drop-display-coupon").innerText = activeUser.appliedCoupon || "Direct Payment";

      // Render performance stats in profile
      const candidateStats = userPerformance[activeUser.username];
      const perfEl = document.getElementById("drop-perf-summary");
      if (candidateStats && candidateStats.length > 0) {
        const last = candidateStats[candidateStats.length - 1];
        perfEl.innerHTML = `Tests Given: <b>${candidateStats.length}</b><br>Last Score: <b>${last.score}/${last.total} (${last.pct}%)</b> [${last.category}]`;
      } else {
        perfEl.innerHTML = "No tests taken yet.";
      }

      document.getElementById("drop-edit-name").value = activeUser.username;
      document.getElementById("drop-edit-pass").value = "";
    } else {
      btnPay.style.display = "block";
      btnAdmin.style.display = "block";
      menuContainer.style.display = "none";
    }
  }

  // Update Credentials from Dropdown
  document.getElementById("btn-drop-save-credentials").addEventListener("click", () => {
    if (!activeUser) return;
    const newName = document.getElementById("drop-edit-name").value.trim();
    const newPass = document.getElementById("drop-edit-pass").value.trim();

    if (!newName) {
      showInAppMessage("Validation Error", "Candidate name cannot be empty.");
      return;
    }

    if (newName.toLowerCase() !== activeUser.username.toLowerCase()) {
      const exists = registeredUsers.some((u) => u.username.toLowerCase() === newName.toLowerCase());
      if (exists) {
        showInAppMessage("Duplicate Name", "This username is already taken. Please choose another.");
        return;
      }
    }

    const oldName = activeUser.username;
    const idx = registeredUsers.findIndex((u) => u.username === oldName);
    if (idx !== -1) {
      registeredUsers[idx].username = newName;
      if (newPass) registeredUsers[idx].password = newPass;
      activeUser = registeredUsers[idx];

      // Migrate performance key if username changed
      if (oldName !== newName && userPerformance[oldName]) {
        userPerformance[newName] = userPerformance[oldName];
        delete userPerformance[oldName];
      }

      syncAllData();
      updateNavbarAuthState();
      showInAppMessage("Account Updated", "Your profile details have been saved successfully!");
    }
  });

  // Explicit Candidate Logout Handler
  function candidateLogout() {
    activeUser = null;
    candidateAnswers = {};
    activeExamQuestions = [];
    clearInterval(countdownRef);

    syncAllData();
    updateNavbarAuthState();

    document.getElementById("login-username").value = "";
    document.getElementById("login-password").value = "";

    cbtNavigate("win-1");
    showInAppMessage("Logged Out", "You have been logged out successfully.");
  }

  document.getElementById("btn-drop-logout").addEventListener("click", () => {
    showInAppConfirm("Logout Confirmation", "Do you want to log out of your session?", candidateLogout);
  });

  // Forms Reset
  function resetRegistrationForm() {
    appliedDiscountPercent = 0;
    generatedOTP = "";
    lastTransactionInfo = { amount: "0.00", coupon: "None" };
    document.getElementById("coupon-code-input").value = "";
    document.getElementById("reg-mobile").value = "";
    document.getElementById("reg-otp").value = "";
    document.getElementById("reg-username").value = "";
    document.getElementById("reg-password").value = "";
    document.getElementById("pay-step-1").style.display = "block";
    document.getElementById("pay-step-2").style.display = "none";
    document.getElementById("pay-step-3").style.display = "none";
    updateCheckoutDisplay();
  }

  function resetForgotPasswordForm() {
    resetOTP = "";
    resetMobileTarget = "";
    document.getElementById("forgot-mobile").value = "";
    document.getElementById("forgot-otp-input").value = "";
    document.getElementById("forgot-new-password").value = "";
    document.getElementById("forgot-step-1").style.display = "block";
    document.getElementById("forgot-step-2").style.display = "none";
  }

  // 4. REGISTRATION, COUPONS & PAYMENT
  function updateCheckoutDisplay() {
    const finalPrice = Math.max(0, storePrice - (storePrice * (appliedDiscountPercent / 100)));
    document.getElementById("dom-checkout-price").innerText = `₹ ${finalPrice.toFixed(2)}`;
    const discInfo = document.getElementById("dom-discount-info");
    if (appliedDiscountPercent > 0) {
      discInfo.style.display = "block";
      discInfo.innerText = `Coupon Applied: ${appliedDiscountPercent}% Discount!`;
    } else {
      discInfo.style.display = "none";
    }
  }

  document.getElementById("btn-open-payment").addEventListener("click", () => {
    resetRegistrationForm();
    cbtNavigate("win-register");
  });

  document.getElementById("btn-apply-coupon").addEventListener("click", () => {
    const code = document.getElementById("coupon-code-input").value.trim().toUpperCase();
    const matched = storeCoupons.find((c) => c.code.toUpperCase() === code);
    if (matched) {
      appliedDiscountPercent = matched.discount;
      updateCheckoutDisplay();
      showInAppMessage("Coupon Applied", `Success: ${matched.discount}% discount applied!`);
    } else {
      showInAppMessage("Coupon Error", "Invalid or expired coupon code.");
    }
  });

  document.getElementById("link-back-login").addEventListener("click", () => {
    resetRegistrationForm();
    cbtNavigate("win-1");
  });

  document.getElementById("btn-mock-pay").addEventListener("click", () => {
    const finalPrice = Math.max(0, storePrice - (storePrice * (appliedDiscountPercent / 100)));
    const code = document.getElementById("coupon-code-input").value.trim().toUpperCase();
    lastTransactionInfo = {
      amount: finalPrice.toFixed(2),
      coupon: code ? `${code} (${appliedDiscountPercent}%)` : "None"
    };

    showInAppMessage("Payment Successful", `Payment of ₹ ${finalPrice.toFixed(2)} completed successfully!`, () => {
      document.getElementById("pay-step-1").style.display = "none";
      document.getElementById("pay-step-2").style.display = "block";
    });
  });

  document.getElementById("btn-send-otp").addEventListener("click", () => {
    const mobile = document.getElementById("reg-mobile").value.trim();
    if (mobile.length !== 10 || isNaN(mobile)) {
      showInAppMessage("Invalid Input", "Please enter a valid 10-digit mobile number.");
      return;
    }
    generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
    showInAppMessage("Mobile Verification", `${brandConfig.name} Verification OTP: ${generatedOTP}`, () => {
      document.getElementById("pay-step-2").style.display = "none";
      document.getElementById("pay-step-3").style.display = "block";
    });
  });

  document.getElementById("btn-complete-reg").addEventListener("click", () => {
    const mobile = document.getElementById("reg-mobile").value.trim();
    const enteredOTP = document.getElementById("reg-otp").value.trim();
    const user = document.getElementById("reg-username").value.trim();
    const pass = document.getElementById("reg-password").value.trim();

    if (enteredOTP !== generatedOTP) {
      showInAppMessage("OTP Error", "Invalid OTP code entered.");
      return;
    }
    if (!user || !pass) {
      showInAppMessage("Missing Information", "Both username and password are required.");
      return;
    }
    if (registeredUsers.some((u) => u.username.toLowerCase() === user.toLowerCase())) {
      showInAppMessage("Duplicate Account", "This username is already taken. Please choose another.");
      return;
    }

    registeredUsers.push({
      username: user,
      password: pass,
      mobile: mobile,
      purchaseAmount: lastTransactionInfo.amount,
      appliedCoupon: lastTransactionInfo.coupon
    });
    syncAllData();

    showInAppMessage("Registration Successful", "Your account has been created successfully! Please log in.", () => {
      resetRegistrationForm();
      cbtNavigate("win-1");
    });
  });

  // 5. FORGOT PASSWORD WORKFLOW
  document.getElementById("link-open-forgot").addEventListener("click", () => {
    resetForgotPasswordForm();
    cbtNavigate("win-forgot");
  });

  document.getElementById("link-back-login-from-forgot").addEventListener("click", () => {
    resetForgotPasswordForm();
    cbtNavigate("win-1");
  });

  document.getElementById("btn-forgot-send-otp").addEventListener("click", () => {
    const mobile = document.getElementById("forgot-mobile").value.trim();
    if (mobile.length !== 10 || isNaN(mobile)) {
      showInAppMessage("Input Error", "Enter a valid 10-digit mobile number.");
      return;
    }

    const userObj = registeredUsers.find((u) => u.mobile === mobile);
    if (!userObj) {
      showInAppMessage("User Not Found", "No account registered with this mobile number.");
      return;
    }

    resetMobileTarget = mobile;
    resetOTP = Math.floor(1000 + Math.random() * 9000).toString();
    showInAppMessage("Password Reset OTP", `Your Password Reset OTP: ${resetOTP} (Username: ${userObj.username})`, () => {
      document.getElementById("forgot-step-1").style.display = "none";
      document.getElementById("forgot-step-2").style.display = "block";
    });
  });

  document.getElementById("btn-forgot-confirm").addEventListener("click", () => {
    const otp = document.getElementById("forgot-otp-input").value.trim();
    const newPass = document.getElementById("forgot-new-password").value.trim();

    if (otp !== resetOTP) {
      showInAppMessage("Security Error", "Incorrect OTP. Verification failed.");
      return;
    }
    if (!newPass || newPass.length < 4) {
      showInAppMessage("Password Requirements", "Password must be at least 4 characters long.");
      return;
    }

    const userObj = registeredUsers.find((u) => u.mobile === resetMobileTarget);
    if (userObj) {
      userObj.password = newPass;
      syncAllData();
      showInAppMessage("Password Updated", "Your password has been changed successfully. You can now log in.", () => {
        resetForgotPasswordForm();
        cbtNavigate("win-1");
      });
    }
  });

  // 6. LOGIN HANDLERS
  document.getElementById("btn-action-login").addEventListener("click", () => {
    const u = document.getElementById("login-username").value.trim();
    const p = document.getElementById("login-password").value.trim();

    const matched = registeredUsers.find((item) => item.username === u && item.password === p);
    if (!matched) {
      showInAppMessage("Access Denied", "Invalid username or password. Please verify credentials or register.");
      return;
    }

    activeUser = matched;
    syncAllData();
    updateNavbarAuthState();

    cbtRenderWindow2();
    cbtNavigate("win-2");
  });

  document.getElementById("btn-open-admin").addEventListener("click", () => {
    cbtNavigate("win-admin-auth");
  });

  document.getElementById("link-admin-back-login").addEventListener("click", () => cbtNavigate("win-1"));

  document.getElementById("btn-admin-verify").addEventListener("click", () => {
    const entered = document.getElementById("admin-pass-input").value.trim();
    if (entered === adminPin) {
      document.getElementById("admin-pass-input").value = "";
      cbtNavigate("win-admin-dash");
      cbtRefreshAdmin();
    } else {
      showInAppMessage("Admin Error", "Incorrect Admin PIN / Password.");
    }
  });

  // 7. WINDOW 2 & 3 RENDERING
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
        document.getElementById("win3-time-preview").innerText = `Time : ${storeDuration}:00 min`;
        cbtRenderWindow3();
        cbtNavigate("win-3");
      };
      container.appendChild(card);
    });

    const notesContainer = document.getElementById("dom-notes-container");
    notesContainer.innerHTML = "";
    if (storeNotes.length === 0) {
      notesContainer.innerHTML = "<div style='font-size:13px; color:#64748b;'>No study PDFs uploaded yet.</div>";
    } else {
      storeNotes.forEach((n) => {
        const div = document.createElement("div");
        div.className = "pdf-card";
        div.innerHTML = `
          <div><b>${n.title}</b></div>
          <a href="${n.url}" target="_blank" style="padding:6px 14px; background:#2563eb; color:#fff; text-decoration:none; border-radius:4px; font-size:13px;">Download PDF</a>
        `;
        notesContainer.appendChild(div);
      });
    }
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

  // Candidate Navigation Back Links
  document.getElementById("link-back-topics").addEventListener("click", () => {
    cbtRenderWindow2();
    cbtNavigate("win-2");
  });

  document.getElementById("btn-back-from-exam").addEventListener("click", () => {
    showInAppConfirm("Exit Exam", "Are you sure you want to exit the current exam? Your progress will not be saved.", () => {
      clearInterval(countdownRef);
      candidateAnswers = {};
      cbtRenderWindow3();
      cbtNavigate("win-3");
    });
  });

  document.getElementById("btn-restart-flow").addEventListener("click", () => {
    cbtRenderWindow2();
    cbtNavigate("win-2");
  });

  document.getElementById("link-back-result").addEventListener("click", () => {
    cbtNavigate("win-result");
  });

  document.getElementById("btn-sol-back-topics").addEventListener("click", () => {
    cbtRenderWindow2();
    cbtNavigate("win-2");
  });

  // 8. CBT EXAM RUNTIME (Strict Category Isolation)
  function cbtLaunchTest(selectedCategory) {
    activeCategory = selectedCategory;

    // Strict Filtering: only topic AND category match
    activeExamQuestions = storeQuestions.filter(
      (q) => q.topic === activeTopic && q.category === activeCategory
    );

    if (activeExamQuestions.length === 0) {
      showInAppMessage("No Questions Found", `Currently there are no questions added for "${activeTopic}" under "${activeCategory}". Please select another category.`);
      return;
    }

    currentQuestionIndex = 0;
    candidateAnswers = {};
    remainingSeconds = storeDuration * 60;

    document.getElementById("win4-banner").innerText = `${brandConfig.name} | ${activeTopic} (${activeCategory})`;
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
        btn.classList.add("bg-attempted");
        attempted++;
      } else {
        btn.classList.add("bg-unattempted");
      }

      btn.onclick = () => {
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
      showInAppMessage("End of Exam", "You have reached the final question. Click Submit to finish.");
    }
  });

  document.getElementById("btn-submit-exam").addEventListener("click", () => {
    const checked = document.querySelector('input[name="cbt-choice"]:checked');
    if (checked) {
      candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
    }
    showInAppConfirm("Submit Exam", "Are you sure you want to finalize and submit your exam?", () => {
      cbtFinishTest();
    });
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
        showInAppMessage("Time Up!", "The allotted time has expired. Submitting exam...", () => {
          cbtFinishTest();
        });
      }
      remainingSeconds--;
    }, 1000);
  }

  function cbtFinishTest() {
    clearInterval(countdownRef);
    cbtNavigate("win-result");

    let correctCount = 0;
    activeExamQuestions.forEach((q, idx) => {
      if (candidateAnswers[idx] === q.correct) correctCount++;
    });

    const total = activeExamQuestions.length || 1;
    const attemptedCount = Object.keys(candidateAnswers).length;
    const pct = Math.round((correctCount / total) * 100);

    // Save Candidate Performance
    if (activeUser) {
      if (!userPerformance[activeUser.username]) {
        userPerformance[activeUser.username] = [];
      }
      userPerformance[activeUser.username].push({
        topic: activeTopic,
        category: activeCategory,
        score: correctCount,
        total: total,
        pct: pct,
        date: new Date().toLocaleDateString()
      });
      syncAllData();
      updateNavbarAuthState();
    }

    document.getElementById("dom-result-stats").innerHTML = `
      <div style="font-size:42px; font-weight:800; color:#2563eb; margin-bottom:10px;">${pct}%</div>
      <div style="font-size:16px; margin-bottom:8px;">Test: <b>${activeTopic} (${activeCategory})</b></div>
      <div style="font-size:16px; margin-bottom:8px;">Total Questions: <b>${total}</b></div>
      <div style="font-size:16px; margin-bottom:8px; color:#10b981;">Attempted: <b>${attemptedCount}</b></div>
      <div style="font-size:16px; margin-bottom:8px; color:#8b5cf6;">Unattempted: <b>${total - attemptedCount}</b></div>
      <div style="font-size:16px; font-weight:700;">Final Score: <b>${correctCount}</b> Correct</div>
    `;
  }

  // 9. DETAILED SOLUTIONS REVIEW
  document.getElementById("btn-view-solutions").addEventListener("click", () => {
    const solContainer = document.getElementById("dom-solutions-container");
    solContainer.innerHTML = "";
    document.getElementById("dom-solutions-header").innerText = `Solutions for ${activeTopic} - ${activeCategory}:`;

    activeExamQuestions.forEach((q, idx) => {
      const userAns = candidateAnswers[idx];
      const isAttempted = userAns !== undefined;
      const isCorrect = userAns === q.correct;

      let statusClass = "skipped-ans";
      let statusText = "<span style='color:#8b5cf6; font-weight:700;'>SKIPPED / UNATTEMPTED</span>";

      if (isAttempted) {
        if (isCorrect) {
          statusClass = "correct-ans";
          statusText = "<span style='color:#10b981; font-weight:700;'>CORRECT</span>";
        } else {
          statusClass = "wrong-ans";
          statusText = "<span style='color:#ef4444; font-weight:700;'>INCORRECT</span>";
        }
      }

      const card = document.createElement("div");
      card.className = `solution-card ${statusClass}`;

      let opsHtml = "";
      q.options.forEach((opt, oIdx) => {
        let optStyle = "padding:6px 10px; border-radius:4px; margin-bottom:4px; font-size:13px;";
        if (oIdx === q.correct) {
          optStyle += " background:#dcfce7; border:1px solid #86efac; font-weight:700; color:#166534;";
        } else if (isAttempted && userAns === oIdx) {
          optStyle += " background:#fee2e2; border:1px solid #fca5a5; color:#991b1b;";
        } else {
          optStyle += " background:#f8fafc; border:1px solid #e2e8f0;";
        }

        const isUserChoice = isAttempted && userAns === oIdx ? " <b>(Your Answer)</b>" : "";
        const isRightChoice = oIdx === q.correct ? " <b>(Correct Answer)</b>" : "";

        opsHtml += `<div style="${optStyle}">${String.fromCharCode(65 + oIdx)}) ${opt} ${isUserChoice} ${isRightChoice}</div>`;
      });

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
          <span style="font-weight:700; font-size:14px; color:#475569;">Question ${idx + 1}</span>
          <div>${statusText}</div>
        </div>
        <div style="font-size:15px; font-weight:700; margin-bottom:12px;">${q.text}</div>
        <div style="margin-bottom:10px;">${opsHtml}</div>
        <div class="sol-explanation-box">
          <b>Detailed Solution / Note:</b><br>
          ${q.solution ? q.solution : "No detailed explanation has been added for this question."}
        </div>
      `;
      solContainer.appendChild(card);
    });

    cbtNavigate("win-solutions");
  });

  // 10. ADMIN LIVE PREVIEW LOGIC
  function updateAdminLivePreview() {
    const topic = document.getElementById("adm-sel-topic").value || "Topic";
    const cat = document.getElementById("adm-sel-cat").value || "Category";
    const title = document.getElementById("adm-q-title").value.trim() || "Type question text to see it live...";
    const o0 = document.getElementById("adm-q-op0").value.trim() || "Option A text";
    const o1 = document.getElementById("adm-q-op1").value.trim() || "Option B text";
    const o2 = document.getElementById("adm-q-op2").value.trim() || "Option C text";
    const o3 = document.getElementById("adm-q-op3").value.trim() || "Option D text";
    const sol = document.getElementById("adm-q-solution").value.trim();
    const correct = parseInt(document.getElementById("adm-q-ans").value, 10);

    document.getElementById("preview-meta-tag").innerText = `[${topic} • ${cat}]`;
    document.getElementById("preview-live-text").innerText = title;

    const ops = [o0, o1, o2, o3];
    let html = "";
    ops.forEach((text, i) => {
      const isCorrect = correct === i;
      html += `
        <div class="cbt-opt-label" style="background:#ffffff; border-color:${isCorrect ? '#10b981' : '#e2e8f0'};">
          <input type="radio" name="preview-demo-radio" ${isCorrect ? "checked" : ""} disabled />
          <span style="font-weight:${isCorrect ? '700' : 'normal'}; color:${isCorrect ? '#059669' : 'inherit'};">
            ${String.fromCharCode(65 + i)}) ${text}
          </span>
          ${isCorrect ? '<span class="preview-correct-badge">Correct Answer</span>' : ''}
        </div>
      `;
    });
    document.getElementById("preview-live-options").innerHTML = html;

    const solEl = document.getElementById("preview-live-solution");
    if (sol) {
      solEl.style.display = "block";
      solEl.innerHTML = `<b>Solution Note:</b> ${sol}`;
    } else {
      solEl.style.display = "none";
    }
  }

  function resetQuestionEditor() {
    editingQuestionIndex = null;
    document.getElementById("adm-form-mode").innerText = "CREATE NEW QUESTION";
    document.getElementById("adm-form-mode").style.color = "#2563eb";
    document.getElementById("btn-adm-save-q").innerText = "Save Question";
    document.getElementById("btn-adm-cancel-edit").style.display = "none";

    document.getElementById("adm-q-title").value = "";
    document.getElementById("adm-q-op0").value = "";
    document.getElementById("adm-q-op1").value = "";
    document.getElementById("adm-q-op2").value = "";
    document.getElementById("adm-q-op3").value = "";
    document.getElementById("adm-q-solution").value = "";
    document.getElementById("adm-q-ans").value = "0";
    updateAdminLivePreview();
  }

  ["adm-sel-topic", "adm-sel-cat", "adm-q-title", "adm-q-op0", "adm-q-op1", "adm-q-op2", "adm-q-op3", "adm-q-solution", "adm-q-ans"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateAdminLivePreview);
      el.addEventListener("change", updateAdminLivePreview);
    }
  });

  document.getElementById("btn-adm-cancel-edit").addEventListener("click", resetQuestionEditor);

  // 11. ADMIN DASHBOARD ACTIONS
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
    if (activeUser) {
      cbtRenderWindow2();
      cbtNavigate("win-2");
    } else {
      cbtNavigate("win-1");
    }
  });

  function cbtRefreshAdmin() {
    document.getElementById("adm-base-price").value = storePrice;
    const cList = document.getElementById("dom-adm-coupons-list");
    cList.innerHTML = "";
    storeCoupons.forEach((c, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${c.code} (${c.discount}%) <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        storeCoupons.splice(idx, 1);
        syncAllData();
        cbtRefreshAdmin();
      };
      cList.appendChild(chip);
    });

    document.getElementById("adm-brand-name").value = brandConfig.name;
    document.getElementById("adm-brand-badge").value = brandConfig.badge;
    document.getElementById("adm-brand-favicon").value = brandConfig.favicon;

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
        syncAllData();
        cbtRefreshAdmin();
      };
      tChips.appendChild(chip);

      const o = document.createElement("option");
      o.value = t; o.innerText = t;
      selTopic.appendChild(o);
    });

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
        syncAllData();
        cbtRefreshAdmin();
      };
      cChips.appendChild(chip);

      const o = document.createElement("option");
      o.value = c; o.innerText = c;
      selCat.appendChild(o);
    });

    const sChips = document.getElementById("dom-adm-set-chips");
    sChips.innerHTML = "";
    storeSets.forEach((s, idx) => {
      const chip = document.createElement("div");
      chip.className = "cbt-item-chip";
      chip.innerHTML = `${s} <span>&times;</span>`;
      chip.querySelector("span").onclick = () => {
        storeSets.splice(idx, 1);
        syncAllData();
        cbtRefreshAdmin();
      };
      sChips.appendChild(chip);
    });

    const qTable = document.getElementById("dom-table-q-list");
    qTable.innerHTML = "";
    storeQuestions.forEach((q, idx) => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid #e2e8f0";
      tr.innerHTML = `
        <td style="padding:8px;"><b>[${q.topic} &bull; ${q.category}]</b> ${q.text}</td>
        <td style="padding:8px; text-align:right; white-space:nowrap;">
          <button class="cbt-btn-edit">Edit</button>
          <button class="cbt-btn-del">Del</button>
        </td>
      `;
      tr.querySelector(".cbt-btn-edit").onclick = () => {
        editingQuestionIndex = idx;
        document.getElementById("adm-form-mode").innerText = `EDITING QUESTION #${idx + 1}`;
        document.getElementById("adm-form-mode").style.color = "#dc2626";
        document.getElementById("btn-adm-save-q").innerText = "Update Question";
        document.getElementById("btn-adm-cancel-edit").style.display = "inline-block";

        document.getElementById("adm-sel-topic").value = q.topic;
        document.getElementById("adm-sel-cat").value = q.category;
        document.getElementById("adm-q-title").value = q.text;
        document.getElementById("adm-q-op0").value = q.options[0] || "";
        document.getElementById("adm-q-op1").value = q.options[1] || "";
        document.getElementById("adm-q-op2").value = q.options[2] || "";
        document.getElementById("adm-q-op3").value = q.options[3] || "";
        document.getElementById("adm-q-solution").value = q.solution || "";
        document.getElementById("adm-q-ans").value = q.correct.toString();

        updateAdminLivePreview();
        document.getElementById("adm-q-title").scrollIntoView({ behavior: "smooth" });
      };

      tr.querySelector(".cbt-btn-del").onclick = () => {
        showInAppConfirm("Delete Question", "Remove this question permanently?", () => {
          storeQuestions.splice(idx, 1);
          if (editingQuestionIndex === idx) resetQuestionEditor();
          syncAllData();
          cbtRefreshAdmin();
        });
      };
      qTable.appendChild(tr);
    });

    const pdfList = document.getElementById("dom-adm-pdf-list");
    pdfList.innerHTML = "";
    storeNotes.forEach((n, idx) => {
      const div = document.createElement("div");
      div.className = "pdf-card";
      div.innerHTML = `
        <div><b>${n.title}</b></div>
        <button class="cbt-btn-del">Delete</button>
      `;
      div.querySelector("button").onclick = () => {
        storeNotes.splice(idx, 1);
        syncAllData();
        cbtRefreshAdmin();
      };
      pdfList.appendChild(div);
    });

    document.getElementById("adm-exam-min").value = storeDuration;
    updateAdminLivePreview();
  }

  // Admin Listeners
  document.getElementById("btn-adm-save-price").addEventListener("click", () => {
    const val = parseFloat(document.getElementById("adm-base-price").value);
    if (!isNaN(val) && val >= 0) {
      storePrice = val;
      syncAllData();
      showInAppMessage("Updated", `Base registration price updated to ₹ ${val.toFixed(2)}`);
    }
  });

  document.getElementById("btn-adm-add-coupon").addEventListener("click", () => {
    const code = document.getElementById("adm-coupon-code").value.trim().toUpperCase();
    const pct = parseInt(document.getElementById("adm-coupon-pct").value, 10);
    if (code && pct > 0 && pct <= 100) {
      storeCoupons.push({ code, discount: pct });
      syncAllData();
      cbtRefreshAdmin();
      document.getElementById("adm-coupon-code").value = "";
      document.getElementById("adm-coupon-pct").value = "";
      showInAppMessage("Coupon Created", `Coupon ${code} (${pct}%) added successfully.`);
    } else {
      showInAppMessage("Validation Error", "Provide valid coupon name and percentage between 1-100.");
    }
  });

  document.getElementById("btn-adm-save-branding").addEventListener("click", () => {
    const name = document.getElementById("adm-brand-name").value.trim();
    const badge = document.getElementById("adm-brand-badge").value.trim();
    const favicon = document.getElementById("adm-brand-favicon").value.trim();

    if (name) brandConfig.name = name;
    if (badge) brandConfig.badge = badge;
    if (favicon) brandConfig.favicon = favicon;

    syncAllData();
    applyBrandIdentity();
    showInAppMessage("Branding Updated", "Branding details updated successfully!");
  });

  document.getElementById("btn-adm-add-topic").addEventListener("click", () => {
    const val = document.getElementById("adm-add-topic").value.trim();
    if (val && !storeTopics.includes(val)) {
      storeTopics.push(val);
      syncAllData();
      cbtRefreshAdmin();
      document.getElementById("adm-add-topic").value = "";
    }
  });

  document.getElementById("btn-adm-add-cat").addEventListener("click", () => {
    const val = document.getElementById("adm-add-category").value.trim();
    if (val && !storePaperTypes.includes(val)) {
      storePaperTypes.push(val);
      syncAllData();
      cbtRefreshAdmin();
      document.getElementById("adm-add-category").value = "";
    }
  });

  document.getElementById("btn-adm-add-set").addEventListener("click", () => {
    const val = document.getElementById("adm-add-set").value.trim();
    if (val && !storeSets.includes(val)) {
      storeSets.push(val);
      syncAllData();
      cbtRefreshAdmin();
      document.getElementById("adm-add-set").value = "";
    }
  });

  // Save / Update Question with Solution & Category isolation
  document.getElementById("btn-adm-save-q").addEventListener("click", () => {
    const topic = document.getElementById("adm-sel-topic").value;
    const cat = document.getElementById("adm-sel-cat").value;
    const title = document.getElementById("adm-q-title").value.trim();
    const o0 = document.getElementById("adm-q-op0").value.trim();
    const o1 = document.getElementById("adm-q-op1").value.trim();
    const o2 = document.getElementById("adm-q-op2").value.trim();
    const o3 = document.getElementById("adm-q-op3").value.trim();
    const solution = document.getElementById("adm-q-solution").value.trim();
    const correct = parseInt(document.getElementById("adm-q-ans").value, 10);

    if (!title || !o0 || !o1 || !o2 || !o3) {
      showInAppMessage("Validation Error", "Please fill in question text and all 4 options.");
      return;
    }

    const qData = { topic, category: cat, text: title, options: [o0, o1, o2, o3], correct, solution };

    if (editingQuestionIndex !== null && editingQuestionIndex >= 0) {
      storeQuestions[editingQuestionIndex] = qData;
      showInAppMessage("Updated", `Question updated in [${topic} - ${cat}].`);
    } else {
      storeQuestions.push(qData);
      showInAppMessage("Success", `New question successfully added to [${topic} - ${cat}].`);
    }

    syncAllData();
    cbtRefreshAdmin();
    resetQuestionEditor();
  });

  document.getElementById("btn-adm-save-pdf").addEventListener("click", () => {
    const t = document.getElementById("adm-pdf-title").value.trim();
    const u = document.getElementById("adm-pdf-url").value.trim();
    if (!t || !u) {
      showInAppMessage("Validation Error", "Provide both document title and PDF URL.");
      return;
    }
    storeNotes.push({ title: t, url: u });
    syncAllData();
    cbtRefreshAdmin();
    document.getElementById("adm-pdf-title").value = "";
    document.getElementById("adm-pdf-url").value = "";
    showInAppMessage("Success", "Study material added.");
  });

  document.getElementById("btn-adm-reset-pin").addEventListener("click", () => {
    const newPin = document.getElementById("adm-new-pin").value.trim();
    if (!newPin) {
      showInAppMessage("Validation Error", "Enter a valid PIN.");
      return;
    }
    adminPin = newPin;
    syncAllData();
    document.getElementById("adm-new-pin").value = "";
    showInAppMessage("Admin Security", `Admin access PIN updated to: ${newPin}`);
  });

  document.getElementById("btn-adm-save-time").addEventListener("click", () => {
    const val = parseInt(document.getElementById("adm-exam-min").value, 10);
    if (val > 0) {
      storeDuration = val;
      syncAllData();
      showInAppMessage("Success", `Exam duration set to ${val} minutes.`);
    }
  });

  // 12. INITIAL BOOTSTRAP (Persistent Session Check)
  updateNavbarAuthState();
  if (activeUser) {
    cbtRenderWindow2();
    cbtNavigate("win-2");
  } else {
    cbtNavigate("win-1");
  }
})();
