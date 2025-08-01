
export interface CharacterProfile {
  personality: string;
  languageStyle: string;
  longTermMemory: Record<string, string>;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  step?: GenerationStep;
  stylelessResponse?: string;
  finalResponse?: string;
}

export enum GenerationStep {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  GENERATING_STYLELESS = 'GENERATING_STYLELESS',
  APPLYING_STYLE = 'APPLYING_STYLE',
  DONE = 'DONE',
  ERROR = 'ERROR'
}
