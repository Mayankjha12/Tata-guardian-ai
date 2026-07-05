export enum MessageRole {
  USER = 'user',
  ASSISTANT = 'assistant',
  SYSTEM = 'system',
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ChatContext {
  vehicleId?: string;
  sensorId?: string;
  predictionId?: string;
  alertId?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  context?: ChatContext;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatCompletionRequest {
  messages: Message[];
  context?: ChatContext;
  systemPrompt?: string;
}

export interface ChatCompletionResponse {
  id: string;
  message: Message;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
