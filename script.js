(function () {
  // 1. STYLESHEET INJECTION
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    #cbt-portal {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #1e293b;
      max-width: 860px;
      margin: 15px auto;
      background: #ffffff;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.06);
    }
    #cbt-portal * { box-sizing: border-box; }
    .cbt-nav {
      display: flex; justify-content: space-between; align-items: center;
      background: #0f172a; padding: 12px 20px; color: #ffffff;
    }
    .cbt-nav-title { font-weight: 700; font-size: 16px; }
    .cbt-candidate-tag {
      background: #2563eb; font-size: 12px; padding: 4px 10px;
      border-radius: 99px; margin-right: 10px; display: none;
    }
    .cbt-btn-admin-nav {
      background: #334155; color: #fff; border: none; padding: 6px 12px;
      border-radius: 4px; font-size: 12px; cursor: pointer;
    }
    .cbt-view { display: none; padding: 24px; }
    .cbt-view.active { display: block; }
    .cbt-h1 { font-size: 22px; font-weight: 700; text-align: center; margin: 0 0 6px 0; }
    .cbt-h2 { font-size: 14px; color: #64748b; text-align: center; margin: 0 0 20px 0; }
    .cbt-field {
      width: 100%; padding: 11px 13px; margin-bottom: 12px;
      border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none;
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
