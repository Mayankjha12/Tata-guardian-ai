import { ChatSession, Message, MessageRole, ChatCompletionResponse } from '@/types/chat';
import { generateChatSession } from '@/utils/constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const chatService = {
  async getChatSession(sessionId?: string): Promise<ChatSession> {
    await delay(300);
    return generateChatSession();
  },

  async sendMessage(sessionId: string, message: string): Promise<ChatCompletionResponse> {
    await delay(1000);
    const responses = [
      'Based on the sensor data, the vehicle battery is showing signs of degradation. I recommend scheduling maintenance within the next 2 weeks.',
      'The predictive model indicates a potential transmission issue. Current confidence score is 78%. Please schedule a diagnostic check.',
      'All systems are operating normally. The fleet health metrics show consistent performance across all vehicles.',
      'I detected an anomaly in the cooling system. This may indicate a potential failure in the near future. Recommended action: Check the radiator and cooling fan.',
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    return {
      id: `resp-${Date.now()}`,
      message: {
        id: `msg-${Date.now()}`,
        role: MessageRole.ASSISTANT,
        content: randomResponse,
        timestamp: new Date(),
      },
      usage: {
        promptTokens: Math.floor(message.length / 4),
        completionTokens: Math.floor(randomResponse.length / 4),
        totalTokens: Math.floor((message.length + randomResponse.length) / 4),
      },
    };
  },

  async createChatSession(title: string): Promise<ChatSession> {
    await delay(250);
    return {
      id: `session-${Date.now()}`,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  },

  async deleteChatSession(sessionId: string): Promise<void> {
    await delay(200);
  },
};
