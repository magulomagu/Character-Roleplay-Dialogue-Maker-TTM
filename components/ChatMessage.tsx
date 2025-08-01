
import React from 'react';
import { ChatMessage as ChatMessageType, GenerationStep } from '../types';

const UserIcon = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);

const AssistantIcon = (): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 7a1 1 0 00-1 1v4a1 1 0 001 1h1V7H5zm10 0h-1v6h1a1 1 0 001-1V8a1 1 0 00-1-1zM7 7h6v6H7V7z" />
  </svg>
);

const ChatMessage: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <AssistantIcon />
        </div>
      )}
      <div className={`max-w-xl p-4 rounded-xl ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
        <p className="whitespace-pre-wrap">{message.content}</p>
        {message.step === GenerationStep.DONE && message.stylelessResponse && (
           <details className="mt-3 text-xs opacity-70">
              <summary className="cursor-pointer hover:underline">生成プロセスの詳細</summary>
              <div className="mt-2 p-2 bg-gray-800 rounded">
                <p><strong className="font-semibold">スタイルレス応答:</strong> {message.stylelessResponse}</p>
                <p className="mt-1"><strong className="font-semibold">最終応答:</strong> {message.finalResponse}</p>
              </div>
            </details>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <UserIcon />
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
