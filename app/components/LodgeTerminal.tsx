"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type SpeechRecognitionAlternativeLike = { transcript: string };

type SpeechRecognitionResultLike = {
  isFinal: boolean;
  0: SpeechRecognitionAlternativeLike;
};

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

type LodgeTerminalProps = {
  onSubmit: (description: string) => void;
  storageKey?: string;
};

export default function LodgeTerminal({
  onSubmit,
  storageKey = "civic_os_draft",
}: LodgeTerminalProps) {
  const [description, setDescription] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [telemetry, setTelemetry] = useState("[ SYSTEM READY ]");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceBaseRef = useRef("");
  const finalTranscriptRef = useRef("");

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    const hydrateTimer = window.setTimeout(() => {
      try {
        const savedDraft = window.localStorage.getItem(storageKey);

        if (savedDraft) {
          setDescription(savedDraft);
          setTelemetry("[ DRAFT RESTORED ]");
        }
      } catch {
        setTelemetry("[ LOCAL STORAGE UNAVAILABLE ]");
      } finally {
        setIsHydrated(true);
      }
    }, 0);

    return () => window.clearTimeout(hydrateTimer);
  }, [storageKey]);

  useEffect(() => {
    resizeTextarea();
  }, [description]);

  useEffect(() => {
    if (!isHydrated) return;

    const saveTimer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, description);
        setTelemetry("[ DRAFT AUTO-SAVED ]");
      } catch {
        setTelemetry("[ DRAFT SAVE FAILED ]");
      }
    }, 350);

    return () => window.clearTimeout(saveTimer);
  }, [description, isHydrated, storageKey]);

  useEffect(() => {
    return () => recognitionRef.current?.abort();
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      return;
    }

    const Recognition =
      window.SpeechRecognition ?? window.webkitSpeechRecognition;

    if (!Recognition) {
      setTelemetry("[ VOICE INPUT NOT SUPPORTED ]");
      return;
    }

    const recognition = new Recognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    voiceBaseRef.current = description.trimEnd();
    finalTranscriptRef.current = "";

    recognition.onresult = (event) => {
      let interimTranscript = "";

      for (let index = event.resultIndex; index < event.results.length; index++) {
        const transcript = event.results[index][0].transcript;

        if (event.results[index].isFinal) {
          finalTranscriptRef.current += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      const separator = voiceBaseRef.current ? "\n" : "";
      setDescription(
        `${voiceBaseRef.current}${separator}${finalTranscriptRef.current}${interimTranscript}`,
      );
      setTelemetry("[ VOICE STREAM ACTIVE ]");
    };

    recognition.onerror = (event) => {
      setIsRecording(false);
      setTelemetry(`[ REC ERROR: ${event.error.toUpperCase()} ]`);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setTelemetry("[ REC SESSION CLOSED ]");
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
    setTelemetry("[ REC SESSION OPEN ]");
  };

  const clearDraft = () => {
    setDescription("");

    try {
      window.localStorage.removeItem(storageKey);
      setTelemetry("[ DRAFT PURGED ]");
    } catch {
      setTelemetry("[ DRAFT CLEAR FAILED ]");
    }

    textareaRef.current?.focus();
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!description.trim()) {
      setTelemetry("[ ALERT: DESCRIPTION REQUIRED ]");
      textareaRef.current?.focus();
      return;
    }

    onSubmit(description.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full font-mono text-[#EAEAEA]">
      <div className="border border-[#EAEAEA]/20 bg-[#0A0A0A]">
        <div className="flex flex-col border-b border-[#EAEAEA]/20 sm:flex-row sm:items-center sm:justify-between">
          <div className="border-b border-[#EAEAEA]/20 px-4 py-3 sm:border-b-0 sm:border-r">
            <span className="text-xs font-bold tracking-[0.2em] text-[#FF2A2A]">
              {"/// NEW ENTRY"}
            </span>
            <h1 className="mt-1 font-sans text-3xl font-black uppercase tracking-tighter sm:text-4xl">
              Describe Incident
            </h1>
          </div>
          <p aria-live="polite" className="px-4 py-3 text-xs font-bold tracking-wider text-[#EAEAEA]/60">
            {telemetry}
          </p>
        </div>

        <div className="p-4 sm:p-6">
          <label htmlFor="grievance_input" className="sr-only">
            Incident description
          </label>
          <textarea
            ref={textareaRef}
            id="grievance_input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="> LOG ENTRY HERE..."
            rows={7}
            autoFocus
            className="min-h-[260px] w-full resize-none border border-[#EAEAEA]/20 bg-[#0A0A0A] p-4 text-base leading-7 text-[#EAEAEA] outline-none placeholder:text-[#EAEAEA]/30 focus:border-[#FF2A2A] sm:p-6 sm:text-lg"
          />
          <div className="flex items-center justify-between border border-t-0 border-[#EAEAEA]/20 px-3 py-2 text-[11px] tracking-wider text-[#EAEAEA]/50">
            <span>CHARS: {description.length.toString().padStart(4, "0")}</span>
            <span>{isRecording ? "MIC: LIVE" : "MIC: STANDBY"}</span>
          </div>
        </div>

        <div className="grid border-t border-[#EAEAEA]/20 sm:grid-cols-3">
          <button
            type="button"
            onClick={toggleRecording}
            aria-pressed={isRecording}
            className={`min-h-14 border-b border-[#EAEAEA]/20 px-4 text-xs font-bold tracking-widest transition-colors sm:border-b-0 sm:border-r ${
              isRecording
                ? "border-[#FF2A2A] bg-[#FF2A2A] text-white"
                : "text-[#EAEAEA] hover:bg-[#EAEAEA] hover:text-[#0A0A0A]"
            }`}
          >
            [ REC ] {isRecording ? "LIVE" : "VOICE INPUT"}
          </button>
          <button
            type="button"
            onClick={clearDraft}
            className="min-h-14 border-b border-[#EAEAEA]/20 px-4 text-xs font-bold tracking-widest transition-colors hover:bg-[#EAEAEA] hover:text-[#0A0A0A] sm:border-b-0 sm:border-r"
          >
            [ CLEAR DRAFT ]
          </button>
          <button
            type="submit"
            className="min-h-14 bg-[#EAEAEA] px-4 text-xs font-bold tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#FF2A2A] hover:text-white"
          >
            [ ANALYZE ]
          </button>
        </div>
      </div>
    </form>
  );
}
