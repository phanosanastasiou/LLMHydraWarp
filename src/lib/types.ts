export type ExpertId = string;
export type ThreadId = string;

export type Style = "concise" | "serious" | "casual" | "funny";

export interface Expert {
  id: ExpertId;
  name: string;
  username: string;
  avatarUrl?: string;
  expertise: string[]; // tags
  bio?: string;
  tone?: Style;
}

export interface Message {
  id: string;
  authorType: "expert" | "user" | "system";
  authorId?: string; // expertId or userId
  content: string;
  createdAt: string; // ISO
  parentId?: string; // sub-thread
}

export interface ResponseVariant {
  id: string;
  expertId: ExpertId;
  content: string;
  style: Style;
  expandedLevel: number; // 0..n
  votes: number;
}

export interface Thread {
  id: ThreadId;
  title: string;
  question: string;
  createdAt: string;
  responses: ResponseVariant[];
}

export interface CreateThreadInput {
  title: string;
  question: string;
  tags?: string[];
  style?: Style;
}
