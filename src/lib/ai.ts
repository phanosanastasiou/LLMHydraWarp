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

// Placeholder AI generator. Replace with provider-specific calls later.
export const AI = {
  async generatePersona(input: GeneratePersonaInput): Promise<GeneratedPersona> {
    const base = input.topic.trim();
    const tone = input.tone ?? "concise";
    const name = `${titleCase(base)} Expert`;
    const username = `@${slugify(base).slice(0, 20)}`;
    const expertise = uniq(
      [base]
        .concat(base.split(/\s+/))
        .map((s) => s.toLowerCase())
        .filter(Boolean)
        .slice(0, 5)
    );
    const bio = `AI persona focused on ${base}. ${
      input.constraints ? `Constraints: ${input.constraints}. ` : ""
    }Tone: ${tone}.`;
    return { name, username, bio, expertise, tone };
  },

  async generateAnswer(input: GenerateAnswerInput): Promise<{ content: string; style: GeneratedPersona["tone"] }> {
    const style = input.style ?? input.persona.tone ?? "concise";
    const content = `(${style}) ${input.persona.name} says: For question "${truncate(input.question, 160)}", consider 3 angles: (1) fundamentals, (2) trade-offs, (3) next steps. ` +
      `Expertise: ${input.persona.expertise.join(", ")}.`;
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
