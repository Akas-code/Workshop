(function () {
  "use strict";

  /* ==========================================================================
     SECTION 1: VIEWPORT & DEVICE METADATA
     ========================================================================== */
  let metaTag = document.querySelector('meta[name="viewport"]');
  if (!metaTag) {
    metaTag = document.createElement("meta");
    metaTag.name = "viewport";
    metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
    document.head.appendChild(metaTag);
  }

  /* ==========================================================================
     SECTION 2: DEFAULT DATA & LOCAL STORAGE STATE
     ========================================================================== */
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
    // ----------------- William Shakespeare -----------------
    {
      topic: "William Shakespeare",
      category: "PYQS",
      text: "In which year was the First Folio of Shakespeare's plays published?",
      text_hi: "शेक्सपियर के नाटकों का पहला फोलियो (First Folio) किस वर्ष प्रकाशित हुआ था?",
      options: ["1616", "1623", "1632", "1609"],
      correct: 1,
      solution: "The First Folio was published in 1623 by John Heminges and Henry Condell."
    },
    {
      topic: "William Shakespeare",
      category: "Lines",
      text: "'Life's but a walking shadow, a poor player...' occurs in which play?",
      text_hi: "'Life's but a walking shadow, a poor player...' पंक्ति किस नाटक में आती है?",
      options: ["Hamlet", "Othello", "Macbeth", "King Lear"],
      correct: 2,
      solution: "This line is spoken by Macbeth in Act 5, Scene 5 after hearing of Lady Macbeth's death."
    },

    // ----------------- William Wordsworth -----------------
    {
      topic: "William Wordsworth",
      category: "PYQS",
      text: "Wordsworth's 'The Prelude' was published posthumously in which year?",
      text_hi: "वर्ड्सवर्थ की 'द प्रील्यूड' उनके मरणोपरांत किस वर्ष प्रकाशित हुई थी?",
      options: ["1798", "1805", "1850", "1832"],
      correct: 2,
      solution: "The Prelude was published in 1850 by Wordsworth's widow, Mary Wordsworth."
    },

    // ----------------- John Galsworthy: PYQS -----------------
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "Galsworthy met him in 1893 and formed a life long friendship with him. Identify him.",
      text_hi: "गाल्सवर्दी 1893 में उनसे मिले और आजीवन मित्रता बनी रही। उन्हें पहचानें।",
      options: ["Conrad", "Hardy", "Shaw", "Ibsen"],
      correct: 0,
      solution: "Galsworthy met Joseph Conrad in 1893 aboard the ship Torrens and they became lifelong close friends[span_5](start_span)[span_5](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "The first volume of Galsworthy entitled 'From the Four Winds' appeared in 1897 under the pseudonym:",
      text_hi: "'From the Four Winds' (1897) किस उपनाम (pseudonym) के तहत प्रकाशित हुआ था?",
      options: ["John Gals", "John Sinjohn", "Boz", "Elia"],
      correct: 1,
      solution: "Galsworthy published his earliest collections including 'From the Four Winds' under the pen-name 'John Sinjohn[span_6](start_span)'[span_6](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "Galsworthy's first novel published in 1898 was:",
      text_hi: "गाल्सवर्दी का पहला उपन्यास जो 1898 में प्रकाशित हुआ, कौन सा था?",
      options: ["Jocelyn", "Villa Rubein", "A Man of Devon, A Knight", "The Science"],
      correct: 0,
      solution: "'Jocelyn' (1898) was John Galsworthy's first full-length novel, published under John Sinjohn[span_7](start_span)[span_7](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "The first work that earned Galsworthy was the novel. Identify it.",
      text_hi: "गाल्सवर्दी का पहला उपन्यास जिसने उन्हें पहचान दिलाई:",
      options: ["Fraternity", "Country Mouse", "The Island Pharisees", "Jocelyn"],
      correct: 2,
      solution: "'The Island Pharisees' (1904) was the first novel published under his own real name[span_8](start_span)[span_8](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "The first play that made Galsworthy famous as a playwright is:",
      text_hi: "गाल्सवर्दी का पहला नाटक जिसने उन्हें नाटककार के रूप में प्रसिद्ध बनाया:",
      options: ["Justice", "Loyalties", "The Silver Box", "None of these"],
      correct: 2,
      solution: "'The Silver Box' (1906) was Galsworthy's first play[span_9](start_span)[span_9](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "Galsworthy's reputation as a novelist was established by:",
      text_hi: "गाल्सवर्दी की एक उपन्यासकार के रूप में प्रतिष्ठा किससे स्थापित हुई?",
      options: ["The Forsyte Saga", "Loyalties", "Jocelyn", "The Silver Box"],
      correct: 0,
      solution: "'The Forsyte Saga' established his reputation as a master novelist[span_10](start_span)[span_10](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "The Forsyte Saga includes: The Man of Property (1906), In Chancery (1920), To Let (1921) and two Interludes. Find the Interlude.",
      text_hi: "द फॉरसाइट सागा में शामिल इंटरल्यूड (Interlude) को पहचानें:",
      options: [
        "Indian Winter of a Forsyte Tales and Awakening",
        "Indian Autumn of a Forsyte Tales and Awakening",
        "Indian Summer of a Forsyte Tales and Awakening",
        "None of these"
      ],
      correct: 2,
      solution: "The two interludes are 'Indian Summer of a Forsyte' and 'Awakening[span_11](start_span)'[span_11](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "Which play of Galsworthy deals with the inadequacy of the administration of justice and the attitude of different types of people towards an escaped prisoner?",
      text_hi: "गाल्सवर्दी का कौन सा नाटक भागे हुए कैदी और न्याय प्रशासन से संबंधित है?",
      options: ["The Show", "Jocelyn", "Escape", "None of these"],
      correct: 2,
      solution: "'Escape' (1926) deals with Matt Denant, an escaped convict[span_12](start_span)[span_12](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "Which play analyses the impact of modern publicity on private domestic tragedy?",
      text_hi: "कौन सा नाटक निजी घरेलू त्रासदी पर आधुनिक मीडिया/प्रेस के प्रभाव का विश्लेषण करता है?",
      options: ["The Show", "Jocelyn", "Escape", "None of these"],
      correct: 0,
      solution: "'The Show' (1925) satirizes press journalism and sensation[span_13](start_span)[span_13](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "The year in which Galsworthy's father died was also the year of the publication of The Island Pharisees. Find out the year.",
      text_hi: "जिस वर्ष गाल्सवर्दी के पिता की मृत्यु हुई, उसी वर्ष 'The Island Pharisees' प्रकाशित हुई। वह वर्ष है:",
      options: ["1904", "1905", "1906", "1907"],
      correct: 0,
      solution: "In 1904 his father died and 'The Island Pharisees' appeared[span_14](start_span)[span_14](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "What did Galsworthy become in 1921?",
      text_hi: "गाल्सवर्दी 1921 में क्या बने?",
      options: [
        "President of Literary Club",
        "President of the P. E. N. Club London",
        "Assistant in the P.E.N. Club London",
        "None of these"
      ],
      correct: 1,
      solution: "Galsworthy became the first President of the P.E.N. Club London in 1921[span_15](start_span)[span_15](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "What was conferred upon Galsworthy in 1929?",
      text_hi: "1929 में गाल्सवर्दी को कौन सा सम्मान प्रदान किया गया था?",
      options: ["Order of demerit", "Booker Prize", "Order of Merit", "None of these"],
      correct: 2,
      solution: "He received the Order of Merit in 1929[span_16](start_span)[span_16](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "In Strife, the strike takes place at:",
      text_hi: "'Strife' नाटक में हड़ताल (strike) किस स्थान पर होती है?",
      options: [
        "Trenartha Tin Plate Works",
        "Thirtana Tine Plate Works",
        "Thirtankar Tin Plate Works",
        "None of these"
      ],
      correct: 0,
      solution: "The strike took place at Trenartha Tin Plate Works[span_17](start_span)[span_17](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "Who is the leader of the labourers in Strife?",
      text_hi: "'Strife' में मजदूरों का नेता कौन है?",
      options: ["Jack Barthwick", "Falder", "David Roberts", "None of these"],
      correct: 2,
      solution: "David Roberts is the leader of the striking labourers[span_18](start_span)[span_18](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "Falder appears in:",
      text_hi: "फाल्डर (Falder) किस नाटक में दिखाई देता है?",
      options: ["Silver Box", "Loyalties", "Justice", "None of these"],
      correct: 2,
      solution: "William Falder is the tragic protagonist of 'Justice' (1910)[span_19](start_span)[span_19](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "PYQS",
      text: "This Hindi author is famous for his stories and novels. He translated The Silver Box as Chandi Ki Dibiya, Strife as Hartal and Justice as Nyaya. Who is this Hindi author?",
      text_hi: "किस प्रसिद्ध हिंदी लेखक ने 'चांदी की डिबिया', 'हड़ताल' और 'न्याय' नाम से अनुवाद किया?",
      options: ["Dharam Veer Bharti", "Mohan Rakesh", "Prem Chand", "None of these"],
      correct: 2,
      solution: "Munshi Premchand translated The Silver Box, Strife, and Justice into Hindi[span_20](start_span)[span_20](end_span)."
    },

    // ----------------- John Galsworthy: Lines -----------------
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"The law is what it is—a majestic edifice, sheltering all of us, each stone of which rests on another.\" Where does this line appear?",
      text_hi: "\"The law is what it is—a majestic edifice...\" यह पंक्ति किस नाटक में आती है?",
      options: ["The Roof", "The Skin Game", "Windows", "Justice"],
      correct: 3,
      solution: "Spoken by the Judge in 'Justice' (1910)[span_21](start_span)[span_21](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"Loyalty comes before everything\", \"A wife's memory is not very good when her husband is in danger.\" are some of the sayings from:",
      text_hi: "\"Loyalty comes before everything...\" यह प्रसिद्ध संवाद किस नाटक से है?",
      options: ["The Roof", "The Skin Game", "Windows", "Loyalties"],
      correct: 3,
      solution: "These lines appear in Galsworthy's play 'Loyalties' (1922)[span_22](start_span)[span_22](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"We all cut each other's throats from the best of motives.\" Where does it appear?",
      text_hi: "\"We all cut each other's throats from the best of motives.\" यह संवाद किस नाटक में आता है?",
      options: ["Loyalties", "The Skin Game", "The Eldest Son", "None of these"],
      correct: 0,
      solution: "It appears in 'Loyalties[span_23](start_span)'[span_23](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"Literature is its own reward.\" Who said?",
      text_hi: "\"Literature is its own reward.\" यह कथन किसका है?",
      options: ["Shaw", "Ibsen", "Wordsworth", "Galsworthy"],
      correct: 3,
      solution: "Said by John Galsworthy[span_24](start_span)[span_24](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"Justice is a machine that, when someone has once given it the starting push, rolls on of itself.\" Where does this line appear?",
      text_hi: "\"Justice is a machine that... rolls on of itself.\" यह पंक्ति कहाँ आती है?",
      options: ["The Skin Game", "The Mob", "Justice", "None of these"],
      correct: 2,
      solution: "Spoken by managing clerk Cokeson in 'Justice[span_25](start_span)'[span_25](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"In Justice we feel the waste implied by Falder's suicide.\" Whose statement is this?",
      text_hi: "\"In Justice we feel the waste implied by Falder's suicide.\" यह आलोचनात्मक टिप्पणी किसकी है?",
      options: ["Allardyce Nicoll", "George Sampson", "W.L. Phelps", "None of these"],
      correct: 0,
      solution: "Critic Allardyce Nicoll made this statement about Justice[span_26](start_span)[span_26](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"His plots are not the unwinding of a skein of complicated happenings... His climaxes are good.\" This statement of Coats is about:",
      text_hi: "आर. एच. कोट (R.H. Coat) का यह कथन किसके बारे में है?",
      options: ["Milton", "Shakespeare", "Galsworthy", "Shaw"],
      correct: 2,
      solution: "Said by R.H. Coat about John Galsworthy[span_27](start_span)[span_27](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"Masters are masters, men are men! Yield one demand and they will make it six...\" Who is the speaker?",
      text_hi: "\"Masters are masters, men are men! Yield one demand...\" 'Strife' में यह कौन कहता है?",
      options: ["Anthony in Strife", "Roberts in Strife", "Harness in Strife", "Falder in Justice"],
      correct: 0,
      solution: "Said by John Anthony in 'Strife[span_28](start_span)'[span_28](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"No one will touch him now! Never again! He is safe with gentle Jesus!\" Who says?",
      text_hi: "\"No one will touch him now! Never again! He is safe with gentle Jesus!\" यह कौन कहता है?",
      options: ["Falder about Cokeson", "Cokeson about Falder", "Ruth about Falder", "None of these"],
      correct: 1,
      solution: "Said by Robert Cokeson over Falder's body in 'Justice[span_29](start_span)'[span_29](end_span)."
    },
    {
      topic: "John Galsworthy",
      category: "Lines",
      text: "\"You mob, are most contemptible thing under the sun...\" Who wrote this play?",
      text_hi: "\"You mob, are most contemptible thing under the sun...\" यह 'The Mob' में किसने लिखा?",
      options: ["Shaw", "Yeats", "Eliot", "Galsworthy"],
      correct: 3,
      solution: "Written by John Galsworthy in 'The Mob[span_30](start_span)'[span_30](end_span)."
    }
  ];

  const defaultNotes = [
    { title: "English Literature Hand-Written Summary", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" },
    { title: "John Galsworthy Master Notes (PDF)", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }
  ];
  const defaultCoupons = [
    { code: "AKASH50", discount: 50 },
    { code: "FREE100", discount: 100 }
  ];

  // FORCE INJECTION TO PREVENT MISSING JOHN GALSWORTHY
  let storeTopics = JSON.parse(localStorage.getItem("tb_portal_topics")) || defaultTopics;
  if (!storeTopics.some(t => t.toLowerCase() === "john galsworthy")) {
    storeTopics.push("John Galsworthy");
    localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
  }

  let storePaperTypes = JSON.parse(localStorage.getItem("tb_portal_categories")) || defaultPaperTypes;
  let storeSets = JSON.parse(localStorage.getItem("tb_portal_sets")) || defaultSets;
  let storeQuestions = JSON.parse(localStorage.getItem("tb_portal_questions")) || defaultQuestions;

  // Sync questions from memory to storage
  defaultQuestions.forEach(dq => {
    if (dq.topic === "John Galsworthy") {
      const exists = storeQuestions.some(sq => sq.topic === "John Galsworthy" && sq.text === dq.text);
      if (!exists) {
        storeQuestions.push(dq);
      }
    }
  });
  localStorage.setItem("tb_portal_questions", JSON.stringify(storeQuestions));

  let storeNotes = JSON.parse(localStorage.getItem("tb_portal_notes")) || defaultNotes;
  let storeCoupons = JSON.parse(localStorage.getItem("tb_portal_coupons")) || defaultCoupons;
  let storeDuration = parseInt(localStorage.getItem("tb_portal_duration"), 10) || 30;
  let storePrice = parseFloat(localStorage.getItem("tb_portal_price")) || 99.00;
  let storeMarkPositive = parseFloat(localStorage.getItem("tb_portal_mark_pos")) || 2.0;
  let storeMarkNegative = parseFloat(localStorage.getItem("tb_portal_mark_neg")) || 0.50;
  let registeredUsers = JSON.parse(localStorage.getItem("tb_registered_users")) || [];
  let userPerformance = JSON.parse(localStorage.getItem("tb_user_performance")) || {};
  let adminPin = localStorage.getItem("tb_admin_pin") || "1234";

  // AI Configuration State
  let openAiApiKey = localStorage.getItem("tb_openai_api_key") || "sk-proj-dummy-key-paste-here";
  let aiAdminEnabled = localStorage.getItem("tb_ai_admin_enabled") !== "false";
  let aiCandidateEnabled = localStorage.getItem("tb_ai_candidate_enabled") === "true";

  // Persistent Admin Session State
  let isAdminAuthenticated = localStorage.getItem("tb_admin_active") === "true";

  // Branding Customization
  let brandConfig = JSON.parse(localStorage.getItem("tb_brand_config")) || {
    name: "Akash Workshop",
    badge: "AW",
    favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>",
    profilePic: ""
  };

  // Persistent Candidate User Session
  let activeUser = null;
  try {
    const saved = localStorage.getItem("tb_active_user");
    if (saved) activeUser = JSON.parse(saved);
  } catch (e) {
    activeUser = null;
  }

  // Active Runtime Test Variables
  let activeTopic = "";
  let activeCategory = "";
  let activeLanguage = "en";
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
  let isExamActive = false;

  /* ==========================================================================
     SECTION 3: DATA SYNCHRONIZATION HELPERS
     ========================================================================== */
  function syncAllData() {
    localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
    localStorage.setItem("tb_portal_categories", JSON.stringify(storePaperTypes));
    localStorage.setItem("tb_portal_sets", JSON.stringify(storeSets));
    localStorage.setItem("tb_portal_questions", JSON.stringify(storeQuestions));
    localStorage.setItem("tb_portal_notes", JSON.stringify(storeNotes));
    localStorage.setItem("tb_portal_coupons", JSON.stringify(storeCoupons));
    localStorage.setItem("tb_portal_duration", storeDuration.toString());
    localStorage.setItem("tb_portal_price", storePrice.toString());
    localStorage.setItem("tb_portal_mark_pos", storeMarkPositive.toString());
    localStorage.setItem("tb_portal_mark_neg", storeMarkNegative.toString());
    localStorage.setItem("tb_registered_users", JSON.stringify(registeredUsers));
    localStorage.setItem("tb_user_performance", JSON.stringify(userPerformance));
    localStorage.setItem("tb_admin_pin", adminPin);
    localStorage.setItem("tb_brand_config", JSON.stringify(brandConfig));
    localStorage.setItem("tb_admin_active", isAdminAuthenticated.toString());
    localStorage.setItem("tb_openai_api_key", openAiApiKey);
    localStorage.setItem("tb_ai_admin_enabled", aiAdminEnabled.toString());
    localStorage.setItem("tb_ai_candidate_enabled", aiCandidateEnabled.toString());

    if (activeUser && activeUser.username) {
      localStorage.setItem("tb_active_user", JSON.stringify(activeUser));
    } else {
      localStorage.removeItem("tb_active_user");
    }
  }

  function saveExamSnapshot() {
    if (!isExamActive) return;
    const snap = {
      activeTopic,
      activeCategory,
      activeLanguage,
      activeExamQuestions,
      currentQuestionIndex,
      candidateAnswers,
      remainingSeconds,
      timestamp: Date.now()
    };
    localStorage.setItem("tb_exam_running_snapshot", JSON.stringify(snap));
  }

  function clearExamSnapshot() {
    isExamActive = false;
    localStorage.removeItem("tb_exam_running_snapshot");
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
    const brandPicEl = document.getElementById("dom-brand-pic");

    if (brandNameEl) brandNameEl.innerText = brandConfig.name;
    if (brandBadgeEl) {
      brandBadgeEl.innerText = brandConfig.badge;
      brandBadgeEl.style.display = brandConfig.profilePic ? "none" : "inline-block";
    }
    if (brandPicEl) {
      if (brandConfig.profilePic) {
        brandPicEl.src = brandConfig.profilePic;
        brandPicEl.style.display = "inline-block";
      } else {
        brandPicEl.style.display = "none";
      }
    }
  }

  /* ==========================================================================
     SECTION 4: OPENAI CHATGPT API ENGINE
     ========================================================================== */
  async function callOpenAiForSolution(questionText, correctOptionText) {
    if (!openAiApiKey || openAiApiKey.includes("paste-here")) {
      throw new Error("Valid OpenAI API Key is not set in Admin Settings.");
    }

    const prompt = `You are an elite competitive exam teacher for English Literature.
Question: "${questionText}"
Correct Option: "${correctOptionText}"

Provide:
1. Short, precise Conceptual Explanation (2-3 lines).
2. Key Facts.
3. Catchy Short Trick or Mnemonic.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + openAiApiKey.trim()
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.6
      })
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error?.message || "HTTP Error " + response.status);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  }

  /* ==========================================================================
     SECTION 5: CSS STYLESHEET WITH ACCESSIBLE OPTIONS & UI ENHANCEMENTS
     ========================================================================== */
  const styleEl = document.createElement("style");
  styleEl.textContent = `
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    html, body { width: 100%; min-height: 100%; overflow-x: hidden; }
    #cbt-portal {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #0f172a; background: #f8fafc; min-height: 100vh; display: flex; flex-direction: column; width: 100%;
    }
    .cbt-nav {
      display: flex; justify-content: space-between; align-items: center;
      background: #0f172a; padding: 12px 18px; color: #ffffff; position: relative; z-index: 1000; flex-wrap: wrap; gap: 10px;
    }
    .cbt-logo-area { display: flex; align-items: center; gap: 8px; }
    .cbt-logo-badge {
      background: #2563eb; color: white; font-weight: 800; padding: 5px 8px; border-radius: 6px; font-size: 13px;
    }
    .cbt-profile-img-header {
      width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 2px solid #3b82f6; display: none;
    }
    .cbt-brand-name { font-size: 16px; font-weight: 700; color: #f8fafc; white-space: nowrap; }
    .cbt-nav-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
    .cbt-btn-pay {
      background: #10b981; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; white-space: nowrap;
    }
    .cbt-btn-admin-nav {
      background: #475569; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; white-space: nowrap;
    }
    
    .cbt-profile-menu-container { position: relative; display: none; padding: 4px 0; }
    .cbt-candidate-badge-logo {
      background: #2563eb; color: #ffffff; font-weight: 800; font-size: 12px;
      padding: 6px 10px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .cbt-profile-dropdown {
      display: none; position: absolute; right: 0; top: 100%; width: 300px; max-width: 90vw;
      background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); padding: 14px; color: #1e293b; z-index: 2000;
    }
    .cbt-profile-menu-container:hover .cbt-profile-dropdown { display: block; }
    .drop-divider { height: 1px; background: #e2e8f0; margin: 10px 0; }
    .drop-info-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
    .drop-detail-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px; }

    .cbt-view {
      display: none; padding: 20px; max-width: 860px; margin: 16px auto; width: 94%; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0;
    }
    .cbt-view.active { display: block; }
    
    /* Full-Screen Exam Terminal */
    #win-4.active {
      display: flex; flex-direction: column; max-width: 100% !important; width: 100% !important;
      height: 100vh !important; margin: 0 !important; padding: 0 !important; border-radius: 0 !important; border: none !important;
      position: fixed; inset: 0; z-index: 99999; background: #ffffff;
    }
    .test-fullscreen-body { display: flex; flex: 1; overflow: hidden; }
    .test-main-area { flex: 1; padding: 22px; overflow-y: auto; border-right: 2px solid #e2e8f0; display: flex; flex-direction: column; }
    .test-sidebar { width: 320px; background: #ffffff; padding: 18px; display: flex; flex-direction: column; gap: 14px; overflow-y: auto; }
    
    .cbt-h1 { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 6px; color: #0f172a; }
    .cbt-h2 { font-size: 14px; color: #475569; text-align: center; margin-bottom: 18px; }
    .cbt-field { width: 100%; padding: 11px 12px; margin-bottom: 12px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; }
    .cbt-field:focus { border-color: #2563eb; }
    .cbt-btn-primary { width: 100%; padding: 11px 14px; background: #2563eb; color: #ffffff; border: none; border-radius: 6px; font-size: 14px; font-weight: 700; cursor: pointer; text-align: center; }
    .cbt-btn-primary:hover { background: #1d4ed8; }
    .cbt-btn-secondary { width: 100%; padding: 11px 14px; background: #e2e8f0; color: #334155; border: none; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; text-align: center; }
    .cbt-btn-secondary:hover { background: #cbd5e1; }
    .cbt-btn-ai {
      background: linear-gradient(135deg, #8b5cf6, #d946ef); color: #fff; border: none; padding: 7px 12px;
      border-radius: 4px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;
    }
    .cbt-btn-ai:hover { opacity: 0.92; }
    
    .cbt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }
    .cbt-selection-card {
      background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 18px 12px;
      text-align: center; cursor: pointer; font-weight: 700; font-size: 15px; color: #1e293b;
      word-break: break-word; transition: all 0.2s ease;
    }
    .cbt-selection-card:hover { background: #eff6ff; border-color: #2563eb; color: #1d4ed8; transform: translateY(-2px); }
    
    .palette-legend { display: flex; gap: 10px; font-size: 12px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; flex-wrap: wrap; }
    .legend-item { display: flex; align-items: center; gap: 6px; }
    .circle-icon { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
    .bg-attempted { background-color: #10b981; }
    .bg-unattempted { background-color: #8b5cf6; }
    .palette-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
    .palette-btn { padding: 9px 0; border: none; border-radius: 4px; font-weight: 700; color: white; cursor: pointer; font-size: 12px; text-align: center; }
    
    /* CLEAR & HIGH VISIBILITY FOR OPTIONS */
    .cbt-opt-label {
      display: flex; align-items: center; padding: 14px 16px; margin-bottom: 12px;
      border: 1.5px solid #cbd5e1; border-radius: 8px; cursor: pointer;
      font-size: 15px; font-weight: 500; color: #0f172a; line-height: 1.5; background: #ffffff;
      transition: background 0.15s ease, border-color 0.15s ease;
    }
    .cbt-opt-label:hover { background: #f1f5f9; border-color: #94a3b8; }
    .cbt-opt-label input[type="radio"] {
      margin-right: 14px; width: 18px; height: 18px; flex-shrink: 0; accent-color: #2563eb; cursor: pointer;
    }
    .cbt-opt-label.selected-opt {
      background: #eff6ff; border-color: #2563eb; font-weight: 600;
    }
    
    .cbt-tabs { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px; overflow-x: auto; gap: 6px; -webkit-overflow-scrolling: touch; }
    .cbt-tab-btn { padding: 9px 12px; border: none; background: transparent; cursor: pointer; font-weight: 600; color: #64748b; border-bottom: 2px solid transparent; white-space: nowrap; font-size: 13px; }
    .cbt-tab-btn.active { color: #2563eb; border-bottom-color: #2563eb; }
    .cbt-pane { display: none; }
    .cbt-pane.active { display: block; }
    
    .cbt-item-chip { display: inline-flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 20px; margin: 3px; font-size: 12px; }
    .cbt-item-chip span { color: #dc2626; cursor: pointer; font-weight: bold; }
    .cbt-btn-del { background: #ef4444; color: white; border: none; padding: 4px 7px; border-radius: 4px; cursor: pointer; font-size: 11px; }
    .cbt-btn-edit { background: #3b82f6; color: white; border: none; padding: 4px 7px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 4px; }
    .cbt-link-back { color: #2563eb; font-size: 13px; font-weight: 600; text-decoration: none; cursor: pointer; margin-bottom: 12px; display: inline-flex; align-items: center; gap: 4px; }
    .pdf-card { display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 10px; background: #fff; gap: 8px; flex-wrap: wrap; }

    .rules-list { margin: 14px 0; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px; font-size: 13px; line-height: 1.5; }
    .rules-list li { margin-bottom: 6px; list-style-position: inside; }
    .scheme-badge { display: inline-flex; gap: 6px; background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; padding: 6px 10px; border-radius: 6px; font-weight: 700; font-size: 12px; }

    .solution-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 14px; background: #fff; }
    .solution-card.correct-ans { border-left: 5px solid #10b981; }
    .solution-card.wrong-ans { border-left: 5px solid #ef4444; }
    .solution-card.skipped-ans { border-left: 5px solid #8b5cf6; }
    .sol-explanation-box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 10px 12px; border-radius: 6px; margin-top: 8px; font-size: 13px; color: #334155; line-height: 1.5; white-space: pre-line; }

    .cbt-modal-backdrop {
      display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75);
      z-index: 999999; justify-content: center; align-items: center; padding: 16px;
    }
    .cbt-modal-backdrop.active { display: flex; }
    .cbt-modal-box {
      background: #ffffff; width: 100%; max-width: 440px; border-radius: 10px;
      padding: 20px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); max-height: 90vh; overflow-y: auto;
    }
    .cbt-modal-title { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
    .cbt-modal-text { font-size: 13px; color: #475569; line-height: 1.5; margin-bottom: 16px; }
    .cbt-modal-actions { display: flex; justify-content: flex-end; gap: 8px; }

    .preview-editor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
    .preview-box-container { background: #f8fafc; border: 1px dashed #3b82f6; border-radius: 6px; padding: 12px; }
    .preview-correct-badge { display: inline-block; background: #10b981; color: #fff; font-size: 10px; padding: 2px 5px; border-radius: 4px; margin-left: auto; }
    .cbt-responsive-flex-row { display: flex; gap: 8px; align-items: center; }

    .toggle-switch-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
    .toggle-switch-label { font-size: 13px; font-weight: 600; color: #334155; }
    .toggle-switch { position: relative; display: inline-block; width: 44px; height: 24px; }
    .toggle-switch input { opacity: 0; width: 0; height: 0; }
    .toggle-slider { position: absolute; cursor: pointer; inset: 0; background-color: #cbd5e1; transition: .3s; border-radius: 24px; }
    .toggle-slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .3s; border-radius: 50%; }
    input:checked + .toggle-slider { background-color: #8b5cf6; }
    input:checked + .toggle-slider:before { transform: translateX(20px); }

    @media (max-width: 768px) {
      .cbt-nav { padding: 10px 12px; }
      .cbt-brand-name { font-size: 14px; }
      .cbt-view { width: 96%; padding: 14px; margin: 10px auto; }
      .test-fullscreen-body { flex-direction: column; overflow-y: auto; }
      .test-main-area { border-right: none; border-bottom: 2px solid #e2e8f0; padding: 14px; overflow-y: visible; }
      .test-sidebar { width: 100%; border-top: 1px solid #e2e8f0; padding: 14px; overflow-y: visible; }
      .preview-editor-grid { grid-template-columns: 1fr; }
      .cbt-responsive-grid-admin { grid-template-columns: 1fr !important; }
      .cbt-responsive-flex-row { flex-direction: column; align-items: stretch; }
      .cbt-responsive-flex-row button { width: 100% !important; }
      .cbt-responsive-result-grid { grid-template-columns: 1fr !important; gap: 8px !important; }
      .cbt-action-btn-group { flex-direction: column; gap: 8px; }
      .cbt-action-btn-group button { width: 100% !important; max-width: 100% !important; margin-left: 0 !important; }
      .cbt-profile-dropdown { right: -10px; width: 280px; }
    }
  `;
  document.head.appendChild(styleEl);

  /* ==========================================================================
     SECTION 6: INJECT DOM STRUCTURE
     ========================================================================== */
  const portalDiv = document.createElement("div");
  portalDiv.id = "cbt-portal";
  portalDiv.innerHTML = `
    <!-- Top Global Navigation Bar -->
    <div class="cbt-nav" id="dom-main-navbar">
      <div class="cbt-logo-area">
        <img id="dom-brand-pic" class="cbt-profile-img-header" src="" alt="Portal Logo" />
        <span class="cbt-logo-badge" id="dom-brand-badge"></span>
        <span class="cbt-brand-name" id="dom-brand-name"></span>
      </div>
      <div class="cbt-nav-actions">
        <button class="cbt-btn-pay" id="btn-open-payment">Payment & Register</button>
        <button class="cbt-btn-admin-nav" id="btn-open-admin">Admin Portal</button>
        
        <div class="cbt-profile-menu-container" id="cbt-candidate-menu-wrapper">
          <div class="cbt-candidate-badge-logo" id="dom-candidate-logo-btn">
            <span id="dom-cand-logo-text">🎓 AW</span>
            <span style="font-size:10px;">▼</span>
          </div>

          <div class="cbt-profile-dropdown">
            <div style="font-size:14px; font-weight:800; color:#0f172a; margin-bottom:2px;" id="drop-display-username">Candidate</div>
            <div style="font-size:11px; color:#64748b; margin-bottom:8px;">Status: <span style="color:#10b981; font-weight:700;">Verified Active</span></div>

            <div class="drop-info-title">Contact & Subscription</div>
            <div class="drop-detail-row"><span style="color:#64748b;">Phone:</span><span style="font-weight:600;" id="drop-display-phone">+91 ----------</span></div>
            <div class="drop-detail-row"><span style="color:#64748b;">Fee Paid:</span><span style="font-weight:700; color:#10b981;" id="drop-display-price">₹ 0.00</span></div>
            <div class="drop-detail-row"><span style="color:#64748b;">Coupon:</span><span style="font-weight:600;" id="drop-display-coupon">None</span></div>

            <div class="drop-divider"></div>
            <div class="drop-info-title">Performance Summary</div>
            <div id="drop-perf-summary" style="font-size:12px; color:#475569; margin-bottom:8px;">No tests taken yet.</div>

            <div class="drop-divider"></div>
            <div class="drop-info-title">Update Credentials</div>
            <input type="text" id="drop-edit-name" class="cbt-field" placeholder="Change Display Name" />
            <input type="password" id="drop-edit-pass" class="cbt-field" placeholder="Set New Password" />
            <button class="cbt-btn-primary" id="btn-drop-save-credentials" style="margin-bottom:6px;">Update</button>
            <button class="cbt-btn-secondary" id="btn-drop-logout" style="background:#fee2e2; color:#dc2626; border:1px solid #fecaca;">Logout</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Window 1: Candidate Login -->
    <div id="win-1" class="cbt-view">
      <div class="cbt-h1">Candidate Examination Login</div>
      <div class="cbt-h2">Registration is strictly required to login (Except Admin)</div>
      <input type="text" id="login-username" class="cbt-field" placeholder="Candidate Username" />
      <input type="password" id="login-password" class="cbt-field" placeholder="Candidate Password" />
      <button class="cbt-btn-primary" id="btn-action-login">Login to Portal</button>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:14px; font-size:12px; flex-wrap:wrap; gap:8px;">
        <span class="cbt-link-back" id="link-open-forgot" style="margin:0;">Forgot Password?</span>
        <span style="color:#64748b;">New student? Click "Payment & Register"</span>
      </div>
    </div>

    <!-- Window Forgot: Password Reset -->
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

    <!-- Window Register: Multi-step Payment & Registration -->
    <div id="win-register" class="cbt-view">
      <span class="cbt-link-back" id="link-back-login">&larr; Back to Login</span>
      <div id="pay-step-1">
        <div class="cbt-h1">Registration Fee Payment</div>
        <div class="cbt-h2">Pay application fee to unlock candidate credentials</div>
        
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px; margin: 14px 0; text-align:center;">
          <div style="font-size:13px; color:#64748b;">Standard Enrollment Fee:</div>
          <div style="font-size:24px; font-weight:800; color:#10b981;" id="dom-checkout-price">₹ 0.00</div>
          <div style="font-size:12px; color:#059669; font-weight:600; display:none;" id="dom-discount-info"></div>
        </div>

        <div class="cbt-responsive-flex-row" style="margin-bottom:12px;">
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

    <!-- Window 2: Topic Selection (Dashboard) -->
    <div id="win-2" class="cbt-view">
      <div class="cbt-h1">Welcome, start your practice</div>
      <div class="cbt-h2">Select Your Topic</div>
      <div class="cbt-grid" id="dom-win2-topics"></div>

      <div style="border-top:2px solid #f1f5f9; padding-top:14px; margin-top:16px;">
        <div style="font-size:15px; font-weight:700; margin-bottom:8px;">Study Material & PDF Notes</div>
        <div id="dom-notes-container"></div>
      </div>
    </div>

    <!-- Window 3: Category & Set Selection -->
    <div id="win-3" class="cbt-view">
      <span class="cbt-link-back" id="link-back-topics">&larr; Back to Topics</span>
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #f1f5f9; padding-bottom:8px; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
        <span id="win3-topic-heading" style="font-weight:700; font-size:16px;"></span>
        <span style="color:#dc2626; font-weight:700; font-size:13px;" id="win3-time-preview">Time : 30:00 min</span>
      </div>
      <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:8px;">Paper Categories / Test Types:</div>
      <div class="cbt-grid" id="dom-win3-paper-types"></div>
      <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:8px;">Practice Sets:</div>
      <div class="cbt-grid" id="dom-win3-practice-sets"></div>
    </div>

    <!-- Window 3.5: Pre-Exam Confirmation & Instructions Screen -->
    <div id="win-instructions" class="cbt-view">
      <span class="cbt-link-back" id="link-back-from-instructions">&larr; Back to Categories</span>
      <div class="cbt-h1" id="inst-heading" style="text-align:left;">Examination Instructions & Confirmation</div>
      <div class="cbt-h2" id="inst-subheading" style="text-align:left;">Please read terms carefully before starting the test</div>

      <div style="display:flex; gap:10px; margin: 12px 0; flex-wrap:wrap;">
        <div class="scheme-badge">Marks Correct: <span id="inst-pos-mark">+2.0</span></div>
        <div class="scheme-badge" style="background:#fef2f2; border-color:#fecaca; color:#991b1b;">Negative Marking: <span id="inst-neg-mark">-0.50</span></div>
      </div>

      <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:12px; margin-bottom:14px;">
        <label style="font-weight:700; font-size:13px; display:block; margin-bottom:6px;">Choose Default Examination Language:</label>
        <select id="exam-lang-select" class="cbt-field" style="margin:0; max-width:100%;">
          <option value="en">English</option>
          <option value="hi">हिंदी (Hindi)</option>
        </select>
      </div>

      <div class="rules-list">
        <b>Rules, Terms & Conditions:</b>
        <ol style="margin-top:6px;">
          <li>Once started, the test screen will lock into <b>Full-Screen Mode</b>.</li>
          <li>Page refresh or closing the tab will not terminate the exam; timer continues.</li>
          <li>Negative marking is applied for every incorrect answer. Skipped questions carry zero deduction.</li>
          <li>Do not exit full screen or switch browser tabs.</li>
        </ol>
      </div>

      <div style="margin:14px 0; display:flex; align-items:flex-start; gap:8px;">
        <input type="checkbox" id="inst-agree-chk" style="margin-top:4px; transform:scale(1.1); cursor:pointer;" />
        <label for="inst-agree-chk" style="font-size:12px; color:#334155; cursor:pointer;">
          I have read and understood all the instructions, negative marking scheme, and rules.
        </label>
      </div>

      <button class="cbt-btn-primary" id="btn-start-locked-exam" style="padding:12px; font-size:15px; background:#10b981;" disabled>I Am Ready to Begin (Start Test)</button>
    </div>

    <!-- Window 4: Locked Full-Screen Exam Terminal -->
    <div id="win-4" class="cbt-view">
      <div style="display:flex; justify-content:space-between; align-items:center; background:#0f172a; color:#fff; padding:10px 14px; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="background:#ef4444; color:#fff; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px;">LOCKED</span>
          <div style="font-weight:700; font-size:13px;" id="win4-banner">Exam Terminal</div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <select id="win4-lang-toggle" style="background:#1e293b; color:#fff; border:1px solid #475569; padding:2px 4px; border-radius:4px; font-size:11px;">
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
          <div style="font-size:18px; font-weight:800; color:#ef4444;" id="win4-clock">30:00</div>
        </div>
      </div>

      <div class="test-fullscreen-body">
        <div class="test-main-area">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #e2e8f0; padding-bottom:6px;">
            <span style="font-size:13px; font-weight:700; color:#64748b;" id="win4-counter">Question 1</span>
            <span style="font-size:11px; font-weight:700; color:#2563eb;" id="win4-mark-info">+2.0 / -0.50</span>
          </div>
          <div id="dom-test-container" style="flex:1;"></div>
          <div class="cbt-action-btn-group" style="display:flex; gap:10px; margin-top:16px;">
            <button class="cbt-btn-primary" id="btn-save-next" style="width:auto; padding:10px 22px;">Save & Next</button>
            <button class="cbt-btn-primary" id="btn-submit-exam" style="width:auto; padding:10px 22px; background:#dc2626; margin-left:auto;">Submit Final Exam</button>
          </div>
        </div>

        <div class="test-sidebar">
          <div style="font-weight:700; font-size:14px;">Question Palette</div>
          <div class="palette-legend">
            <div class="legend-item"><span class="circle-icon bg-attempted"></span> Attempted: <span id="stat-attempted" style="color:#10b981;">0</span></div>
            <div class="legend-item"><span class="circle-icon bg-unattempted"></span> Unattempted: <span id="stat-unattempted" style="color:#8b5cf6;">0</span></div>
          </div>
          <div style="font-size:11px; font-weight:600; color:#64748b;">Click question number to jump:</div>
          <div class="palette-grid" id="dom-palette-grid"></div>
        </div>
      </div>
    </div>

    <!-- Window Result: Performance Card -->
    <div id="win-result" class="cbt-view">
      <div class="cbt-h1">Examination Scorecard & Result</div>
      <div class="cbt-h2">Review detailed performance metrics & score</div>
      <div id="dom-result-stats" style="text-align:center; margin: 18px 0;"></div>
      <div class="cbt-action-btn-group" style="display:flex; gap:10px; justify-content:center;">
        <button class="cbt-btn-primary" id="btn-view-solutions" style="background:#10b981;">View Detailed Solutions</button>
        <button class="cbt-btn-secondary" id="btn-restart-flow">Back to Topics</button>
      </div>
    </div>

    <!-- Window Solutions: Question-by-question Review -->
    <div id="win-solutions" class="cbt-view">
      <span class="cbt-link-back" id="link-back-result">&larr; Back to Result</span>
      <div class="cbt-h1" style="text-align:left; margin-bottom:4px;">Test Questions & Solutions</div>
      <div class="cbt-h2" style="text-align:left; margin-bottom:14px;" id="dom-solutions-header">Detailed breakdown of answers:</div>
      <div id="dom-solutions-container"></div>
      <button class="cbt-btn-primary" id="btn-sol-back-topics" style="margin-top:14px;">Finish & Back to Topics</button>
    </div>

    <!-- Window Admin Auth: Secret PIN Authentication -->
    <div id="win-admin-auth" class="cbt-view">
      <span class="cbt-link-back" id="link-admin-back-login">&larr; Back to Login</span>
      <div class="cbt-h1">Admin Authentication</div>
      <div class="cbt-h2">Enter admin access PIN to manage portal</div>
      <input type="password" id="admin-pass-input" class="cbt-field" placeholder="Enter Admin Password / PIN" />
      <button class="cbt-btn-primary" id="btn-admin-verify">Unlock Control Dashboard</button>
    </div>

    <!-- Window Admin Dash: Master Control Dashboard -->
    <div id="win-admin-dash" class="cbt-view">
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #f1f5f9; padding-bottom:8px; margin-bottom:14px;">
        <span style="font-weight:700; font-size:16px;">Admin Center</span>
        <button class="cbt-btn-del" id="btn-admin-exit">Logout Admin</button>
      </div>
      <div class="cbt-tabs">
        <button class="cbt-tab-btn active" data-pane="pane-pricing">Pricing & Coupons</button>
        <button class="cbt-tab-btn" data-pane="pane-branding">Branding & Logo</button>
        <button class="cbt-tab-btn" data-pane="pane-w2">Topics</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-papers">Categories</button>
        <button class="cbt-tab-btn" data-pane="pane-w3-sets">Sets</button>
        <button class="cbt-tab-btn" data-pane="pane-w4-questions">Questions</button>
        <button class="cbt-tab-btn" data-pane="pane-notes">PDF & Notes</button>
        <button class="cbt-tab-btn" data-pane="pane-security">Settings & AI</button>
      </div>

      <div id="pane-pricing" class="cbt-pane active">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px; margin-bottom:14px;">
          <div style="font-weight:600; margin-bottom:6px;">Base Enrollment Fee (₹):</div>
          <div class="cbt-responsive-flex-row">
            <input type="number" id="adm-base-price" class="cbt-field" style="margin:0;" min="0" step="1" />
            <button class="cbt-btn-primary" style="width:140px;" id="btn-adm-save-price">Save Price</button>
          </div>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px; margin-bottom:14px;">
          <div style="font-weight:600; margin-bottom:6px;">Create Discount Coupon:</div>
          <div class="cbt-responsive-grid-admin" style="display:grid; grid-template-columns: 2fr 1fr 100px; gap:6px;">
            <input type="text" id="adm-coupon-code" class="cbt-field" style="margin:0;" placeholder="Code" />
            <input type="number" id="adm-coupon-pct" class="cbt-field" style="margin:0;" placeholder="%" min="1" max="100" />
            <button class="cbt-btn-primary" id="btn-adm-add-coupon">Add</button>
          </div>
        </div>
        <div style="font-weight:600; margin-bottom:6px;">Active Coupon Codes:</div>
        <div id="dom-adm-coupons-list"></div>
      </div>

      <div id="pane-branding" class="cbt-pane">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:14px; border-radius:6px;">
          <div style="font-weight:600; margin-bottom:4px;">Website / Brand Name:</div>
          <input type="text" id="adm-brand-name" class="cbt-field" />
          
          <div style="font-weight:600; margin-bottom:4px;">Logo Badge Text:</div>
          <input type="text" id="adm-brand-badge" class="cbt-field" />
          
          <div style="font-weight:600; margin-bottom:4px;">Favicon URL / SVG Data:</div>
          <input type="text" id="adm-brand-favicon" class="cbt-field" />

          <div class="drop-divider"></div>
          <div style="font-weight:700; margin-bottom:6px; color:#1e293b;">Profile Picture / Circular Logo Image:</div>
          <input type="text" id="adm-brand-pic-url" class="cbt-field" placeholder="Paste Direct Image URL" />
          <div style="font-size:12px; color:#64748b; margin-bottom:6px;">Or upload from device:</div>
          <input type="file" id="adm-brand-pic-file" accept="image/*" class="cbt-field" style="background:#fff;" />

          <div style="display:flex; align-items:center; gap:12px; margin: 10px 0;">
            <span style="font-size:12px; font-weight:600;">Current Preview:</span>
            <img id="adm-profile-preview" src="" alt="Profile Preview" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:1px solid #cbd5e1; display:none;" />
            <button class="cbt-btn-del" id="btn-remove-profile-pic" style="display:none;">Remove Picture</button>
          </div>

          <button class="cbt-btn-primary" id="btn-adm-save-branding">Update Branding & Profile Picture</button>
        </div>
      </div>

      <div id="pane-w2" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:4px;">Add New Topic:</div>
        <div class="cbt-responsive-flex-row" style="margin-bottom:12px;">
          <input type="text" id="adm-add-topic" class="cbt-field" style="margin:0;" placeholder="Topic Name" />
          <button class="cbt-btn-primary" style="width:100px;" id="btn-adm-add-topic">Add</button>
        </div>
        <div id="dom-adm-topic-chips"></div>
      </div>

      <div id="pane-w3-papers" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:4px;">Add Paper Type / Category:</div>
        <div class="cbt-responsive-flex-row" style="margin-bottom:12px;">
          <input type="text" id="adm-add-category" class="cbt-field" style="margin:0;" placeholder="e.g. Lines" />
          <button class="cbt-btn-primary" style="width:100px;" id="btn-adm-add-cat">Add</button>
        </div>
        <div id="dom-adm-category-chips"></div>
      </div>

      <div id="pane-w3-sets" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:4px;">Add Set Label:</div>
        <div class="cbt-responsive-flex-row" style="margin-bottom:12px;">
          <input type="text" id="adm-add-set" class="cbt-field" style="margin:0;" placeholder="e.g. Practice Set 01" />
          <button class="cbt-btn-primary" style="width:100px;" id="btn-adm-add-set">Add</button>
        </div>
        <div id="dom-adm-set-chips"></div>
      </div>

      <div id="pane-w4-questions" class="cbt-pane">
        <div class="preview-editor-grid">
          <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span id="adm-form-mode" style="font-weight:700; color:#2563eb; font-size:12px;">CREATE NEW QUESTION</span>
              <button id="btn-adm-cancel-edit" style="display:none; background:#94a3b8; color:#fff; border:none; border-radius:4px; padding:2px 6px; font-size:10px; cursor:pointer;">Cancel</button>
            </div>
            <select id="adm-sel-topic" class="cbt-field"></select>
            <select id="adm-sel-cat" class="cbt-field"></select>
            <input type="text" id="adm-q-title" class="cbt-field" placeholder="Question Text (English)" />
            <input type="text" id="adm-q-title-hi" class="cbt-field" placeholder="Question Text (Hindi Translation)" />
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
            
            <div style="display:flex; justify-content:space-between; align-items:center; margin: 6px 0;">
              <span style="font-size:12px; font-weight:700; color:#475569;">Explanation & Trick:</span>
              <button type="button" class="cbt-btn-ai" id="btn-ai-gen-solution">✨ AI Generate Solution & Trick</button>
            </div>
            <textarea id="adm-q-solution" class="cbt-field" style="resize:vertical; height:70px;" placeholder="Detailed Solution & Memory Trick"></textarea>
            
            <button class="cbt-btn-primary" id="btn-adm-save-q">Save Question</button>
          </div>

          <div class="preview-box-container">
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #cbd5e1; padding-bottom:4px; margin-bottom:8px;">
              <span style="font-weight:700; font-size:12px;">LIVE PREVIEW</span>
              <span id="preview-meta-tag" style="font-size:11px; color:#64748b; font-weight:600;">[Topic • Cat]</span>
            </div>
            <div id="preview-live-text" style="font-weight:700; font-size:13px; margin-bottom:8px; min-height:30px;">Preview renders here...</div>
            <div id="preview-live-options"></div>
            <div id="preview-live-solution" style="margin-top:8px; font-size:11px; color:#475569; background:#e2e8f0; padding:6px; border-radius:4px; display:none; white-space:pre-line;"></div>
          </div>
        </div>

        <div style="font-weight:600; margin:10px 0 6px 0; font-size:13px;">Question Pool:</div>
        <div style="max-height:180px; overflow-y:auto; border:1px solid #e2e8f0; border-radius:6px;">
          <table style="width:100%; border-collapse:collapse; font-size:12px;" id="dom-table-q-list"></table>
        </div>
      </div>

      <div id="pane-notes" class="cbt-pane">
        <div style="font-weight:600; margin-bottom:4px;">Add Study Document:</div>
        <input type="text" id="adm-pdf-title" class="cbt-field" placeholder="Title" />
        <input type="text" id="adm-pdf-url" class="cbt-field" placeholder="URL" />
        <button class="cbt-btn-primary" id="btn-adm-save-pdf" style="margin-bottom:12px;">Add Document</button>
        <div id="dom-adm-pdf-list"></div>
      </div>

      <div id="pane-security" class="cbt-pane">
        <!-- OpenAI / ChatGPT Configuration Panel -->
        <div style="background:#f8fafc; border:1px solid #cbd5e1; padding:14px; border-radius:6px; margin-bottom:14px;">
          <div style="font-weight:700; font-size:14px; color:#8b5cf6; margin-bottom:4px;">OpenAI / ChatGPT Automation Controls:</div>
          <div style="font-size:12px; color:#64748b; margin-bottom:10px;">Paste your API Key below to power automatic solutions, facts, and short tricks.</div>
          
          <label style="font-size:12px; font-weight:700; color:#334155;">OpenAI Secret API Key:</label>
          <input type="password" id="adm-ai-key" class="cbt-field" placeholder="sk-proj-dummy-key-paste-here..." />

          <div class="toggle-switch-row">
            <div>
              <div class="toggle-switch-label">Admin 1-Click AI Auto-Fill Button</div>
              <div style="font-size:11px; color:#64748b;">Enables the '✨ AI Generate Solution & Trick' button while editing questions.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="chk-ai-admin" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <div class="toggle-switch-row">
            <div>
              <div class="toggle-switch-label">Candidate Dynamic AI Fallback</div>
              <div style="font-size:11px; color:#64748b;">Automatically fetches solutions & tricks in real-time if a question was saved without any explanation.</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="chk-ai-candidate" />
              <span class="toggle-slider"></span>
            </label>
          </div>

          <button class="cbt-btn-primary" id="btn-adm-save-ai" style="margin-top:10px; background:linear-gradient(135deg, #7c3aed, #c026d3);">Save AI Settings & Key</button>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px; margin-bottom:12px;">
          <div style="font-weight:600; margin-bottom:6px;">Reset Admin PIN:</div>
          <div class="cbt-responsive-flex-row">
            <input type="password" id="adm-new-pin" class="cbt-field" style="margin:0;" placeholder="New PIN" />
            <button class="cbt-btn-primary" style="width:120px;" id="btn-adm-reset-pin">Update PIN</button>
          </div>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px;">
          <div style="font-weight:600; margin-bottom:6px;">Exam Marking & Duration:</div>
          <label style="font-size:11px; font-weight:700;">Marks for Correct (+):</label>
          <input type="number" id="adm-mark-pos" class="cbt-field" step="0.5" />
          <label style="font-size:11px; font-weight:700;">Negative Marks per Wrong (-):</label>
          <input type="number" id="adm-mark-neg" class="cbt-field" step="0.25" />
          <label style="font-size:11px; font-weight:700;">Duration (Minutes):</label>
          <input type="number" id="adm-exam-min" class="cbt-field" min="1" max="180" />
          <button class="cbt-btn-primary" id="btn-adm-save-scheme">Save Settings</button>
        </div>
      </div>
    </div>

    <!-- Modal Dialog -->
    <div id="dom-cbt-modal" class="cbt-modal-backdrop">
      <div class="cbt-modal-box">
        <div class="cbt-modal-title" id="cbt-modal-heading">Notification</div>
        <div class="cbt-modal-text" id="cbt-modal-body">Message content goes here.</div>
        <div class="cbt-modal-actions" id="cbt-modal-btns"></div>
      </div>
    </div>
  `;
  document.body.appendChild(portalDiv);

  /* ==========================================================================
     SECTION 7: MODAL NOTIFICATIONS
     ========================================================================== */
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

  function showInAppConfirm(title, message, onConfirm, onCancel, confirmText = "Confirm") {
    const modal = document.getElementById("dom-cbt-modal");
    const h = document.getElementById("cbt-modal-heading");
    const b = document.getElementById("cbt-modal-body");
    const btns = document.getElementById("cbt-modal-btns");

    h.innerText = title;
    b.innerHTML = message;
    btns.innerHTML = `
      <button class="cbt-btn-secondary" style="width:auto; padding:8px 16px;" id="cbt-modal-cancel">Cancel</button>
      <button class="cbt-btn-primary" style="width:auto; padding:8px 16px; background:#dc2626;" id="cbt-modal-yes">${confirmText}</button>
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

    const nav = document.getElementById("dom-main-navbar");
    if (targetId === "win-4") {
      if (nav) nav.style.display = "none";
    } else {
      if (nav) nav.style.display = "flex";
    }
  }

  /* ==========================================================================
     SECTION 8: SECURITY & FULLSCREEN LOCK ENGINE
     ========================================================================== */
  function enterFullScreen() {
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }

  function exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }

  window.addEventListener("beforeunload", (e) => {
    if (isExamActive) {
      saveExamSnapshot();
      e.preventDefault();
      e.returnValue = "Your exam is currently in progress!";
      return e.returnValue;
    }
  });

  /* ==========================================================================
     SECTION 9: CANDIDATE AUTHENTICATION & NAVBAR LOGIC
     ========================================================================== */
  function updateNavbarAuthState() {
    const btnPay = document.getElementById("btn-open-payment");
    const btnAdmin = document.getElementById("btn-open-admin");
    const menuContainer = document.getElementById("cbt-candidate-menu-wrapper");

    if (activeUser && activeUser.username) {
      btnPay.style.display = "none";
      btnAdmin.style.display = "none";
      menuContainer.style.display = "block";
      document.getElementById("dom-cand-logo-text").innerText = `🎓 ${brandConfig.badge} • ${activeUser.username}`;

      document.getElementById("drop-display-username").innerText = activeUser.username;
      document.getElementById("drop-display-phone").innerText = activeUser.mobile ? `+91 ${activeUser.mobile}` : "Not Available";
      document.getElementById("drop-display-price").innerText = activeUser.purchaseAmount ? `₹ ${activeUser.purchaseAmount}` : `₹ ${storePrice.toFixed(2)}`;
      document.getElementById("drop-display-coupon").innerText = activeUser.appliedCoupon || "Direct Payment";

      const candidateStats = userPerformance[activeUser.username];
      const perfEl = document.getElementById("drop-perf-summary");
      if (candidateStats && candidateStats.length > 0) {
        const last = candidateStats[candidateStats.length - 1];
        perfEl.innerHTML = `Tests Given: <b>${candidateStats.length}</b><br>Last Net Score: <b>${last.netScore} pts (${last.pct}%)</b> [${last.category}]`;
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

      if (oldName !== newName && userPerformance[oldName]) {
        userPerformance[newName] = userPerformance[oldName];
        delete userPerformance[oldName];
      }

      syncAllData();
      updateNavbarAuthState();
      showInAppMessage("Account Updated", "Your profile details have been saved successfully!");
    }
  });

  function candidateLogout() {
    if (isExamActive) {
      showInAppMessage("Test In Progress", "You cannot logout while an exam is running.");
      return;
    }
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

  /* ==========================================================================
     SECTION 10: REGISTRATION, CHECKOUT & PAYMENT LOGIC
     ========================================================================== */
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

  /* ==========================================================================
     SECTION 11: PASSWORD RECOVERY WORKFLOW
     ========================================================================== */
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

  /* ==========================================================================
     SECTION 12: CANDIDATE PORTAL NAVIGATION & RENDERING (WINDOWS 2 & 3)
     ========================================================================== */
  document.getElementById("btn-action-login").addEventListener("click", () => {
    const u = document.getElementById("login-username").value.trim();
    const p = document.getElementById("login-password").value.trim();

    const matched = registeredUsers.find((item) => item.username.toLowerCase() === u.toLowerCase() && item.password === p);
    if (!matched) {
      showInAppMessage("Access Denied", "Invalid username or password.");
      return;
    }

    activeUser = matched;
    syncAllData();
    updateNavbarAuthState();

    cbtRenderWindow2();
    cbtNavigate("win-2");
  });

  function cbtRenderWindow2() {
    const container = document.getElementById("dom-win2-topics");
    container.innerHTML = "";
    storeTopics.forEach((t) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = t;
      card.onclick = () => {
        activeTopic = t.trim();
        document.getElementById("win3-topic-heading").innerText = activeTopic;
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
          <a href="${n.url}" target="_blank" style="padding:6px 12px; background:#2563eb; color:#fff; text-decoration:none; border-radius:4px; font-size:12px; white-space:nowrap;">Download PDF</a>
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
      card.onclick = () => cbtPrepareInstructions(cat);
      catBox.appendChild(card);
    });

    storeSets.forEach((setLabel) => {
      const card = document.createElement("div");
      card.className = "cbt-selection-card";
      card.innerText = setLabel;
      card.onclick = () => cbtPrepareInstructions(setLabel);
      setBox.appendChild(card);
    });
  }

  function cbtPrepareInstructions(categoryName) {
    activeCategory = (categoryName || "").trim();
    const targetTopic = (activeTopic || "").trim().toLowerCase();
    const targetCat = activeCategory.toLowerCase();

    activeExamQuestions = storeQuestions.filter((q) => {
      const qTopic = (q.topic || "").trim().toLowerCase();
      const qCat = (q.category || "").trim().toLowerCase();
      return qTopic === targetTopic && qCat === targetCat;
    });

    if (activeExamQuestions.length === 0) {
      showInAppMessage(
        "No Questions Available",
        `There are currently 0 questions available for "${activeTopic}" under "${activeCategory}".`
      );
      return;
    }

    document.getElementById("inst-heading").innerText = `${activeTopic} - ${activeCategory}`;
    document.getElementById("inst-pos-mark").innerText = `+${storeMarkPositive.toFixed(2)}`;
    document.getElementById("inst-neg-mark").innerText = `-${storeMarkNegative.toFixed(2)}`;

    const chk = document.getElementById("inst-agree-chk");
    const btn = document.getElementById("btn-start-locked-exam");
    chk.checked = false;
    btn.disabled = true;

    chk.onchange = () => {
      btn.disabled = !chk.checked;
    };

    cbtNavigate("win-instructions");
  }

  document.getElementById("link-back-from-instructions").addEventListener("click", () => {
    cbtRenderWindow3();
    cbtNavigate("win-3");
  });

  document.getElementById("btn-start-locked-exam").addEventListener("click", () => {
    activeLanguage = document.getElementById("exam-lang-select").value;
    document.getElementById("win4-lang-toggle").value = activeLanguage;
    cbtLaunchTestExecution();
  });

  document.getElementById("link-back-topics").addEventListener("click", () => {
    cbtRenderWindow2();
    cbtNavigate("win-2");
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

  /* ==========================================================================
     SECTION 13: EXAM ENGINE, TIMER & ACCESSIBLE QUESTION RENDERING
     ========================================================================== */
  function cbtLaunchTestExecution() {
    isExamActive = true;
    currentQuestionIndex = 0;
    candidateAnswers = {};
    remainingSeconds = storeDuration * 60;

    document.getElementById("win4-banner").innerText = `${brandConfig.name} | ${activeTopic} (${activeCategory})`;
    document.getElementById("win4-mark-info").innerText = `+${storeMarkPositive.toFixed(2)} / -${storeMarkNegative.toFixed(2)}`;

    cbtNavigate("win-4");
    enterFullScreen();
    cbtRenderQuestion();
    cbtUpdatePalette();
    cbtStartTimer();
    saveExamSnapshot();
  }

  function cbtResumeTest(snap) {
    isExamActive = true;
    activeTopic = snap.activeTopic;
    activeCategory = snap.activeCategory;
    activeLanguage = snap.activeLanguage || "en";
    activeExamQuestions = snap.activeExamQuestions || [];
    currentQuestionIndex = snap.currentQuestionIndex || 0;
    candidateAnswers = snap.candidateAnswers || {};

    const elapsed = Math.floor((Date.now() - snap.timestamp) / 1000);
    remainingSeconds = Math.max(5, (snap.remainingSeconds || 1800) - elapsed);

    document.getElementById("win4-lang-toggle").value = activeLanguage;
    document.getElementById("win4-banner").innerText = `${brandConfig.name} | ${activeTopic} (${activeCategory})`;
    document.getElementById("win4-mark-info").innerText = `+${storeMarkPositive.toFixed(2)} / -${storeMarkNegative.toFixed(2)}`;

    cbtNavigate("win-4");
    enterFullScreen();
    cbtRenderQuestion();
    cbtUpdatePalette();
    cbtStartTimer();
  }

  function cbtRenderQuestion() {
    const cur = activeExamQuestions[currentQuestionIndex];
    document.getElementById("win4-counter").innerText =
      `Question ${currentQuestionIndex + 1} of ${activeExamQuestions.length}`;

    const container = document.getElementById("dom-test-container");
    const questionText = (activeLanguage === "hi" && cur.text_hi) ? cur.text_hi : cur.text;

    let html = `<div style="font-size:18px; font-weight:800; margin-bottom:16px; line-height:1.5; color:#0f172a;">Q${currentQuestionIndex + 1}. ${questionText}</div>`;

    for (let i = 0; i < cur.options.length; i++) {
      const isChecked = candidateAnswers[currentQuestionIndex] === i;
      const checkedAttr = isChecked ? "checked" : "";
      const selectedClass = isChecked ? "selected-opt" : "";

      html += `
        <label class="cbt-opt-label ${selectedClass}" id="opt-label-${i}">
          <input type="radio" name="cbt-choice" value="${i}" ${checkedAttr} />
          <span><b>${String.fromCharCode(65 + i)}.</b> &nbsp; ${cur.options[i]}</span>
        </label>`;
    }
    container.innerHTML = html;

    // Attach immediate visual selection feedback
    container.querySelectorAll('input[name="cbt-choice"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        container.querySelectorAll('.cbt-opt-label').forEach(lbl => lbl.classList.remove('selected-opt'));
        const parent = e.target.closest('.cbt-opt-label');
        if (parent) parent.classList.add('selected-opt');
      });
    });
  }

  document.getElementById("win4-lang-toggle").addEventListener("change", (e) => {
    activeLanguage = e.target.value;
    cbtRenderQuestion();
    saveExamSnapshot();
  });

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
        saveExamSnapshot();
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
      saveExamSnapshot();
    } else {
      cbtUpdatePalette();
      saveExamSnapshot();
      showInAppMessage("Last Question", "You are at the final question. Click 'Submit Final Exam' when ready.");
    }
  });

  document.getElementById("btn-submit-exam").addEventListener("click", () => {
    const checked = document.querySelector('input[name="cbt-choice"]:checked');
    if (checked) {
      candidateAnswers[currentQuestionIndex] = parseInt(checked.value, 10);
    }
    saveExamSnapshot();

    const attempted = Object.keys(candidateAnswers).length;
    const total = activeExamQuestions.length;
    const unattempted = total - attempted;

    const summaryMsg = `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:12px; border-radius:6px; margin: 10px 0;">
        <div>Total Questions: <b>${total}</b></div>
        <div style="color:#10b981;">Attempted Questions: <b>${attempted}</b></div>
        <div style="color:#ef4444;">Unattempted / Left: <b>${unattempted}</b></div>
      </div>
      Are you sure you want to finish and submit your exam?
    `;

    showInAppConfirm("Exam Submission (Check 1 of 2)", summaryMsg, () => {
      showInAppConfirm(
        "FINAL VERIFICATION (Check 2 of 2)",
        `<div style="color:#dc2626; font-weight:700; margin-bottom:8px;">Warning: Once confirmed, you CANNOT change any answer or re-enter this test.</div>Do you strictly confirm final submission?`,
        () => {
          cbtFinishTest();
        },
        null,
        "Yes, Submit Now"
      );
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
        showInAppMessage("Time Expired!", "Allotted time is over. Finalizing your test...", () => {
          cbtFinishTest();
        });
      }
      remainingSeconds--;

      if (remainingSeconds % 5 === 0) saveExamSnapshot();
    }, 1000);
  }

  function cbtFinishTest() {
    clearInterval(countdownRef);
    exitFullScreen();
    clearExamSnapshot();

    let correctCount = 0;
    let wrongCount = 0;

    activeExamQuestions.forEach((q, idx) => {
      if (candidateAnswers.hasOwnProperty(idx)) {
        if (candidateAnswers[idx] === q.correct) {
          correctCount++;
        } else {
          wrongCount++;
        }
      }
    });

    const totalQuestions = activeExamQuestions.length || 1;
    const attemptedCount = Object.keys(candidateAnswers).length;
    const unattemptedCount = totalQuestions - attemptedCount;

    const positiveMarksEarned = correctCount * storeMarkPositive;
    const negativeMarksDeducted = wrongCount * storeMarkNegative;
    const maxPossibleMarks = totalQuestions * storeMarkPositive;
    const netMarks = Math.max(0, positiveMarksEarned - negativeMarksDeducted);
    const netPct = Math.round((netMarks / maxPossibleMarks) * 100);
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

    if (activeUser && activeUser.username) {
      if (!userPerformance[activeUser.username]) {
        userPerformance[activeUser.username] = [];
      }
      userPerformance[activeUser.username].push({
        topic: activeTopic,
        category: activeCategory,
        total: totalQuestions,
        correct: correctCount,
        wrong: wrongCount,
        unattempted: unattemptedCount,
        netScore: netMarks.toFixed(2),
        maxMarks: maxPossibleMarks.toFixed(2),
        pct: netPct,
        date: new Date().toLocaleDateString()
      });
      syncAllData();
      updateNavbarAuthState();
    }

    document.getElementById("dom-result-stats").innerHTML = `
      <div style="font-size:38px; font-weight:800; color:#2563eb; margin-bottom:4px;">${netMarks.toFixed(2)} <span style="font-size:16px; color:#64748b;">/ ${maxPossibleMarks.toFixed(2)} pts</span></div>
      <div style="font-size:16px; font-weight:700; color:#0f172a; margin-bottom:12px;">Percentage: ${netPct}% | Accuracy: ${accuracy}%</div>

      <div class="cbt-responsive-result-grid" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; max-width:540px; margin:0 auto 14px auto; font-size:13px;">
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; padding:8px; border-radius:6px;">
          <div style="color:#059669; font-weight:700;">${correctCount} Correct</div>
          <div style="font-size:11px; color:#065f46;">+${positiveMarksEarned.toFixed(2)} pts</div>
        </div>
        <div style="background:#fef2f2; border:1px solid #fecaca; padding:8px; border-radius:6px;">
          <div style="color:#dc2626; font-weight:700;">${wrongCount} Incorrect</div>
          <div style="font-size:11px; color:#991b1b;">-${negativeMarksDeducted.toFixed(2)} pts</div>
        </div>
        <div style="background:#f5f3ff; border:1px solid #ddd6fe; padding:8px; border-radius:6px;">
          <div style="color:#7c3aed; font-weight:700;">${unattemptedCount} Skipped</div>
          <div style="font-size:11px; color:#5b21b6;">0.00 pts</div>
        </div>
      </div>
      <div style="font-size:12px; color:#64748b;">Test Paper: <b>${activeTopic} (${activeCategory})</b></div>
    `;

    cbtNavigate("win-result");
  }

  /* ==========================================================================
     SECTION 14: DETAILED SOLUTIONS REVIEW
     ========================================================================== */
  document.getElementById("btn-view-solutions").addEventListener("click", () => {
    const solContainer = document.getElementById("dom-solutions-container");
    solContainer.innerHTML = "";
    document.getElementById("dom-solutions-header").innerText = `Solutions for ${activeTopic} - ${activeCategory}:`;

    activeExamQuestions.forEach((q, idx) => {
      const userAns = candidateAnswers[idx];
      const isAttempted = userAns !== undefined;
      const isCorrect = userAns === q.correct;

      let statusClass = "skipped-ans";
      let statusText = "<span style='color:#8b5cf6; font-weight:700;'>SKIPPED (0 pts)</span>";

      if (isAttempted) {
        if (isCorrect) {
          statusClass = "correct-ans";
          statusText = `<span style='color:#10b981; font-weight:700;'>CORRECT (+${storeMarkPositive.toFixed(2)} pts)</span>`;
        } else {
          statusClass = "wrong-ans";
          statusText = `<span style='color:#ef4444; font-weight:700;'>INCORRECT (-${storeMarkNegative.toFixed(2)} pts)</span>`;
        }
      }

      const card = document.createElement("div");
      card.className = `solution-card ${statusClass}`;

      let opsHtml = "";
      q.options.forEach((opt, oIdx) => {
        let optStyle = "padding:8px 12px; border-radius:6px; margin-bottom:6px; font-size:13px;";
        if (oIdx === q.correct) {
          optStyle += " background:#dcfce7; border:1.5px solid #86efac; font-weight:700; color:#166534;";
        } else if (isAttempted && userAns === oIdx) {
          optStyle += " background:#fee2e2; border:1.5px solid #fca5a5; color:#991b1b;";
        } else {
          optStyle += " background:#f8fafc; border:1px solid #e2e8f0;";
        }

        const isUserChoice = isAttempted && userAns === oIdx ? " <b>(Your Answer)</b>" : "";
        const isRightChoice = oIdx === q.correct ? " <b>(Correct Answer)</b>" : "";

        opsHtml += `<div style="${optStyle}"><b>${String.fromCharCode(65 + oIdx)}.</b> ${opt} ${isUserChoice} ${isRightChoice}</div>`;
      });

      const qText = (activeLanguage === "hi" && q.text_hi) ? q.text_hi : q.text;

      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; margin-bottom:6px; flex-wrap:wrap; gap:4px;">
          <span style="font-weight:700; font-size:13px; color:#475569;">Question ${idx + 1}</span>
          <div>${statusText}</div>
        </div>
        <div style="font-size:15px; font-weight:700; margin-bottom:10px; color:#0f172a;">${qText}</div>
        <div style="margin-bottom:8px;">${opsHtml}</div>
        <div class="sol-explanation-box" id="sol-box-${idx}">
          <b>Detailed Solution & Memory Trick:</b><br>
          <span class="sol-text-content">${q.solution ? q.solution : (aiCandidateEnabled ? "<em>Fetching AI Solution & Trick...</em>" : "No detailed explanation provided.")}</span>
        </div>
      `;
      solContainer.appendChild(card);

      if (!q.solution && aiCandidateEnabled) {
        const correctOptStr = q.options[q.correct] || "";
        callOpenAiForSolution(q.text, correctOptStr)
          .then((aiText) => {
            q.solution = aiText;
            syncAllData();
            const box = document.getElementById(`sol-box-${idx}`);
            if (box) {
              box.querySelector(".sol-text-content").innerText = aiText;
            }
          })
          .catch(() => {
            const box = document.getElementById(`sol-box-${idx}`);
            if (box) {
              box.querySelector(".sol-text-content").innerText = "Explanation currently unavailable.";
            }
          });
      }
    });

    cbtNavigate("win-solutions");
  });

  /* ==========================================================================
     SECTION 15: ADMIN LIVE PREVIEW & 1-CLICK AI AUTO-FILL
     ========================================================================== */
  function updateAdminLivePreview() {
    const topic = document.getElementById("adm-sel-topic").value || "Topic";
    const cat = document.getElementById("adm-sel-cat").value || "Category";
    const title = document.getElementById("adm-q-title").value.trim() || "Type question text to see preview...";
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
        <div class="cbt-opt-label" style="background:#ffffff; border-color:${isCorrect ? '#10b981' : '#e2e8f0'}; padding:10px 12px; margin-bottom:8px;">
          <input type="radio" name="preview-demo-radio" ${isCorrect ? "checked" : ""} disabled />
          <span style="font-weight:${isCorrect ? '700' : 'normal'}; color:${isCorrect ? '#059669' : 'inherit'}; font-size:13px;">
            <b>${String.fromCharCode(65 + i)}.</b> ${text}
          </span>
          ${isCorrect ? '<span class="preview-correct-badge">Correct</span>' : ''}
        </div>
      `;
    });
    document.getElementById("preview-live-options").innerHTML = html;

    const solEl = document.getElementById("preview-live-solution");
    if (sol) {
      solEl.style.display = "block";
      solEl.innerHTML = `<b>Solution & Trick:</b>\n${sol}`;
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
    document.getElementById("adm-q-title-hi").value = "";
    document.getElementById("adm-q-op0").value = "";
    document.getElementById("adm-q-op1").value = "";
    document.getElementById("adm-q-op2").value = "";
    document.getElementById("adm-q-op3").value = "";
    document.getElementById("adm-q-solution").value = "";
    document.getElementById("adm-q-ans").value = "0";
    updateAdminLivePreview();
  }

  document.getElementById("btn-ai-gen-solution").addEventListener("click", async () => {
    if (!aiAdminEnabled) {
      showInAppMessage("Feature Disabled", "Admin AI Generator button is toggled OFF in Admin Settings.");
      return;
    }

    const qText = document.getElementById("adm-q-title").value.trim();
    const ansIdx = parseInt(document.getElementById("adm-q-ans").value, 10);
    const correctOptInput = document.getElementById(`adm-q-op${ansIdx}`);
    const correctOptText = correctOptInput ? correctOptInput.value.trim() : "";
    const solTextarea = document.getElementById("adm-q-solution");
    const aiBtn = document.getElementById("btn-ai-gen-solution");

    if (!qText || !correctOptText) {
      showInAppMessage("Missing Data", "Please type the Question Text and all Options, and choose the correct answer first.");
      return;
    }

    aiBtn.innerText = "⏳ Generating with AI...";
    aiBtn.disabled = true;

    try {
      const generatedSolution = await callOpenAiForSolution(qText, correctOptText);
      solTextarea.value = generatedSolution;
      updateAdminLivePreview();
      showInAppMessage("AI Generation Complete", "Solution and short trick generated successfully!");
    } catch (err) {
      showInAppMessage("AI Error", "Could not generate solution: " + err.message);
    } finally {
      aiBtn.innerText = "✨ AI Generate Solution & Trick";
      aiBtn.disabled = false;
    }
  });

  ["adm-sel-topic", "adm-sel-cat", "adm-q-title", "adm-q-op0", "adm-q-op1", "adm-q-op2", "adm-q-op3", "adm-q-solution", "adm-q-ans"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", updateAdminLivePreview);
      el.addEventListener("change", updateAdminLivePreview);
    }
  });

  document.getElementById("btn-adm-cancel-edit").addEventListener("click", resetQuestionEditor);

  /* ==========================================================================
     SECTION 16: ADMIN DASHBOARD CONFIGURATION
     ========================================================================== */
  document.getElementById("btn-open-admin").addEventListener("click", () => {
    if (isAdminAuthenticated) {
      cbtNavigate("win-admin-dash");
      cbtRefreshAdmin();
    } else {
      cbtNavigate("win-admin-auth");
    }
  });

  document.getElementById("link-admin-back-login").addEventListener("click", () => {
    if (activeUser) {
      cbtRenderWindow2();
      cbtNavigate("win-2");
    } else {
      cbtNavigate("win-1");
    }
  });

  document.getElementById("btn-admin-verify").addEventListener("click", () => {
    const entered = document.getElementById("admin-pass-input").value.trim();
    if (entered === adminPin) {
      document.getElementById("admin-pass-input").value = "";
      isAdminAuthenticated = true;
      syncAllData();
      cbtNavigate("win-admin-dash");
      cbtRefreshAdmin();
    } else {
      showInAppMessage("Admin Error", "Incorrect Admin PIN / Password.");
    }
  });

  document.getElementById("btn-admin-exit").addEventListener("click", () => {
    showInAppConfirm("Admin Logout", "Do you want to log out of the Admin Dashboard?", () => {
      isAdminAuthenticated = false;
      syncAllData();
      if (activeUser) {
        cbtRenderWindow2();
        cbtNavigate("win-2");
      } else {
        cbtNavigate("win-1");
      }
      showInAppMessage("Logged Out", "Admin session closed successfully.");
    });
  });

  document.querySelectorAll(".cbt-tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".cbt-tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".cbt-pane").forEach((p) => p.classList.remove("active"));
      this.classList.add("active");
      const targetPane = document.getElementById(this.dataset.pane);
      if (targetPane) targetPane.classList.add("active");
    });
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
    document.getElementById("adm-brand-pic-url").value = brandConfig.profilePic || "";

    const prevImg = document.getElementById("adm-profile-preview");
    const removeBtn = document.getElementById("btn-remove-profile-pic");
    if (brandConfig.profilePic) {
      prevImg.src = brandConfig.profilePic;
      prevImg.style.display = "inline-block";
      removeBtn.style.display = "inline-block";
    } else {
      prevImg.style.display = "none";
      removeBtn.style.display = "none";
    }

    document.getElementById("adm-mark-pos").value = storeMarkPositive;
    document.getElementById("adm-mark-neg").value = storeMarkNegative;
    document.getElementById("adm-exam-min").value = storeDuration;

    document.getElementById("adm-ai-key").value = openAiApiKey;
    document.getElementById("chk-ai-admin").checked = aiAdminEnabled;
    document.getElementById("chk-ai-candidate").checked = aiCandidateEnabled;

    const btnAi = document.getElementById("btn-ai-gen-solution");
    if (btnAi) btnAi.style.display = aiAdminEnabled ? "inline-flex" : "none";

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
    cChips.innerHTML = "";
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

    const selCat = document.getElementById("adm-sel-cat");
    selCat.innerHTML = "";

    const grpPapers = document.createElement("optgroup");
    grpPapers.label = "Paper Types";
    storePaperTypes.forEach((c) => {
      const o = document.createElement("option");
      o.value = c; o.innerText = c;
      grpPapers.appendChild(o);
    });
    selCat.appendChild(grpPapers);

    const grpSets = document.createElement("optgroup");
    grpSets.label = "Practice Sets";
    storeSets.forEach((s) => {
      const o = document.createElement("option");
      o.value = s; o.innerText = s;
      grpSets.appendChild(o);
    });
    selCat.appendChild(grpSets);

    const qTable = document.getElementById("dom-table-q-list");
    qTable.innerHTML = "";
    storeQuestions.forEach((q, idx) => {
      const tr = document.createElement("tr");
      tr.style.borderBottom = "1px solid #e2e8f0";
      tr.innerHTML = `
        <td style="padding:6px;"><b>[${q.topic} &bull; ${q.category}]</b> ${q.text}</td>
        <td style="padding:6px; text-align:right; white-space:nowrap;">
          <button class="cbt-btn-edit">Edit</button>
          <button class="cbt-btn-del">Del</button>
        </td>
      `;
      tr.querySelector(".cbt-btn-edit").onclick = () => {
        editingQuestionIndex = idx;
        document.getElementById("adm-form-mode").innerText = `EDITING #${idx + 1}`;
        document.getElementById("adm-form-mode").style.color = "#dc2626";
        document.getElementById("btn-adm-save-q").innerText = "Update Question";
        document.getElementById("btn-adm-cancel-edit").style.display = "inline-block";

        document.getElementById("adm-sel-topic").value = q.topic;
        document.getElementById("adm-sel-cat").value = q.category;
        document.getElementById("adm-q-title").value = q.text;
        document.getElementById("adm-q-title-hi").value = q.text_hi || "";
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

    updateAdminLivePreview();
  }

  document.getElementById("btn-adm-save-ai").addEventListener("click", () => {
    const keyVal = document.getElementById("adm-ai-key").value.trim();
    openAiApiKey = keyVal;
    aiAdminEnabled = document.getElementById("chk-ai-admin").checked;
    aiCandidateEnabled = document.getElementById("chk-ai-candidate").checked;

    syncAllData();
    cbtRefreshAdmin();
    showInAppMessage("AI Settings Saved", "OpenAI API Key and switches have been successfully saved!");
  });

  document.getElementById("adm-brand-pic-file").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("adm-brand-pic-url").value = e.target.result;
        const prevImg = document.getElementById("adm-profile-preview");
        prevImg.src = e.target.result;
        prevImg.style.display = "inline-block";
        document.getElementById("btn-remove-profile-pic").style.display = "inline-block";
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById("btn-remove-profile-pic").addEventListener("click", () => {
    document.getElementById("adm-brand-pic-url").value = "";
    document.getElementById("adm-brand-pic-file").value = "";
    document.getElementById("adm-profile-preview").style.display = "none";
    document.getElementById("btn-remove-profile-pic").style.display = "none";
    brandConfig.profilePic = "";
    syncAllData();
    applyBrandIdentity();
  });

  document.getElementById("btn-adm-save-branding").addEventListener("click", () => {
    const name = document.getElementById("adm-brand-name").value.trim();
    const badge = document.getElementById("adm-brand-badge").value.trim();
    const favicon = document.getElementById("adm-brand-favicon").value.trim();
    const picUrl = document.getElementById("adm-brand-pic-url").value.trim();

    if (name) brandConfig.name = name;
    if (badge) brandConfig.badge = badge;
    if (favicon) brandConfig.favicon = favicon;
    brandConfig.profilePic = picUrl;

    syncAllData();
    applyBrandIdentity();
    cbtRefreshAdmin();
    showInAppMessage("Branding Updated", "Branding details and profile picture updated successfully!");
  });

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

  document.getElementById("btn-adm-save-q").addEventListener("click", () => {
    const topic = document.getElementById("adm-sel-topic").value.trim();
    const cat = document.getElementById("adm-sel-cat").value.trim();
    const title = document.getElementById("adm-q-title").value.trim();
    const titleHi = document.getElementById("adm-q-title-hi").value.trim();
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

    const qData = { topic, category: cat, text: title, text_hi: titleHi, options: [o0, o1, o2, o3], correct, solution };

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

  document.getElementById("btn-adm-save-scheme").addEventListener("click", () => {
    const pos = parseFloat(document.getElementById("adm-mark-pos").value);
    const neg = parseFloat(document.getElementById("adm-mark-neg").value);
    const dur = parseInt(document.getElementById("adm-exam-min").value, 10);

    if (pos > 0 && neg >= 0 && dur > 0) {
      storeMarkPositive = pos;
      storeMarkNegative = neg;
      storeDuration = dur;
      syncAllData();
      showInAppMessage("Success", `Settings saved: +${pos.toFixed(2)} for correct, -${neg.toFixed(2)} for wrong. Time: ${dur} min.`);
    } else {
      showInAppMessage("Validation Error", "Enter valid positive values for marks and duration.");
    }
  });

  /* ==========================================================================
     SECTION 17: APPLICATION BOOTSTRAP
     ========================================================================== */
  function bootApplication() {
    applyBrandIdentity();
    updateNavbarAuthState();

    const runningSnap = localStorage.getItem("tb_exam_running_snapshot");
    if (activeUser && activeUser.username && runningSnap) {
      try {
        const snap = JSON.parse(runningSnap);
        if (snap && snap.activeExamQuestions && snap.activeExamQuestions.length > 0) {
          cbtResumeTest(snap);
          return;
        }
      } catch (e) {
        clearExamSnapshot();
      }
    }

    if (isAdminAuthenticated) {
      cbtNavigate("win-admin-dash");
      cbtRefreshAdmin();
      return;
    }

    if (activeUser && activeUser.username) {
      cbtRenderWindow2();
      cbtNavigate("win-2");
    } else {
      cbtNavigate("win-1");
    }
  }

  bootApplication();
})();
