
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType, GenerationStep, CharacterProfile } from '../types';
import ChatMessage from './ChatMessage';
import StepIndicator from './StepIndicator';

interface ChatWindowProps {
  profile: CharacterProfile | null;
  messages: ChatMessageType[];
  onSendMessage: (message: string) => Promise<void>;
  status: GenerationStep;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ profile, messages, onSendMessage, status }) => {
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isChatting = status === GenerationStep.GENERATING_STYLELESS || status === GenerationStep.APPLYING_STYLE;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, status]);

  const handleSend = (): void => {
    if (input.trim() && profile && !isChatting) {
      void onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4 flex-shrink-0">2. キャラクターと対話</h2>
      
      {!profile ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-gray-400 text-lg">まず、左側でキャラクターを設定してください。</p>
        </div>
      ) : (
        <div className="flex-grow flex flex-col overflow-hidden">
          <div className="flex-grow overflow-y-auto pr-2 space-y-6 pb-4">
            {messages.length === 0 && (
                <div className="text-center text-gray-500 pt-10">
                    <p>対話履歴はまだありません。</p>
                    <p>最初のメッセージを送ってみましょう！</p>
                </div>
            )}
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg} />
            ))}
            {isChatting && (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 7a1 1 0 00-1 1v4a1 1 0 001 1h1V7H5zm10 0h-1v6h1a1 1 0 001-1V8a1 1 0 00-1-1zM7 7h6v6H7V7z" />
                  </svg>
                </div>
                <div className="max-w-xl p-4 rounded-xl bg-gray-700">
                   <StepIndicator currentStep={status} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="flex-shrink-0 mt-4 border-t border-gray-700 pt-4">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => { setInput(e.target.value); }}
                onKeyDown={handleKeyDown}
                placeholder={isChatting ? "応答を生成中です..." : "メッセージを入力... (Shift+Enterで改行)"}
                className="w-full p-3 pr-24 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-gray-200"
                rows={2}
                disabled={isChatting}
              />
              <button
                onClick={handleSend}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
                disabled={!input.trim() || isChatting}
              >
                送信
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
