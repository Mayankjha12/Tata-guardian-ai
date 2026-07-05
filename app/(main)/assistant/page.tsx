'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { chatService } from '@/services/chat';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';
import { Message, MessageRole } from '@/types/chat';
import { SUGGESTED_CHAT_PROMPTS } from '@/utils/constants';
import { Send, Loader } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch initial chat session
  const { data: session, isLoading: sessionLoading } = useQuery({
    queryKey: ['chatSession'],
    queryFn: () => chatService.getChatSession(),
    staleTime: Infinity,
  });

  // Send message mutation
  const sendMessageMutation = useMutation({
    mutationFn: async (message: string) => {
      return chatService.sendMessage('session-1', message);
    },
    onSuccess: (response) => {
      setMessages((prev) => [...prev, response.message]);
      setInput('');
    },
  });

  // Initialize messages from session
  useEffect(() => {
    if (session && messages.length === 0) {
      setMessages(session.messages);
    }
  }, [session, messages.length]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string = input) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: MessageRole.USER,
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Send to AI
    sendMessageMutation.mutate(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check for CJK IME composition
    if (!e.nativeEvent.isComposing && (e.key === 'Enter' && !e.shiftKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">AI Assistant</h1>
        <p className="text-neutral-400">Ask questions about your fleet and get AI-powered insights</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <Card variant="subtle" className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 p-6">
            {messages.length === 0 && !sessionLoading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-6 text-center">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">Welcome to VitalCore AI Assistant</h3>
                  <p className="text-neutral-400 max-w-sm">
                    Ask me anything about your fleet&apos;s health, maintenance schedules, or predictive insights
                  </p>
                </div>

                {/* Suggested Prompts */}
                <div className="w-full space-y-3">
                  <p className="text-xs text-neutral-500 uppercase">Suggested questions</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {SUGGESTED_CHAT_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="p-3 rounded-lg bg-neutral-800/50 hover:bg-neutral-700/50 border border-neutral-700 hover:border-primary/50 text-left text-sm text-neutral-300 hover:text-foreground transition-all"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {messages.map((message, idx) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs sm:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
                        message.role === MessageRole.USER
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-neutral-800 text-foreground rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === MessageRole.USER
                          ? 'text-white/70'
                          : 'text-neutral-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {sendMessageMutation.isPending && (
                  <div className="flex justify-start">
                    <div className="bg-neutral-800 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                      <span className="text-sm text-neutral-400">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-neutral-700 p-6 space-y-3">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about fleet health, maintenance, predictions..."
                rows={2}
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-foreground placeholder-neutral-500 focus:border-primary focus:outline-none resize-none"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || sendMessageMutation.isPending}
                variant="primary"
                size="lg"
                className="flex-shrink-0 h-fit"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-xs text-neutral-500 text-center">
              Press Enter to send, Shift+Enter for new line
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
