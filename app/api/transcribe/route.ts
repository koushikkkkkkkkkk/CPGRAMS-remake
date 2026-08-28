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

    // Write file to a temporary location to pass to Groq SDK
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create a temporary file path
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `upload-${Date.now()}.webm`);
    
    fs.writeFileSync(tempFilePath, buffer);

    let transcription;
    try {
      transcription = await groq.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: "whisper-large-v3-turbo",
        prompt: "The audio might be in English, Hindi, Kannada, or Tamil. Transcribe it exactly in the language spoken.",
        response_format: "json",
        temperature: 0.0,
      });
    } finally {
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }

    return NextResponse.json({ text: transcription.text });
  } catch (error: any) {
    console.error("Transcription error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
