"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

type LodgeTerminalProps = {
  onAnalyze: (raw: string) => void;
  storageKey?: string;
};

export default function LodgeTerminal({
  onAnalyze,
  storageKey = "samadhan_draft",
}: LodgeTerminalProps) {
  const { t, i18n } = useTranslation();
  const [description, setDescription] = useState("");
  const [isHydrated, setIsHydrated] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [telemetry, setTelemetry] = useState("");
  const [isTranscribing, setIsTranscribing] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    setTelemetry(t("lodge.systemReady") || "SYSTEM READY");
  }, [t]);

  useEffect(() => {
    const hydrateTimer = window.setTimeout(() => {
      try {
        const savedDraft = window.localStorage.getItem(storageKey);
        if (savedDraft) {
          setDescription(savedDraft);
          setTelemetry(t("lodge.draftRestored") || "DRAFT RESTORED");
        }
      } catch {
        // ignore
      } finally {
        setIsHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(hydrateTimer);
  }, [storageKey, t]);

  useEffect(() => {
    if (!isHydrated) return;
    const saveTimer = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, description);
        if (description.length > 0 && !isRecording && !isTranscribing) {
          setTelemetry(t("lodge.draftSaved") || "DRAFT AUTO-SAVED");
        }
      } catch {
        // ignore
      }
    }, 350);
    return () => window.clearTimeout(saveTimer);
  }, [description, isHydrated, isRecording, isTranscribing, storageKey, t]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        audioChunksRef.current = [];
        
        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());
        
        setIsRecording(false);
        setIsTranscribing(true);
        setTelemetry("TRANSCRIBING (AI)...");

        try {
          const formData = new FormData();
          formData.append("audio", audioBlob, "recording.webm");
          
          const response = await fetch("/api/transcribe", {
            method: "POST",
            body: formData,
          });
          
          if (!response.ok) throw new Error("Transcription failed");
          
          const data = await response.json();
          if (data.text) {
             const separator = description.trim() ? "\n" : "";
             setDescription((prev) => `${prev.trim()}${separator}${data.text.trim()}`);
             setTelemetry(t("lodge.systemReady") || "SYSTEM READY");
          }
        } catch (error) {
          console.error(error);
          setTelemetry("TRANSCRIPTION ERROR");
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTelemetry(t("lodge.listening") || "LISTENING (MIC LIVE)...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setTelemetry("MIC ACCESS DENIED");
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!description.trim()) {
      textareaRef.current?.focus();
      return;
    }
    
    onAnalyze(description.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full font-sans text-foreground">
      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-background shadow-sm">
        {/* Header */}
        <div className="flex flex-col border-b border-[var(--color-border)] bg-[var(--tertiary-bg)] sm:flex-row sm:items-center sm:justify-between px-6 py-4">
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              {t("lodge.incidentDetails") || "Incident Details"}
            </h2>
          </div>
          <p aria-live="polite" className="mt-2 sm:mt-0 text-xs font-semibold text-[var(--color-accent)]">
            {telemetry}
          </p>
        </div>

        {/* Input Area */}
        <div className="p-6">
          <label htmlFor="grievance_input" className="sr-only">
            {t("lodge.incidentDetails")}
          </label>
          <textarea
            ref={textareaRef}
            id="grievance_input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder={t("lodge.placeholder") || "Type your report here..."}
            autoFocus
            className="w-full resize-none bg-transparent p-0 text-base leading-relaxed text-foreground outline-none placeholder:text-[var(--label-tertiary)]"
            style={{ minHeight: '220px' }}
          />
          
          <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4 text-xs font-medium text-[var(--label-secondary)]">
            <span>{t("lodge.characters") || "Characters"}: {description.length}</span>
            <span className={isRecording ? "text-[var(--system-red)] animate-pulse" : ""}>
              {isRecording ? t("lodge.micLive") || "Mic Live" : t("lodge.micStandby") || "Mic Standby"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid border-t border-[var(--color-border)] sm:grid-cols-2 bg-[var(--tertiary-bg)]">
          <button
            type="button"
            onClick={toggleRecording}
            aria-pressed={isRecording}
            className={`min-h-[56px] border-r border-[var(--color-border)] px-4 text-sm font-medium transition-colors ${
              isRecording
                ? "bg-[var(--system-red)] text-white"
                : "text-[var(--label-primary)] hover:bg-[var(--color-border)]"
            }`}
          >
            {isRecording ? (t("lodge.stopVoice") || "Stop Recording") : (t("lodge.useVoice") || "Record Voice")}
          </button>
          <button
            type="submit"
            className="min-h-[56px] bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[var(--label-secondary)]"
          >
            {t("lodge.analyze") || "Review Report"}
          </button>
        </div>
      </div>
    </form>
  );
}
