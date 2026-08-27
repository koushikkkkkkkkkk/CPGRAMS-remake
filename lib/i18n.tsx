"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useEffect, useState } from "react";

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        lodge: "Lodge Report",
        status: "Track Status",
        contact: "Contact",
        login: "Log In",
        menu: "Menu",
        close: "Close"
      },
      home: {
        tagline: "Citizen Portal",
        heroTitle: "Your voice moves public service forward.",
        heroDesc: "Submit a report in plain language. We automatically route it to the right department and keep every step visible so you always know the status.",
        logReport: "Log a Report",
        aboutTitle: "About the Portal",
        aboutP1: "This portal is an online platform available to citizens 24/7 to lodge reports related to public service delivery. It is a unified system connected to all government departments.",
        aboutP2: "You can track the status of your report using the unique tracking ID provided when you submit it. If you are not satisfied with the resolution, you can appeal the decision.",
        issuesNotCoveredTitle: "Issues Not Covered",
        issuesNotCoveredDesc: "Please do not submit reports regarding the following topics, as they fall outside the scope of this portal:",
        issuesList1: "Right to Information (RTI) matters",
        issuesList2: "Court-related or subjudice matters",
        issuesList3: "Religious matters",
        issuesList4: "Internal government employee service grievances",
        stat1Label: "Resolved this month",
        stat1Detail: "Across all departments",
        stat2Label: "Average response",
        stat2Detail: "Transparent tracking",
        stat3Label: "Citizen satisfaction",
        stat3Detail: "Verified resolutions"
      },
      lodge: {
        title: "Log a Report",
        description: "Describe the issue in your own words. We will automatically route it to the correct department.",
        incidentDetails: "Incident Details",
        placeholder: "Type your report here...",
        characters: "Characters",
        micStandby: "Mic Standby",
        micLive: "Mic Live",
        useVoice: "Use Voice Input",
        stopVoice: "Stop Recording",
        clearText: "Clear Text",
        analyze: "Review Report",
        analyzing: "Analyzing and routing your report...",
        systemReady: "System Ready",
        listening: "Listening...",
        draftRestored: "Draft Restored",
        draftSaved: "Draft Auto-Saved",
        draftCleared: "Draft Cleared",
        reviewTitle: "Review & Submit",
        assignedTo: "Assigned To",
        categories: "Categories",
        yourReport: "Your Report",
        submitAnonymously: "Submit Anonymously",
        anonymousDetail: "Your personal details will not be shared with the department handling the issue.",
        submit: "Submit Report",
        submitting: "Submitting...",
        instruction: "Write naturally. System extracts intent and jurisdiction.",
        titleLabel: "TITLE",
        titlePlaceholder: "Optional short summary"
      },
      review: {
        routedTo: "ROUTED TO",
        intent: "INTENT",
        payload: "Payload",
        mask: "Mask Identity",
        maskHelp: "Your identity will not be disclosed to the assigned department.",
        submit: "Submit Report",
        submitting: "Submitting...",
        processing: "Processing..."
      },
      status: {
        title: "Track Your Report",
        description: "Enter your reference number to check the current status of your submission.",
        refNumber: "Reference Number",
        placeholder: "e.g. JANS-2026-XXXXX",
        checkBtn: "Check Status",
        recentReports: "Recent Public Reports",
        statusResolved: "Resolved",
        statusInProgress: "In Progress",
        statusReceived: "Received",
        statusUnknown: "Unknown"
      },
      contact: {
        back: "Back to Home",
        title: "Contact & Support",
        desc: "We are here to assist you with the grievance redressal process.",
        helpline: "Helpline",
        helplineDesc: "Available 24x7 for assistance in all regional languages.",
        email: "Email Support",
        emailDesc: "For technical issues related to the portal.",
        nodal: "Nodal Agency Address",
        nodalDept: "Department of Administrative Reforms and Public Grievances",
        nodalAddressLine1: "5th Floor, Sardar Patel Bhavan,",
        nodalAddressLine2: "Parliament Street, New Delhi - 110001",
        nodalAddressLine3: "India"
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: "होम",
        lodge: "रिपोर्ट दर्ज करें",
        status: "स्थिति ट्रैक करें",
        contact: "संपर्क करें",
        login: "लॉग इन",
        menu: "मेनू",
        close: "बंद करें"
      },
      home: {
        tagline: "नागरिक पोर्टल",
        heroTitle: "आपकी आवाज़ सार्वजनिक सेवा को आगे बढ़ाती है।",
        heroDesc: "सरल भाषा में रिपोर्ट सबमिट करें। हम इसे स्वचालित रूप से सही विभाग में भेजते हैं और हर कदम को पारदर्शी रखते हैं ताकि आपको हमेशा स्थिति का पता रहे।",
        logReport: "रिपोर्ट दर्ज करें",
        aboutTitle: "पोर्टल के बारे में",
        aboutP1: "यह पोर्टल नागरिकों के लिए सार्वजनिक सेवा वितरण से संबंधित रिपोर्ट दर्ज करने के लिए 24/7 उपलब्ध एक ऑनलाइन प्लेटफॉर्म है। यह सभी सरकारी विभागों से जुड़ा एक एकीकृत सिस्टम है।",
        aboutP2: "आप सबमिट करते समय प्रदान की गई विशिष्ट ट्रैकिंग आईडी का उपयोग करके अपनी रिपोर्ट की स्थिति को ट्रैक कर सकते हैं। यदि आप समाधान से संतुष्ट नहीं हैं, तो आप निर्णय के खिलाफ अपील कर सकते हैं।",
        issuesNotCoveredTitle: "शामिल नहीं किए गए मुद्दे",
        issuesNotCoveredDesc: "कृपया निम्नलिखित विषयों के संबंध में रिपोर्ट सबमिट न करें, क्योंकि वे इस पोर्टल के दायरे से बाहर हैं:",
        issuesList1: "सूचना का अधिकार (RTI) मामले",
        issuesList2: "अदालत से संबंधित या विचाराधीन मामले",
        issuesList3: "धार्मिक मामले",
        issuesList4: "आंतरिक सरकारी कर्मचारी सेवा शिकायतें",
        stat1Label: "इस महीने हल किया गया",
        stat1Detail: "सभी विभागों में",
        stat2Label: "औसत प्रतिक्रिया",
        stat2Detail: "पारदर्शी ट्रैकिंग",
        stat3Label: "नागरिक संतुष्टि",
        stat3Detail: "सत्यापित समाधान"
      },
      lodge: {
        title: "रिपोर्ट दर्ज करें",
        description: "समस्या का अपने शब्दों में वर्णन करें। हम इसे स्वचालित रूप से सही विभाग में भेज देंगे।",
        incidentDetails: "घटना का विवरण",
        placeholder: "अपनी रिपोर्ट यहाँ टाइप करें...",
        characters: "अक्षर",
        micStandby: "माइक स्टैंडबाय",
        micLive: "माइक चालू",
        useVoice: "वॉयस इनपुट का उपयोग करें",
        stopVoice: "रिकॉर्डिंग रोकें",
        clearText: "टेक्स्ट साफ़ करें",
        analyze: "रिपोर्ट की समीक्षा करें",
        analyzing: "आपकी रिपोर्ट का विश्लेषण किया जा रहा है...",
        systemReady: "सिस्टम तैयार",
        listening: "सुन रहा हूँ...",
        draftRestored: "ड्राफ्ट पुनर्स्थापित",
        draftSaved: "ड्राफ्ट ऑटो-सेव्ड",
        draftCleared: "ड्राफ्ट साफ़ किया गया",
        reviewTitle: "समीक्षा और सबमिट करें",
        assignedTo: "किसे सौंपा गया",
        categories: "श्रेणियाँ",
        yourReport: "आपकी रिपोर्ट",
        submitAnonymously: "गुमनाम रूप से सबमिट करें",
        anonymousDetail: "समस्या को संभालने वाले विभाग के साथ आपके व्यक्तिगत विवरण साझा नहीं किए जाएंगे।",
        submit: "रिपोर्ट सबमिट करें",
        submitting: "सबमिट किया जा रहा है...",
        instruction: "स्वाभाविक रूप से लिखें। सिस्टम मंशा और अधिकार क्षेत्र निकालता है।",
        titleLabel: "शीर्षक",
        titlePlaceholder: "वैकल्पिक संक्षिप्त सारांश"
      },
      review: {
        routedTo: "को भेजा गया",
        intent: "उद्देश्य",
        payload: "विवरण",
        mask: "पहचान छिपाएं",
        maskHelp: "आपकी पहचान संबंधित विभाग को नहीं बताई जाएगी।",
        submit: "रिपोर्ट सबमिट करें",
        submitting: "सबमिट किया जा रहा है...",
        processing: "प्रसंस्करण हो रहा है..."
      },
      status: {
        title: "अपनी रिपोर्ट ट्रैक करें",
        description: "अपनी शिकायत की वर्तमान स्थिति जांचने के लिए अपना संदर्भ संख्या दर्ज करें।",
        refNumber: "संदर्भ संख्या",
        placeholder: "उदा. JANS-2026-XXXXX",
        checkBtn: "स्थिति जांचें",
        recentReports: "हाल की सार्वजनिक रिपोर्ट",
        statusResolved: "हल हो गया",
        statusInProgress: "प्रगति पर है",
        statusReceived: "प्राप्त हुआ",
        statusUnknown: "अज्ञात"
      },
      contact: {
        back: "होम पर वापस जाएँ",
        title: "संपर्क और सहायता",
        desc: "हम शिकायत निवारण प्रक्रिया में आपकी सहायता के लिए यहां हैं।",
        helpline: "हेल्पलाइन",
        helplineDesc: "सभी क्षेत्रीय भाषाओं में सहायता के लिए 24x7 उपलब्ध है।",
        email: "ईमेल समर्थन",
        emailDesc: "पोर्टल से संबंधित तकनीकी समस्याओं के लिए।",
        nodal: "नोडल एजेंसी का पता",
        nodalDept: "प्रशासनिक सुधार और लोक शिकायत विभाग",
        nodalAddressLine1: "5वीं मंजिल, सरदार पटेल भवन,",
        nodalAddressLine2: "संसद मार्ग, नई दिल्ली - 110001",
        nodalAddressLine3: "भारत"
      }
    }
  },
  kn: {
    translation: {
      nav: {
        home: "ಮುಖಪುಟ",
        lodge: "ವರದಿ ದಾಖಲಿಸಿ",
        status: "ಸ್ಥಿತಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
        contact: "ಸಂಪರ್ಕಿಸಿ",
        login: "ಲಾಗ್ ಇನ್",
        menu: "ಮೆನು",
        close: "ಮುಚ್ಚಿ"
      },
      home: {
        tagline: "ನಾಗರಿಕ ಪೋರ್ಟಲ್",
        heroTitle: "ನಿಮ್ಮ ಧ್ವನಿ ಸಾರ್ವಜನಿಕ ಸೇವೆಯನ್ನು ಮುನ್ನಡೆಸುತ್ತದೆ.",
        heroDesc: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವರದಿಯನ್ನು ಸಲ್ಲಿಸಿ. ನಾವು ಅದನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸರಿಯಾದ ಇಲಾಖೆಗೆ ರವಾನಿಸುತ್ತೇವೆ ಮತ್ತು ಪ್ರತಿಯೊಂದು ಹಂತವನ್ನು ಗೋಚರಿಸುವಂತೆ ಮಾಡುತ್ತೇವೆ ಇದರಿಂದ ನಿಮಗೆ ಯಾವಾಗಲೂ ಸ್ಥಿತಿ ತಿಳಿದಿರುತ್ತದೆ.",
        logReport: "ವರದಿ ದಾಖಲಿಸಿ",
        aboutTitle: "ಪೋರ್ಟಲ್ ಬಗ್ಗೆ",
        aboutP1: "ಈ ಪೋರ್ಟಲ್ ಸಾರ್ವಜನಿಕ ಸೇವಾ ವಿತರಣೆಗೆ ಸಂಬಂಧಿಸಿದ ವರದಿಗಳನ್ನು ದಾಖಲಿಸಲು ನಾಗರಿಕರಿಗೆ 24/7 ಲಭ್ಯವಿರುವ ಆನ್‌ಲೈನ್ ವೇದಿಕೆಯಾಗಿದೆ. ಇದು ಎಲ್ಲಾ ಸರ್ಕಾರಿ ಇಲಾಖೆಗಳಿಗೆ ಸಂಪರ್ಕಗೊಂಡಿರುವ ಏಕೀಕೃತ ವ್ಯವಸ್ಥೆಯಾಗಿದೆ.",
        aboutP2: "ನೀವು ಸಲ್ಲಿಸಿದಾಗ ಒದಗಿಸಲಾದ ಅನನ್ಯ ಟ್ರ್ಯಾಕಿಂಗ್ ಐಡಿಯನ್ನು ಬಳಸಿಕೊಂಡು ನಿಮ್ಮ ವರದಿಯ ಸ್ಥಿತಿಯನ್ನು ನೀವು ಟ್ರ್ಯಾಕ್ ಮಾಡಬಹುದು. ಪರಿಹಾರದೊಂದಿಗೆ ನಿಮಗೆ ತೃಪ್ತಿ ಇಲ್ಲದಿದ್ದರೆ, ನೀವು ನಿರ್ಧಾರದ ವಿರುದ್ಧ ಮೇಲ್ಮನವಿ ಸಲ್ಲಿಸಬಹುದು.",
        issuesNotCoveredTitle: "ಒಳಪಡದ ವಿಷಯಗಳು",
        issuesNotCoveredDesc: "ದಯವಿಟ್ಟು ಕೆಳಗಿನ ವಿಷಯಗಳ ಕುರಿತು ವರದಿಗಳನ್ನು ಸಲ್ಲಿಸಬೇಡಿ, ಏಕೆಂದರೆ ಅವು ಈ ಪೋರ್ಟಲ್‌ನ ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿವೆ:",
        issuesList1: "ಮಾಹಿತಿ ಹಕ್ಕು (RTI) ವಿಷಯಗಳು",
        issuesList2: "ನ್ಯಾಯಾಲಯಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಅಥವಾ ನ್ಯಾಯಾಂಗದ ಮುಂದಿರುವ ವಿಷಯಗಳು",
        issuesList3: "ಧಾರ್ಮಿಕ ವಿಷಯಗಳು",
        issuesList4: "ಆಂತರಿಕ ಸರ್ಕಾರಿ ನೌಕರರ ಸೇವಾ ಕುಂದುಕೊರತೆಗಳು",
        stat1Label: "ಈ ತಿಂಗಳು ಪರಿಹರಿಸಲಾಗಿದೆ",
        stat1Detail: "ಎಲ್ಲಾ ಇಲಾಖೆಗಳಲ್ಲಿ",
        stat2Label: "ಸರಾಸರಿ ಪ್ರತಿಕ್ರಿಯೆ",
        stat2Detail: "ಪಾರದರ್ಶಕ ಟ್ರ್ಯಾಕಿಂಗ್",
        stat3Label: "ನಾಗರಿಕ ತೃಪ್ತಿ",
        stat3Detail: "ಪರಿಶೀಲಿಸಿದ ಪರಿಹಾರಗಳು"
      },
      lodge: {
        title: "ವರದಿ ದಾಖಲಿಸಿ",
        description: "ನಿಮ್ಮ ಸ್ವಂತ ಮಾತುಗಳಲ್ಲಿ ಸಮಸ್ಯೆಯನ್ನು ವಿವರಿಸಿ. ನಾವು ಅದನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸರಿಯಾದ ಇಲಾಖೆಗೆ ರವಾನಿಸುತ್ತೇವೆ.",
        incidentDetails: "ಘಟನೆಯ ವಿವರಗಳು",
        placeholder: "ನಿಮ್ಮ ವರದಿಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...",
        characters: "ಅಕ್ಷರಗಳು",
        micStandby: "ಮೈಕ್ ಸ್ಟ್ಯಾಂಡ್‌ಬೈ",
        micLive: "ಮೈಕ್ ಲೈವ್",
        useVoice: "ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬಳಸಿ",
        stopVoice: "ರೆಕಾರ್ಡಿಂಗ್ ನಿಲ್ಲಿಸಿ",
        clearText: "ಪಠ್ಯವನ್ನು ಅಳಿಸಿ",
        analyze: "ವರದಿಯನ್ನು ಪರಿಶೀಲಿಸಿ",
        analyzing: "ನಿಮ್ಮ ವರದಿಯನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...",
        systemReady: "ಸಿಸ್ಟಮ್ ಸಿದ್ಧವಾಗಿದೆ",
        listening: "ಆಲಿಸಲಾಗುತ್ತಿದೆ...",
        draftRestored: "ಕರಡು ಮರುಸ್ಥಾಪಿಸಲಾಗಿದೆ",
        draftSaved: "ಕರಡು ಆಟೋ-ಸೇವ್ ಆಗಿದೆ",
        draftCleared: "ಕರಡು ಅಳಿಸಲಾಗಿದೆ",
        reviewTitle: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಸಲ್ಲಿಸಿ",
        assignedTo: "ನಿಯೋಜಿಸಲಾಗಿದೆ",
        categories: "ವರ್ಗಗಳು",
        yourReport: "ನಿಮ್ಮ ವರದಿ",
        submitAnonymously: "ಅನಾಮಧೇಯವಾಗಿ ಸಲ್ಲಿಸಿ",
        anonymousDetail: "ಸಮಸ್ಯೆಯನ್ನು ನಿರ್ವಹಿಸುವ ಇಲಾಖೆಯೊಂದಿಗೆ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ವಿವರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲಾಗುವುದಿಲ್ಲ.",
        submit: "ವರದಿ ಸಲ್ಲಿಸಿ",
        submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
        instruction: "ಸ್ವಾಭಾವಿಕವಾಗಿ ಬರೆಯಿರಿ. ಸಿಸ್ಟಮ್ ಉದ್ದೇಶ ಮತ್ತು ವ್ಯಾಪ್ತಿಯನ್ನು ಹೊರತೆಗೆಯುತ್ತದೆ.",
        titleLabel: "ಶೀರ್ಷಿಕೆ",
        titlePlaceholder: "ಐಚ್ಛಿಕ ಕಿರು ಸಾರಾಂಶ"
      },
      review: {
        routedTo: "ರವಾನಿಸಲಾಗಿದೆ",
        intent: "ಉದ್ದೇಶ",
        payload: "ವಿವರ",
        mask: "ಗುರುತನ್ನು ಮರೆಮಾಡಿ",
        maskHelp: "ನಿಮ್ಮ ಗುರುತನ್ನು ಸಂಬಂಧಪಟ್ಟ ಇಲಾಖೆಗೆ ಬಹಿರಂಗಪಡಿಸಲಾಗುವುದಿಲ್ಲ.",
        submit: "ವರದಿ ಸಲ್ಲಿಸಿ",
        submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
        processing: "ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ..."
      },
      status: {
        title: "ನಿಮ್ಮ ವರದಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
        description: "ನಿಮ್ಮ ಸಲ್ಲಿಕೆಯ ಪ್ರಸ್ತುತ ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಲು ನಿಮ್ಮ ಉಲ್ಲೇಖ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
        refNumber: "ಉಲ್ಲೇಖ ಸಂಖ್ಯೆ",
        placeholder: "ಉದಾ. JANS-2026-XXXXX",
        checkBtn: "ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
        recentReports: "ಇತ್ತೀಚಿನ ಸಾರ್ವಜನಿಕ ವರದಿಗಳು",
        statusResolved: "ಪರಿಹರಿಸಲಾಗಿದೆ",
        statusInProgress: "ಪ್ರಗತಿಯಲ್ಲಿದೆ",
        statusReceived: "ಸ್ವೀಕರಿಸಲಾಗಿದೆ",
        statusUnknown: "ತಿಳಿದಿಲ್ಲ"
      },
      contact: {
        back: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
        title: "ಸಂಪರ್ಕ ಮತ್ತು ಬೆಂಬಲ",
        desc: "ಕುಂದುಕೊರತೆ ನಿವಾರಣೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ನಾವಿದ್ದೇವೆ.",
        helpline: "ಸಹಾಯವಾಣಿ",
        helplineDesc: "ಎಲ್ಲಾ ಪ್ರಾದೇಶಿಕ ಭಾಷೆಗಳಲ್ಲಿ ಸಹಾಯಕ್ಕಾಗಿ 24x7 ಲಭ್ಯವಿದೆ.",
        email: "ಇಮೇಲ್ ಬೆಂಬಲ",
        emailDesc: "ಪೋರ್ಟಲ್‌ಗೆ ಸಂಬಂಧಿಸಿದ ತಾಂತ್ರಿಕ ಸಮಸ್ಯೆಗಳಿಗಾಗಿ.",
        nodal: "ನೋಡಲ್ ಏಜೆನ್ಸಿ ವಿಳಾಸ",
        nodalDept: "ಆಡಳಿತ ಸುಧಾರಣೆ ಮತ್ತು ಸಾರ್ವಜನಿಕ ಕುಂದುಕೊರತೆಗಳ ಇಲಾಖೆ",
        nodalAddressLine1: "5 ನೇ ಮಹಡಿ, ಸರ್ದಾರ್ ಪಟೇಲ್ ಭವನ್,",
        nodalAddressLine2: "ಸಂಸತ್ ರಸ್ತೆ, ನವದೆಹಲಿ - 110001",
        nodalAddressLine3: "ಭಾರತ"
      }
    }
  },
  ta: {
    translation: {
      nav: {
        home: "முகப்பு",
        lodge: "புகாரை பதிவு செய்",
        status: "நிலையை அறிய",
        contact: "தொடர்பு கொள்ள",
        login: "உள்நுழைய",
        menu: "மெனு",
        close: "மூடு"
      },
      home: {
        tagline: "குடிமக்கள் தளம்",
        heroTitle: "உங்கள் குரல் பொது சேவையை முன்னோக்கி நகர்த்துகிறது.",
        heroDesc: "எளிய மொழியில் புகாரை சமர்ப்பிக்கவும். நாங்கள் அதை தானாகவே சரியான துறைக்கு அனுப்புகிறோம், மேலும் ஒவ்வொரு படியையும் வெளிப்படையாக வைத்திருக்கிறோம், எனவே நீங்கள் எப்போதும் நிலையை அறியலாம்.",
        logReport: "புகாரை பதிவு செய்",
        aboutTitle: "தளத்தைப் பற்றி",
        aboutP1: "இந்த தளம் பொது சேவை வழங்கல் தொடர்பான புகார்களை பதிவு செய்ய குடிமக்களுக்கு 24/7 கிடைக்கும் ஆன்லைன் தளமாகும். இது அனைத்து அரசு துறைகளுடனும் இணைக்கப்பட்ட ஒரு ஒருங்கிணைந்த அமைப்பாகும்.",
        aboutP2: "நீங்கள் சமர்ப்பிக்கும் போது வழங்கப்பட்ட தனிப்பட்ட கண்காணிப்பு ஐடியைப் பயன்படுத்தி உங்கள் புகாரின் நிலையைக் கண்காணிக்கலாம். தீர்வில் உங்களுக்கு திருப்தி இல்லை என்றால், நீங்கள் முடிவுக்கு மேல்முறையீடு செய்யலாம்.",
        issuesNotCoveredTitle: "உள்ளடக்கப்படாத சிக்கல்கள்",
        issuesNotCoveredDesc: "பின்வரும் தலைப்புகள் தொடர்பான புகார்களை தயவுசெய்து சமர்ப்பிக்க வேண்டாம், ஏனெனில் அவை இந்த தளத்தின் எல்லைக்கு அப்பாற்பட்டவை:",
        issuesList1: "தகவல் அறியும் உரிமை (RTI) விஷயங்கள்",
        issuesList2: "நீதிமன்றம் தொடர்பான அல்லது நிலுவையிலுள்ள விஷயங்கள்",
        issuesList3: "மத விஷயங்கள்",
        issuesList4: "உள் அரசு ஊழியர் சேவை குறைபாடுகள்",
        stat1Label: "இந்த மாதம் தீர்க்கப்பட்டது",
        stat1Detail: "அனைத்து துறைகளிலும்",
        stat2Label: "சராசரி பதில்",
        stat2Detail: "வெளிப்படையான கண்காணிப்பு",
        stat3Label: "குடிமக்கள் திருப்தி",
        stat3Detail: "சரிபார்க்கப்பட்ட தீர்வுகள்"
      },
      lodge: {
        title: "புகாரை பதிவு செய்",
        description: "பிரச்சனையை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும். அதை தானாகவே சரியான துறைக்கு அனுப்புவோம்.",
        incidentDetails: "சம்பவ விவரங்கள்",
        placeholder: "உங்கள் புகாரை இங்கே தட்டச்சு செய்க...",
        characters: "எழுத்துக்கள்",
        micStandby: "மைக் காத்திருப்பு",
        micLive: "மைக் நேரலை",
        useVoice: "குரல் உள்ளீட்டைப் பயன்படுத்து",
        stopVoice: "பதிவு செய்வதை நிறுத்து",
        clearText: "உரையை அழி",
        analyze: "புகாரை மதிப்பாய்வு செய்",
        analyzing: "உங்கள் புகார் பகுப்பாய்வு செய்யப்படுகிறது...",
        systemReady: "சிஸ்டம் தயார்",
        listening: "கேட்கிறது...",
        draftRestored: "வரைவு மீட்டமைக்கப்பட்டது",
        draftSaved: "வரைவு தானாக சேமிக்கப்பட்டது",
        draftCleared: "வரைவு அழிக்கப்பட்டது",
        reviewTitle: "மதிப்பாய்வு மற்றும் சமர்ப்பி",
        assignedTo: "ஒதுக்கப்பட்டுள்ளது",
        categories: "வகைகள்",
        yourReport: "உங்கள் புகார்",
        submitAnonymously: "அநாமதேயமாக சமர்ப்பிக்கவும்",
        anonymousDetail: "பிரச்சனையைக் கையாளும் துறையுடன் உங்கள் தனிப்பட்ட விவரங்கள் பகிரப்படாது.",
        submit: "புகாரை சமர்ப்பி",
        submitting: "சமர்ப்பிக்கப்படுகிறது...",
        instruction: "இயல்பாக எழுதவும். சிஸ்டம் நோக்கம் மற்றும் அதிகார வரம்பை பிரித்தெடுக்கிறது.",
        titleLabel: "தலைப்பு",
        titlePlaceholder: "விருப்பமான சிறு சுருக்கம்"
      },
      review: {
        routedTo: "அனுப்பப்பட்டது",
        intent: "நோக்கம்",
        payload: "விவரம்",
        mask: "அடையாளத்தை மறை",
        maskHelp: "உங்கள் அடையாளம் சம்பந்தப்பட்ட துறைக்கு வெளிப்படுத்தப்படாது.",
        submit: "புகாரை சமர்ப்பி",
        submitting: "சமர்ப்பிக்கப்படுகிறது...",
        processing: "செயலாக்கப்படுகிறது..."
      },
      status: {
        title: "உங்கள் புகாரைக் கண்காணிக்கவும்",
        description: "உங்கள் சமர்ப்பிப்பின் தற்போதைய நிலையைச் சரிபார்க்க உங்கள் குறிப்பு எண்ணை உள்ளிடவும்.",
        refNumber: "குறிப்பு எண்",
        placeholder: "உதாரணம்: JANS-2026-XXXXX",
        checkBtn: "நிலையைச் சரிபார்க்கவும்",
        recentReports: "சமீபத்திய பொது புகார்கள்",
        statusResolved: "தீர்க்கப்பட்டது",
        statusInProgress: "செயல்பாட்டில் உள்ளது",
        statusReceived: "பெறப்பட்டது",
        statusUnknown: "தெரியவில்லை"
      },
      contact: {
        back: "முகப்புக்குத் திரும்பு",
        title: "தொடர்பு மற்றும் ஆதரவு",
        desc: "குறை தீர்க்கும் செயல்முறையில் உங்களுக்கு உதவ நாங்கள் இங்குள்ளோம்.",
        helpline: "உதவி எண்",
        helplineDesc: "அனைத்து பிராந்திய மொழிகளிலும் உதவிக்கு 24x7 கிடைக்கும்.",
        email: "மின்னஞ்சல் ஆதரவு",
        emailDesc: "தளம் தொடர்பான தொழில்நுட்ப சிக்கல்களுக்கு.",
        nodal: "நோடல் ஏஜென்சி முகவரி",
        nodalDept: "நிர்வாக சீர்திருத்தங்கள் மற்றும் பொது குறைகள் துறை",
        nodalAddressLine1: "5வது தளம், சர்தார் படேல் பவன்,",
        nodalAddressLine2: "பாராளுமன்ற வீதி, புது தில்லி - 110001",
        nodalAddressLine3: "இந்தியா"
      }
    }
  }
};

export const supportedLanguages = ["en", "hi", "kn", "ta"];
export type AppLanguage = "en" | "hi" | "kn" | "ta";

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("civicos_lang");
    if (savedLang && ["en", "hi", "kn", "ta"].includes(savedLang)) {
      i18n.changeLanguage(savedLang);
    }
    setMounted(true);
  }, []);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}

export default i18n;
