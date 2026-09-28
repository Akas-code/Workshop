<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>Akash Workshop | Online Examination Portal</title>
</head>
<body style="margin:0; padding:0; background:#f8fafc;">

<script>
(function () {
  "use strict";

  function startPortal() {
    if (document.getElementById("cbt-portal")) return;

    /* -------------------------------------------------------------
       1. DATA DEFINITIONS
       ------------------------------------------------------------- */
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
      {
        topic: "William Shakespeare",
        category: "PYQS",
        text: "In which year was the First Folio of Shakespeare's plays published?",
        text_hi: "शेक्सपियर के नाटकों का पहला फोलियो किस वर्ष प्रकाशित हुआ था?",
        options: ["1616", "1623", "1632", "1609"],
        correct: 1,
        solution: "The First Folio was published in 1623 by John Heminges and Henry Condell."
      },
      {
        topic: "William Shakespeare",
        category: "Lines",
        text: "'Life's but a walking shadow, a poor player...' occurs in which play?",
        text_hi: "'Life's but a walking shadow...' पंक्ति किस नाटक में आती है?",
        options: ["Hamlet", "Othello", "Macbeth", "King Lear"],
        correct: 2,
        solution: "This line is spoken by Macbeth in Act 5, Scene 5."
      },
      {
        topic: "William Wordsworth",
        category: "PYQS",
        text: "Wordsworth's 'The Prelude' was published posthumously in which year?",
        text_hi: "वर्ड्सवर्थ की 'द प्रील्यूड' उनके मरणोपरांत किस वर्ष प्रकाशित हुई थी?",
        options: ["1798", "1805", "1850", "1832"],
        correct: 2,
        solution: "The Prelude was published in 1850 by Wordsworth's widow, Mary Wordsworth."
      },
      // John Galsworthy: PYQS
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In Galsworthy's The Fugitive, how are the temperaments of Clare and her husband George contrasted?",
        text_hi: "The Fugitive में क्लेयर और जॉर्ज के स्वभाव में क्या अंतर है?",
        options: ["Clare is practical while George is romantic", "Clare is poetic while George is prosaic", "Clare is ambitious while George is indifferent", "Clare is uneducated while George is scholarly"],
        correct: 1,
        solution: "Clare is poetic and imaginative while George is unimaginative and prosaic[span_0](start_span)[span_0](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What occupation does Clare briefly take up after leaving Malise in The Fugitive?",
        text_hi: "The Fugitive में क्लेयर कौन सा काम करती है?",
        options: ["Selling gloves", "Governess", "Typist", "Factory worker"],
        correct: 0,
        solution: "Clare briefly takes up selling gloves[span_1](start_span)[span_1](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What is Clare's tragic end in The Fugitive?",
        text_hi: "The Fugitive में क्लेयर का दुखद अंत क्या होता है?",
        options: ["She dies of illness", "She is murdered", "She commits suicide", "She returns to George"],
        correct: 2,
        solution: "Clare commits suicide to escape her misery[span_2](start_span)[span_2](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which of the following characters is a solicitor in The Fugitive?",
        text_hi: "The Fugitive में सॉलिसिटर कौन सा पात्र है?",
        options: ["Edward Fullarton", "Reginald Huntingdon", "Twisden", "Haywood"],
        correct: 2,
        solution: "Twisden is the solicitor in The Fugitive[span_3](start_span)[span_3](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy met him in 1893 and formed a life long friendship with him. Identify him.",
        text_hi: "गाल्सवर्दी 1893 में उनसे मिले और आजीवन मित्रता बनी रही। उन्हें पहचानें।",
        options: ["Conrad", "Hardy", "Shaw", "Ibsen"],
        correct: 0,
        solution: "Galsworthy met Joseph Conrad in 1893 aboard the ship Torrens[span_4](start_span)[span_4](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first volume of Galsworthy entitled From the Four Winds appeared in 1897 under the pseudonym:",
        text_hi: "From the Four Winds (1897) किस उपनाम के तहत प्रकाशित हुआ था?",
        options: ["John Gals", "John Sinjohn", "Boz", "Elia"],
        correct: 1,
        solution: "Published under the pseudonym 'John Sinjohn[span_5](start_span)'[span_5](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's first novel was published in 1898. Which novel?",
        text_hi: "गाल्सवर्दी का पहला उपन्यास जो 1898 में प्रकाशित हुआ:",
        options: ["Jocelyn", "Villa Rubein", "A Man of Devon, A Knight", "The Science"],
        correct: 0,
        solution: "'Jocelyn' (1898) was his first novel[span_6](start_span)[span_6](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first work that earned Galsworthy was the novel. Identify it.",
        text_hi: "गाल्सवर्दी का पहला उपन्यास जिसने उन्हें पहचान दिलाई:",
        options: ["Fraternity", "Country Mouse", "The Island Pharisees", "Jocelyn"],
        correct: 2,
        solution: "'The Island Pharisees' (1904) was published under his real name[span_7](start_span)[span_7](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first play that made Galsworthy famous as a playwright is:",
        text_hi: "गाल्सवर्दी का पहला नाटक जिसने उन्हें नाटककार के रूप में प्रसिद्ध बनाया:",
        options: ["Justice", "Loyalties", "The Silver Box", "None of these"],
        correct: 2,
        solution: "'The Silver Box' (1906) was his first successful play[span_8](start_span)[span_8](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's reputation as a novelist was established by:",
        text_hi: "गाल्सवर्दी की उपन्यासकार के रूप में प्रतिष्ठा किससे स्थापित हुई?",
        options: ["The Forsyte Saga", "Justice", "Jocelyn", "The Silver Box"],
        correct: 0,
        solution: "'The Forsyte Saga' established his enduring reputation[span_9](start_span)[span_9](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play of Galsworthy deals with the inadequacy of the administration of justice and an escaped prisoner?",
        text_hi: "कौन सा नाटक भागे हुए कैदी और न्याय प्रशासन से संबंधित है?",
        options: ["The Show", "Jocelyn", "Escape", "None of these"],
        correct: 2,
        solution: "'Escape' (1926) deals with Matt Denant, an escaped prisoner[span_10](start_span)[span_10](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What did Galsworthy become in 1921?",
        text_hi: "गाल्सवर्दी 1921 में क्या बने?",
        options: ["President of Literary Club", "President of the P.E.N. Club London", "Assistant in the P.E.N. Club London", "None of these"],
        correct: 1,
        solution: "He became the first President of the P.E.N. Club London in 1921[span_11](start_span)[span_11](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What was conferred upon Galsworthy in 1929?",
        text_hi: "1929 में गाल्सवर्दी को कौन सा सम्मान मिला?",
        options: ["Order of Demerit", "Booker Prize", "Order of Merit", "None of these"],
        correct: 2,
        solution: "He was awarded the Order of Merit in 1929[span_12](start_span)[span_12](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Strife deals with the conflict between:",
        text_hi: "Strife नाटक किसके बीच संघर्ष को दर्शाता है?",
        options: ["The poor and the rich", "The labourers and poor men", "The Capitalist and Labourers", "None of these"],
        correct: 2,
        solution: "Strife deals with the conflict between Capitalists and Labourers[span_13](start_span)[span_13](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Falder appears in:",
        text_hi: "फाल्डर (Falder) किस नाटक में दिखाई देता है?",
        options: ["Silver Box", "Loyalties", "Justice", "None of these"],
        correct: 2,
        solution: "William Falder is the protagonist of 'Justice[span_14](start_span)'[span_14](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who suffers solitary confinement in Justice?",
        text_hi: "Justice में एकांत कारावास कौन भुगतता है?",
        options: ["Falder", "Jack Barthwick", "Ruth Honeywell", "None of these"],
        correct: 0,
        solution: "Falder is subjected to solitary confinement[span_15](start_span)[span_15](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "This Hindi author translated The Silver Box as Chandi Ki Dibiya, Strife as Hartal and Justice as Nyaya:",
        text_hi: "किस प्रसिद्ध लेखक ने गाल्सवर्दी के नाटकों का अनुवाद चांदी की डिबिया, हड़ताल और न्याय नाम से किया?",
        options: ["Dharam Veer Bharti", "Mohan Rakesh", "Prem Chand", "None of these"],
        correct: 2,
        solution: "Munshi Premchand translated these three plays[span_16](start_span)[span_16](end_span)."
      },
      // John Galsworthy: Lines
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "The law is what it is—a majestic edifice, sheltering all of us, each stone of which rests on another. Where does this line appear?",
        text_hi: "The law is what it is—a majestic edifice... यह पंक्ति किस नाटक में आती है?",
        options: ["The Roof", "The Skin Game", "Windows", "Justice"],
        correct: 3,
        solution: "Spoken by the presiding Judge during Falder's trial in 'Justice[span_17](start_span)'[span_17](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "We all cut each other's throats from the best of motives. Where does it appear?",
        text_hi: "हम सभी नेक इरादों से एक-दूसरे का गला काटते हैं। यह संवाद कहाँ आता है?",
        options: ["Loyalties", "The Skin Game", "The Eldest Son", "None of these"],
        correct: 0,
        solution: "Spoken by Margaret Orme in 'Loyalties[span_18](start_span)'[span_18](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "Literature is its own reward. Who said?",
        text_hi: "साहित्य स्वयं अपना पुरस्कार है। यह कथन किसका है?",
        options: ["Shaw", "Ibsen", "Wordsworth", "Galsworthy"],
        correct: 3,
        solution: "Stated by John Galsworthy[span_19](start_span)[span_19](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "Justice is a machine that, when someone has once given it the starting push, rolls on of itself. Where does this line appear?",
        text_hi: "न्याय एक ऐसी मशीन है... यह पंक्ति किस नाटक में आती है?",
        options: ["The Skin Game", "The Mob", "Justice", "None of these"],
        correct: 2,
        solution: "Spoken by head clerk Cokeson in 'Justice[span_20](start_span)'[span_20](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "Masters are masters, men are men! Yield one demand and they will make it six... Who is the speaker?",
        text_hi: "मालिक मालिक हैं, मजदूर मजदूर हैं... 'Strife' में यह कौन कहता है?",
        options: ["Anthony in Strife", "Roberts in Strife", "Harness in Strife", "Falder in Justice"],
        correct: 0,
        solution: "Spoken by chairman John Anthony in 'Strife[span_21](start_span)'[span_21](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "No one will touch him now! Never again! He is safe with gentle Jesus! Who says?",
        text_hi: "अब उसे कोई नहीं छुएगा! वह प्रभु यीशु के पास सुरक्षित है! कौन कहता है?",
        options: ["Falder about Cokeson", "Cokeson about Falder", "Ruth about Falder", "None of these"],
        correct: 1,
        solution: "Cokeson says this over Falder's body in 'Justice[span_22](start_span)'[span_22](end_span)."
      }
    ];

    /* -------------------------------------------------------------
       2. SAFE LOCAL STORAGE PARSING
       ------------------------------------------------------------- */
    let storeTopics = defaultTopics;
    try {
      let t = JSON.parse(localStorage.getItem("tb_portal_topics"));
      if (Array.isArray(t) && t.length > 0) storeTopics = t;
    } catch (e) {}

    if (!storeTopics.includes("John Galsworthy")) {
      storeTopics.push("John Galsworthy");
    }

    let storePaperTypes = defaultPaperTypes;
    try {
      let p = JSON.parse(localStorage.getItem("tb_portal_categories"));
      if (Array.isArray(p) && p.length > 0) storePaperTypes = p;
    } catch (e) {}

    let storeSets = defaultSets;
    let storeQuestions = defaultQuestions;
    try {
      let q = JSON.parse(localStorage.getItem("tb_portal_questions"));
      if (Array.isArray(q) && q.length > 0) storeQuestions = q;
    } catch (e) {}

    // Merge missing questions
    defaultQuestions.forEach(dq => {
      if (!storeQuestions.some(sq => sq.text === dq.text)) {
        storeQuestions.push(dq);
      }
    });

    let storeNotes = [
      { title: "English Literature Summary Notes", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
      { title: "John Galsworthy Master Notes (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
    ];
    let storeCoupons = [{ code: "FREE100", discount: 100 }, { code: "AW50", discount: 50 }];
    let storeDuration = parseInt(localStorage.getItem("tb_portal_duration"), 10) || 30;
    let storePrice = parseFloat(localStorage.getItem("tb_portal_price")) || 99.00;
    let storeMarkPositive = parseFloat(localStorage.getItem("tb_portal_mark_pos")) || 2.0;
    let storeMarkNegative = parseFloat(localStorage.getItem("tb_portal_mark_neg")) || 0.50;
    let registeredUsers = [];
    try {
      let u = JSON.parse(localStorage.getItem("tb_registered_users"));
      if (Array.isArray(u)) registeredUsers = u;
    } catch (e) {}

    let userPerformance = {};
    let adminPin = localStorage.getItem("tb_admin_pin") || "1234";
    let openAiApiKey = localStorage.getItem("tb_openai_api_key") || "sk-proj-dummy-key-paste-here";
    let aiAdminEnabled = localStorage.getItem("tb_ai_admin_enabled") !== "false";
    let aiCandidateEnabled = localStorage.getItem("tb_ai_candidate_enabled") === "true";
    let isAdminAuthenticated = localStorage.getItem("tb_admin_active") === "true";

    let brandConfig = {
      name: "Akash Workshop",
      badge: "AW",
      favicon: "",
      profilePic: ""
    };

    let activeUser = null;
    try {
      let au = JSON.parse(localStorage.getItem("tb_active_user"));
      if (au && au.username) activeUser = au;
    } catch (e) {}

    let activeTopic = "";
    let activeCategory = "";
    let activeLanguage = "en";
    let activeExamQuestions = [];
    let currentQuestionIndex = 0;
    let candidateAnswers = {};
    let countdownRef = null;
    let remainingSeconds = 1800;
    let generatedOTP = "";
    let appliedDiscountPercent = 0;
    let isExamActive = false;

    function syncAllData() {
      try {
        localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
        localStorage.setItem("tb_portal_categories", JSON.stringify(storePaperTypes));
        localStorage.setItem("tb_portal_sets", JSON.stringify(storeSets));
        localStorage.setItem("tb_portal_questions", JSON.stringify(storeQuestions));
        localStorage.setItem("tb_registered_users", JSON.stringify(registeredUsers));
        localStorage.setItem("tb_admin_active", isAdminAuthenticated.toString());
        localStorage.setItem("tb_openai_api_key", openAiApiKey);
        localStorage.setItem("tb_ai_admin_enabled", aiAdminEnabled.toString());
        localStorage.setItem("tb_ai_candidate_enabled", aiCandidateEnabled.toString());
        if (activeUser && activeUser.username) {
          localStorage.setItem("tb_active_user", JSON.stringify(activeUser));
        } else {
          localStorage.removeItem("tb_active_user");
        }
      } catch (err) {}
    }

    /* -------------------------------------------------------------
       3. CSS INJECTION
       ------------------------------------------------------------- */
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #0f172a; }
      #cbt-portal { min-height: 100vh; display: flex; flex-direction: column; width: 100%; }
      .cbt-nav { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 12px 18px; color: #ffffff; flex-wrap: wrap; gap: 10px; }
      .cbt-logo-area { display: flex; align-items: center; gap: 8px; }
      .cbt-logo-badge { background: #2563eb; color: white; font-weight: 800; padding: 5px 8px; border-radius: 6px; font-size: 13px; }
      .cbt-brand-name { font-size: 16px; font-weight: 700; color: #f8fafc; }
      .cbt-nav-actions { display: flex; gap: 8px; align-items: center; }
      .cbt-btn-pay { background: #10b981; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; }
      .cbt-btn-admin-nav { background: #475569; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; }
      .cbt-profile-menu-container { position: relative; display: none; }
      .cbt-candidate-badge-logo { background: #2563eb; color: #ffffff; font-weight: 800; font-size: 12px; padding: 6px 10px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
      .cbt-profile-dropdown { display: none; position: absolute; right: 0; top: 100%; width: 280px; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); padding: 14px; color: #1e293b; z-index: 2000; }
      .cbt-profile-menu-container:hover .cbt-profile-dropdown { display: block; }
      .cbt-view { display: none; padding: 20px; max-width: 860px; margin: 16px auto; width: 94%; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; }
      .cbt-view.active { display: block; }
      #win-4.active { display: flex; flex-direction: column; width: 100% !important; height: 100vh !important; position: fixed; inset: 0; z-index: 99999; background: #ffffff; margin: 0; padding: 0; border: none; border-radius: 0; }
      .test-fullscreen-body { display: flex; flex: 1; overflow: hidden; }
      .test-main-area { flex: 1; padding: 20px; overflow-y: auto; border-right: 2px solid #e2e8f0; display: flex; flex-direction: column; }
      .test-sidebar { width: 300px; background: #ffffff; padding: 16px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; }
      .cbt-h1 { font-size: 20px; font-weight: 800; text-align: center; margin-bottom: 6px; }
      .cbt-h2 { font-size: 13px; color: #64748b; text-align: center; margin-bottom: 18px; }
      .cbt-field { width: 100%; padding: 10px 12px; margin-bottom: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; }
      .cbt-btn-primary { width: 100%; padding: 10px 14px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer; text-align: center; }
      .cbt-btn-primary:hover { background: #1d4ed8; }
      .cbt-btn-secondary { width: 100%; padding: 10px 14px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; text-align: center; }
      .cbt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }
      .cbt-selection-card { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 18px 12px; text-align: center; cursor: pointer; font-weight: 700; font-size: 14px; }
      .cbt-selection-card:hover { background: #eff6ff; border-color: #2563eb; color: #1d4ed8; }
      .palette-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
      .palette-btn { padding: 8px 0; border: none; border-radius: 4px; font-weight: 700; color: white; cursor: pointer; font-size: 12px; text-align: center; }
      .bg-attempted { background-color: #10b981; }
      .bg-unattempted { background-color: #8b5cf6; }
      .cbt-opt-label { display: flex; align-items: center; padding: 12px 14px; margin-bottom: 10px; border: 1.5px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-size: 14px; }
      .cbt-opt-label input { margin-right: 12px; width: 18px; height: 18px; }
      .cbt-opt-label:hover { background: #f1f5f9; }
      .cbt-opt-label.selected-opt { background: #eff6ff; border-color: #2563eb; font-weight: 600; }
      .cbt-tabs { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px; overflow-x: auto; gap: 6px; }
      .cbt-tab-btn { padding: 8px 10px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; white-space: nowrap; font-size: 13px; }
      .cbt-tab-btn.active { color: #2563eb; border-bottom: 2px solid #2563eb; }
      .cbt-pane { display: none; }
      .cbt-pane.active { display: block; }
      .cbt-item-chip { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 20px; margin: 3px; font-size: 12px; }
      .cbt-item-chip span { color: #dc2626; cursor: pointer; font-weight: bold; }
      .cbt-btn-del { background: #ef4444; color: white; border: none; padding: 4px 7px; border-radius: 4px; cursor: pointer; font-size: 11px; }
      .cbt-link-back { color: #2563eb; font-size: 13px; font-weight: 600; cursor: pointer; margin-bottom: 12px; display: inline-block; }
      .solution-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; }
      .cbt-modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); z-index: 999999; justify-content: center; align-items: center; padding: 16px; }
      .cbt-modal-backdrop.active { display: flex; }
      .cbt-modal-box { background: #ffffff; width: 100%; max-width: 420px; border-radius: 8px; padding: 20px; }
      @media(max-width: 768px) {
        .test-fullscreen-body { flex-direction: column; overflow-y: auto; }
        .test-sidebar { width: 100%; }
      }
    `;
    document.head.appendChild(styleEl);

    /* -------------------------------------------------------------
       4. HTML INJECTION
       ------------------------------------------------------------- */
    const portalDiv = document.createElement("div");
    portalDiv.id = "cbt-portal";
    portalDiv.innerHTML = `
      <div class="cbt-nav" id="dom-main-navbar">
        <div class="cbt-logo-area">
          <span class="cbt-logo-badge" id="dom-brand-badge">AW</span>
          <span class="cbt-brand-name" id="dom-brand-name">Akash Workshop</span>
        </div>
        <div class="cbt-nav-actions">
          <button class="cbt-btn-pay" id="btn-open-payment">Payment & Register</button>
          <button class="cbt-btn-admin-nav" id="btn-open-admin">Admin Portal</button>
          <div class="cbt-profile-menu-container" id="cbt-candidate-menu-wrapper">
            <div class="cbt-candidate-badge-logo" id="dom-candidate-logo-btn">
              <span id="dom-cand-logo-text">🎓 AW</span>
            </div>
            <div class="cbt-profile-dropdown">
              <div style="font-weight:800;" id="drop-display-username">Candidate</div>
              <button class="cbt-btn-secondary" id="btn-drop-logout" style="margin-top:10px;">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Window 1: Login -->
      <div id="win-1" class="cbt-view active">
        <div class="cbt-h1">Candidate Examination Login</div>
        <div class="cbt-h2">Registration is required to login</div>
        <input type="text" id="login-username" class="cbt-field" placeholder="Candidate Username" />
        <input type="password" id="login-password" class="cbt-field" placeholder="Candidate Password" />
        <button class="cbt-btn-primary" id="btn-action-login">Login to Portal</button>
      </div>

      <!-- Window Register -->
      <div id="win-register" class="cbt-view">
        <span class="cbt-link-back" id="link-back-login">&larr; Back to Login</span>
        <div id="pay-step-1">
          <div class="cbt-h1">Registration Fee</div>
          <div class="cbt-h2">Standard Fee: ₹ <span id="dom-checkout-price">99.00</span></div>
          <button class="cbt-btn-primary" id="btn-mock-pay">Pay & Continue</button>
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

      <!-- Window 2: Topic Selection -->
      <div id="win-2" class="cbt-view">
        <div class="cbt-h1">Welcome, start your practice</div>
        <div class="cbt-h2">Select Your Topic</div>
        <div class="cbt-grid" id="dom-win2-topics"></div>
      </div>

      <!-- Window 3: Category & Sets -->
      <div id="win-3" class="cbt-view">
        <span class="cbt-link-back" id="link-back-topics">&larr; Back to Topics</span>
        <div class="cbt-h1" id="win3-topic-heading">Topic</div>
        <div style="font-weight:700; margin:10px 0;">Categories:</div>
        <div class="cbt-grid" id="dom-win3-paper-types"></div>
        <div style="font-weight:700; margin:10px 0;">Practice Sets:</div>
        <div class="cbt-grid" id="dom-win3-practice-sets"></div>
      </div>

      <!-- Window 4: Exam Terminal -->
      <div id="win-4" class="cbt-view">
        <div style="display:flex; justify-content:space-between; align-items:center; background:#0f172a; color:#fff; padding:10px 14px;">
          <span style="font-weight:700;" id="win4-banner">Exam Terminal</span>
          <span style="font-size:18px; font-weight:800; color:#ef4444;" id="win4-clock">30:00</span>
        </div>
        <div class="test-fullscreen-body">
          <div class="test-main-area">
            <span style="font-weight:700; color:#64748b;" id="win4-counter">Question 1</span>
            <div id="dom-test-container" style="margin-top:14px; flex:1;"></div>
            <div style="display:flex; gap:10px; margin-top:16px;">
              <button class="cbt-btn-primary" id="btn-save-next" style="width:auto; padding:8px 18px;">Save & Next</button>
              <button class="cbt-btn-primary" id="btn-submit-exam" style="width:auto; padding:8px 18px; background:#dc2626; margin-left:auto;">Submit Exam</button>
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
        <div class="cbt-h1">Test Solutions</div>
        <div id="dom-solutions-container"></div>
      </div>

      <!-- Admin Auth -->
      <div id="win-admin-auth" class="cbt-view">
        <span class="cbt-link-back" id="link-admin-back-login">&larr; Back</span>
        <div class="cbt-h1">Admin PIN</div>
        <input type="password" id="admin-pass-input" class="cbt-field" placeholder="Enter PIN (Default: 1234)" />
        <button class="cbt-btn-primary" id="btn-admin-verify">Unlock</button>
      </div>

      <!-- Admin Dash -->
      <div id="win-admin-dash" class="cbt-view">
        <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
          <span style="font-weight:700; font-size:16px;">Admin Center</span>
          <button class="cbt-btn-del" id="btn-admin-exit">Logout Admin</button>
        </div>
        <div class="cbt-tabs">
          <button class="cbt-tab-btn active" data-pane="pane-w2">Topics</button>
          <button class="cbt-tab-btn" data-pane="pane-w4-questions">Questions</button>
        </div>
        <div id="pane-w2" class="cbt-pane active">
          <input type="text" id="adm-add-topic" class="cbt-field" placeholder="New Topic" />
          <button class="cbt-btn-primary" id="btn-adm-add-topic">Add Topic</button>
          <div id="dom-adm-topic-chips" style="margin-top:10px;"></div>
        </div>
        <div id="pane-w4-questions" class="cbt-pane">
          <div style="font-weight:700; margin-bottom:6px;">Questions Bank Pool:</div>
          <div style="max-height:300px; overflow-y:auto;" id="dom-table-q-list"></div>
        </div>
      </div>

      <!-- Modal -->
      <div id="dom-cbt-modal" class="cbt-modal-backdrop">
        <div class="cbt-modal-box">
          <div style="font-weight:700; margin-bottom:8px;" id="cbt-modal-heading">Alert</div>
          <div style="font-size:14px; margin-bottom:14px;" id="cbt-modal-body">Message</div>
          <button class="cbt-btn-primary" id="cbt-modal-ok">OK</button>
        </div>
      </div>
    `;

    document.body.appendChild(portalDiv);

    /* -------------------------------------------------------------
       5. LOGIC & WORKFLOW ROUTING
       ------------------------------------------------------------- */
    function cbtNavigate(targetId) {
      document.querySelectorAll(".cbt-view").forEach(win => win.classList.remove("active"));
      const el = document.getElementById(targetId);
      if (el) el.classList.add("active");
      const nav = document.getElementById("dom-main-navbar");
      if (nav) nav.style.display = (targetId === "win-4") ? "none" : "flex";
    }

    function showInAppMessage(title, msg, cb) {
      const modal = document.getElementById("dom-cbt-modal");
      document.getElementById("cbt-modal-heading").innerText = title;
      document.getElementById("cbt-modal-body").innerText = msg;
      modal.classList.add("active");
      document.getElementById("cbt-modal-ok").onclick = () => {
        modal.classList.remove("active");
        if (cb) cb();
      };
    }

    function updateNavbarAuthState() {
      const btnPay = document.getElementById("btn-open-payment");
      const btnAdmin = document.getElementById("btn-open-admin");
      const wrapper = document.getElementById("cbt-candidate-menu-wrapper");
      if (activeUser && activeUser.username) {
        btnPay.style.display = "none";
        btnAdmin.style.display = "none";
        wrapper.style.display = "block";
        document.getElementById("dom-cand-logo-text").innerText = "🎓 " + activeUser.username;
        document.getElementById("drop-display-username").innerText = activeUser.username;
      } else {
        btnPay.style.display = "block";
        btnAdmin.style.display = "block";
        wrapper.style.display = "none";
      }
    }

    function cbtRenderWindow2() {
      const container = document.getElementById("dom-win2-topics");
      container.innerHTML = "";
      storeTopics.forEach(t => {
        const card = document.createElement("div");
        card.className = "cbt-selection-card";
        card.innerText = t;
        card.onclick = () => {
          activeTopic = t;
          document.getElementById("win3-topic-heading").innerText = t;
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

      storePaperTypes.forEach(cat => {
        const card = document.createElement("div");
        card.className = "cbt-selection-card";
        card.innerText = cat;
        card.onclick = () => cbtLaunchExam(cat);
        catBox.appendChild(card);
      });

      storeSets.forEach(s => {
        const card = document.createElement("div");
        card.className = "cbt-selection-card";
        card.innerText = s;
        card.onclick = () => cbtLaunchExam(s);
        setBox.appendChild(card);
      });
    }

    function cbtLaunchExam(category) {
      activeCategory = category;
      activeExamQuestions = storeQuestions.filter(q =>
        q.topic.trim().toLowerCase() === activeTopic.trim().toLowerCase() &&
        q.category.trim().toLowerCase() === activeCategory.trim().toLowerCase()
      );

      if (activeExamQuestions.length === 0) {
        showInAppMessage("No Questions", `No questions available for ${activeTopic} under ${activeCategory}.`);
        return;
      }

      currentQuestionIndex = 0;
      candidateAnswers = {};
      remainingSeconds = storeDuration * 60;
      document.getElementById("win4-banner").innerText = `${activeTopic} (${activeCategory})`;

      cbtNavigate("win-4");
      cbtRenderQuestion();
      cbtUpdatePalette();
      cbtStartTimer();
    }

    function cbtRenderQuestion() {
      const cur = activeExamQuestions[currentQuestionIndex];
      document.getElementById("win4-counter").innerText = `Question ${currentQuestionIndex + 1} of ${activeExamQuestions.length}`;
      const container = document.getElementById("dom-test-container");
      let html = `<div style="font-size:16px; font-weight:700; margin-bottom:12px;">Q${currentQuestionIndex + 1}. ${cur.text}</div>`;
      for (let i = 0; i < cur.options.length; i++) {
        const checked = candidateAnswers[currentQuestionIndex] === i ? "checked" : "";
        html += `
          <label class="cbt-opt-label">
            <input type="radio" name="cbt-choice" value="${i}" ${checked} />
            <span>${String.fromCharCode(65 + i)}. ${cur.options[i]}</span>
          </label>
        `;
      }
      container.innerHTML = html;
    }

    function cbtUpdatePalette() {
      const grid = document.getElementById("dom-palette-grid");
      grid.innerHTML = "";
      activeExamQuestions.forEach((_, idx) => {
        const btn = document.createElement("button");
        btn.className = "palette-btn " + (candidateAnswers.hasOwnProperty(idx) ? "bg-attempted" : "bg-unattempted");
        btn.innerText = idx + 1;
        btn.onclick = () => {
          const checked = document.querySelector('input[name="cbt-choice"]:checked');
          if (checked) candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
          currentQuestionIndex = idx;
          cbtRenderQuestion();
          cbtUpdatePalette();
        };
        grid.appendChild(btn);
      });
    }

    function cbtStartTimer() {
      clearInterval(countdownRef);
      countdownRef = setInterval(() => {
        const m = Math.floor(remainingSeconds / 60);
        const s = remainingSeconds % 60;
        document.getElementById("win4-clock").innerText = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
        if (remainingSeconds <= 0) {
          clearInterval(countdownRef);
          cbtFinishExam();
        }
        remainingSeconds--;
      }, 1000);
    }

    function cbtFinishExam() {
      clearInterval(countdownRef);
      let correct = 0;
      activeExamQuestions.forEach((q, idx) => {
        if (candidateAnswers[idx] === q.correct) correct++;
      });
      const total = activeExamQuestions.length;
      document.getElementById("dom-result-stats").innerHTML = `
        <div style="font-size:32px; font-weight:800; color:#2563eb;">${correct} / ${total} Correct</div>
      `;
      cbtNavigate("win-result");
    }

    /* -------------------------------------------------------------
       6. EVENT LISTENERS
       ------------------------------------------------------------- */
    document.getElementById("btn-action-login").onclick = () => {
      const u = document.getElementById("login-username").value.trim();
      const p = document.getElementById("login-password").value.trim();
      const matched = registeredUsers.find(user => user.username.toLowerCase() === u.toLowerCase() && user.password === p);
      if (!matched) {
        showInAppMessage("Login Error", "Invalid credentials. Please register first.");
        return;
      }
      activeUser = matched;
      syncAllData();
      updateNavbarAuthState();
      cbtRenderWindow2();
      cbtNavigate("win-2");
    };

    document.getElementById("btn-open-payment").onclick = () => cbtNavigate("win-register");
    document.getElementById("link-back-login").onclick = () => cbtNavigate("win-1");
    document.getElementById("link-back-topics").onclick = () => cbtNavigate("win-2");
    document.getElementById("btn-restart-flow").onclick = () => cbtNavigate("win-2");
    document.getElementById("link-back-result").onclick = () => cbtNavigate("win-result");

    document.getElementById("btn-mock-pay").onclick = () => {
      document.getElementById("pay-step-1").style.display = "none";
      document.getElementById("pay-step-2").style.display = "block";
    };

    document.getElementById("btn-send-otp").onclick = () => {
      const mob = document.getElementById("reg-mobile").value.trim();
      if (mob.length !== 10) {
        showInAppMessage("Error", "Enter valid 10-digit mobile number.");
        return;
      }
      generatedOTP = Math.floor(1000 + Math.random() * 9000).toString();
      showInAppMessage("OTP Sent", "Your Registration OTP is: " + generatedOTP, () => {
        document.getElementById("pay-step-2").style.display = "none";
        document.getElementById("pay-step-3").style.display = "block";
      });
    };

    document.getElementById("btn-complete-reg").onclick = () => {
      const entered = document.getElementById("reg-otp").value.trim();
      const u = document.getElementById("reg-username").value.trim();
      const p = document.getElementById("reg-password").value.trim();
      if (entered !== generatedOTP || !u || !p) {
        showInAppMessage("Error", "Invalid OTP or missing fields.");
        return;
      }
      registeredUsers.push({ username: u, password: p });
      syncAllData();
      showInAppMessage("Registered", "Registration completed! Please login.", () => {
        cbtNavigate("win-1");
      });
    };

    document.getElementById("btn-save-next").onclick = () => {
      const checked = document.querySelector('input[name="cbt-choice"]:checked');
      if (checked) candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
      if (currentQuestionIndex < activeExamQuestions.length - 1) {
        currentQuestionIndex++;
        cbtRenderQuestion();
        cbtUpdatePalette();
      } else {
        showInAppMessage("Finished", "You are at the last question. Click Submit Exam.");
      }
    };

    document.getElementById("btn-submit-exam").onclick = () => {
      const checked = document.querySelector('input[name="cbt-choice"]:checked');
      if (checked) candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
      cbtFinishExam();
    };

    document.getElementById("btn-view-solutions").onclick = () => {
      const container = document.getElementById("dom-solutions-container");
      container.innerHTML = "";
      activeExamQuestions.forEach((q, idx) => {
        const div = document.createElement("div");
        div.className = "solution-card";
        div.innerHTML = `
          <div style="font-weight:700;">Q${idx + 1}. ${q.text}</div>
          <div style="margin:6px 0; color:#10b981;">Correct Answer: ${q.options[q.correct]}</div>
          <div style="font-size:13px; color:#475569;">Explanation: ${q.solution || "None"}</div>
        `;
        container.appendChild(div);
      });
      cbtNavigate("win-solutions");
    };

    document.getElementById("btn-open-admin").onclick = () => cbtNavigate("win-admin-auth");
    document.getElementById("link-admin-back-login").onclick = () => cbtNavigate("win-1");

    document.getElementById("btn-admin-verify").onclick = () => {
      const entered = document.getElementById("admin-pass-input").value.trim();
      if (entered === adminPin) {
        document.getElementById("admin-pass-input").value = "";
        isAdminAuthenticated = true;
        syncAllData();
        cbtNavigate("win-admin-dash");
        renderAdminDash();
      } else {
        showInAppMessage("Access Denied", "Incorrect PIN.");
      }
    };

    document.getElementById("btn-admin-exit").onclick = () => {
      isAdminAuthenticated = false;
      syncAllData();
      cbtNavigate("win-1");
    };

    document.getElementById("btn-drop-logout").onclick = () => {
      activeUser = null;
      syncAllData();
      updateNavbarAuthState();
      cbtNavigate("win-1");
    };

    function renderAdminDash() {
      const chips = document.getElementById("dom-adm-topic-chips");
      chips.innerHTML = "";
      storeTopics.forEach(t => {
        const c = document.createElement("span");
        c.className = "cbt-item-chip";
        c.innerText = t;
        chips.appendChild(c);
      });

      const qlist = document.getElementById("dom-table-q-list");
      qlist.innerHTML = "";
      storeQuestions.forEach(q => {
        const item = document.createElement("div");
        item.style.padding = "6px";
        item.style.borderBottom = "1px solid #eee";
        item.innerHTML = `<b>[${q.topic} - ${q.category}]</b> ${q.text}`;
        qlist.appendChild(item);
      });
    }

    document.getElementById("btn-adm-add-topic").onclick = () => {
      const val = document.getElementById("adm-add-topic").value.trim();
      if (val && !storeTopics.includes(val)) {
        storeTopics.push(val);
        syncAllData();
        renderAdminDash();
        document.getElementById("adm-add-topic").value = "";
      }
    };

    /* -------------------------------------------------------------
       7. BOOTSTRAP INITIALIZATION
       ------------------------------------------------------------- */
    updateNavbarAuthState();
    if (isAdminAuthenticated) {
      cbtNavigate("win-admin-dash");
      renderAdminDash();
    } else if (activeUser && activeUser.username) {
      cbtRenderWindow2();
      cbtNavigate("win-2");
    } else {
      cbtNavigate("win-1");
    }
  }

  // Dual Fallback Boot
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startPortal);
  } else {
    startPortal();
  }
})();
</script>
</body>
</html>
