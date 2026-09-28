(function () {
  "use strict";

  function startPortalApp() {
    // Check if portal is already injected
    if (document.getElementById("cbt-portal")) {
      return;
    }

    /* ==========================================================================
       SECTION 1: VIEWPORT INJECTION
       ========================================================================== */
    let metaTag = document.querySelector('meta[name="viewport"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.name = "viewport";
      metaTag.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
      document.head.appendChild(metaTag);
    }

    /* ==========================================================================
       SECTION 2: DEFAULT DATA SETS
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
        text: "In Galsworthy's The Fugitive, how are the temperaments of Clare and her husband George contrasted?",
        text_hi: "The Fugitive में क्लेयर और उसके पति जॉर्ज के स्वभाव में क्या अंतर दिखाया गया है?",
        options: ["Clare is practical while George is romantic", "Clare is poetic while George is prosaic", "Clare is ambitious while George is indifferent", "Clare is uneducated while George is scholarly"],
        correct: 1,
        solution: "In The Fugitive, Clare is poetic and imaginative while George is unimaginative and prosaic[span_7](start_span)[span_7](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What occupation does Clare briefly take up after leaving Malise in The Fugitive?",
        text_hi: "The Fugitive में मैलिस को छोड़ने के बाद क्लेयर संक्षेप में कौन सा काम करती है?",
        options: ["Selling gloves", "Governess", "Typist", "Factory worker"],
        correct: 0,
        solution: "Clare takes up a job selling gloves after leaving her friend Malise[span_8](start_span)[span_8](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What is Clare's tragic end in The Fugitive?",
        text_hi: "The Fugitive में क्लेयर का दुखद अंत क्या होता है?",
        options: ["She dies of illness", "She is murdered", "She commits suicide", "She returns to George"],
        correct: 2,
        solution: "In the end, Clare commits suicide to escape her miserable struggle[span_9](start_span)[span_9](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which of the following characters is a solicitor in The Fugitive?",
        text_hi: "The Fugitive में सॉलिसिटर (solicitor) कौन सा पात्र है?",
        options: ["Edward Fullarton", "Reginald Huntingdon", "Twisden", "Haywood"],
        correct: 2,
        solution: "Twisden is the solicitor in Galsworthy's play The Fugitive[span_10](start_span)[span_10](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy met him in 1893 and formed a life long friendship with him. Identify him.",
        text_hi: "गाल्सवर्दी 1893 में उनसे मिले और आजीवन मित्रता बनी रही। उन्हें पहचानें।",
        options: ["Conrad", "Hardy", "Shaw", "Ibsen"],
        correct: 0,
        solution: "Galsworthy met Joseph Conrad in 1893 aboard the ship Torrens and formed a lifelong friendship[span_11](start_span)[span_11](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first volume of Galsworthy entitled From the Four Winds appeared in 1897 under the pseudonym:",
        text_hi: "From the Four Winds (1897) किस उपनाम के तहत प्रकाशित हुआ था?",
        options: ["John Gals", "John Sinjohn", "Boz", "Elia"],
        correct: 1,
        solution: "Galsworthy published his earliest collection under the pseudonym 'John Sinjohn[span_12](start_span)'[span_12](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's first novel was published in 1898. Which novel?",
        text_hi: "गाल्सवर्दी का पहला उपन्यास जो 1898 में प्रकाशित हुआ, कौन सा था?",
        options: ["Jocelyn", "Villa Rubein", "A Man of Devon, A Knight", "The Science"],
        correct: 0,
        solution: "His first novel was 'Jocelyn' (1898), published under the pseudonym John Sinjohn[span_13](start_span)[span_13](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first work that earned Galsworthy was the novel. Identify it.",
        text_hi: "गाल्सवर्दी का पहला उपन्यास जिसने उन्हें पहचान दिलाई:",
        options: ["Fraternity", "Country Mouse", "The Island Pharisees", "Jocelyn"],
        correct: 2,
        solution: "'The Island Pharisees' (1904) was the first novel published under his own real name[span_14](start_span)[span_14](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The Island Pharisees holds up a picture of the wealthy class ruling:",
        text_hi: "The Island Pharisees संपन्न वर्ग के शासन का क्या चित्र प्रस्तुत करता है?",
        options: ["Over the poor class and fattening on them", "Over the poor class and trying to make them rich", "Over the rich class and flattering them", "None of these"],
        correct: 0,
        solution: "It portrays the wealthy class ruling over the poor class and fattening on them[span_15](start_span)[span_15](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The first play that made Galsworthy famous as a playwright is:",
        text_hi: "गाल्सवर्दी का पहला नाटक जिसने उन्हें नाटककार के रूप में प्रसिद्ध बनाया:",
        options: ["Justice", "Loyalties", "The Silver Box", "None of these"],
        correct: 2,
        solution: "'The Silver Box' (1906) was his first play and made him famous as a dramatist[span_16](start_span)[span_16](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's reputation as a novelist was established by:",
        text_hi: "गाल्सवर्दी की एक उपन्यासकार के रूप में प्रतिष्ठा किससे स्थापित हुई?",
        options: ["The Forsyte Saga", "Justice", "Jocelyn", "The Silver Box"],
        correct: 0,
        solution: "'The Forsyte Saga' established his enduring reputation as a master novelist[span_17](start_span)[span_17](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The Forsyte Saga includes: The Man of Property (1906), In Chancery (1920), To Let (1921) and two Interludes. Find the Interlude.",
        text_hi: "The Forsyte Saga में शामिल इंटरल्यूड को पहचानें:",
        options: ["Indian Winter of a Forsyte Tales and Awakening", "Indian Autumn of a Forsyte Tales and Awakening", "Indian Summer of a Forsyte Tales and Awakening", "None of these"],
        correct: 2,
        solution: "The interludes are 'Indian Summer of a Forsyte' (1918) and 'Awakening' (1920)[span_18](start_span)[span_18](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play of Galsworthy deals with the inadequacy of the administration of justice and the attitude of different types of people towards an escaped prisoner?",
        text_hi: "कौन सा नाटक भागे हुए कैदी और न्याय प्रशासन की कमियों से संबंधित है?",
        options: ["The Show", "Jocelyn", "Escape", "None of these"],
        correct: 2,
        solution: "'Escape' (1926) deals with Matt Denant, an escaped prisoner[span_19](start_span)[span_19](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play analyses the impact of modern publicity on private domestic tragedy?",
        text_hi: "कौन सा नाटक निजी घरेलू त्रासदी पर आधुनिक प्रचार/प्रेस के प्रभाव का विश्लेषण करता है?",
        options: ["The Show", "Jocelyn", "Escape", "None of these"],
        correct: 0,
        solution: "'The Show' (1925) satirizes press publicity and sensationalism invading private grief[span_20](start_span)[span_20](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play contrasts the fates of the various storeys in a hotel?",
        text_hi: "होटल की विभिन्न मंजिलों के भाग्य का अंतर कौन सा नाटक दिखाता है?",
        options: ["The Roof", "Jocelyn", "Escape", "None of these"],
        correct: 0,
        solution: "'The Roof' (1929) contrasts the fates of characters staying on different floors of a hotel during a fire[span_21](start_span)[span_21](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The year in which Galsworthy's father died was also the year of the publication of The Island Pharisees. Find out the year.",
        text_hi: "जिस वर्ष गाल्सवर्दी के पिता की मृत्यु हुई, उसी वर्ष The Island Pharisees प्रकाशित हुई। वह वर्ष कौन सा था?",
        options: ["1904", "1905", "1906", "1907"],
        correct: 0,
        solution: "In 1904 his father died and 'The Island Pharisees' was published[span_22](start_span)[span_22](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "A turning point in the life of Galsworthy came in with the publication of:",
        text_hi: "गाल्सवर्दी के जीवन में निर्णायक मोड़ किस कृति के प्रकाशन से आया?",
        options: ["The Man of Property", "Justice", "The Skin Game", "None of these"],
        correct: 0,
        solution: "'The Man of Property' (1906) was the critical turning point in his literary career[span_23](start_span)[span_23](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What did Galsworthy become in 1921?",
        text_hi: "गाल्सवर्दी 1921 में क्या बने?",
        options: ["President of Literary Club", "President of the P.E.N. Club London", "Assistant in the P.E.N. Club London", "None of these"],
        correct: 1,
        solution: "In 1921 he became the first President of the International P.E.N. Club in London[span_24](start_span)[span_24](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "What was conferred upon Galsworthy in 1929?",
        text_hi: "1929 में गाल्सवर्दी को कौन सा सम्मान प्रदान किया गया था?",
        options: ["Order of Demerit", "Booker Prize", "Order of Merit", "None of these"],
        correct: 2,
        solution: "He was awarded the Order of Merit (O.M.) in 1929[span_25](start_span)[span_25](end_span)."
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
        text: "Which play of Galsworthy has the theme of the problem of unjust, unfair and partial treatment meted out to the poor by the law governing the society? It clearly shows that there are two laws: one is meant for the rich and another for the poor.",
        text_hi: "गाल्सवर्दी का कौन सा नाटक दिखाता है कि कानून के दो रूप हैं - एक अमीरों के लिए और दूसरा गरीबों के लिए?",
        options: ["Justice", "The Silver Box", "Loyalties", "None of these"],
        correct: 1,
        solution: "In 'The Silver Box', Jack Barthwick goes free while poor Jones is imprisoned for stealing[span_27](start_span)[span_27](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Strife deals with the conflict between:",
        text_hi: "Strife नाटक किसके बीच संघर्ष को दर्शाता है?",
        options: ["The poor and the rich", "The labourers and poor men", "The Capitalist and Labourers", "None of these"],
        correct: 2,
        solution: "Strife dramatizes an industrial strike and the conflict between Capitalists and Labourers[span_28](start_span)[span_28](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Jack Barthwick appears in:",
        text_hi: "जैक बार्थविक (Jack Barthwick) किस नाटक का पात्र है?",
        options: ["Justice", "Fraternity", "The Silver Box", "None of these"],
        correct: 2,
        solution: "Jack Barthwick is the wealthy young man in 'The Silver Box[span_29](start_span)'[span_29](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Poor Jones appears in:",
        text_hi: "पुअर जोन्स (Poor Jones) किस नाटक में दिखाई देता है?",
        options: ["Justice", "Fraternity", "The Silver Box", "None of these"],
        correct: 2,
        solution: "James Jones (Poor Jones) is the unemployed charwoman's husband in 'The Silver Box[span_30](start_span)'[span_30](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In Strife, the strike takes place at:",
        text_hi: "Strife में हड़ताल किस स्थान पर होती है?",
        options: ["Trenartha Tin Plate Works", "Thirtana Tine Plate Works", "Thirtankar Tin Plate Works", "None of these"],
        correct: 0,
        solution: "The strike takes place at the Trenartha Tin Plate Works[span_31](start_span)[span_31](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who is the leader of the labourers in Strife?",
        text_hi: "Strife में मजदूरों का नेता कौन है?",
        options: ["Jack Barthwick", "Falder", "David Roberts", "None of these"],
        correct: 2,
        solution: "David Roberts is the uncompromising leader of the labourers in 'Strife[span_32](start_span)'[span_32](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In this play there is conflict between the old established aristocracy and the loud, uncultured new rich manufacturing class of London society. Hillchrist and Hornblower represent aristocracy and poverty respectively. Which play is it?",
        text_hi: "हिलक्रिस्ट और हॉर्नब्लोअर के बीच पुरानी कुलीनता और नए अमीरों के संघर्ष को कौन सा नाटक दर्शाता है?",
        options: ["The Mob", "The Silver Box", "The Skin Game", "None of these"],
        correct: 2,
        solution: "'The Skin Game' (1920) depicts the clash between landed squire Hillcrist and nouveau-riche Hornblower[span_33](start_span)[span_33](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Falder appears in:",
        text_hi: "फाल्डर (Falder) किस नाटक में दिखाई देता है?",
        options: ["Silver Box", "Loyalties", "Justice", "None of these"],
        correct: 2,
        solution: "William Falder is the tragic junior clerk in 'Justice[span_34](start_span)'[span_34](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who suffers solitary confinement in Justice?",
        text_hi: "Justice में एकांत कारावास (solitary confinement) कौन भुगतता है?",
        options: ["Falder", "Jack Barthwick", "Ruth Honeywell", "None of these"],
        correct: 0,
        solution: "William Falder suffers solitary confinement in prison, which breaks his nervous spirit[span_35](start_span)[span_35](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "It is a powerful social tragedy. It satirizes the contemporary English system of law and judiciary. Its hero suffers from the bitter punishment of solitary confinement. Find it out.",
        text_hi: "यह समकालीन अंग्रेजी कानून और न्यायपालिका पर व्यंग्य करती सामाजिक त्रासदी है। इसका नायक एकांत कारावास भुगतता है:",
        options: ["The Skin Game", "Justice", "The Silver Box", "None of these"],
        correct: 1,
        solution: "'Justice' (1910) is Galsworthy's famous social tragedy on the legal and penal system[span_36](start_span)[span_36](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The growth of an adolescent girl through emotional conflicts into a lover and a woman is the theme of:",
        text_hi: "एक किशोरी के भावनात्मक संघर्ष से एक प्रेमिका और स्त्री बनने की यात्रा किस नाटक का विषय है?",
        options: ["Skin Game", "Justice", "The Silver Box", "Joy"],
        correct: 3,
        solution: "'Joy' (1907) portrays the emotional development of an adolescent girl[span_37](start_span)[span_37](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The class-conscious prejudice of an old English baronet family against the marriage between the eldest son of the family and the serving maid is the theme of:",
        text_hi: "ज्येष्ठ पुत्र और नौकरानी के विवाह के प्रति पुराने सामंती परिवार के वर्ग-पूर्वाग्रह का विषय किसमें है?",
        options: ["The Mob", "Loyalties", "The Eldest Son", "None of these"],
        correct: 2,
        solution: "This is the theme of 'The Eldest Son' (1912)[span_38](start_span)[span_38](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In the play Joy, a girl who is senior by three year loves Joy, of 17. Name the boy.",
        text_hi: "Joy नाटक में जॉय (17 वर्ष) से प्रेम करने वाले युवक का नाम क्या है?",
        options: ["Falder", "Colonel Hope", "John Builder", "Dick Merton"],
        correct: 3,
        solution: "Dick Merton (aged 20) loves Joy (aged 17)[span_39](start_span)[span_39](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Colonel Hope appears in:",
        text_hi: "कर्नल होप (Colonel Hope) किस नाटक में दिखाई देते हैं?",
        options: ["The Eldest Son", "The Mob", "Joy", "None of these"],
        correct: 2,
        solution: "Colonel Hope is a character in the play 'Joy[span_40](start_span)'[span_40](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "John Builder is an unimaginative hot-tempered man. In which play does he appear?",
        text_hi: "जॉन बिल्डर किस नाटक में दिखाई देते हैं?",
        options: ["A Family Man", "The Eldest Son", "A Man of Property", "None of these"],
        correct: 0,
        solution: "John Builder is the domineering father in 'A Family Man' (1921)[span_41](start_span)[span_41](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In the play The Silver Box, Jack Barthwick steals a woman's sky-blue velvet silk purse while John steals:",
        text_hi: "The Silver Box में जैक बार्थविक पर्स चुराता है, जबकि जोन्स क्या चुराता है?",
        options: ["Silver coins", "Silver box that has coins", "A silver cigarette box", "None of these"],
        correct: 2,
        solution: "Jones steals a silver cigarette box from Jack's home[span_42](start_span)[span_42](end_span)[span_43](start_span)[span_43](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who is the police inspector in The Silver Box?",
        text_hi: "The Silver Box में पुलिस इंस्पेक्टर कौन है?",
        options: ["Snow", "Cockson", "Walter How", "None of these"],
        correct: 0,
        solution: "Inspector Snow is the police officer in 'The Silver Box[span_44](start_span)'[span_44](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Wellwyn is an artist in the play:",
        text_hi: "वेलविन (Wellwyn) किस नाटक में एक कलाकार (artist) है?",
        options: ["The Skin Game", "The Silver Box", "The Pigeon", "None of these"],
        correct: 2,
        solution: "Christopher Wellwyn is the generous artist in 'The Pigeon' (1912)[span_45](start_span)[span_45](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play made a great sensation, especially in Parliamentary and official circles according to Galsworthy?",
        text_hi: "किस नाटक ने संसदीय और प्रशासनिक हलकों में बड़ी सनसनी पैदा की?",
        options: ["Justice", "The Skin Game", "The Mob", "The Eldest Son"],
        correct: 0,
        solution: "'Justice' led Winston Churchill (then Home Secretary) to introduce prison reforms[span_46](start_span)[span_46](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "James How, Walter How, Robert Cokeson, Wister, Cowley, Falder and Ruth Honeywill are the characters that appear in:",
        text_hi: "जेम्स हाउ, रॉबर्ट कोकसन, फाल्डर और रूथ हनीविल किस नाटक के पात्र हैं?",
        options: ["The Skin Game", "Justice", "The Mob", "Silver Box"],
        correct: 1,
        solution: "These are the central characters of 'Justice[span_47](start_span)'[span_47](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "He is 23 years old weak willed young man of nervous temperament. He falls in love with Ruth, forges a cheque to get money to run away with her and finally gets penal servitude for three years. Whose description is this?",
        text_hi: "यह 23 वर्षीय युवक का वर्णन है जो चेक में हेराफेरी करता है और तीन साल की सजा पाता है:",
        options: ["Falder", "Jack Barthwick", "Cokeson", "None of these"],
        correct: 0,
        solution: "This describes William Falder, the tragic hero of 'Justice[span_48](start_span)'[span_48](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play deals with the cruelty of solitary confinement?",
        text_hi: "कौन सा नाटक एकांत कारावास की क्रूरता को दर्शाता है?",
        options: ["Justice", "The Skin Game", "Loyalties", "Strife"],
        correct: 0,
        solution: "'Justice' realistically portrays the cruel psychological effects of solitary confinement[span_49](start_span)[span_49](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play is a study in racial pride and social convention?",
        text_hi: "कौन सा नाटक जातीय स्वाभिमान और सामाजिक मान्यताओं का अध्ययन है?",
        options: ["The Skin Game", "The Mob", "The Silver Box", "Loyalties"],
        correct: 3,
        solution: "'Loyalties' (1922) examines racial prejudice against Ferdinand De Levis, a Jew[span_50](start_span)[span_50](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In which novel does Galsworthy illustrate the breaking down of inhibitions and barriers as the result of the war?",
        text_hi: "गाल्सवर्दी किस उपन्यास में युद्ध के परिणामस्वरूप सामाजिक बाधाओं के टूटने को दर्शाते हैं?",
        options: ["Saint's Progress", "Jocelyn", "Fraternity", "None of these"],
        correct: 0,
        solution: "'Saint's Progress' (1919) portrays the moral and psychological impact of World War I[span_51](start_span)[span_51](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Dancy, De Levis, Winsor, Canynge, Treisure, Robert, Lord St Erth, Borring, Miss Margaret Orme, Mabel, Gilman, Ricardos, Graveier and Jacob Twisden are the characeters that appear in a play. Find it out.",
        text_hi: "डैंसी, डी लेविस, विंसर और मार्गरेट ओर्मे किस नाटक के पात्र हैं?",
        options: ["Loyalties", "The Roof", "The Skin Game", "Windows"],
        correct: 0,
        solution: "All these characters belong to 'Loyalties[span_52](start_span)'[span_52](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "He is the recipient of D.S.O. He commits suicide and leaves a letter to Colford. He is in the play Loyalties. Who is he?",
        text_hi: "वह डी.एस.ओ. प्राप्तकर्ता है जो आत्महत्या करता है और कोलफोर्ड के लिए पत्र छोड़ता है। वह कौन है?",
        options: ["Dancy", "Winsor", "Treiusure", "Gilman"],
        correct: 0,
        solution: "Captain Ronald Dancy, D.S.O., shoots himself when his theft is uncovered[span_53](start_span)[span_53](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In Loyalties, Mabel is the wife of:",
        text_hi: "Loyalties में मेबेल किसकी पत्नी है?",
        options: ["Dancy", "Gilman", "Falder", "None of these"],
        correct: 0,
        solution: "Mabel Dancy is the loyal wife of Captain Ronald Dancy[span_54](start_span)[span_54](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Ibsen who wrote A Doll's House was the predecessor of Galsworthy. He was:",
        text_hi: "इबसेन, जो 'ए डॉल्स हाउस' के लेखक थे, कहाँ के नाटककार थे?",
        options: ["A Norwegian dramatist", "An Irish dramatist", "An American dramatist", "None of these"],
        correct: 0,
        solution: "Henrik Ibsen was a celebrated Norwegian dramatist and pioneer of modern realism[span_55](start_span)[span_55](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "A young woman kills her own illegitimate child to escape social tyranny. This happens in the play:",
        text_hi: "एक युवती सामाजिक प्रताड़ना से बचने के लिए अपने नाजायज बच्चे की हत्या कर देती है। यह किस नाटक में होता है?",
        options: ["Windows", "The Roof", "The Skin Game", "None of these"],
        correct: 0,
        solution: "This tragedy of Faith Bly occurs in the play 'Windows' (1922)[span_56](start_span)[span_56](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "John Anthony is the chairman of:",
        text_hi: "जॉन एंथोनी किस कंपनी के अध्यक्ष हैं?",
        options: ["The Trenartha Tin Plate Works", "The Global India", "The Tin International", "None of these"],
        correct: 0,
        solution: "John Anthony is the unbending Chairman of the Trenartha Tin Plate Works in 'Strife[span_57](start_span)'[span_57](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy is the chief exponent of:",
        text_hi: "गाल्सवर्दी मुख्य रूप से किस प्रकार के नाटकों के प्रतिपादक हैं?",
        options: ["Problem plays", "Romantic tales", "Adventurous tales", "None of these"],
        correct: 0,
        solution: "Galsworthy is famous as a master of realistic social Problem Plays[span_58](start_span)[span_58](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which drama depicts the fight of an idealist against adverse social forces?",
        text_hi: "कौन सा नाटक प्रतिकूल सामाजिक ताकतों के खिलाफ एक आदर्शवादी की लड़ाई को दर्शाता है?",
        options: ["The Mob", "The Roof", "The Skin Game", "Windows"],
        correct: 0,
        solution: "'The Mob' (1914) depicts Stephen More fighting mob jingoism and war hysteria[span_59](start_span)[span_59](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Soames Forsyte, his wife Irene and old Jolyon are the characters of:",
        text_hi: "सोम्स फॉरसाइट, उसकी पत्नी आइरीन और ओल्ड जोलियन किसके पात्र हैं?",
        options: ["The Forsyte Saga", "The Forsyte Naga", "The Forsyte Yaga", "The Forsyte Mega"],
        correct: 0,
        solution: "These are the central figures of 'The Forsyte Saga[span_60](start_span)'[span_60](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who belongs to the realist tradition of Jones and Pinero?",
        text_hi: "जोन्स और पिनेरो की यथार्थवादी परंपरा से कौन संबंधित है?",
        options: ["Galsworthy", "Shaw", "Ibsen", "None of these"],
        correct: 0,
        solution: "John Galsworthy belongs to the well-made realistic dramatic tradition[span_61](start_span)[span_61](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy ideas on drama can be found in his collection of essays entitled:",
        text_hi: "नाटक पर गाल्सवर्दी के विचार उनके निबंध संग्रह में किस शीर्षक से मिलते हैं?",
        options: ["The Ocean of Tranquillity", "The River of Tranquillity", "The Inn of Tranquillity", "None of these"],
        correct: 2,
        solution: "His dramatic philosophy is set out in 'The Inn of Tranquillity' (1912)[span_62](start_span)[span_62](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play deals with the inequality of justice?",
        text_hi: "न्याय की असमानता को कौन सा नाटक दर्शाता है?",
        options: ["The Silver Box", "Strife", "Justice", "The Skin Game"],
        correct: 0,
        solution: "'The Silver Box' clearly illustrates the dual standard of legal justice for rich and poor[span_63](start_span)[span_63](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Strife dramatizes:",
        text_hi: "Strife किसका नाटकीय रूपांतरण प्रस्तुत करता है?",
        options: ["a drama between lovers", "an interpersonal relationship", "a strike", "a war"],
        correct: 2,
        solution: "'Strife' dramatizes an industrial labor strike[span_64](start_span)[span_64](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's masterpiece is:",
        text_hi: "गाल्सवर्दी की सर्वोत्कृष्ट कृति कौन सी है?",
        options: ["The Patrician", "The Freelands", "The Forsyte Saga", "Fraternity"],
        correct: 2,
        solution: "'The Forsyte Saga' is universally recognized as his masterpiece[span_65](start_span)[span_65](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy was the son of a:",
        text_hi: "गाल्सवर्दी किसके पुत्र थे?",
        options: ["merchant", "lawyer", "novelist", "doctor"],
        correct: 1,
        solution: "Galsworthy's father was an established London lawyer/solicitor[span_66](start_span)[span_66](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Forsyte Saga is said to be an English parallel to:",
        text_hi: "The Forsyte Saga को किसका अंग्रेजी समानांतर माना जाता है?",
        options: ["Thomas Mann's Buddenbrooks", "Milton's Paradise Lost", "Shakespeare's Hamlet", "Seth's A Suitable Boy"],
        correct: 0,
        solution: "It is often compared as the English counterpart to Thomas Mann's German family epic 'Buddenbrooks[span_67](start_span)'[span_67](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Awakening and A Modern Comedy are the works of:",
        text_hi: "Awakening और A Modern Comedy किसकी कृतियाँ हैं?",
        options: ["Milton", "Shelley", "Galsworthy", "Shakespeare"],
        correct: 2,
        solution: "These are sequels and interludes written by John Galsworthy[span_68](start_span)[span_68](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The First and the Last, The Little Man, Hall Marked, Defeat, The Sun and Punch and Go are from the pen of Galsworthy. These are:",
        text_hi: "गाल्सवर्दी द्वारा लिखित ये रचनाएँ किस विधा की हैं?",
        options: ["Comedies", "Tragedies", "History", "Short plays"],
        correct: 3,
        solution: "These are short one-act plays by Galsworthy[span_69](start_span)[span_69](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "This Hindi author is famous for his stories and novels. He writes for a common man. He was so much influenced by John Galsworthy that he translated The Silver Box as Chandi Ki Dibiya, Strife as Hartal and Justice as Nyaya. Who is this Hindi author?",
        text_hi: "किस प्रसिद्ध लेखक ने गाल्सवर्दी के नाटकों का अनुवाद 'चांदी की डिबिया', 'हड़ताल' और 'न्याय' नाम से किया?",
        options: ["Dharam Veer Bharti", "Mohan Rakesh", "Prem Chand", "None of these"],
        correct: 2,
        solution: "Munshi Premchand translated three of Galsworthy's plays into Hindi[span_70](start_span)[span_70](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "John Barthwick, Mrs. Barthwick, Jack Barthwick, Roper, Mrs. Jones, Marlow, Wheeler, Jones, Mrs. Seddon, Snow etc. are the characters that appear in:",
        text_hi: "जॉन बार्थविक, जैक बार्थविक और मिसेज जोन्स किस नाटक के पात्र हैं?",
        options: ["The Silver Box: A Comedy in Three Acts", "Justice", "Loyalties", "None of these"],
        correct: 0,
        solution: "These characters appear in 'The Silver Box[span_71](start_span)'[span_71](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "This play has characters like James How (solicitor), Walter How, Robert Cokeson (the managing clerk), William Falder (the junior clerk), Sweedle, Wister (a detective), Cowley (a cashier), Mr. Justice Floyd (a judge), Harold Cleaver (an old advocate), Hector Frome (a young advocate), Captain Danson (a prison governor), Rev. Hugh Miller (a prison chaplain), Edward Clement (a prison doctor), Wooder (a chief warder), Moaney (convict), Clifton (convict), O'Cleary (convict), Ruth Honeywill etc. It has a very famous speech of Judge: \"The Law is what it is—a majestic edifice.\" It is:",
        text_hi: "उपरोक्त सभी पात्र और जज का प्रसिद्ध भाषण किस नाटक में है?",
        options: ["Galsworthy's Justice", "Galsworthy's Silver Box", "Galsworthy's Strife", "None of these"],
        correct: 0,
        solution: "This exhaustive character list belongs to 'Justice[span_72](start_span)'[span_72](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Galsworthy's play Strife deals with the subject of:",
        text_hi: "Strife नाटक का मुख्य विषय क्या है?",
        options: ["labour disputes", "justice", "wars", "class distinction"],
        correct: 0,
        solution: "'Strife' deals with industrial conflict and labour disputes[span_73](start_span)[span_73](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Justice shows problems of:",
        text_hi: "Justice नाटक किस व्यवस्था की समस्याओं को दिखाता है?",
        options: ["British Society", "English legal system", "American legal system", "Scottish Society"],
        correct: 1,
        solution: "It exposes the rigid, inhumane machinery of the English legal and penal system[span_74](start_span)[span_74](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play is an attack upon the press?",
        text_hi: "प्रेस और मीडिया पर कौन सा नाटक प्रहार करता है?",
        options: ["The Show", "The Skin Game", "The Mob", "The Strife"],
        correct: 0,
        solution: "'The Show' is an outspoken attack on the sensationalism of the press[span_75](start_span)[span_75](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Most of the troubles in life rise on account of egoism, selfishness, prejudices and lack of sympathy. Galsworthy uses this theme in:",
        text_hi: "जीवन के अधिकांश कष्ट स्वार्थ और पूर्वाग्रहों के कारण होते हैं - यह विषय किसमें है?",
        options: ["The Show", "The Skin Game", "The Joy", "The Mob"],
        correct: 2,
        solution: "This psychological theme is developed in 'Joy[span_76](start_span)'[span_76](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "How idealists and visionaries are crucified at the altar of mob mentality becomes the theme of:",
        text_hi: "भीड़ की मानसिकता की वेदी पर आदर्शवादी कैसे बलिदान होते हैं - यह विषय किस नाटक का है?",
        options: ["The Mob", "The Joy", "The Show", "The Skin Game"],
        correct: 0,
        solution: "This tragic idealism is the central core of 'The Mob[span_77](start_span)'[span_77](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Anyone willing to stick to high principles must be ready to suffer opposition and persecution in his life. This description fits to one of the plays of Galsworthy. Name the play.",
        text_hi: "सिद्धांतों पर अडिग रहने वाले को प्रताड़ना सहनी पड़ती है - यह किस नाटक का सार है?",
        options: ["The Joy", "A Bit of Love", "The Show", "The Skin Game"],
        correct: 1,
        solution: "This fits the gentle curate Michael Strangway in 'A Bit of Love' (1915)[span_78](start_span)[span_78](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The play Loyalties is a cry against racial prejudice shown by the Christians to Captain Dancy, a Jew. It is written by:",
        text_hi: "Loyalties नाटक किसके द्वारा लिखा गया है?",
        options: ["Milton", "Shaw", "Galsworthy", "Eliot"],
        correct: 2,
        solution: "Written by John Galsworthy in 1922[span_79](start_span)[span_79](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The writer of the book Galsworthy as a Dramatic Artist is:",
        text_hi: "'Galsworthy as a Dramatic Artist' पुस्तक के लेखक कौन हैं?",
        options: ["Allardyce Nicoll", "W.H. Phelps", "R.H. Coats", "None of these"],
        correct: 2,
        solution: "R.H. Coats authored the critical study 'John Galsworthy as a Dramatic Artist' (1926)[span_80](start_span)[span_80](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "As a novelist Galsworthy began his career at the age of 30 and his first book (From the Four Winds) was published under the name of:",
        text_hi: "गाल्सवर्दी की पहली पुस्तक (From the Four Winds) किस नाम से प्रकाशित हुई थी?",
        options: ["Elia", "John Alpha", "Blair", "John Sinjohn"],
        correct: 3,
        solution: "It was published under the pen-name John Sinjohn[span_81](start_span)[span_81](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In Strife, the conflict is between:",
        text_hi: "Strife में संघर्ष किसके बीच है?",
        options: ["capital and labour", "fair and black", "high caste and low caste", "none of these"],
        correct: 0,
        solution: "Between capital (John Anthony) and labour (David Roberts)[span_82](start_span)[span_82](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In Loyalties, the conflict is between different loyalties and:",
        text_hi: "Loyalties में विभिन्न निष्ठाओं और किसके बीच संघर्ष है?",
        options: ["the race prejudice", "the black", "traitors", "none of these"],
        correct: 0,
        solution: "The drama highlights how social loyalties clash with racial prejudice[span_83](start_span)[span_83](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In Justice, the conflict is between an individual and:",
        text_hi: "Justice में संघर्ष व्यक्ति और किसके बीच है?",
        options: ["the physical forces", "political forces", "environmental forces", "the social forces"],
        correct: 3,
        solution: "The conflict is between a helpless individual (Falder) and social/legal forces[span_84](start_span)[span_84](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "In his lecture on 'The Creation of Character in Literature', Galsworthy discusses his theory and formula of:",
        text_hi: "गाल्सवर्दी अपने व्याख्यान में किस सिद्धांत की चर्चा करते हैं?",
        options: ["plot", "dialogue", "characterization", "none of these"],
        correct: 2,
        solution: "He emphasizes characterization as the vital life of all imaginative drama and fiction[span_85](start_span)[span_85](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "The Little Man: A Farcical Morality is in:",
        text_hi: "The Little Man कितने दृश्यों (scenes) में है?",
        options: ["four scenes", "Three scenes", "five scenes", "none of these"],
        correct: 1,
        solution: "'The Little Man' consists of three scenes[span_86](start_span)[span_86](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play deals with different values of the old aristocracy and the newly rich businessman?",
        text_hi: "कौन सा नाटक पुरानी कुलीनता और नए अमीर व्यवसायी के मूल्यों से संबंधित है?",
        options: ["Strife", "Loyalties", "The Skin Game", "Justice"],
        correct: 2,
        solution: "'The Skin Game' portrays the bitter clash between squire Hillcrist and businessman Hornblower[span_87](start_span)[span_87](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Which play deals with class loyalties and prejudices?",
        text_hi: "वर्ग निष्ठाओं और पूर्वाग्रहों से कौन सा नाटक संबंधित है?",
        options: ["The Skin Game", "Loyalties", "Escape", "Strife"],
        correct: 1,
        solution: "'Loyalties' directly centers on class loyalties and prejudices[span_88](start_span)[span_88](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "PYQS",
        text: "Who published some verse in Moods, Songs, and Doggerels (1912), The Bells of Peace (1921) and Verses New and Old (1926)?",
        text_hi: "इन कविता संग्रहों को किसने प्रकाशित किया?",
        options: ["John Galsworthy", "G. B. Shaw", "T. S. Eliot", "Whitman"],
        correct: 0,
        solution: "John Galsworthy published these collections of poetry[span_89](start_span)[span_89](end_span)."
      },

      // =========================================================================
      // JOHN GALSWORTHY: Lines (Dialogues, Quotes, and Critical Comments)
      // =========================================================================
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"I read in various chamber, practiced almost not at all, and disliked my profession thoroughly.\" Who said?",
        text_hi: "\"मैंने विभिन्न कक्षों में अध्ययन किया, वकालत बिल्कुल नहीं की, और अपने पेशे को नापसंद किया।\" यह किसने कहा?",
        options: ["Shaw", "Galsworthy", "Hardy", "None of these"],
        correct: 1,
        solution: "Said by John Galsworthy regarding his brief, reluctant legal career as a barrister[span_90](start_span)[span_90](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Burn it and you will oblige me\" About which does Galsworthy talk here?",
        text_hi: "\"इसे जला दें तो आप मुझ पर कृपा करेंगे\" - गाल्सवर्दी यहाँ किसके बारे में कहते हैं?",
        options: ["From the Four Winds", "Jocelyn", "The Silver Box", "None of these"],
        correct: 0,
        solution: "He felt ashamed of his earliest amateur short story collection 'From the Four Winds' and wished copies burned[span_91](start_span)[span_91](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Literature is its own reward.\" Who said?",
        text_hi: "\"साहित्य स्वयं अपना पुरस्कार है।\" यह कथन किसका है?",
        options: ["Shaw", "Ibsen", "Wordsworth", "Galsworthy"],
        correct: 3,
        solution: "John Galsworthy stated: 'Literature is its own reward[span_92](start_span)'[span_92](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"The heroes of Mr. Galsworthy's dramas are the unseen fates of modern existence against which we poor mortals can but pitifully cry out in a moment of desperation and horror.\" Whose comment is this?",
        text_hi: "गाल्सवर्दी के नाटकों के नायकों पर यह टिप्पणी किसकी है?",
        options: ["Compton Rickett", "George Sampson", "Allardyce Nicoll", "None of these"],
        correct: 2,
        solution: "Allardyce Nicoll in 'British Drama' wrote this critical assessment[span_93](start_span)[span_93](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Why don't your recognize once and for all that these people are men like yourselves, and want what's good for them just as you want what's good for you (Bitterly) your motorcars and champagne, eight-course dinners.\" Who speaks these lines?",
        text_hi: "Strife में यह संवाद कौन बोलता है?",
        options: ["Roberts in Strife", "Falder in Justice", "Mrs. Jones in The Silver Box", "Harness in Strife"],
        correct: 3,
        solution: "Spoken by Trade Union official Harness in 'Strife[span_94](start_span)'[span_94](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Ye may break the body, but ye cannot break the spirit. Get back to London, the men have nothing for ye.\" Who says?",
        text_hi: "\"तुम शरीर को तोड़ सकते हो, लेकिन आत्मा को नहीं...\" यह कौन कहता है?",
        options: ["Roberts in Strife", "Harness in Strife", "Falder in Justice", "None of these"],
        correct: 0,
        solution: "Spoken by strike leader David Roberts in 'Strife[span_95](start_span)'[span_95](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"May be your God up in London has no time to listen to the working man. I'm told HE is a wealthy God; but if He listens to what I tell Him, He will know more than ever, HE learned in Kensington.\" Who said?",
        text_hi: "लंदन के धनवान ईश्वर पर यह व्यंग्य Strife में कौन करता है?",
        options: ["Roberts in Strife", "Harness in Strife", "Falder in Justice", "None of these"],
        correct: 0,
        solution: "David Roberts fiercely addresses the directors and union representatives in 'Strife[span_96](start_span)'[span_96](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Waiting an' waiting—that's what a woman has to do!\" Who speaks?",
        text_hi: "\"प्रतीक्षा और केवल प्रतीक्षा—एक स्त्री को यही करना होता है!\" यह कौन कहती है?",
        options: ["Madge in Strife", "Roberts in Strife", "Harness in Strife", "Falder in Justice"],
        correct: 0,
        solution: "Spoken by Madge Thomas in 'Strife[span_97](start_span)'[span_97](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"That's capital! A white faced, stonyhearted monster!\" Who speaks?",
        text_hi: "\"यह पूंजी है! एक पत्थर दिल राक्षस!\" यह कौन बोलता है?",
        options: ["Roberts in Strife", "Harness in Strife", "Falder in Justice", "None of these"],
        correct: 0,
        solution: "David Roberts attacking unyielding capitalism in 'Strife[span_98](start_span)'[span_98](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"We are not free agents. We're part of a machine. Our only business is to see the Company earns as much profit as it safely can.\" Who is the speaker?",
        text_hi: "\"हम स्वतंत्र नहीं हैं। हम मशीन का हिस्सा हैं...\" कौन कहता है?",
        options: ["Wanklin in Strife", "Roberts in Strife", "Harness in Strife", "Falder in Justice"],
        correct: 0,
        solution: "Director Wanklin addressing the board in 'Strife[span_99](start_span)'[span_99](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"War is war.\" Who is the speaker?",
        text_hi: "\"युद्ध तो युद्ध है।\" Strife में यह कौन कहता है?",
        options: ["Roberts in Strife", "Harness in Strife", "Falder in Justice", "Anthony in Strife"],
        correct: 3,
        solution: "John Anthony, the obstinate chairman, asserts 'War is war[span_100](start_span)'[span_100](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"There can only be one master in a house! Where two men meet the better man will rule.\" Who is the speaker?",
        text_hi: "\"घर में एक ही स्वामी हो सकता है...\" यह कौन कहता है?",
        options: ["Anthony in Strife", "Roberts in Strife", "Harness in Strife", "Falder in Justice"],
        correct: 0,
        solution: "John Anthony in 'Strife[span_101](start_span)'[span_101](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Masters are masters, men are men! Yield one demand and they will make it six. They are like Oliver Twist, asking for more. If I were in their place I should be the same. But I am not in their place.\" Who is the speaker?",
        text_hi: "\"मालिक मालिक हैं, मजदूर मजदूर हैं...\" यह प्रसिद्ध कथन किसका है?",
        options: ["Anthony in Strife", "Roberts in Strife", "Harness in Strife", "Falder in Justice"],
        correct: 0,
        solution: "John Anthony expressing his uncompromising philosophy in 'Strife[span_102](start_span)'[span_102](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"What seems just to one man, sir, is injustice to another.\" Who is the speaker?",
        text_hi: "\"जो एक व्यक्ति को न्याय लगता है, वह दूसरे के लिए अन्याय है।\" यह कौन कहता है?",
        options: ["Roberts in Strife", "Harness in Strife", "Falder in Justice", "Edgar in Strife"],
        correct: 3,
        solution: "Edgar Anthony (the chairman's humane son) in 'Strife[span_103](start_span)'[span_103](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"A woman dead; and the two best men both broken!\" Who is the speaker?",
        text_hi: "\"एक महिला मर गई; और दोनों श्रेष्ठ व्यक्ति टूट गए!\" यह कौन कहता है?",
        options: ["Harness in Strife", "Roberts in Strife", "Anthony in Strife", "Falder in Justice"],
        correct: 0,
        solution: "Harness remarks this at the close of 'Strife' pointing out the futile cost of the strike[span_104](start_span)[span_104](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"No one will touch him now! Never again! He is safe with gentle Jesus!\" Who says?",
        text_hi: "\"अब उसे कोई नहीं छुएगा! कभी नहीं! वह प्रभु यीशु के पास सुरक्षित है!\" कौन कहता है?",
        options: ["Falder about Cokeson", "Cokeson about Falder", "Ruth about Falder", "None of these"],
        correct: 1,
        solution: "Spoken by Robert Cokeson over William Falder's body at the end of 'Justice[span_105](start_span)'[span_105](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"A man doesn't succumb like that in a moment, if he's a clean mind and habits. He is rotten; got the eyes of a man who can't keep his hands off when there's money about.\" This is the speech of James about:",
        text_hi: "जेम्स का यह कथन किसके बारे में है?",
        options: ["Cokeson", "Walter How", "Falder", "None of these"],
        correct: 2,
        solution: "James How describing William Falder's forgery in 'Justice[span_106](start_span)[span_107](start_span)'[span_106](end_span)[span_107](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Life's one long temptation.\" Who said?",
        text_hi: "\"जीवन एक लंबा प्रलोभन है।\" यह किसने कहा?",
        options: ["Galsworthy in Justice", "Galsworthy in The Skin Game", "Shaw in Pygmalion", "Shaw in Arms and the Man"],
        correct: 0,
        solution: "Spoken by managing clerk Cokeson in Galsworthy's 'Justice[span_108](start_span)'[span_108](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"We live in a highly civilized age, and the sight of brutal violence disturbs us in a very strange way, even when we have no personal interest in the matter. But when we see it inflicted on a woman whom we love—what then?\" Where do these lines appear?",
        text_hi: "यह उद्धरण किस नाटक में आता है?",
        options: ["The Mob", "The Loyalties", "Justice", "None of these"],
        correct: 2,
        solution: "Spoken by defense advocate Hector Frome in 'Justice' explaining Falder's motive[span_109](start_span)[span_109](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Justice is a machine that, when someone has once given it the starting push, rolls on of itself.\" Where does this line appear?",
        text_hi: "\"न्याय एक ऐसी मशीन है...\" यह पंक्ति किस नाटक में आती है?",
        options: ["The Skin Game", "The Mob", "Justice", "None of these"],
        correct: 2,
        solution: "Spoken by Cokeson in 'Justice' describing how the penal legal process cannot be recalled[span_110](start_span)[span_110](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"It's the same with the dogs. If you treat them with kindness they will do anything for you; but to shut them up alone, it only make them savage.\" Where do these lines appear?",
        text_hi: "\"कुत्तों के साथ भी ऐसा ही होता है...\" यह पंक्ति किस नाटक में आती है?",
        options: ["The Skin Game", "The Mob", "The Silver Box", "Justice"],
        correct: 3,
        solution: "Spoken by convict Moaney in 'Justice' condemning solitary confinement[span_111](start_span)[span_111](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"You can't play fast and loose with morality and hope to go scot free. If society didn't take care of itself, nobody would—the sooner you realize that the better.\" Where do these lines appear?",
        text_hi: "\"आप नैतिकता के साथ खिलवाड़ करके बेदाग नहीं छूट सकते...\" कहाँ आता है?",
        options: ["The Mob", "The Eldest Son", "Strife", "Justice"],
        correct: 3,
        solution: "Spoken by James How refusing to take Falder back in 'Justice[span_112](start_span)'[span_112](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "Hillcrist: \"Who knows where things end when they begin?\" In which play of Galsworthy do this statement appear?",
        text_hi: "हिलक्रिस्ट का यह कथन किस नाटक में आता है?",
        options: ["The Show", "The Skin Game", "The Silver Box", "The Mob"],
        correct: 1,
        solution: "Spoken by Hillcrist in 'The Skin Game[span_113](start_span)'[span_113](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"As a painter of the physical universe and of the soul, John Galsworthy is a poet.\" Whose comment is this?",
        text_hi: "गाल्सवर्दी पर यह टिप्पणी किसकी है?",
        options: ["Compton Rickett", "Louis Cazamian", "Sampson", "None of these"],
        correct: 1,
        solution: "French critic Louis Cazamian praised Galsworthy as a poet of the soul[span_114](start_span)[span_114](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"The only way to get order, sir, is to bring disorderly up with the round turn.\" Where does this line appear?",
        text_hi: "यह पंक्ति किस नाटक में आती है?",
        options: ["Fraternity", "Jocelyn", "The Skin Game", "The Pigeon"],
        correct: 3,
        solution: "Appears in 'The Pigeon' (1912)[span_115](start_span)[span_115](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"We have to love because we love loving.\" Where does this line appear?",
        text_hi: "\"हमें प्रेम इसलिए करना है क्योंकि हम प्रेम से प्रेम करते हैं।\" कहाँ आता है?",
        options: ["A Bit of Love", "The Skin Love", "The Mob", "None of these"],
        correct: 0,
        solution: "Spoken in 'A Bit of Love' (1915)[span_116](start_span)[span_116](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"The great thing about love is that each should know what the other wants at the moment.\" Where does this line appear?",
        text_hi: "प्रेम पर यह उद्धरण कहाँ आता है?",
        options: ["The Roof", "The Skin Game", "Windows", "None of these"],
        correct: 0,
        solution: "Appears in Galsworthy's play 'The Roof[span_117](start_span)'[span_117](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"What is the use of all these lofty ideas that you can't live up to? Liberty, Equality, Democracy,—see what comes of, fighting for them? Where do these lines appear?",
        text_hi: "\"इन उच्च विचारों का क्या लाभ जब आप उन पर खरे नहीं उतर सकते?\" कहाँ आता है?",
        options: ["The Roof", "The Skin Game", "Windows", "None of these"],
        correct: 2,
        solution: "Spoken in 'Windows' (1922)[span_118](start_span)[span_118](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"How beastly women are to each other?\" Where does this line appear?",
        text_hi: "\"स्त्रियां एक-दूसरे के प्रति कितनी क्रूर होती हैं?\" कहाँ आता है?",
        options: ["The Roof", "The Skin Game", "Windows", "None of these"],
        correct: 2,
        solution: "Appears in 'Windows[span_119](start_span)'[span_119](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"There is nothing that gives more courage than to see the irony of things.\" Where does this line appear?",
        text_hi: "\"चीजों की विडंबना देखने से अधिक साहस कुछ नहीं देता।\" कहाँ आता है?",
        options: ["The Pigeon", "The Roof", "The Skin Game", "Windows"],
        correct: 0,
        solution: "Spoken by artist Christopher Wellwyn in 'The Pigeon[span_120](start_span)'[span_120](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Education is simply ruining the lower classes. It unsettles them, and that's the worst for us all. I see an enormous difference in the manner of servants.\" Where do these lines appear?",
        text_hi: "\"शिक्षा निचले वर्गों को बर्बाद कर रही है...\" कहाँ आता है?",
        options: ["The Roof", "The Skin Game", "Windows", "The Silver Box"],
        correct: 3,
        solution: "Spoken by Mrs. Barthwick reflecting upper-class prejudice in 'The Silver Box[span_121](start_span)'[span_121](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"The law is what it is—a majestic edifice, sheltering all of us, each stone of which rests on another.\" Where does this line appear?",
        text_hi: "\"The law is what it is—a majestic edifice...\" यह पंक्ति किस नाटक में आती है?",
        options: ["The Roof", "The Skin Game", "Windows", "Justice"],
        correct: 3,
        solution: "Spoken by Mr. Justice Floyd during Falder's trial in 'Justice[span_122](start_span)'[span_122](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"All the money goes to fellows who don't know a horse from a haystack\", \"Loyalty comes before everything\", \"A wife's memory is not very good when her husband is in danger,\" \"The Law's the Law\" etc. are some of the sayings from:",
        text_hi: "\"Loyalty comes before everything...\" ये संवाद किस नाटक से हैं?",
        options: ["The Roof", "The Skin Game", "Windows", "Loyalties"],
        correct: 3,
        solution: "These characteristic sayings occur in 'Loyalties[span_123](start_span)'[span_123](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Galsworthy is scrupulously impartial. He never loads the dice. He diagonises the disease rather than prescribes a remedy. But underneath the surface detachment burns a vehement pity for the victims of Circumstance.\" Whose comment is this?",
        text_hi: "गाल्सवर्दी की निष्पक्षता पर यह आलोचनात्मक टिप्पणी किसकी है?",
        options: ["Lytton Hudson", "Oliver Elton", "George Sampson", "None of these"],
        correct: 0,
        solution: "Lytton Hudson wrote this famous assessment of Galsworthy's impartiality[span_124](start_span)[span_124](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"We all cut each other's throats from the best of motives.\" Where does it appear?",
        text_hi: "\"हम सभी नेक इरादों से एक-दूसरे का गला काटते हैं।\" कहाँ आता है?",
        options: ["Loyalties", "The Skin Game", "The Eldest Son", "None of these"],
        correct: 0,
        solution: "The curtain line of 'Loyalties' spoken by Margaret Orme[span_125](start_span)[span_125](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"It is not the artist's business to preach. His business is to portray, but portray truly he cannot if he is devoid of the insight which comes from instinctive sympathy.\" Galsworthy writes in:",
        text_hi: "गाल्सवर्दी ने यह किस रचना में लिखा है?",
        options: ["Another Sheaf", "The Five Tales", "The Awakening", "None of these"],
        correct: 0,
        solution: "Written by Galsworthy in his essay collection 'Another Sheaf' (1919)[span_126](start_span)[span_126](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Let me have no temperament for the time being. Only from an impersonal point of view if there be such a thing, am I going to get even approximately at the truth.\" Who said?",
        text_hi: "\"मुझे फिलहाल कोई स्वभाव न रखने दें...\" यह किसने कहा?",
        options: ["Shaw", "Ibsen", "Galsworthy", "None of these"],
        correct: 2,
        solution: "Said by John Galsworthy asserting his artistic goal of detachment[span_127](start_span)[span_127](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Galsworthy is by nature cold, impartial, judicial. He can present on the stage the clash of character and character, the struggle of the poor and the rich, and he never depresses the beam of justice with his own finger.\" Who said?",
        text_hi: "\"गाल्सवर्दी स्वभाव से शांत, निष्पक्ष, न्यायिक हैं...\" यह कथन किसका है?",
        options: ["Oliver Elton", "Ibsen", "Compton Rickett", "William Harold"],
        correct: 3,
        solution: "William Harold commended Galsworthy's judicial dramatic temperament[span_128](start_span)[span_128](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "Galsworthy in The Silver box seems to echo the lines: \"Laws grind the poor / The rich men rule the laws\" These lines occur in:",
        text_hi: "\"Laws grind the poor / The rich men rule the laws\" ये पंक्तियाँ किसमें आती हैं?",
        options: ["Milton's Paradise Lost", "Gray's Elegy", "Goldsmith's The Traveller", "None of these"],
        correct: 2,
        solution: "These lines occur in Oliver Goldsmith's poem 'The Traveller' (1764)[span_129](start_span)[span_129](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Loyalties—I don't know—criss-cross—we all cut each other's throats from the best of motives.\" is a dialogue in a play by:",
        text_hi: "यह संवाद किसके नाटक में है?",
        options: ["Shakespeare's Macbeth", "Galsworthy's Loyalties", "Milton's Samson Agonistes", "Shaw's Candida"],
        correct: 1,
        solution: "Spoken by Margaret Orme in Galsworthy's 'Loyalties[span_130](start_span)'[span_130](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"You mob, are most contemptible thing under the sun. You are the thing that pelts the weak; kicks women; hurls down free speech. This is today, that tomorrow. Brain you have none. Spirit not the least of it.\" This description of mob appears in the play The Mob. Who wrote this play?",
        text_hi: "भीड़ की यह निंदा किस नाटक में की गई है और इसके लेखक कौन हैं?",
        options: ["Shaw", "Yeats", "Eliot", "Galsworthy"],
        correct: 3,
        solution: "Written by John Galsworthy in 'The Mob' (1914)[span_131](start_span)[span_131](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Too much exhibition of authority on the part of the elders is bound to lead to rebellion in the young hearts of grown up people.\" The description applies to one of the plays of Galsworthy. This play is:",
        text_hi: "बड़ों द्वारा अत्यधिक अधिकार प्रदर्शन से युवाओं में विद्रोह होता है - यह किस नाटक पर लागू होता है?",
        options: ["The Joy", "A Family Man", "The Show", "The Skin Game"],
        correct: 1,
        solution: "Applies to Galsworthy's domestic conflict play 'A Family Man' (1921)[span_132](start_span)[span_132](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Justice has less equality in the scales than its title would seem to demand.\" Whose statement is this?",
        text_hi: "\"Justice has less equality in the scales...\" यह कथन किसका है?",
        options: ["W.L. Phelps", "George Sampson", "Allardyce Nicoll", "None of these"],
        correct: 0,
        solution: "Critic W.L. Phelps made this remark on 'Justice[span_133](start_span)'[span_133](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"Justice is a legal diagram used to harrow the feelings of the audience with the horrors of the prison life.\" Whose statement is this?",
        text_hi: "\"Justice is a legal diagram...\" यह आलोचनात्मक टिप्पणी किसकी है?",
        options: ["George Sampson", "W.L. Phelps", "Allardyce Nicoll", "None of these"],
        correct: 0,
        solution: "George Sampson wrote this in his critical evaluation[span_134](start_span)[span_134](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"In Justice we feel the waste implied by Falder's suicide.\" Whose statement is this?",
        text_hi: "\"In Justice we feel the waste implied by Falder's suicide.\" यह कथन किसका है?",
        options: ["Allardyce Nicoll", "George Sampson", "W.L. Phelps", "None of these"],
        correct: 0,
        solution: "Allardyce Nicoll observed the tragic waste of human life in Falder's suicide[span_135](start_span)[span_135](end_span)."
      },
      {
        topic: "John Galsworthy",
        category: "Lines",
        text: "\"His plots are not the unwinding of a skein of complicated happenings... His climaxes are good.\" This statement of Coats is about:",
        text_hi: "आर. एच. कोट का यह कथन किसके नाटकों के बारे में है?",
        options: ["Milton", "Shakespeare", "Galsworthy", "Shaw"],
        correct: 2,
        solution: "R.H. Coats wrote this praising Galsworthy's dramatic structure and climaxes[span_136](start_span)[span_136](end_span)."
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

    // STORAGE EXTRACTION & AUTO SYNC
    let storeTopics = JSON.parse(localStorage.getItem("tb_portal_topics")) || defaultTopics;
    if (!storeTopics.some(t => t.toLowerCase() === "john galsworthy")) {
      storeTopics.push("John Galsworthy");
      localStorage.setItem("tb_portal_topics", JSON.stringify(storeTopics));
    }

    let storePaperTypes = JSON.parse(localStorage.getItem("tb_portal_categories")) || defaultPaperTypes;
    let storeSets = JSON.parse(localStorage.getItem("tb_portal_sets")) || defaultSets;
    let storeQuestions = JSON.parse(localStorage.getItem("tb_portal_questions")) || defaultQuestions;

    defaultQuestions.forEach(dq => {
      if (dq.topic === "John Galsworthy") {
        const exists = storeQuestions.some(sq => sq.topic === "John Galsworthy" && sq.text.trim() === dq.text.trim());
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

    let openAiApiKey = localStorage.getItem("tb_openai_api_key") || "sk-proj-dummy-key-paste-here";
    let aiAdminEnabled = localStorage.getItem("tb_ai_admin_enabled") !== "false";
    let aiCandidateEnabled = localStorage.getItem("tb_ai_candidate_enabled") === "true";
    let isAdminAuthenticated = localStorage.getItem("tb_admin_active") === "true";

    let brandConfig = JSON.parse(localStorage.getItem("tb_brand_config")) || {
      name: "Akash Workshop",
      badge: "AW",
      favicon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎓</text></svg>",
      profilePic: ""
    };

    let activeUser = null;
    try {
      const saved = localStorage.getItem("tb_active_user");
      if (saved) activeUser = JSON.parse(saved);
    } catch (e) {
      activeUser = null;
    }

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
       SECTION 3: CORE FUNCTIONS DEFINITION
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

      container.querySelectorAll('input[name="cbt-choice"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          container.querySelectorAll('.cbt-opt-label').forEach(lbl => lbl.classList.remove('selected-opt'));
          const parent = e.target.closest('.cbt-opt-label');
          if (parent) parent.classList.add('selected-opt');
        });
      });
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
          saveExamSnapshot();
        };
        paletteGrid.appendChild(btn);
      });

      document.getElementById("stat-attempted").innerText = attempted;
      document.getElementById("stat-unattempted").innerText = activeExamQuestions.length - attempted;
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

    /* ==========================================================================
       SECTION 4: EVENT BINDINGS
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
       SECTION 5: APPLICATION BOOTSTRAP
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

  // Safe DOM-Ready Boot
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startPortalApp);
  } else {
    startPortalApp();
  }
})();
