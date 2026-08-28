import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import fs from "fs";
import os from "os";
import path from "path";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY environment variable is missing on Vercel." },
        { status: 500 }
      );
    }

    const groq = new Groq({ apiKey });

    const formData = await request.formData();
    const file = formData.get("audio") as File;

    if (!file) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 });
    }

    const transcription = await groq.audio.transcriptions.create({
      file: file,
      model: "whisper-large-v3-turbo",
      prompt: "The audio might be in English, Hindi, Kannada, or Tamil. Transcribe it exactly in the language spoken.",
      response_format: "json",
      temperature: 0.0,
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error: any) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
