# SAMADHAN - Submission Materials

## 1. Live Public Link & Credentials

**Live Link:** [https://cpgrams-remake.vercel.app/](https://cpgrams-remake.vercel.app/)

*(If your app requires logging in to see the citizen dashboard or officer dashboard, provide the mock credentials below. If it's open, you can remove this part.)*
- **Citizen Login:** citizen@example.com / password123
- **Officer Login:** officer@example.com / password123

---

## 2. Project Summary (Under 250 Words)

**SAMADHAN** is a next-generation public grievance redressal platform, designed to reimagine India's CPGRAMS portal. 

Currently, submitting a civic grievance is often a tedious, text-heavy process requiring English proficiency and manual department selection. This creates a barrier for rural citizens and slows down administrative routing. SAMADHAN solves this by offering a **voice-first, AI-powered accessible interface**.

Instead of typing long forms, citizens can simply tap a microphone and speak their issue in their native language (Hindi, Tamil, Kannada, or English). Behind the scenes, the system uses Whisper (via Groq) to transcribe the audio with near-instant speed. Next, Google's Gemini AI analyzes the grievance to automatically translate it into formal English, determine the exact municipal department responsible, extract relevant tags, and assign an urgency level (Low/Medium/High). 

SAMADHAN is vastly superior to the current solution because it eliminates the language and literacy barrier for citizens, while simultaneously eliminating the manual triage burden for government officers. The modern, mobile-responsive Next.js interface ensures a frictionless experience from reporting a pothole to tracking its resolution, making civic participation truly inclusive and efficient.

*(Word count: ~180 words)*

---

## 3. Video Presentation Script (Max 2 Minutes)

*Target: ~140-160 words per minute of speaking. Practice to ensure it fits the 2-minute mark.*

### Minute 1: Citizen Demo (0:00 - 1:00)

**(0:00 - 0:10) Intro**
**Speaker 1:** "Hi, we are presenting SAMADHAN, our modern reimagining of the CPGRAMS grievance portal. We focused on making civic reporting accessible to absolutely everyone."

**(0:10 - 0:35) Voice Recording Demo**
**Speaker 1:** *(On screen: Show the Lodge Grievance page)* 
"Currently, lodging a complaint requires typing out long forms in English. Let's see how a citizen does it on SAMADHAN. I just tap the microphone and speak in my native language. *[Click mic]* 'There is a massive water leak on Main Street, it has been flowing for two days.' *[Stop mic]*"

**(0:35 - 1:00) AI Processing & Submission**
**Speaker 1:** *(On screen: Show the transcription appearing, then submit)*
"Our system instantly transcribes the audio. When I submit, AI takes over. It translates my grievance to formal English, categorizes it to the 'Municipal Water Board', flags it as 'High Urgency', and generates tags. The citizen gets a tracking ID instantly, without navigating complex dropdowns."

---

### Minute 2: Architecture & Technical Choices (1:00 - 2:00)

**(1:00 - 1:25) The Tech Stack**
**Speaker 2:** "For the second half, I'll explain how we built this. The frontend is built on **Next.js** and **Tailwind CSS** to ensure a lightning-fast, mobile-responsive experience—crucial since most citizens access services via smartphones. For our database and authentication, we rely on **Supabase**."

**(1:25 - 1:45) AI Integrations**
**Speaker 2:** "The core magic happens via two APIs. We use the **Groq SDK** running the Whisper-large model for transcription. We chose Groq because its inference speed is unmatched, making voice processing feel instantaneous. For the natural language processing, we use the **Gemini 2.5 Flash Lite** model."

**(1:45 - 2:00) Why We Made These Choices**
**Speaker 2:** "We chose Gemini 2.5 Flash Lite because it's incredibly fast, lightweight, provides high rate-limit headroom, and perfectly extracts structured JSON data—like departments and urgency levels—from messy, multilingual audio. SAMADHAN bridges the digital divide with voice, and automates bureaucracy with AI."
