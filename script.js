(function () {
  "use strict";

  function initPortal() {
    if (document.getElementById("cbt-portal")) return;

    // Viewport check
    let metaTag = document.querySelector('meta[name="viewport"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "viewport";
      metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      if (document.head) document.head.appendChild(metaTag);
    }

    // Default Question Bank
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
        text_hi: "The Fugitive में क्लेयर और उसके पति जॉर्ज के स्वभाव में क्या अंतर दिखाया गया है?",
        options: ["Clare is practical while George is romantic", "Clare is poetic while George is prosaic", "Clare is ambitious while George is indifferent", "Clare is uneducated while George is scholarly"],
        correct: 1,
        solution: "Clare is poetic and imaginative while George is unimaginative and prosaic[span_7](start_span)[span_7](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What occupation does Clare briefly take up after leaving Malise in The Fugitive?",
        text_hi: "The Fugitive में मैलिस को छोड़ने के बाद क्लेयर संक्षेप में कौन सा काम करती है?",
        options: ["Selling gloves", "Governess", "Typist", "Factory worker"],
        correct: 0,
        solution: "Clare briefly takes up selling gloves[span_8](start_span)[span_8](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What is Clare's tragic end in The Fugitive?",
        text_hi: "The Fugitive में क्लेयर का दुखद अंत क्या होता है?",
        options: ["She dies of illness", "She is murdered", "She commits suicide", "She returns to George"],
        correct: 2,
        solution: "In the end, Clare commits suicide to escape misery[span_9](start_span)[span_9](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which of the following characters is a solicitor in The Fugitive?",
        text_hi: "The Fugitive में सॉलिसिटर कौन सा पात्र है?",
        options: ["Edward Fullarton", "Reginald Huntingdon", "Twisden", "Haywood"],
        correct: 2,
        solution: "Twisden is the solicitor in The Fugitive[span_10](start_span)[span_10](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy met him in 1893 and formed a life long friendship with him. Identify him.",
        text_hi: "गाल्सवर्दी 1893 में उनसे मिले और आजीवन मित्रता बनी रही। उन्हें पहचानें।",
        options: ["Conrad", "Hardy", "Shaw", "Ibsen"],
        correct: 0,
        solution: "Galsworthy met Joseph Conrad in 1893 aboard the ship Torrens[span_11](start_span)[span_11](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first volume of Galsworthy entitled From the Four Winds appeared in 1897 under the pseudonym:",
        text_hi: "From the Four Winds (1897) किस उपनाम के तहत प्रकाशित हुआ था?",
        options: ["John Gals", "John Sinjohn", "Boz", "Elia"],
        correct: 1,
        solution: "Published under the pseudonym 'John Sinjohn[span_12](start_span)'[span_12](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's first novel was published in 1898. Which novel?",
        text_hi: "गाल्सवर्दी का पहला उपन्यास जो 1898 में प्रकाशित हुआ:",
        options: ["Jocelyn", "Villa Rubein", "A Man of Devon, A Knight", "The Science"],
        correct: 0,
        solution: "'Jocelyn' (1898) was his first full-length novel[span_13](start_span)[span_13](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first work that earned Galsworthy was the novel. Identify it.",
        text_hi: "गाल्सवर्दी का पहला उपन्यास जिसने उन्हें पहचान दिलाई:",
        options: ["Fraternity", "Country Mouse", "The Island Pharisees", "Jocelyn"],
        correct: 2,
        solution: "'The Island Pharisees' (1904) was published under his real name[span_14](start_span)[span_14](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The Island Pharisees holds up a picture of the wealthy class ruling:",
        text_hi: "The Island Pharisees संपन्न वर्ग के शासन का क्या चित्र प्रस्तुत करता है?",
        options: ["Over the poor class and fattening on them", "Over the poor class and trying to make them rich", "Over the rich class and flattering them", "None of these"],
        correct: 0,
        solution: "It portrays the wealthy ruling over the poor and fattening on them[span_15](start_span)[span_15](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first play that made Galsworthy famous as a playwright is:",
        text_hi: "गाल्सवर्दी का पहला नाटक जिसने उन्हें नाटककार के रूप में प्रसिद्ध बनाया:",
        options: ["Justice", "Loyalties", "The Silver Box", "None of these"],
        correct: 2,
        solution: "'The Silver Box' (1906) was his first successful play[span_16](start_span)[span_16](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's reputation as a novelist was established by:",
        text_hi: "गाल्सवर्दी की उपन्यासकार के रूप में प्रतिष्ठा किससे स्थापित हुई?",
        options: ["The Forsyte Saga", "Justice", "Jocelyn", "The Silver Box"],
        correct: 0,
        solution: "'The Forsyte Saga' established his enduring reputation[span_17](start_span)[span_17](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The Forsyte Saga includes: The Man of Property (1906), In Chancery (1920), To Let (1921) and two Interludes. Find the Interlude.",
        text_hi: "The Forsyte Saga में शामिल इंटरल्यूड को पहचानें:",
        options: ["Indian Winter of a Forsyte Tales and Awakening", "Indian Autumn of a Forsyte Tales and Awakening", "Indian Summer of a Forsyte Tales and Awakening", "None of these"],
        correct: 2,
        solution: "'Indian Summer of a Forsyte' (1918) and 'Awakening' (1920) are the interludes[span_18](start_span)[span_18](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play of Galsworthy deals with the inadequacy of the administration of justice and the attitude of different types of people towards an escaped prisoner?",
        text_hi: "कौन सा नाटक भागे हुए कैदी और न्याय प्रशासन से संबंधित है?",
        options: ["The Show", "Jocelyn", "Escape", "None of these"],
        correct: 2,
        solution: "'Escape' (1926) deals with Matt Denant, an escaped prisoner[span_19](start_span)[span_19](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play analyses the impact of modern publicity on private domestic tragedy?",
        text_hi: "कौन सा नाटक निजी घरेलू त्रासदी पर मीडिया/प्रेस के प्रभाव का विश्लेषण करता है?",
        options: ["The Show", "Jocelyn", "Escape", "None of these"],
        correct: 0,
        solution: "'The Show' (1925) satirizes sensational journalism[span_20](start_span)[span_20](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play contrasts the fates of the various storeys in a hotel?",
        text_hi: "होटल की विभिन्न मंजिलों के भाग्य का अंतर कौन सा नाटक दिखाता है?",
        options: ["The Roof", "Jocelyn", "Escape", "None of these"],
        correct: 0,
        solution: "'The Roof' (1929) contrasts different hotel rooms during a fire[span_21](start_span)[span_21](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The year in which Galsworthy's father died was also the year of the publication of The Island Pharisees. Find out the year.",
        text_hi: "जिस वर्ष गाल्सवर्दी के पिता की मृत्यु हुई, उसी वर्ष The Island Pharisees प्रकाशित हुई:",
        options: ["1904", "1905", "1906", "1907"],
        correct: 0,
        solution: "1904 was the year of his father's death and publication of The Island Pharisees[span_22](start_span)[span_22](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "A turning point in the life of Galsworthy came in with the publication of:",
        text_hi: "गाल्सवर्दी के साहित्यिक जीवन में निर्णायक मोड़ आया:",
        options: ["The Man of Property", "Justice", "The Skin Game", "None of these"],
        correct: 0,
        solution: "'The Man of Property' (1906) was the critical turning point[span_23](start_span)[span_23](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What did Galsworthy become in 1921?",
        text_hi: "गाल्सवर्दी 1921 में क्या बने?",
        options: ["President of Literary Club", "President of the P.E.N. Club London", "Assistant in the P.E.N. Club London", "None of these"],
        correct: 1,
        solution: "He became the first President of the P.E.N. Club London in 1921[span_24](start_span)[span_24](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What was conferred upon Galsworthy in 1929?",
        text_hi: "1929 में गाल्सवर्दी को कौन सा सम्मान मिला?",
        options: ["Order of Demerit", "Booker Prize", "Order of Merit", "None of these"],
        correct: 2,
        solution: "He was awarded the Order of Merit in 1929[span_25](start_span)[span_25](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first play of Galsworthy is:",
        text_hi: "गाल्सवर्दी का पहला नाटक कौन सा है?",
        options: ["The Silver Box", "Justice", "Loyalties", "None of these"],
        correct: 0,
        solution: "'The Silver Box' (1906) is his first play[span_26](start_span)[span_26](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play clearly shows that there are two laws: one is meant for the rich and another for the poor?",
        text_hi: "कौन सा नाटक दिखाता है कि कानून के दो रूप हैं - अमीरों के लिए अलग, गरीबों के लिए अलग?",
        options: ["Justice", "The Silver Box", "Loyalties", "None of these"],
        correct: 1,
        solution: "In 'The Silver Box', rich Jack escapes while poor Jones is sentenced[span_27](start_span)[span_27](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Strife deals with the conflict between:",
        text_hi: "Strife नाटक किसके बीच संघर्ष को दर्शाता है?",
        options: ["The poor and the rich", "The labourers and poor men", "The Capitalist and Labourers", "None of these"],
        correct: 2,
        solution: "Strife deals with the conflict between Capitalists and Labourers[span_28](start_span)[span_28](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Jack Barthwick appears in:",
        text_hi: "जैक बार्थविक किस नाटक का पात्र है?",
        options: ["Justice", "Fraternity", "The Silver Box", "None of these"],
        correct: 2,
        solution: "Jack Barthwick is in 'The Silver Box[span_29](start_span)'[span_29](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Poor Jones appears in:",
        text_hi: "पुअर जोन्स किस नाटक में दिखाई देता है?",
        options: ["Justice", "Fraternity", "The Silver Box", "None of these"],
        correct: 2,
        solution: "Jones appears in 'The Silver Box[span_30](start_span)'[span_30](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In Strife, the strike takes place at:",
        text_hi: "Strife में हड़ताल किस स्थान पर होती है?",
        options: ["Trenartha Tin Plate Works", "Thirtana Tine Plate Works", "Thirtankar Tin Plate Works", "None of these"],
        correct: 0,
        solution: "The strike is at Trenartha Tin Plate Works[span_31](start_span)[span_31](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who is the leader of the labourers in Strife?",
        text_hi: "Strife में मजदूरों का नेता कौन है?",
        options: ["Jack Barthwick", "Falder", "David Roberts", "None of these"],
        correct: 2,
        solution: "David Roberts is the unyielding leader of the labourers[span_32](start_span)[span_32](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In this play there is conflict between the old established aristocracy and the loud, uncultured new rich manufacturing class (Hillchrist vs Hornblower):",
        text_hi: "हिलक्रिस्ट और हॉर्नब्लोअर के बीच का संघर्ष किस नाटक में है?",
        options: ["The Mob", "The Silver Box", "The Skin Game", "None of these"],
        correct: 2,
        solution: "'The Skin Game' (1920) depicts the clash between Hillcrist and Hornblower[span_33](start_span)[span_33](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Falder appears in:",
        text_hi: "फाल्डर (Falder) किस नाटक में दिखाई देता है?",
        options: ["Silver Box", "Loyalties", "Justice", "None of these"],
        correct: 2,
        solution: "William Falder is the protagonist of 'Justice[span_34](start_span)'[span_34](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who suffers solitary confinement in Justice?",
        text_hi: "Justice में एकांत कारावास कौन भुगतता है?",
        options: ["Falder", "Jack Barthwick", "Ruth Honeywell", "None of these"],
        correct: 0,
        solution: "Falder is subjected to solitary confinement[span_35](start_span)[span_35](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "It is a powerful social tragedy satirizing the English legal and prison system where the hero suffers solitary confinement:",
        text_hi: "अंग्रेजी कानूनी और जेल प्रणाली पर व्यंग्य करती सामाजिक त्रासदी:",
        options: ["The Skin Game", "Justice", "The Silver Box", "None of these"],
        correct: 1,
        solution: "'Justice' (1910) by John Galsworthy[span_36](start_span)[span_36](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The growth of an adolescent girl through emotional conflicts into a lover and a woman is the theme of:",
        text_hi: "एक किशोरी के भावनात्मक संघर्ष से परिपक्व होने की यात्रा किस नाटक का विषय है?",
        options: ["Skin Game", "Justice", "The Silver Box", "Joy"],
        correct: 3,
        solution: "This is the theme of 'Joy' (1907)[span_37](start_span)[span_37](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The class-conscious prejudice of an old English baronet family against the marriage between the eldest son and the serving maid is the theme of:",
        text_hi: "ज्येष्ठ पुत्र और नौकरानी के विवाह के प्रति वर्गीय पूर्वाग्रह का विषय किसमें है?",
        options: ["The Mob", "Loyalties", "The Eldest Son", "None of these"],
        correct: 2,
        solution: "The theme of 'The Eldest Son' (1912)[span_38](start_span)[span_38](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In the play Joy, a young man aged 20 loves Joy (aged 17). Name him:",
        text_hi: "Joy नाटक में 17 वर्षीय जॉय से प्रेम करने वाले युवक का नाम क्या है?",
        options: ["Falder", "Colonel Hope", "John Builder", "Dick Merton"],
        correct: 3,
        solution: "Dick Merton is in love with Joy[span_39](start_span)[span_39](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "John Builder is an unimaginative hot-tempered man in:",
        text_hi: "जॉन बिल्डर किस नाटक में दिखाई देते हैं?",
        options: ["A Family Man", "The Eldest Son", "A Man of Property", "None of these"],
        correct: 0,
        solution: "John Builder is the domineering father in 'A Family Man[span_40](start_span)'[span_40](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In The Silver Box, Jack steals a purse while Jones steals:",
        text_hi: "The Silver Box में जोन्स क्या चुराता है?",
        options: ["Silver coins", "Silver box that has coins", "A silver cigarette box", "None of these"],
        correct: 2,
        solution: "Jones steals a silver cigarette box[span_41](start_span)[span_41](end_span)[span_42](start_span)[span_42](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who is the police inspector in The Silver Box?",
        text_hi: "The Silver Box में पुलिस इंस्पेक्टर कौन है?",
        options: ["Snow", "Cockson", "Walter How", "None of these"],
        correct: 0,
        solution: "Inspector Snow is the police officer[span_43](start_span)[span_43](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Wellwyn is an artist in the play:",
        text_hi: "वेलविन (Wellwyn) किस नाटक में एक कलाकार है?",
        options: ["The Skin Game", "The Silver Box", "The Pigeon", "None of these"],
        correct: 2,
        solution: "Christopher Wellwyn is the artist in 'The Pigeon[span_44](start_span)'[span_44](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play made a great sensation in Parliamentary and official circles according to Galsworthy?",
        text_hi: "संसदीय और सरकारी हलकों में किस नाटक ने हलचल मचाई?",
        options: ["Justice", "The Skin Game", "The Mob", "The Eldest Son"],
        correct: 0,
        solution: "'Justice' led directly to prison reforms instituted by Churchill[span_45](start_span)[span_45](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "James How, Walter How, Robert Cokeson, William Falder, and Ruth Honeywill appear in:",
        text_hi: "जेम्स हाउ, रॉबर्ट कोकसन, फाल्डर और रूथ हनीविल किस नाटक के पात्र हैं?",
        options: ["The Skin Game", "Justice", "The Mob", "Silver Box"],
        correct: 1,
        solution: "These characters all belong to 'Justice[span_46](start_span)'[span_46](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "This Hindi author translated The Silver Box as Chandi Ki Dibiya, Strife as Hartal and Justice as Nyaya:",
        text_hi: "किस प्रसिद्ध लेखक ने गाल्सवर्दी के नाटकों का अनुवाद चांदी की डिबिया, हड़ताल और न्याय नाम से किया?",
        options: ["Dharam Veer Bharti", "Mohan Rakesh", "Prem Chand", "None of these"],
        correct: 2,
        solution: "Munshi Premchand translated these three plays[span_47](start_span)[span_47](end_span)."
      },
      // John Galsworthy: Lines
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"The law is what it is—a majestic edifice, sheltering all of us, each stone of which rests on another.\" Where does this line appear?",
        text_hi: "\"The law is what it is—a majestic edifice...\" यह पंक्ति किस नाटक में आती है?",
        options: ["The Roof", "The Skin Game", "Windows", "Justice"],
        correct: 3,
        solution: "Spoken by the presiding Judge during Falder's trial in 'Justice[span_48](start_span)'[span_48](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Loyalty comes before everything... A wife's memory is not very good when her husband is in danger.\" are from:",
        text_hi: "\"Loyalty comes before everything...\" यह प्रसिद्ध संवाद किस नाटक से है?",
        options: ["The Roof", "The Skin Game", "Windows", "Loyalties"],
        correct: 3,
        solution: "These lines appear in 'Loyalties[span_49](start_span)'[span_49](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"We all cut each other's throats from the best of motives.\" Where does it appear?",
        text_hi: "\"हम सभी नेक इरादों से एक-दूसरे का गला काटते हैं।\" यह संवाद कहाँ आता है?",
        options: ["Loyalties", "The Skin Game", "The Eldest Son", "None of these"],
        correct: 0,
        solution: "Spoken by Margaret Orme in 'Loyalties[span_50](start_span)'[span_50](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Literature is its own reward.\" Who said?",
        text_hi: "\"साहित्य स्वयं अपना पुरस्कार है।\" यह कथन किसका है?",
        options: ["Shaw", "Ibsen", "Wordsworth", "Galsworthy"],
        correct: 3,
        solution: "Stated by John Galsworthy[span_51](start_span)[span_51](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Justice is a machine that, when someone has once given it the starting push, rolls on of itself.\" Where does this line appear?",
        text_hi: "\"न्याय एक ऐसी मशीन है...\" यह पंक्ति किस नाटक में आती है?",
        options: ["The Skin Game", "The Mob", "Justice", "None of these"],
        correct: 2,
        solution: "Spoken by head clerk Cokeson in 'Justice[span_52](start_span)'[span_52](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"In Justice we feel the waste implied by Falder's suicide.\" Whose statement is this?",
        text_hi: "\"In Justice we feel the waste implied by Falder's suicide.\" यह टिप्पणी किसकी है?",
        options: ["Allardyce Nicoll", "George Sampson", "W.L. Phelps", "None of these"],
        correct: 0,
        solution: "Critic Allardyce Nicoll made this observation[span_53](start_span)[span_53](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"His plots are not the unwinding of a skein of complicated happenings... His climaxes are good.\" This statement of Coats is about:",
        text_hi: "आर. एच. कोट का यह कथन किसके नाटकों के बारे में है?",
        options: ["Milton", "Shakespeare", "Galsworthy", "Shaw"],
        correct: 2,
        solution: "R.H. Coats wrote this praising John Galsworthy[span_54](start_span)[span_54](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Masters are masters, men are men! Yield one demand and they will make it six...\" Who is the speaker?",
        text_hi: "\"मालिक मालिक हैं, मजदूर मजदूर हैं...\" 'Strife' में यह कौन कहता है?",
        options: ["Anthony in Strife", "Roberts in Strife", "Harness in Strife", "Falder in Justice"],
        correct: 0,
        solution: "Spoken by chairman John Anthony in 'Strife[span_55](start_span)'[span_55](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"No one will touch him now! Never again! He is safe with gentle Jesus!\" Who says?",
        text_hi: "\"अब उसे कोई नहीं छुएगा! वह प्रभु यीशु के पास सुरक्षित है!\" कौन कहता है?",
        options: ["Falder about Cokeson", "Cokeson about Falder", "Ruth about Falder", "None of these"],
        correct: 1,
        solution: "Cokeson says this over Falder's body in 'Justice[span_56](start_span)'[span_56](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"You mob, are most contemptible thing under the sun...\" Who wrote this play?",
        text_hi: "\"You mob, are most contemptible thing under the sun...\" यह किसने लिखा?",
        options: ["Shaw", "Yeats", "Eliot", "Galsworthy"],
        correct: 3,
        solution: "Written by John Galsworthy in 'The Mob[span_57](start_span)'[span_57](end_span)."
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

    // LocalStorage Reading & Safe Sync
    let storeTopics = defaultTopics;
    try {
      let t = JSON.parse(localStorage.getItem("tb_portal_topics"));
      if (Array.isArray(t) && t.length > 0) storeTopics = t;
    } catch (e) {}

    if (!storeTopics.some(t => t.toLowerCase() === "john galsworthy")) {
      storeTopics.push("John Galsworthy");
    }

    let storePaperTypes = defaultPaperTypes;
    try {
      let p = JSON.parse(localStorage.getItem("tb_portal_categories"));
      if (Array.isArray(p) && p.length > 0) storePaperTypes = p;
    } catch (e) {}

    let storeSets = defaultSets;
    try {
      let s = JSON.parse(localStorage.getItem("tb_portal_sets"));
      if (Array.isArray(s) && s.length > 0) storeSets = s;
    } catch (e) {}

    let storeQuestions = defaultQuestions;
    try {
      let q = JSON.parse(localStorage.getItem("tb_portal_questions"));
      if (Array.isArray(q) && q.length > 0) storeQuestions = q;
    } catch (e) {}

    // Ensure all John Galsworthy questions are in current pool
    defaultQuestions.forEach(dq => {
      if (dq.topic === "John Galsworthy") {
        const exists = storeQuestions.some(sq => sq.topic === "John Galsworthy" && sq.text.trim() === dq.text.trim());
        if (!exists) storeQuestions.push(dq);
      }
    });

    let storeNotes = defaultNotes;
    let storeCoupons = defaultCoupons;
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
    try {
      let up = JSON.parse(localStorage.getItem("tb_user_performance"));
      if (up) userPerformance = up;
    } catch (e) {}

    let adminPin = localStorage.getItem("tb_admin_pin") || "1234";
    let openAiApiKey = localStorage.getItem("tb_openai_api_key") || "sk-proj-dummy-key-paste-here";
    let aiAdminEnabled = localStorage.getItem("tb_ai_admin_enabled") !== "false";
    let aiCandidateEnabled = localStorage.getItem("tb_ai_candidate_enabled") === "true";
    let isAdminAuthenticated = localStorage.getItem("tb_admin_active") === "true";

    let brandConfig = {
      name: "Akash Workshop",
      badge: "AW",
      favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>",
      profilePic: ""
    };
    try {
      let b = JSON.parse(localStorage.getItem("tb_brand_config"));
      if (b && b.name) brandConfig = b;
    } catch (e) {}

    let activeUser = null;
    try {
      let au = JSON.parse(localStorage.getItem("tb_active_user"));
      if (au && au.username) activeUser = au;
    } catch (e) {}

    syncAllData();

    /* ==========================================================================
       SECTION 3: INJECT CSS
       ========================================================================== */
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
      html, body { width: 100%; min-height: 100%; overflow-x: hidden; background: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; color: #0f172a; }
      #cbt-portal { min-height: 100vh; display: flex; flex-direction: column; width: 100%; }
      .cbt-nav { display: flex; justify-content: space-between; align-items: center; background: #0f172a; padding: 12px 18px; color: #ffffff; position: relative; z-index: 1000; flex-wrap: wrap; gap: 10px; }
      .cbt-logo-area { display: flex; align-items: center; gap: 8px; }
      .cbt-logo-badge { background: #2563eb; color: white; font-weight: 800; padding: 5px 8px; border-radius: 6px; font-size: 13px; }
      .cbt-profile-img-header { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; border: 2px solid #3b82f6; display: none; }
      .cbt-brand-name { font-size: 16px; font-weight: 700; color: #f8fafc; white-space: nowrap; }
      .cbt-nav-actions { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
      .cbt-btn-pay { background: #10b981; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; cursor: pointer; }
      .cbt-btn-admin-nav { background: #475569; color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; cursor: pointer; }
      .cbt-profile-menu-container { position: relative; display: none; padding: 4px 0; }
      .cbt-candidate-badge-logo { background: #2563eb; color: #ffffff; font-weight: 800; font-size: 12px; padding: 6px 10px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; border: 1px solid rgba(255,255,255,0.2); }
      .cbt-profile-dropdown { display: none; position: absolute; right: 0; top: 100%; width: 300px; max-width: 90vw; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15); padding: 14px; color: #1e293b; z-index: 2000; }
      .cbt-profile-menu-container:hover .cbt-profile-dropdown { display: block; }
      .drop-divider { height: 1px; background: #e2e8f0; margin: 10px 0; }
      .drop-info-title { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 4px; }
      .drop-detail-row { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 4px; }
      .cbt-view { display: none; padding: 20px; max-width: 860px; margin: 16px auto; width: 94%; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; }
      .cbt-view.active { display: block; }
      #win-4.active { display: flex; flex-direction: column; max-width: 100% !important; width: 100% !important; height: 100vh !important; margin: 0 !important; padding: 0 !important; border-radius: 0 !important; border: none !important; position: fixed; inset: 0; z-index: 99999; background: #ffffff; }
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
      .cbt-btn-ai { background: linear-gradient(135deg, #8b5cf6, #d946ef); color: #fff; border: none; padding: 7px 12px; border-radius: 4px; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; }
      .cbt-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 12px; margin-bottom: 20px; }
      .cbt-selection-card { background: #f8fafc; border: 1.5px solid #cbd5e1; border-radius: 8px; padding: 18px 12px; text-align: center; cursor: pointer; font-weight: 700; font-size: 15px; color: #1e293b; word-break: break-word; }
      .cbt-selection-card:hover { background: #eff6ff; border-color: #2563eb; color: #1d4ed8; }
      .palette-legend { display: flex; gap: 10px; font-size: 12px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; flex-wrap: wrap; }
      .legend-item { display: flex; align-items: center; gap: 6px; }
      .circle-icon { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
      .bg-attempted { background-color: #10b981; }
      .bg-unattempted { background-color: #8b5cf6; }
      .palette-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
      .palette-btn { padding: 9px 0; border: none; border-radius: 4px; font-weight: 700; color: white; cursor: pointer; font-size: 12px; text-align: center; }
      .cbt-opt-label { display: flex; align-items: center; padding: 14px 16px; margin-bottom: 12px; border: 1.5px solid #cbd5e1; border-radius: 8px; cursor: pointer; font-size: 15px; font-weight: 500; color: #0f172a; line-height: 1.5; background: #ffffff; }
      .cbt-opt-label:hover { background: #f1f5f9; border-color: #94a3b8; }
      .cbt-opt-label input[type="radio"] { margin-right: 14px; width: 18px; height: 18px; flex-shrink: 0; accent-color: #2563eb; }
      .cbt-opt-label.selected-opt { background: #eff6ff; border-color: #2563eb; font-weight: 600; }
      .cbt-tabs { display: flex; border-bottom: 2px solid #e2e8f0; margin-bottom: 16px; overflow-x: auto; gap: 6px; }
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
      .cbt-modal-backdrop { display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); z-index: 999999; justify-content: center; align-items: center; padding: 16px; }
      .cbt-modal-backdrop.active { display: flex; }
      .cbt-modal-box { background: #ffffff; width: 100%; max-width: 440px; border-radius: 10px; padding: 20px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); max-height: 90vh; overflow-y: auto; }
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
        .cbt-view { width: 96%; padding: 14px; margin: 10px auto; }
        .test-fullscreen-body { flex-direction: column; overflow-y: auto; }
        .test-main-area { border-right: none; border-bottom: 2px solid #e2e8f0; padding: 14px; overflow-y: visible; }
        .test-sidebar { width: 100%; border-top: 1px solid #e2e8f0; padding: 14px; overflow-y: visible; }
        .preview-editor-grid { grid-template-columns: 1fr; }
        .cbt-responsive-flex-row { flex-direction: column; align-items: stretch; }
        .cbt-responsive-flex-row button { width: 100% !important; }
        .cbt-action-btn-group { flex-direction: column; gap: 8px; }
        .cbt-action-btn-group button { width: 100% !important; margin-left: 0 !important; }
      }
    `;
    if (document.head) document.head.appendChild(styleEl);

    /* ==========================================================================
       SECTION 4: INJECT HTML STRUCTURE
       ========================================================================== */
    const portalDiv = document.createElement("div");
    portalDiv.id = "cbt-portal";
    portalDiv.innerHTML = `
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

      <div id="win-1" class="cbt-view active">
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

      <div id="win-2" class="cbt-view">
        <div class="cbt-h1">Welcome, start your practice</div>
        <div class="cbt-h2">Select Your Topic</div>
        <div class="cbt-grid" id="dom-win2-topics"></div>
        <div style="border-top:2px solid #f1f5f9; padding-top:14px; margin-top:16px;">
          <div style="font-size:15px; font-weight:700; margin-bottom:8px;">Study Material & PDF Notes</div>
          <div id="dom-notes-container"></div>
        </div>
      </div>

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

      <div id="win-result" class="cbt-view">
        <div class="cbt-h1">Examination Scorecard & Result</div>
        <div class="cbt-h2">Review detailed performance metrics & score</div>
        <div id="dom-result-stats" style="text-align:center; margin: 18px 0;"></div>
        <div class="cbt-action-btn-group" style="display:flex; gap:10px; justify-content:center;">
          <button class="cbt-btn-primary" id="btn-view-solutions" style="background:#10b981;">View Detailed Solutions</button>
          <button class="cbt-btn-secondary" id="btn-restart-flow">Back to Topics</button>
        </div>
      </div>

      <div id="win-solutions" class="cbt-view">
        <span class="cbt-link-back" id="link-back-result">&larr; Back to Result</span>
        <div class="cbt-h1" style="text-align:left; margin-bottom:4px;">Test Questions & Solutions</div>
        <div class="cbt-h2" style="text-align:left; margin-bottom:14px;" id="dom-solutions-header">Detailed breakdown of answers:</div>
        <div id="dom-solutions-container"></div>
        <button class="cbt-btn-primary" id="btn-sol-back-topics" style="margin-top:14px;">Finish & Back to Topics</button>
      </div>

      <div id="win-admin-auth" class="cbt-view">
        <span class="cbt-link-back" id="link-admin-back-login">&larr; Back to Login</span>
        <div class="cbt-h1">Admin Authentication</div>
        <div class="cbt-h2">Enter admin access PIN to manage portal</div>
        <input type="password" id="admin-pass-input" class="cbt-field" placeholder="Enter Admin Password / PIN" />
        <button class="cbt-btn-primary" id="btn-admin-verify">Unlock Control Dashboard</button>
      </div>

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
          <div style="background:#f8fafc; border:1px solid #cbd5e1; padding:14px; border-radius:6px; margin-bottom:14px;">
            <div style="font-weight:700; font-size:14px; color:#8b5cf6; margin-bottom:4px;">OpenAI / ChatGPT Automation Controls:</div>
            <div style="font-size:12px; color:#64748b; margin-bottom:10px;">Paste your API Key below to power automatic solutions, facts, and short tricks.</div>
            <label style="font-size:12px; font-weight:700; color:#334155;">OpenAI Secret API Key:</label>
            <input type="password" id="adm-ai-key" class="cbt-field" placeholder="sk-proj-dummy-key-paste-here..." />
            <div class="toggle-switch-row">
              <div>
                <div class="toggle-switch-label">Admin 1-Click AI Auto-Fill Button</div>
                <div style="font-size:11px; color:#64748b;">Enables 'AI Generate Solution' button while adding questions.</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="chk-ai-admin" />
                <span class="toggle-slider"></span>
              </label>
            </div>
            <div class="toggle-switch-row">
              <div>
                <div class="toggle-switch-label">Candidate Dynamic AI Fallback</div>
                <div style="font-size:11px; color:#64748b;">Fetches trick dynamically if solution was empty.</div>
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
       SECTION 5: EVENT BINDINGS
       ========================================================================== */
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

    document.getElementById("btn-drop-logout").addEventListener("click", () => {
      showInAppConfirm("Logout Confirmation", "Do you want to log out of your session?", () => {
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
      });
    });

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

    document.getElementById("win4-lang-toggle").addEventListener("change", (e) => {
      activeLanguage = e.target.value;
      cbtRenderQuestion();
      saveExamSnapshot();
    });

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
       SECTION 6: BOOTSTRAP DISPATCH
       ========================================================================== */
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

  // Double-barrel safe boot
  if (document.readyState === "complete" || document.readyState === "interactive") {
    setTimeout(initPortal, 1);
  } else {
    document.addEventListener("DOMContentLoaded", initPortal);
    window.addEventListener("load", initPortal);
  }
})();
