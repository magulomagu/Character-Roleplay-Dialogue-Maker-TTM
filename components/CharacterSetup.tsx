
import React, { useState } from 'react';
import { CharacterProfile, GenerationStep } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { HARRY_POTTER_EXAMPLE } from '../constants';

interface CharacterSetupProps {
  profile: CharacterProfile | null;
  setProfile: (profile: CharacterProfile | null) => void;
  onAnalyze: (text: string) => Promise<void>;
  status: GenerationStep;
}

const CharacterSetup: React.FC<CharacterSetupProps> = ({ profile, setProfile, onAnalyze, status }) => {
  const [sourceText, setSourceText] = useState<string>('');

  const handleAnalyzeClick = (): void => {
    if (sourceText.trim()) {
      void onAnalyze(sourceText);
    }
  };

  const handleProfileChange = <K extends keyof CharacterProfile>(
    key: K,
    value: CharacterProfile[K]
  ): void => {
    if (profile) {
      setProfile({ ...profile, [key]: value });
    }
  };
  
  const handleMemoryChange = (key: string, value: string): void => {
    if(profile){
      const newMemory = {...profile.longTermMemory, [key]: value};
      setProfile({...profile, longTermMemory: newMemory});
    }
  };

  const handleLoadExample = (): void => {
    setSourceText(HARRY_POTTER_EXAMPLE);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 p-6 rounded-xl shadow-lg space-y-4 overflow-y-auto">
      <div className="flex-shrink-0">
        <h2 className="text-2xl font-bold text-white mb-2">1. キャラクター設定</h2>
        <p className="text-gray-400 mb-4">キャラクターの性格や話し方がわかる文章（小説、セリフ集など）を入力してください。</p>
        <textarea
          value={sourceText}
          onChange={(e) => { setSourceText(e.target.value); }}
          placeholder="ここにキャラクターのセリフや説明文を貼り付けます..."
          className="w-full h-48 p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none resize-y text-gray-200"
          disabled={status === GenerationStep.ANALYZING}
        />
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handleLoadExample}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50"
            disabled={status === GenerationStep.ANALYZING}
          >
            例を読み込む
          </button>
          <button
            onClick={handleAnalyzeClick}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition-colors flex items-center justify-center disabled:bg-blue-800 disabled:cursor-not-allowed"
            disabled={!sourceText.trim() || status === GenerationStep.ANALYZING}
          >
            {status === GenerationStep.ANALYZING ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">分析中...</span>
              </>
            ) : (
              'この内容でキャラクターを分析'
            )}
          </button>
        </div>
      </div>
      
      {profile && (
        <div className="flex-grow flex flex-col space-y-4 overflow-y-auto pr-2">
          <h3 className="text-xl font-semibold text-white mt-4 border-b border-gray-600 pb-2">分析結果</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">パーソナリティ</label>
            <textarea
              value={profile.personality}
              onChange={(e) => { handleProfileChange('personality', e.target.value); }}
              className="w-full h-24 p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">言語スタイル（話し方）</label>
            <textarea
              value={profile.languageStyle}
              onChange={(e) => { handleProfileChange('languageStyle', e.target.value); }}
              className="w-full h-24 p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-200"
            />
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-300 mb-2">長期記憶</h4>
            <div className="space-y-2">
              {Object.entries(profile.longTermMemory).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={key}
                    disabled
                    className="w-1/3 p-2 bg-gray-600 border border-gray-500 rounded-md text-gray-300"
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => { handleMemoryChange(key, e.target.value); }}
                    className="w-2/3 p-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-1 focus:ring-blue-500 focus:outline-none text-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterSetup;
