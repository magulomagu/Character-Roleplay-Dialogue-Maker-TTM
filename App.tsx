
import React, { useState, useCallback } from 'react';
import { CharacterProfile, ChatMessage, GenerationStep } from './types';
import CharacterSetup from './components/CharacterSetup';
import ChatWindow from './components/ChatWindow';
import { analyzeCharacter, generateStylelessResponse, applyLanguageStyle } from './services/geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<CharacterProfile | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<GenerationStep>(GenerationStep.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (text: string) => {
    setStatus(GenerationStep.ANALYZING);
    setError(null);
    try {
      const newProfile = await analyzeCharacter(text);
      setProfile(newProfile);
      setMessages([]); // 新しいキャラクターが設定されたらチャット履歴をリセット
      setStatus(GenerationStep.IDLE);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
      setStatus(GenerationStep.ERROR);
    }
  }, []);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!profile) return;

    const userMessage: ChatMessage = { role: 'user', content: message };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setStatus(GenerationStep.GENERATING_STYLELESS);
    setError(null);

    try {
      // APIに送信する会話履歴を準備 (システムメッセージは除外)
      const historyForApi = updatedMessages
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }));

      // Step 1: Generate styleless response
      const stylelessResponse = await generateStylelessResponse(
        profile,
        historyForApi,
        message
      );
      
      setStatus(GenerationStep.APPLYING_STYLE);

      // Step 2 (in TTM, this is enhancing, here we just go to style)
      // Step 3: Apply language style
      const finalResponse = await applyLanguageStyle(profile, stylelessResponse);

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: finalResponse,
        step: GenerationStep.DONE,
        stylelessResponse: stylelessResponse,
        finalResponse: finalResponse,
      };
      setMessages(prev => [...prev, assistantMessage]);
      setStatus(GenerationStep.IDLE);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '応答の生成中に不明なエラーが発生しました';
      setError(errorMessage);
      const errorSystemMessage: ChatMessage = { role: 'system', content: `エラー: ${errorMessage}` };
      setMessages(prev => [...prev, errorSystemMessage]);
      setStatus(GenerationStep.ERROR);
    }
  }, [profile, messages]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          キャラクターなりきり対話メーカー
        </h1>
        <p className="text-gray-400 mt-2">Test-Time-Matching (TTM) 手法によるAIキャラクター対話</p>
      </header>
      {error && (
        <div className="bg-red-900 border border-red-600 text-red-200 px-4 py-3 rounded-md relative mb-6" role="alert">
          <strong className="font-bold">エラーが発生しました: </strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => { setError(null); }}>
            <svg className="fill-current h-6 w-6 text-red-200" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div className="lg:h-[calc(100vh-12rem)]">
          <CharacterSetup profile={profile} setProfile={setProfile} onAnalyze={handleAnalyze} status={status} />
        </div>
        <div className="lg:h-[calc(100vh-12rem)]">
          <ChatWindow profile={profile} messages={messages} onSendMessage={handleSendMessage} status={status} />
        </div>
      </main>
    </div>
  );
};

export default App;
