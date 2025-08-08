type GeneratePersonaInput = {
  topic: string;
  tone?: "concise" | "serious" | "casual" | "funny";
  constraints?: string;
};

export type GeneratedPersona = {
  name: string;
  username: string;
  bio: string;
  expertise: string[];
  tone: "concise" | "serious" | "casual" | "funny";
};

export type GenerateAnswerInput = {
  question: string;
  persona: GeneratedPersona;
  style?: "concise" | "serious" | "casual" | "funny";
};

import OpenAI from "openai";

// Placeholder + OpenAI-backed generator. Uses OpenAI when OPENAI_API_KEY is set, otherwise falls back to mock.
export const AI = {
  async generatePersona(input: GeneratePersonaInput): Promise<GeneratedPersona> {
    const base = input.topic.trim();
    const tone = input.tone ?? "concise";

    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      const client = new OpenAI({ apiKey });
      // Small structured prompt; you can refine later.
      const sys = "You are an assistant that creates concise AI expert personas as JSON.";
      const user = `Create a persona for topic: ${base}. Tone: ${tone}. Include fields: name, username (@slug style), bio (1-2 sentences), expertise (up to 5 tags), tone.`;
      const resp = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      });
      const text = resp.choices?.[0]?.message?.content || "{}";
      try {
        const parsed = JSON.parse(text);
        // Ensure defaults
        return {
          name: parsed.name || `${titleCase(base)} Expert`,
          username: parsed.username || `@${slugify(base).slice(0, 20)}`,
          bio: parsed.bio || `AI persona focused on ${base}. Tone: ${tone}.`,
          expertise: Array.isArray(parsed.expertise) ? parsed.expertise.slice(0, 5) : [base],
          tone: parsed.tone || tone,
        };
      } catch {
        // Fallback to mock if parse fails
      }
    }

    // Mock fallback
    const name = `${titleCase(base)} Expert`;
    const username = `@${slugify(base).slice(0, 20)}`;
    const expertise = uniq(
      [base]
        .concat(base.split(/\s+/))
        .map((s) => s.toLowerCase())
        .filter(Boolean)
        .slice(0, 5)
    );
    const bio = `AI persona focused on ${base}. ${input.constraints ? `Constraints: ${input.constraints}. ` : ""}Tone: ${tone}.`;
    return { name, username, bio, expertise, tone };
  },

  async generateAnswer(input: GenerateAnswerInput): Promise<{ content: string; style: GeneratedPersona["tone"] }> {
    const style = input.style ?? input.persona.tone ?? "concise";

    const apiKey = process.env.OPENAI_API_KEY;
    if (apiKey) {
      const client = new OpenAI({ apiKey });
      const sys = `You are ${input.persona.name} (${input.persona.username}), an expert with tone ${style}. Expertise: ${input.persona.expertise.join(", ")}. Provide a clear, actionable answer.`;
      const user = input.question;
      const resp = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: user },
        ],
        temperature: 0.7,
      });
      const text = resp.choices?.[0]?.message?.content?.trim() || "";
      if (text) return { content: text, style };
    }

    // Mock fallback
    const content = `(${style}) ${input.persona.name} says: For question "${truncate(input.question, 160)}", consider 3 angles: (1) fundamentals, (2) trade-offs, (3) next steps. Expertise: ${input.persona.expertise.join(", ")}.`;
    return { content, style };
  },
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function titleCase(s: string) {
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + "…" : s;
}
