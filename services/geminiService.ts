
import { GoogleGenAI } from "@google/genai";
import { CharacterProfile } from '../types';
import { getAnalysisPrompt, getStylelessResponsePrompt, getStyledResponsePrompt } from '../constants';

if (!process.env['API_KEY']) {
  throw new Error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] });

const cleanupJson = (text: string): string => {
  const regex = /```json\s*([\s\S]*?)\s*```/;
  const match = regex.exec(text);
  return match ? match[1] ?? text : text;
};

export const analyzeCharacter = async (text: string): Promise<CharacterProfile> => {
  const prompt = getAnalysisPrompt(text);
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    const cleanedJson = cleanupJson(response.text ?? '');
    return JSON.parse(cleanedJson) as CharacterProfile;
  } catch (error) {
    console.error("Error analyzing character:", error);
    throw new Error("キャラクター分析中にエラーが発生しました。入力テキストやAPIキーを確認してください。");
  }
};

export const generateStylelessResponse = async (
  profile: CharacterProfile,
  history: { role: string, content: string }[],
  userMessage: string
): Promise<string> => {
  const chatHistoryText = history
    .map(msg => `${msg.role}: ${msg.content}`)
    .join('\n');

  const prompt = getStylelessResponsePrompt(
    profile.personality,
    profile.longTermMemory,
    chatHistoryText,
    userMessage
  );

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text ?? '';
  } catch (error) {
    console.error("Error generating styleless response:", error);
    throw new Error("スタイルレス応答の生成中にエラーが発生しました。");
  }
};

export const applyLanguageStyle = async (
  profile: CharacterProfile,
  stylelessResponse: string
): Promise<string> => {
  const prompt = getStyledResponsePrompt(profile.languageStyle, stylelessResponse);
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });
    return response.text ?? '';
  } catch (error) {
    console.error("Error applying language style:", error);
    throw new Error("言語スタイルの適用中にエラーが発生しました。");
  }
};
