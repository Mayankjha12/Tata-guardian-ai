'use client';

import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { chatService } from '@/services/chat';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Message, MessageRole } from '@/types/chat';
import { SUGGESTED_CHAT_PROMPTS } from '@/utils/constants';
import { Send, Loader, Mic, Paperclip, Sparkles, AlertCircle } from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
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
    <div className="min-h-[calc(100vh-12rem)] flex flex-col gap-6 max-w-6xl mx-auto">
      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6 flex-1">
        {/* Left Column - Chat Area (wider on desktop) */}
        <div className="lg:col-span-2 flex flex-col gap-6 min-h-[600px]">
          {/* Messages Area */}
          {messages.length === 0 && !sessionLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-12 text-center py-12">
              {/* Welcome Section */}
              <div className="space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm text-primary font-semibold">VitalCore AI Assistant</span>
                </div>
                <h2 className="text-3xl font-bold">Fleet Intelligence at Your Fingertips</h2>
                <p className="text-neutral-400 text-lg">
                  Ask about vehicle health, predict failures, optimize maintenance, and get fleet insights powered by edge AI
                </p>
              </div>

              {/* Suggested Prompts Grid */}
              <div className="w-full space-y-4">
                <div className="space-y-3">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold">Examples</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SUGGESTED_CHAT_PROMPTS.map((prompt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(prompt)}
                        className="p-4 rounded-xl glass hover:bg-primary/10 border border-neutral-700/50 hover:border-primary/50 text-left text-sm text-neutral-400 hover:text-foreground transition-all duration-200 flex items-start gap-3 group"
                      >
                        <div className="text-primary/40 group-hover:text-primary mt-1">
                          <Sparkles className="h-4 w-4" />
                        </div>
                        <span className="flex-1">{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 glass rounded-2xl p-6 border border-neutral-700/50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-slide-up ${
                      message.role === MessageRole.USER ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === MessageRole.ASSISTANT && (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-sm lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.role === MessageRole.USER
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-neutral-800 text-foreground rounded-bl-none border border-neutral-700/50'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.role === MessageRole.USER
                          ? 'text-white/70'
                          : 'text-neutral-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {message.role === MessageRole.USER && (
                      <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold">You</span>
                      </div>
                    )}
                  </div>
                ))}

                {sendMessageMutation.isPending && (
                  <div className="flex gap-3 animate-slide-up">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Loader className="h-4 w-4 animate-spin text-primary" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-none bg-neutral-800 border border-neutral-700/50 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </>
          )}

          {/* Input Area */}
          <div className="space-y-3">
            <div className="glass rounded-2xl p-4 border border-neutral-700/50">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about vehicle health, maintenance predictions..."
                rows={3}
                className="w-full bg-transparent text-foreground placeholder-neutral-500 focus:outline-none resize-none"
              />
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-700/50">
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`p-2 rounded-lg transition-colors ${
                      isRecording
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'text-neutral-400 hover:text-foreground hover:bg-neutral-800/50'
                    }`}
                  >
                    <Mic className="h-5 w-5" />
                  </button>
                  <button className="p-2 rounded-lg text-neutral-400 hover:text-foreground hover:bg-neutral-800/50 transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                </div>
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || sendMessageMutation.isPending}
                  variant="primary"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span className="hidden sm:inline">Send</span>
                </Button>
              </div>
            </div>
            <p className="text-xs text-neutral-500 text-center">
              Enter to send • Shift+Enter for new line
            </p>
          </div>
        </div>

        {/* Right Column - Context Panel */}
        <div className="hidden lg:flex flex-col gap-6">
          {/* Context Card */}
          <div className="glass rounded-2xl p-4 border border-neutral-700/50 space-y-4">
            <div className="space-y-2">
              <p className="text-xs uppercase text-neutral-500 font-semibold">Context</p>
              <h3 className="font-semibold">Fleet Status</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-neutral-800/50 space-y-1">
                <p className="text-xs text-neutral-400">Active Vehicles</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-800/50 space-y-1">
                <p className="text-xs text-neutral-400">Avg Health Score</p>
                <p className="text-2xl font-bold">78%</p>
              </div>
              <div className="p-3 rounded-lg bg-neutral-800/50 space-y-1">
                <p className="text-xs text-neutral-400">Critical Alerts</p>
                <p className="text-2xl font-bold text-status-critical">3</p>
              </div>
            </div>

            {/* Alerts Summary */}
            <div className="border-t border-neutral-700/50 pt-4">
              <p className="text-xs uppercase text-neutral-500 font-semibold mb-3">Recent Alerts</p>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 flex gap-2">
                  <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <p className="text-red-400 font-medium">Battery Low</p>
                    <p className="text-neutral-400">VH-004 at 28%</p>
                  </div>
                </div>
                <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <p className="text-yellow-400 font-medium">Maintenance Due</p>
                    <p className="text-neutral-400">VH-002 in 7 days</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
