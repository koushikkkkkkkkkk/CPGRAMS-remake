import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }

    const systemPrompt = `You are an AI assistant for a civic grievance redressal portal in India (SAMADHAN). 
Analyze the following grievance text (which could be in English, Hindi, Kannada, Tamil, or a mix).
You must output a JSON object with EXACTLY the following structure (do not include markdown wrapping like \`\`\`json):
{
  "department": "Municipal Road Wing - Ward 4" | "Municipal Water Board - Ward 4" | "Electricity Board" | "Public Works Department" | "General Grievance Cell" | "Sanitation Department",
  "urgencyLevel": "Low" | "Medium" | "High",
  "tags": ["tag1", "tag2", "tag3"],
  "englishTranslation": "The full grievance translated to formal English, summarizing the issue clearly."
}`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          system_instruction: {
            parts: { text: systemPrompt }
          },
          contents: [{
            parts: [{ text: `Grievance: "${text}"` }]
          }],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json"
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    let responseContent = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseContent) {
      throw new Error("No response from Gemini");
    }

    // Strip out markdown formatting by finding the first { and last }
    const start = responseContent.indexOf('{');
    const end = responseContent.lastIndexOf('}');
    if (start === -1 || end === -1) {
      throw new Error("No JSON object found in response");
    }
    
    const jsonString = responseContent.slice(start, end + 1);
    const parsedResponse = JSON.parse(jsonString);

    return NextResponse.json(parsedResponse);
  } catch (error: any) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze grievance" },
      { status: 500 }
    );
  }
}
